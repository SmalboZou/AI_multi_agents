import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChevronDown, Download, Mail, Github, Linkedin, Code, Sparkles } from 'lucide-react';
import { Button, Tag } from '@/components/ui';
import { PersonalInfo } from '@/types';

interface HeroSectionProps {
  className?: string;
  onNavigate?: (sectionId: string) => void;
}

/**
 * 英雄区组件
 * 展示个人介绍、核心技能和联系方式
 */
const HeroSection: React.FC<HeroSectionProps> = ({ className = '', onNavigate }) => {
  const [currentRole, setCurrentRole] = useState(0);
  const controls = useAnimation();

  // 个人信息数据
  const personalInfo: PersonalInfo = {
    name: 'AI Developer',
    title: '大模型开发工程师',
    bio: '专注于人工智能技术研发的开发工程师',
    description: '专注于人工智能技术研发，擅长大语言模型应用开发与前端技术创新。致力于用AI技术解决实际问题，创造更智能的用户体验。',
    location: '中国·北京',
    email: 'contact@example.com',
    avatar: '/avatar.jpg',
    socialLinks: [
      {
        name: 'GitHub',
        url: 'https://github.com',
        icon: 'github',
        color: 'hover:text-gray-400'
      },
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com',
        icon: 'linkedin',
        color: 'hover:text-blue-400'
      },
      {
        name: 'Email',
        url: 'mailto:contact@example.com',
        icon: 'mail',
        color: 'hover:text-green-400'
      }
    ]
  };

  // 角色轮播
  const roles = [
    '大模型开发工程师',
    'AI技术专家',
    '前端开发工程师',
    '全栈开发者'
  ];

  // 核心技能标签
  const coreSkills = [
    'LLM开发',
    'React',
    'TypeScript',
    'Python',
    'AI应用',
    'Node.js'
  ];

  // 统计数据
  const stats = [
    { label: '项目经验', value: '50+', suffix: '' },
    { label: '技术文章', value: '100+', suffix: '' },
    { label: '开发经验', value: '5+', suffix: '年' },
    { label: 'GitHub Stars', value: '1K+', suffix: '' }
  ];

  // 角色轮播效果
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  // 页面加载动画
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    });
  }, [controls]);

  // 滚动到下一部分
  const scrollToNext = () => {
    if (onNavigate) {
      onNavigate('about');
    } else {
      const nextSection = document.querySelector('#about');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // 获取社交图标
  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return Github;
      case 'linkedin':
        return Linkedin;
      case 'mail':
        return Mail;
      default:
        return Github;
    }
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-surface to-dark-bg">
        {/* 动态粒子背景 */}
        <div className="absolute inset-0 particle-bg opacity-30"></div>
        
        {/* 渐变光效 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-success-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-warning-500/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 左侧：个人信息 */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
          >
            {/* 问候语 */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-dark-card/50 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-dark-border"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Sparkles size={16} className="text-primary-400" />
              <span className="text-sm text-dark-text-secondary">欢迎来到我的技术世界</span>
            </motion.div>

            {/* 姓名 */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="gradient-text">你好，我是</span>
              <br />
              <span className="text-dark-text-primary">{personalInfo.name}</span>
            </motion.h1>

            {/* 动态角色 */}
            <motion.div
              className="text-xl sm:text-2xl text-dark-text-secondary mb-6 h-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.span
                key={currentRole}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                {roles[currentRole]}
              </motion.span>
            </motion.div>

            {/* 个人描述 */}
            <motion.p
              className="text-lg text-dark-text-secondary mb-8 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {personalInfo.description}
            </motion.p>

            {/* 核心技能标签 */}
            <motion.div
              className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {coreSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                >
                  <Tag variant="primary" size="sm">
                    {skill}
                  </Tag>
                </motion.div>
              ))}
            </motion.div>

            {/* 行动按钮 */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Button
                variant="primary"
                size="lg"
                icon={<Mail size={20} />}
                className="group"
                onClick={() => window.open(`mailto:${personalInfo.email}`, '_blank')}
              >
                联系我
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                icon={<Download size={20} />}
                className="group"
              >
                下载简历
              </Button>
            </motion.div>

            {/* 社交链接 */}
            <motion.div
              className="flex space-x-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {personalInfo.socialLinks.map((social, index) => {
                const IconComponent = getSocialIcon(social.icon);
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-dark-card/50 backdrop-blur-sm rounded-lg text-dark-text-secondary transition-all duration-200 ${social.color} hover:scale-110 hover:shadow-lg border border-dark-border`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <IconComponent size={20} />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* 右侧：统计数据和视觉元素 */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* 头像区域 */}
            <div className="relative mb-8">
              <motion.div
                className="w-64 h-64 mx-auto relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                {/* 装饰圆环 */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-400/30"></div>
                <div className="absolute inset-4 rounded-full border border-success-400/20"></div>
              </motion.div>
              
              {/* 头像 */}
              <motion.div
                className="absolute inset-8 bg-gradient-to-br from-primary-500 to-success-500 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Code size={80} className="text-white" />
              </motion.div>

              {/* 浮动技能图标 */}
              <motion.div
                className="absolute -top-4 -right-4 bg-primary-500 rounded-full p-3 shadow-lg"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles size={20} className="text-white" />
              </motion.div>
            </div>

            {/* 统计数据网格 */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-dark-card/50 backdrop-blur-sm rounded-xl p-6 border border-dark-border hover:border-primary-400/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="text-center">
                    <motion.div
                      className="text-2xl font-bold gradient-text mb-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.3 + index * 0.1, duration: 0.5, type: 'spring' }}
                    >
                      {stat.value}{stat.suffix}
                    </motion.div>
                    <div className="text-sm text-dark-text-secondary">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 滚动提示 */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.button
          onClick={scrollToNext}
          className="flex flex-col items-center space-y-2 text-dark-text-secondary hover:text-primary-400 transition-colors duration-200"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm">了解更多</span>
          <ChevronDown size={20} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;