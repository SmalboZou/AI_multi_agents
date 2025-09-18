import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Play, Code, Smartphone, Globe, Database, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Tag } from '@/components/ui';
import { Project } from '@/types';

interface ProjectsSectionProps {
  className?: string;
}

/**
 * 项目展示组件
 * 展示开发项目和作品集
 */
const ProjectsSection: React.FC<ProjectsSectionProps> = ({ className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 项目分类
  const categories = [
    { id: 'all', name: '全部项目', icon: Code },
    { id: 'ai', name: 'AI应用', icon: Zap },
    { id: 'web', name: 'Web应用', icon: Globe },
    { id: 'mobile', name: '移动应用', icon: Smartphone },
    { id: 'backend', name: '后端服务', icon: Database }
  ];

  // 项目数据
  const projects: Project[] = [
    {
      id: '1',
      name: 'AI智能对话助手',
      title: 'AI智能对话助手',
      description: '基于大语言模型的智能对话系统，支持多轮对话、上下文理解和个性化回复。集成了先进的NLP技术和用户友好的界面设计。',
      category: 'ai',
      image: '/projects/ai-chat.jpg',
      imageUrl: '/projects/ai-chat.jpg',
      technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'OpenAI API'],
      features: [
        '多轮对话支持',
        '上下文记忆',
        '个性化回复',
        '实时流式输出',
        '多语言支持'
      ],
      status: 'completed',
      startDate: '2023-10-01',
      endDate: '2024-01-15',
      githubUrl: 'https://github.com/example/ai-chat',
      liveUrl: 'https://ai-chat.example.com',
      featured: true,
      createdAt: new Date('2023-10-01'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: '现代化博客平台',
      title: '现代化博客平台',
      description: '使用Next.js和TypeScript构建的现代化博客平台，支持Markdown编辑、SEO优化和响应式设计。',
      category: 'web',
      image: '/projects/blog-platform.jpg',
      imageUrl: '/projects/blog-platform.jpg',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
      features: [
        'Markdown编辑器',
        'SEO优化',
        '响应式设计',
        '评论系统',
        '标签分类'
      ],
      status: 'completed',
      startDate: '2023-08-01',
      endDate: '2023-11-30',
      githubUrl: 'https://github.com/example/blog-platform',
      liveUrl: 'https://blog.example.com',
      featured: true,
      createdAt: new Date('2023-08-01'),
      updatedAt: new Date('2023-11-30')
    },
    {
      id: '3',
      name: '任务管理应用',
      title: '任务管理应用',
      description: '功能丰富的任务管理应用，支持项目协作、时间跟踪和进度可视化。采用现代化的UI设计和流畅的用户体验。',
      category: 'web',
      image: '/projects/task-manager.jpg',
      imageUrl: '/projects/task-manager.jpg',
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io'],
      features: [
        '项目协作',
        '时间跟踪',
        '进度可视化',
        '实时通知',
        '团队管理'
      ],
      status: 'completed',
      startDate: '2023-06-01',
      endDate: '2023-09-15',
      githubUrl: 'https://github.com/example/task-manager',
      liveUrl: 'https://tasks.example.com',
      featured: false,
      createdAt: new Date('2023-06-01'),
      updatedAt: new Date('2023-09-15')
    },
    {
      id: '4',
      name: 'API网关服务',
      title: 'API网关服务',
      description: '高性能的API网关服务，提供请求路由、负载均衡、认证授权和监控功能。支持微服务架构和容器化部署。',
      category: 'backend',
      image: '/projects/api-gateway.jpg',
      imageUrl: '/projects/api-gateway.jpg',
      technologies: ['Node.js', 'Express', 'Redis', 'Docker', 'Kubernetes'],
      features: [
        '请求路由',
        '负载均衡',
        '认证授权',
        '监控告警',
        '容器化部署'
      ],
      status: 'completed',
      startDate: '2023-04-01',
      endDate: '2023-07-30',
      githubUrl: 'https://github.com/example/api-gateway',
      liveUrl: '',
      featured: false,
      createdAt: new Date('2023-04-01'),
      updatedAt: new Date('2023-07-30')
    },
    {
      id: '5',
      name: '代码生成工具',
      title: '代码生成工具',
      description: '基于AI的代码生成工具，支持多种编程语言和框架。通过自然语言描述生成高质量的代码片段。',
      category: 'ai',
      image: '/projects/code-generator.jpg',
      imageUrl: '/projects/code-generator.jpg',
      technologies: ['Python', 'FastAPI', 'Vue.js', 'OpenAI API', 'Docker'],
      features: [
        '多语言支持',
        '自然语言输入',
        '代码优化',
        '模板管理',
        'API集成'
      ],
      status: 'in-progress',
      startDate: '2024-01-01',
      endDate: '',
      githubUrl: 'https://github.com/example/code-generator',
      liveUrl: '',
      featured: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date()
    },
    {
      id: '6',
      name: '移动端记账应用',
      title: '移动端记账应用',
      description: '简洁易用的移动端记账应用，支持多账户管理、分类统计和数据可视化。采用React Native开发。',
      category: 'mobile',
      image: '/projects/expense-tracker.jpg',
      imageUrl: '/projects/expense-tracker.jpg',
      technologies: ['React Native', 'TypeScript', 'SQLite', 'Chart.js'],
      features: [
        '多账户管理',
        '分类统计',
        '数据可视化',
        '离线同步',
        '预算管理'
      ],
      status: 'completed',
      startDate: '2023-03-01',
      endDate: '2023-06-15',
      githubUrl: 'https://github.com/example/expense-tracker',
      liveUrl: '',
      featured: false,
      createdAt: new Date('2023-03-01'),
      updatedAt: new Date('2023-06-15')
    }
  ];

  // 筛选项目
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      completed: 'bg-success-500/20 text-success-400 border-success-500/30',
      in_progress: 'bg-warning-500/20 text-warning-400 border-warning-500/30',
      planned: 'bg-info-500/20 text-info-400 border-info-500/30'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  // 获取状态文本
  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      completed: '已完成',
      in_progress: '进行中',
      planned: '计划中'
    };
    return texts[status] || '未知';
  };

  return (
    <section id="projects" className={`py-20 bg-dark-surface ${className}`}>
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
            项目展示
          </h2>
          <p className="text-lg text-dark-text-secondary max-w-2xl mx-auto">
            精选的开发项目和技术作品，展示创新思维和技术实力
          </p>
        </motion.div>

        {/* 分类筛选 */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg border transition-all duration-200 flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white border-primary-500 shadow-lg'
                    : 'bg-dark-card border-dark-border text-dark-text-secondary hover:border-primary-400 hover:text-primary-400'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconComponent size={18} />
                <span>{category.name}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* 项目网格 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={project.featured ? 'lg:col-span-2' : ''}
            >
              <Card 
                variant="glass" 
                className="h-full group hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className={`grid ${project.featured ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-0`}>
                  {/* 项目图片/图标 */}
                  <div className="relative h-64 bg-gradient-to-br from-primary-500/20 to-success-500/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Code size={64} className="text-white/60" />
                    </div>
                    
                    {/* 状态标签 */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(project.status)}`}>
                        {getStatusText(project.status)}
                      </span>
                    </div>
                    
                    {/* 特色标签 */}
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <Tag variant="primary" size="sm">
                          精选项目
                        </Tag>
                      </div>
                    )}
                    
                    {/* 快速操作 */}
                    <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {project.githubUrl && (
                        <Button
                          variant="primary"
                          size="sm"
                          icon={<Github size={16} />}
                          className="bg-black/50 backdrop-blur-sm"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                        />
                      )}
                      {project.liveUrl && (
                        <Button
                          variant="primary"
                          size="sm"
                          icon={<ExternalLink size={16} />}
                          className="bg-black/50 backdrop-blur-sm"
                          onClick={() => window.open(project.liveUrl, '_blank')}
                        />
                      )}
                    </div>
                  </div>

                  {/* 项目信息 */}
                  <CardContent className="p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-xl group-hover:text-primary-400 transition-colors duration-200">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <p className="text-dark-text-secondary text-sm mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* 主要功能 */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-dark-text-primary mb-3">主要功能：</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.features?.slice(0, 4).map((feature, featureIndex) => (
                          <motion.div
                            key={feature}
                            className="flex items-center space-x-2 text-xs text-dark-text-secondary"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + featureIndex * 0.05, duration: 0.3 }}
                            viewport={{ once: true }}
                          >
                            <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* 技术栈 */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-dark-text-primary mb-3">技术栈：</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Tag key={tech} variant="default" size="sm">
                            {tech}
                          </Tag>
                        ))}
                      </div>
                    </div>
                    
                    {/* 项目链接 */}
                    <div className="flex space-x-3">
                      {project.githubUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<Github size={16} />}
                          onClick={() => window.open(project.githubUrl, '_blank')}
                          className="flex-1"
                        >
                          源码
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button
                          variant="primary"
                          size="sm"
                          icon={<Play size={16} />}
                          onClick={() => window.open(project.liveUrl, '_blank')}
                          className="flex-1"
                        >
                          演示
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 查看更多按钮 */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button
            variant="outline"
            size="lg"
            icon={<Github size={20} />}
            className="group"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            查看更多项目
            <motion.span
              className="ml-2"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;