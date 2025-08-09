-- Location: supabase/migrations/20250128071918_embedsim_auth_system.sql
        -- Schema Analysis: Fresh project - implementing complete authentication system
        -- Integration Type: New authentication module
        -- Dependencies: None (fresh authentication implementation)

        -- 1. Types and Core Tables
        CREATE TYPE public.user_role AS ENUM ('student', 'instructor', 'admin');
        CREATE TYPE public.learning_level AS ENUM ('beginner', 'intermediate', 'advanced');

        -- Critical intermediary table for user profiles
        CREATE TABLE public.user_profiles (
            id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
            email TEXT NOT NULL UNIQUE,
            username TEXT UNIQUE,
            full_name TEXT NOT NULL,
            role public.user_role DEFAULT 'student'::public.user_role,
            learning_level public.learning_level DEFAULT 'beginner'::public.learning_level,
            avatar_url TEXT,
            bio TEXT,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );

        -- Learning progress and user data tables
        CREATE TABLE public.user_progress (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
            lesson_id TEXT NOT NULL,
            completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
            last_accessed TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE public.user_achievements (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
            achievement_type TEXT NOT NULL,
            achievement_data JSONB DEFAULT '{}'::jsonb,
            earned_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );

        -- 2. Essential Indexes
        CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(id);
        CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
        CREATE INDEX idx_user_profiles_username ON public.user_profiles(username);
        CREATE INDEX idx_user_progress_user_id ON public.user_progress(user_id);
        CREATE INDEX idx_user_progress_lesson_id ON public.user_progress(lesson_id);
        CREATE INDEX idx_user_achievements_user_id ON public.user_achievements(user_id);

        -- 3. RLS Setup
        ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
        ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
        ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

        -- 4. Safe Helper Functions
        CREATE OR REPLACE FUNCTION public.is_profile_owner(profile_user_id UUID)
        RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
        SELECT auth.uid() = profile_user_id
        $$;

        CREATE OR REPLACE FUNCTION public.can_access_user_data(data_user_id UUID)
        RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER AS $$
        SELECT auth.uid() = data_user_id
        $$;

        -- Function for automatic profile creation
        CREATE OR REPLACE FUNCTION public.handle_new_user()
        RETURNS TRIGGER
        SECURITY DEFINER
        LANGUAGE plpgsql
        AS $$
        BEGIN
          INSERT INTO public.user_profiles (id, email, full_name, username, role)
          VALUES (
            NEW.id, 
            NEW.email, 
            COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
            COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
            COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'student'::public.user_role)
          );
          RETURN NEW;
        END;
        $$;

        -- Trigger for new user creation
        CREATE TRIGGER on_auth_user_created
          AFTER INSERT ON auth.users
          FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

        -- 5. RLS Policies
        CREATE POLICY "users_own_profile" ON public.user_profiles FOR ALL
        USING (public.is_profile_owner(id)) WITH CHECK (public.is_profile_owner(id));

        CREATE POLICY "users_view_all_profiles" ON public.user_profiles FOR SELECT
        TO authenticated USING (true);

        CREATE POLICY "users_own_progress" ON public.user_progress FOR ALL
        USING (public.can_access_user_data(user_id)) WITH CHECK (public.can_access_user_data(user_id));

        CREATE POLICY "users_own_achievements" ON public.user_achievements FOR ALL
        USING (public.can_access_user_data(user_id)) WITH CHECK (public.can_access_user_data(user_id));

        -- 6. Complete Mock Data
        DO $$
        DECLARE
            admin_uuid UUID := gen_random_uuid();
            student_uuid UUID := gen_random_uuid();
        BEGIN
            -- Create auth users with required fields
            INSERT INTO auth.users (
                id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
                created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
                is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
                recovery_token, recovery_sent_at, email_change_token_new, email_change,
                email_change_sent_at, email_change_token_current, email_change_confirm_status,
                reauthentication_token, reauthentication_sent_at, phone, phone_change,
                phone_change_token, phone_change_sent_at
            ) VALUES
                (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
                 'admin@embedsim.com', crypt('EmbedSim2024!', gen_salt('bf', 10)), now(), now(), now(),
                 '{"full_name": "Admin User", "username": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
                 false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
                (student_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
                 'student@embedsim.com', crypt('EmbedSim2024!', gen_salt('bf', 10)), now(), now(), now(),
                 '{"full_name": "Alex Johnson", "username": "alex"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
                 false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

            -- Create sample progress data
            INSERT INTO public.user_progress (user_id, lesson_id, completion_percentage, last_accessed) VALUES
                (student_uuid, 'intro-to-embedded', 85, now() - interval '2 hours'),
                (student_uuid, 'arduino-basics', 60, now() - interval '1 day'),
                (student_uuid, 'circuit-design', 30, now() - interval '3 days');

            -- Create sample achievements
            INSERT INTO public.user_achievements (user_id, achievement_type, achievement_data) VALUES
                (student_uuid, 'first_lesson_completed', '{"lesson": "intro-to-embedded", "date": "2025-01-28"}'::jsonb),
                (student_uuid, 'circuit_master', '{"circuits_completed": 5, "level": "beginner"}'::jsonb);

        EXCEPTION
            WHEN foreign_key_violation THEN
                RAISE NOTICE 'Foreign key error: %', SQLERRM;
            WHEN unique_violation THEN
                RAISE NOTICE 'Unique constraint error: %', SQLERRM;
            WHEN OTHERS THEN
                RAISE NOTICE 'Unexpected error: %', SQLERRM;
        END $$;