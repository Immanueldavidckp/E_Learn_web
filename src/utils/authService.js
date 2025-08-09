import { supabase } from '../lib/supabase';

        class AuthService {
          // Sign up new user
          async signUp(email, password, userData = {}) {
            try {
              const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                  data: {
                    full_name: userData?.fullName || userData?.username || email.split('@')[0],
                    username: userData?.username || email.split('@')[0],
                    role: userData?.role || 'student'
                  }
                }
              });

              if (error) {
                return { success: false, error: error.message };
              }

              return { success: true, data };
            } catch (error) {
              if (error?.message?.includes('Failed to fetch') || 
                  error?.message?.includes('AuthRetryableFetchError')) {
                return { 
                  success: false, 
                  error: 'Cannot connect to authentication service. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.' 
                };
              }
              
              return { 
                success: false, 
                error: 'Something went wrong during signup. Please try again.' 
              };
            }
          }

          // Sign in user
          async signIn(email, password) {
            try {
              const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
              });

              if (error) {
                return { success: false, error: error.message };
              }

              return { success: true, data };
            } catch (error) {
              if (error?.message?.includes('Failed to fetch') || 
                  error?.message?.includes('AuthRetryableFetchError')) {
                return { 
                  success: false, 
                  error: 'Cannot connect to authentication service. Your Supabase project may be paused or inactive. Please check your Supabase dashboard and resume your project if needed.' 
                };
              }
              
              return { 
                success: false, 
                error: 'Something went wrong during login. Please try again.' 
              };
            }
          }

          // Sign out user
          async signOut() {
            try {
              const { error } = await supabase.auth.signOut();

              if (error) {
                return { success: false, error: error.message };
              }

              return { success: true };
            } catch (error) {
              return { 
                success: false, 
                error: 'Something went wrong during logout. Please try again.' 
              };
            }
          }

          // Get current session
          async getSession() {
            try {
              const { data, error } = await supabase.auth.getSession();

              if (error) {
                return { success: false, error: error.message };
              }

              return { success: true, data };
            } catch (error) {
              return { 
                success: false, 
                error: 'Failed to get session' 
              };
            }
          }

          // Get user profile
          async getUserProfile(userId) {
            try {
              const { data, error } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('id', userId)
                .single();

              if (error) {
                return { success: false, error: error.message };
              }

              return { success: true, data };
            } catch (error) {
              if (error?.message?.includes('Failed to fetch') || 
                  error?.message?.includes('NetworkError')) {
                return { 
                  success: false, 
                  error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
                };
              }
              
              return { 
                success: false, 
                error: 'Failed to load user profile' 
              };
            }
          }

          // Update user profile
          async updateUserProfile(userId, updates) {
            try {
              const { data, error } = await supabase
                .from('user_profiles')
                .update(updates)
                .eq('id', userId)
                .select()
                .single();

              if (error) {
                return { success: false, error: error.message };
              }

              return { success: true, data };
            } catch (error) {
              if (error?.message?.includes('Failed to fetch') || 
                  error?.message?.includes('NetworkError')) {
                return { 
                  success: false, 
                  error: 'Cannot connect to database. Your Supabase project may be paused or deleted. Please visit your Supabase dashboard to check project status.' 
                };
              }
              
              return { 
                success: false, 
                error: 'Failed to update profile' 
              };
            }
          }

          // Reset password
          async resetPassword(email) {
            try {
              const { error } = await supabase.auth.resetPasswordForEmail(email);

              if (error) {
                return { success: false, error: error.message };
              }

              return { success: true };
            } catch (error) {
              return { 
                success: false, 
                error: 'Failed to send reset email' 
              };
            }
          }

          // Auth state change listener
          onAuthStateChange(callback) {
            return supabase.auth.onAuthStateChange(callback);
          }

          // Get current user
          getCurrentUser() {
            return supabase.auth.getUser();
          }
        }

        const authService = new AuthService();
        export default authService;