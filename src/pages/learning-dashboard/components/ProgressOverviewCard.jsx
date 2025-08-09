import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import supabase from '../../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';

const ProgressOverviewCard = () => {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;

      // Fetch progress
      const { data: progress, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Fetch achievements
      const { data: achievementsData, error: achievementsError } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('earned_date', { ascending: false })
        .limit(5);

      setProgressData(progress || {
        completed: 0,
        total: 0,
        percentage: 0,
        current_streak: 0,
        total_hours: 0,
        weekly_goal: 0,
        weekly_progress: 0
      });
      setAchievements(achievementsData || []);
      setLoading(false);
    };

    fetchProgress();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <p>Loading progress...</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Learning Progress</h2>
        <div className="flex items-center space-x-2 text-accent">
          <Icon name="Flame" size={20} />
          <span className="font-medium">{progressData.current_streak || 0} day streak</span>
        </div>
      </div>

      {/* Progress Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-primary/10 rounded-lg">
          <p className="text-2xl font-bold text-primary">{progressData.completed || 0}</p>
          <p className="text-sm text-muted-foreground">Completed</p>
        </div>
        <div className="text-center p-4 bg-secondary/10 rounded-lg">
          <p className="text-2xl font-bold text-secondary">{(progressData.total || 0) - (progressData.completed || 0)}</p>
          <p className="text-sm text-muted-foreground">Remaining</p>
        </div>
        <div className="text-center p-4 bg-accent/10 rounded-lg">
          <p className="text-2xl font-bold text-accent">{progressData.total_hours || 0}h</p>
          <p className="text-sm text-muted-foreground">Study Time</p>
        </div>
        <div className="text-center p-4 bg-success/10 rounded-lg">
          <p className="text-2xl font-bold text-success">{progressData.weekly_progress || 0}/{progressData.weekly_goal || 0}</p>
          <p className="text-sm text-muted-foreground">Weekly Goal</p>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Course Completion</span>
          <span className="text-sm font-bold text-foreground">{progressData.percentage || 0}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-700"
            style={{ width: `${progressData.percentage || 0}%` }}
          ></div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div>
        <h3 className="text-lg font-medium text-foreground mb-3">Recent Achievements</h3>
        <div className="space-y-3">
          {achievements.length === 0 ? (
            <p className="text-muted-foreground">No achievements yet.</p>
          ) : (
            achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                  <Icon name={achievement.icon || "Award"} size={20} className="text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{achievement.title}</p>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                <span className="text-xs text-muted-foreground">{achievement.earned_date}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressOverviewCard;