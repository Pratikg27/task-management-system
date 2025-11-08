import React, { useState, useEffect } from 'react';
import AnimatedCounter from './AnimatedCounter';
import ProgressBar from './ProgressBar';
import { 
  BarChart3, 
  Clock, 
  AlertCircle, 
  CheckSquare, 
  TrendingUp, 
  Target 
} from 'lucide-react';
import './StatsDashboard.css';

const StatsDashboard = ({ stats, tasks = [] }) => {
  const [animatedStats, setAnimatedStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    completionRate: 0,
    currentStreak: 0
  });

  useEffect(() => {
    // Calculate completion rate
    const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
    
    // Calculate streak
    const streak = calculateStreak(tasks);

    setAnimatedStats({
      total: stats.total || 0,
      pending: stats.pending || 0,
      inProgress: stats.inProgress || 0,
      completed: stats.completed || 0,
      completionRate,
      currentStreak: streak
    });
  }, [stats, tasks]);

  const calculateStreak = (tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    
    // Get completed tasks with dates
    const completedTasks = tasks
      .filter(task => task.status === 'completed' && (task.updatedAt || task.createdAt))
      .map(task => {
        const date = new Date(task.updatedAt || task.createdAt);
        return date.toDateString();
      })
      .filter((date, index, array) => array.indexOf(date) === index) // Remove duplicates
      .sort((a, b) => new Date(b) - new Date(a));

    let streak = 0;
    let currentDate = new Date();
    
    // Check last 30 days for streak
    for (let i = 0; i < 30; i++) {
      const dateStr = currentDate.toDateString();
      if (completedTasks.includes(dateStr)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (i === 0) {
        // If today has no completed tasks, check yesterday
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break; // Streak broken
      }
    }
    
    return streak;
  };

  const getCompletionColor = (rate) => {
    if (rate >= 80) return '#10b981'; // Green
    if (rate >= 60) return '#f59e0b'; // Yellow
    if (rate >= 40) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  const getStreakMessage = (streak) => {
    if (streak === 0) return "Start your streak today! 🚀";
    if (streak === 1) return "Great start! Keep going! 💪";
    if (streak < 7) return "Building momentum! 🔥";
    if (streak < 30) return "You're on fire! 🔥🔥";
    return "Incredible dedication! 🏆";
  };

  return (
    <div className="animated-stats-dashboard">
      <div className="animated-stats-header">
        <h2 className="animated-stats-title">📊 Your Productivity Dashboard</h2>
        <p className="animated-stats-subtitle">Track your progress and stay motivated</p>
      </div>

      <div className="animated-stats-grid">
        {/* Total Tasks Card */}
        <div className="animated-stat-card total-tasks">
          <div className="animated-stat-icon blue">
            <BarChart3 size={24} />
          </div>
          <div className="animated-stat-content">
            <p className="animated-stat-label">Total Tasks</p>
            <AnimatedCounter 
              endValue={animatedStats.total} 
              className="large primary"
              duration={1500}
            />
          </div>
        </div>

        {/* Pending Tasks Card */}
        <div className="animated-stat-card pending-tasks">
          <div className="animated-stat-icon yellow">
            <Clock size={24} />
          </div>
          <div className="animated-stat-content">
            <p className="animated-stat-label">Pending</p>
            <AnimatedCounter 
              endValue={animatedStats.pending} 
              className="large warning"
              duration={1600}
            />
          </div>
        </div>

        {/* In Progress Tasks Card */}
        <div className="animated-stat-card progress-tasks">
          <div className="animated-stat-icon blue">
            <AlertCircle size={24} />
          </div>
          <div className="animated-stat-content">
            <p className="animated-stat-label">In Progress</p>
            <AnimatedCounter 
              endValue={animatedStats.inProgress} 
              className="large primary"
              duration={1700}
            />
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div className="animated-stat-card completed-tasks">
          <div className="animated-stat-icon green">
            <CheckSquare size={24} />
          </div>
          <div className="animated-stat-content">
            <p className="animated-stat-label">Completed</p>
            <AnimatedCounter 
              endValue={animatedStats.completed} 
              className="large success glow"
              duration={1800}
            />
          </div>
        </div>

        {/* Completion Rate Card */}
        <div className="animated-stat-card completion-rate">
          <div className="animated-stat-icon purple">
            <TrendingUp size={24} />
          </div>
          <div className="animated-stat-content">
            <p className="animated-stat-label">Completion Rate</p>
            <div className="completion-display">
              <AnimatedCounter 
                endValue={animatedStats.completionRate} 
                suffix="%" 
                className="medium"
                duration={2000}
              />
              <ProgressBar 
                percentage={animatedStats.completionRate}
                duration={2200}
                color={getCompletionColor(animatedStats.completionRate)}
                height="6px"
              />
            </div>
          </div>
        </div>

        {/* Streak Counter Card */}
        <div className="animated-stat-card streak-counter">
          <div className="animated-stat-icon orange">
            <Target size={24} />
          </div>
          <div className="animated-stat-content">
            <p className="animated-stat-label">Current Streak</p>
            <div className="streak-display">
              <AnimatedCounter 
                endValue={animatedStats.currentStreak} 
                suffix={animatedStats.currentStreak === 1 ? " day" : " days"} 
                className="medium glow"
                duration={2500}
              />
              <div className="streak-message">
                {getStreakMessage(animatedStats.currentStreak)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;