import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gamepad2, Trophy, Star, Zap, Heart, Target, Gift } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  reward: number;
  completed: boolean;
}

const Dumpcake: React.FC = () => {
  const navigate = useNavigate();
  const [playerLevel, setPlayerLevel] = useState(3);
  const [experience, setExperience] = useState(750);
  const [emotionalCoins, setEmotionalCoins] = useState(120);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

  const achievements: Achievement[] = [
    {
      id: 'first-emotion',
      title: 'Emotional Explorer',
      description: 'Logged your first emotion',
      icon: '🌟',
      unlocked: true,
      progress: 1,
      maxProgress: 1
    },
    {
      id: 'pattern-finder',
      title: 'Pattern Detective',
      description: 'Identified 5 emotional patterns',
      icon: '🔍',
      unlocked: true,
      progress: 5,
      maxProgress: 5
    },
    {
      id: 'vault-keeper',
      title: 'Memory Vault Keeper',
      description: 'Created 10 vault entries',
      icon: '🏛️',
      unlocked: false,
      progress: 7,
      maxProgress: 10
    },
    {
      id: 'healing-master',
      title: 'Healing Master',
      description: 'Completed 50 ECC protocols',
      icon: '💎',
      unlocked: false,
      progress: 23,
      maxProgress: 50
    }
  ];

  const challenges: Challenge[] = [
    {
      id: 'daily-checkin',
      title: 'Daily Emotional Check-in',
      description: 'Log your emotions for 7 consecutive days',
      difficulty: 'easy',
      reward: 50,
      completed: false
    },
    {
      id: 'pattern-analysis',
      title: 'Pattern Analysis',
      description: 'Identify and process 3 emotional patterns',
      difficulty: 'medium',
      reward: 100,
      completed: false
    },
    {
      id: 'deep-vault',
      title: 'Deep Vault Dive',
      description: 'Create entries in all 5 VinLore vaults',
      difficulty: 'hard',
      reward: 200,
      completed: false
    },
    {
      id: 'translation-bridge',
      title: 'Translation Bridge',
      description: 'Use PulseLink to translate 10 emotional messages',
      difficulty: 'medium',
      reward: 75,
      completed: true
    }
  ];

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'from-green-500 to-teal-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'hard': return 'from-red-500 to-pink-500';
    }
  };

  const completeChallenge = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge && !challenge.completed) {
      setExperience(prev => prev + challenge.reward);
      setEmotionalCoins(prev => prev + Math.floor(challenge.reward / 2));
      // In real app, would update challenge completion status
    }
  };

  const experienceToNextLevel = 1000;
  const experienceProgress = (experience % experienceToNextLevel) / experienceToNextLevel * 100;

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-300" />
        </button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Dumpcake Emotional Gamification
          </h1>
          <p className="text-gray-300">Transform healing into engaging, sustainable progress</p>
        </div>
      </div>

      {/* Player Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Level & Experience */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Emotional Level</h3>
              <p className="text-gray-400 text-sm">Growth progression</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Level:</span>
              <span className="text-white font-bold text-xl">{playerLevel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Experience:</span>
              <span className="text-white font-medium">{experience} XP</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div 
                className="h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${experienceProgress}%` }}
              />
            </div>
            <div className="text-center text-gray-400 text-sm">
              {experienceToNextLevel - (experience % experienceToNextLevel)} XP to Level {playerLevel + 1}
            </div>
          </div>
        </div>

        {/* Emotional Coins */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Emotional Coins</h3>
              <p className="text-gray-400 text-sm">Healing currency</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{emotionalCoins}</div>
            <p className="text-gray-400 text-sm">Spend on rewards & tools</p>
          </div>
        </div>

        {/* Healing Streak */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Healing Streak</h3>
              <p className="text-gray-400 text-sm">Consecutive days</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">12</div>
            <p className="text-gray-400 text-sm">Keep the momentum!</p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">🏆 Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`bg-white/5 backdrop-blur-xl rounded-xl p-4 border transition-all ${
                achievement.unlocked 
                  ? 'border-yellow-500/30 bg-yellow-500/5' 
                  : 'border-white/10'
              }`}
            >
              <div className="text-center mb-3">
                <div className={`text-3xl mb-2 ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>
                <h3 className={`font-semibold ${achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'}`}>
                  {achievement.title}
                </h3>
              </div>
              <p className="text-gray-400 text-sm text-center mb-3">{achievement.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Progress:</span>
                  <span className={achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'}>
                    {achievement.progress}/{achievement.maxProgress}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                        : 'bg-gradient-to-r from-gray-600 to-gray-500'
                    }`}
                    style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Challenges */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">🎯 Daily Challenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((challenge) => (
            <div 
              key={challenge.id} 
              className={`bg-white/5 backdrop-blur-xl rounded-xl p-6 border transition-all hover:bg-white/10 ${
                challenge.completed 
                  ? 'border-green-500/30 bg-green-500/5' 
                  : 'border-white/10'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`font-semibold ${challenge.completed ? 'text-green-400' : 'text-white'}`}>
                      {challenge.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs bg-gradient-to-r ${getDifficultyColor(challenge.difficulty)} text-white`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{challenge.description}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Gift className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 font-medium">{challenge.reward} XP</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-orange-400" />
                      <span className="text-orange-400 font-medium">{Math.floor(challenge.reward / 2)} coins</span>
                    </div>
                  </div>
                </div>
                {challenge.completed ? (
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-green-400" />
                  </div>
                ) : (
                  <button
                    onClick={() => completeChallenge(challenge.id)}
                    className="w-10 h-10 bg-blue-500/20 hover:bg-blue-500/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Target className="w-5 h-5 text-blue-400" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reward Shop Preview */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-white font-semibold mb-4">🛍️ Emotional Reward Shop</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-center">
              <div className="text-2xl mb-2">🎨</div>
              <h4 className="text-white font-medium mb-1">Custom Vault Theme</h4>
              <p className="text-gray-400 text-sm mb-3">Personalize your memory vaults</p>
              <div className="flex items-center justify-center space-x-1">
                <Star className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 font-medium">50 coins</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-center">
              <div className="text-2xl mb-2">🔮</div>
              <h4 className="text-white font-medium mb-1">Advanced Analytics</h4>
              <p className="text-gray-400 text-sm mb-3">Deep emotional insights</p>
              <div className="flex items-center justify-center space-x-1">
                <Star className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 font-medium">100 coins</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="text-center">
              <div className="text-2xl mb-2">🌟</div>
              <h4 className="text-white font-medium mb-1">Healing Boost</h4>
              <p className="text-gray-400 text-sm mb-3">2x XP for 24 hours</p>
              <div className="flex items-center justify-center space-x-1">
                <Star className="w-4 h-4 text-orange-400" />
                <span className="text-orange-400 font-medium">75 coins</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dumpcake;