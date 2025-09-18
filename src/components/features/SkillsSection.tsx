import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Zap, Globe, Smartphone, Server, Brain } from 'lucide-react';
import { Card, CardContent, Tag } from '@/components/ui';
import { Skill } from '@/types';

interface SkillsSectionProps {
  className?: string;
}

/**
 * 技能展示组件
 * 展示技术技能、工具和专业能力
 */
const SkillsSection: React.FC<SkillsSectionProps> = ({ className = '' }) => {
  const [activeCategory, setActiveCategory] = useState<string>('frontend');

  // 技能分类
  const skillCategories = [
    {
      id: 'frontend',
      name: '前端开发',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      description: '现代前端技术栈'
    },
    {
      id: 'backend',
      name: '后端开发',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      description: '服务端技术与架构'
    },
    {
      id: 'ai',
      name: 'AI & 机器学习',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      description: '人工智能与数据科学'
    },
    {
      id: 'mobile',
      name: '移动开发',
      icon: Smartphone,
      color: 'from-orange-500 to-red-500',
      description: '跨平台移动应用'
    },
    {
      id: 'database',
      name: '数据库',
      icon: Database,
      color: 'from-indigo-500 to-purple-500',
      description: '数据存储与管理'
    },
    {
      id: 'tools',
      name: '开发工具',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      description: '开发效率工具'
    }
  ];

  // 技能数据
  const skillsData: Record<string, Skill[]> = {
    frontend: [
      { name: 'React', level: 95, category: 'frontend', description: '现代前端框架，组件化开发', years: 4 },
      { name: 'TypeScript', level: 90, category: 'frontend', description: '类型安全的JavaScript超集', years: 3 },
      { name: 'Next.js', level: 85, category: 'frontend', description: '全栈React框架', years: 2 },
      { name: 'Vue.js', level: 80, category: 'frontend', description: '渐进式前端框架', years: 2 },
      { name: 'Tailwind CSS', level: 90, category: 'frontend', description: '实用优先的CSS框架', years: 2 },
      { name: 'Sass/SCSS', level: 85, category: 'frontend', description: 'CSS预处理器', years: 3 },
      { name: 'Webpack', level: 75, category: 'frontend', description: '模块打包工具', years: 3 },
      { name: 'Vite', level: 80, category: 'frontend', description: '现代前端构建工具', years: 1 }
    ],
    backend: [
      { name: 'Node.js', level: 85, category: 'backend', description: 'JavaScript运行时环境', years: 3 },
      { name: 'Python', level: 95, category: 'backend', description: '多用途编程语言', years: 5 },
      { name: 'FastAPI', level: 90, category: 'backend', description: '现代Python Web框架', years: 2 },
      { name: 'Express.js', level: 80, category: 'backend', description: 'Node.js Web框架', years: 3 },
      { name: 'Django', level: 75, category: 'backend', description: 'Python Web框架', years: 2 },
      { name: 'GraphQL', level: 70, category: 'backend', description: 'API查询语言', years: 1 },
      { name: 'REST API', level: 90, category: 'backend', description: 'RESTful API设计', years: 4 },
      { name: 'Microservices', level: 75, category: 'backend', description: '微服务架构', years: 2 }
    ],
    ai: [
      { name: 'LLM开发', level: 90, category: 'ai-ml', description: '大语言模型应用开发', years: 2 },
      { name: 'OpenAI API', level: 85, category: 'ai-ml', description: 'OpenAI接口集成', years: 1 },
      { name: 'LangChain', level: 80, category: 'ai-ml', description: 'LLM应用开发框架', years: 1 },
      { name: 'TensorFlow', level: 75, category: 'ai-ml', description: '机器学习框架', years: 2 },
      { name: 'PyTorch', level: 80, category: 'ai-ml', description: '深度学习框架', years: 2 },
      { name: 'Scikit-learn', level: 85, category: 'ai-ml', description: '机器学习库', years: 3 },
      { name: 'Pandas', level: 90, category: 'ai-ml', description: '数据分析库', years: 4 },
      { name: 'NumPy', level: 85, category: 'ai-ml', description: '科学计算库', years: 4 }
    ],
    mobile: [
      { name: 'React Native', level: 80, category: 'other', description: '跨平台移动开发', years: 2 },
      { name: 'Flutter', level: 70, category: 'other', description: 'Google移动UI框架', years: 1 },
      { name: 'Expo', level: 75, category: 'other', description: 'React Native开发平台', years: 2 },
      { name: 'iOS Development', level: 60, category: 'other', description: 'iOS原生开发', years: 1 },
      { name: 'Android Development', level: 65, category: 'other', description: 'Android原生开发', years: 1 }
    ],
    database: [
      { name: 'PostgreSQL', level: 85, category: 'backend', description: '关系型数据库', years: 3 },
      { name: 'MongoDB', level: 80, category: 'backend', description: 'NoSQL文档数据库', years: 2 },
      { name: 'Redis', level: 75, category: 'backend', description: '内存数据库', years: 2 },
      { name: 'MySQL', level: 80, category: 'backend', description: '关系型数据库', years: 4 },
      { name: 'SQLite', level: 85, category: 'backend', description: '轻量级数据库', years: 3 },
      { name: 'Prisma', level: 75, category: 'tools', description: '现代数据库工具', years: 1 }
    ],
    tools: [
      { name: 'Git', level: 90, category: 'tools', description: '版本控制系统', years: 5 },
      { name: 'Docker', level: 80, category: 'tools', description: '容器化技术', years: 2 },
      { name: 'Kubernetes', level: 70, category: 'tools', description: '容器编排平台', years: 1 },
      { name: 'AWS', level: 75, category: 'tools', description: '云计算平台', years: 2 },
      { name: 'Vercel', level: 85, category: 'tools', description: '前端部署平台', years: 2 },
      { name: 'GitHub Actions', level: 80, category: 'tools', description: 'CI/CD工具', years: 2 },
      { name: 'VS Code', level: 95, category: 'tools', description: '代码编辑器', years: 5 },
      { name: 'Figma', level: 70, category: 'tools', description: 'UI设计工具', years: 2 }
    ]
  };

  // 获取技能等级颜色
  const getSkillLevelColor = (level: number) => {
    if (level >= 90) return 'from-green-500 to-emerald-500';
    if (level >= 80) return 'from-blue-500 to-cyan-500';
    if (level >= 70) return 'from-yellow-500 to-orange-500';
    return 'from-gray-500 to-gray-600';
  };

  // 获取技能等级文本
  const getSkillLevelText = (level: number) => {
    if (level >= 90) return '专家';
    if (level >= 80) return '熟练';
    if (level >= 70) return '良好';
    return '基础';
  };

  return (
    <section id="skills" className={`py-20 bg-dark-bg ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            技能专长
          </h2>
          <p className="text-lg text-dark-text-secondary max-w-2xl mx-auto">
            掌握的技术栈和工具，持续学习和提升专业能力
          </p>
        </motion.div>

        {/* 技能分类导航 */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-4 rounded-xl border transition-all duration-300 text-center group ${
                  activeCategory === category.id
                    ? 'bg-primary-500/20 border-primary-500 shadow-lg'
                    : 'bg-dark-card border-dark-border hover:border-primary-400/50'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <IconComponent size={24} className="text-white" />
                </div>
                <h3 className={`font-semibold text-sm mb-1 transition-colors duration-200 ${
                  activeCategory === category.id ? 'text-primary-400' : 'text-dark-text-primary group-hover:text-primary-400'
                }`}>
                  {category.name}
                </h3>
                <p className="text-xs text-dark-text-secondary">
                  {category.description}
                </p>
              </motion.button>
            );
          })}
        </motion.div>

        {/* 技能详情 */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData[activeCategory]?.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <Card 
                  variant="glass" 
                  className="p-6 h-full hover:shadow-lg transition-all duration-300 group"
                  interactive
                >
                  <CardContent className="space-y-4">
                    {/* 技能名称和等级 */}
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-dark-text-primary group-hover:text-primary-400 transition-colors duration-200">
                        {skill.name}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Tag 
                          variant="default" 
                          size="sm"
                          className={`bg-gradient-to-r ${getSkillLevelColor(skill.level)} text-white border-none`}
                        >
                          {getSkillLevelText(skill.level)}
                        </Tag>
                        <span className="text-sm font-medium text-dark-text-secondary">
                          {skill.level}%
                        </span>
                      </div>
                    </div>

                    {/* 进度条 */}
                    <div className="space-y-2">
                      <div className="w-full bg-dark-border rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full bg-gradient-to-r ${getSkillLevelColor(skill.level)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ delay: 0.3 + index * 0.05, duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                    </div>

                    {/* 技能描述 */}
                    <p className="text-sm text-dark-text-secondary">
                      {skill.description}
                    </p>

                    {/* 经验年限 */}
                    <div className="flex items-center justify-between text-xs text-dark-text-secondary">
                      <span>经验年限</span>
                      <span className="font-medium">{skill.years} 年</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 技能统计 */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { label: '掌握技术', value: '30+', icon: Code },
            { label: '项目经验', value: '50+', icon: Globe },
            { label: '开发年限', value: '5+', icon: Zap },
            { label: '持续学习', value: '∞', icon: Brain }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card variant="glass" className="p-6 hover:shadow-lg transition-all duration-300">
                  <CardContent className="space-y-3">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-primary-500 to-success-500 rounded-lg flex items-center justify-center">
                      <IconComponent size={24} className="text-white" />
                    </div>
                    <motion.div
                      className="text-2xl font-bold gradient-text"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5, type: 'spring' }}
                      viewport={{ once: true }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-dark-text-secondary">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;