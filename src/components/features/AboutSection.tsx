import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Calendar, Award, Target, Heart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Tag } from '@/components/ui';
import { Skill, Experience } from '@/types';

interface AboutSectionProps {
  className?: string;
}

/**
 * 关于我组件
 * 展示个人详细信息、技能和经历
 */
const AboutSection: React.FC<AboutSectionProps> = ({ className = '' }) => {
  // 个人信息
  const personalDetails = {
    location: '北京，中国',
    experience: '5+ 年开发经验',
    education: '计算机科学与技术',
    interests: ['人工智能', '开源项目', '技术写作', '产品设计']
  };

  // 技能数据
  const skillCategories: { category: string; skills: Skill[] }[] = [
    {
      category: 'AI & 机器学习',
      skills: [
        { name: 'LLM开发', level: 90, description: '大语言模型应用开发', category: 'ai-ml', icon: 'Brain', years: 3 },
        { name: 'Python', level: 95, description: 'AI开发主要语言', category: 'backend', icon: 'Code', years: 5 },
        { name: 'TensorFlow', level: 80, description: '深度学习框架', category: 'ai-ml', icon: 'Brain', years: 3 },
        { name: 'PyTorch', level: 85, description: '机器学习框架', category: 'ai-ml', icon: 'Brain', years: 3 }
      ]
    },
    {
      category: '前端开发',
      skills: [
        { name: 'React', level: 95, description: '现代前端框架', category: 'frontend', icon: 'Code', years: 4 },
        { name: 'TypeScript', level: 90, description: '类型安全的JavaScript', category: 'frontend', icon: 'Code', years: 3 },
        { name: 'Next.js', level: 85, description: '全栈React框架', category: 'frontend', icon: 'Globe', years: 2 },
        { name: 'Tailwind CSS', level: 90, description: '实用优先的CSS框架', category: 'frontend', icon: 'Palette', years: 3 }
      ]
    },
    {
      category: '后端开发',
      skills: [
        { name: 'Node.js', level: 85, description: 'JavaScript运行时', category: 'backend', icon: 'Server', years: 4 },
        { name: 'FastAPI', level: 80, description: '现代Python Web框架', category: 'backend', icon: 'Zap', years: 2 },
        { name: 'PostgreSQL', level: 75, description: '关系型数据库', category: 'backend', icon: 'Database', years: 3 },
        { name: 'Redis', level: 70, description: '内存数据库', category: 'backend', icon: 'Database', years: 2 }
      ]
    }
  ];

  // 工作经历
  const experiences: Experience[] = [
    {
      id: '1',
      company: 'AI科技公司',
      position: '高级AI工程师',
      title: '高级AI工程师',
      duration: '2022 - 至今',
      period: '2022 - 至今',
      description: '负责大语言模型应用开发，设计和实现智能对话系统，优化模型性能和用户体验。',
      technologies: ['Python', 'LLM', 'FastAPI', 'React'],
      achievements: [
        '开发了多个成功的AI应用产品',
        '优化模型推理性能提升40%',
        '建立了完整的AI开发工作流'
      ]
    },
    {
      id: '2',
      company: '互联网公司',
      position: '全栈开发工程师',
      title: '全栈开发工程师',
      duration: '2020 - 2022',
      period: '2020 - 2022',
      description: '负责Web应用的前后端开发，参与产品架构设计，优化系统性能和用户体验。',
      technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
      achievements: [
        '独立完成多个核心功能模块',
        '系统性能优化提升60%',
        '建立了代码规范和最佳实践'
      ]
    }
  ];

  // 个人价值观
  const values = [
    {
      icon: Target,
      title: '追求卓越',
      description: '不断学习新技术，追求代码质量和产品体验的完美'
    },
    {
      icon: Heart,
      title: '用户至上',
      description: '始终以用户需求为中心，创造有价值的产品和服务'
    },
    {
      icon: Award,
      title: '开源精神',
      description: '积极参与开源社区，分享知识和经验，回馈技术社区'
    }
  ];

  return (
    <section id="about" className={`py-20 bg-dark-surface ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            关于我
          </h2>
          <p className="text-lg text-dark-text-secondary max-w-2xl mx-auto">
            一个热爱技术、追求创新的开发者，专注于AI技术和前端开发
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：个人信息 */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {/* 基本信息卡片 */}
            <Card variant="glass" className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User size={20} className="text-primary-400" />
                  <span>基本信息</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin size={16} className="text-dark-text-secondary" />
                  <span className="text-dark-text-secondary">{personalDetails.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar size={16} className="text-dark-text-secondary" />
                  <span className="text-dark-text-secondary">{personalDetails.experience}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award size={16} className="text-dark-text-secondary" />
                  <span className="text-dark-text-secondary">{personalDetails.education}</span>
                </div>
              </CardContent>
            </Card>

            {/* 兴趣爱好 */}
            <Card variant="glass" className="p-6">
              <CardHeader>
                <CardTitle>兴趣爱好</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {personalDetails.interests.map((interest, index) => (
                    <motion.div
                      key={interest}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Tag variant="default" size="sm">
                        {interest}
                      </Tag>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 价值观 */}
            <div className="space-y-4">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    className="bg-dark-card/50 backdrop-blur-sm rounded-lg p-4 border border-dark-border hover:border-primary-400/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary-500/20 rounded-lg p-2 mt-1">
                        <IconComponent size={16} className="text-primary-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark-text-primary mb-1">
                          {value.title}
                        </h4>
                        <p className="text-sm text-dark-text-secondary">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* 右侧：技能和经历 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 技能展示 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-dark-text-primary mb-6">
                技能专长
              </h3>
              <div className="space-y-6">
                {skillCategories.map((category, categoryIndex) => (
                  <Card key={category.category} variant="glass" className="p-6">
                    <CardHeader>
                      <CardTitle>{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill.name}
                            className="space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.3 + categoryIndex * 0.1 + skillIndex * 0.05,
                              duration: 0.4
                            }}
                            viewport={{ once: true }}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-dark-text-primary">
                                {skill.name}
                              </span>
                              <span className="text-sm text-dark-text-secondary">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="w-full bg-dark-border rounded-full h-2">
                              <motion.div
                                className="bg-gradient-to-r from-primary-500 to-success-500 h-2 rounded-full"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{
                                  delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.05,
                                  duration: 0.8,
                                  ease: 'easeOut'
                                }}
                                viewport={{ once: true }}
                              />
                            </div>
                            <p className="text-xs text-dark-text-secondary">
                              {skill.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* 工作经历 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-dark-text-primary mb-6">
                工作经历
              </h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Card variant="glass" className="p-6 hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <CardTitle className="text-lg">{exp.title}</CardTitle>
                            <p className="text-primary-400 font-medium">{exp.company}</p>
                          </div>
                          <span className="text-sm text-dark-text-secondary mt-2 sm:mt-0">
                            {exp.period}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-dark-text-secondary">{exp.description}</p>
                        
                        {/* 技术栈 */}
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies?.map((tech: string) => (
                            <Tag key={tech} variant="default" size="sm">
                              {tech}
                            </Tag>
                          ))}
                        </div>
                        
                        {/* 主要成就 */}
                        <div>
                          <h5 className="font-medium text-dark-text-primary mb-2">主要成就：</h5>
                          <ul className="space-y-1">
                            {exp.achievements?.map((achievement: string, achIndex: number) => (
                              <li key={achIndex} className="text-sm text-dark-text-secondary flex items-start">
                                <span className="text-primary-400 mr-2">•</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;