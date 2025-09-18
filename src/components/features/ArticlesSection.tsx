import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Eye, ArrowRight, BookOpen, Filter } from 'lucide-react';
import { Card, CardTitle, CardContent, Button, Tag } from '@/components/ui';
import { Article } from '@/types';

interface ArticlesSectionProps {
  className?: string;
}

/**
 * 最新文章组件
 * 展示技术博客文章列表和分类筛选
 */
const ArticlesSection: React.FC<ArticlesSectionProps> = ({ className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 文章分类
  const categories = [
    { id: 'all', name: '全部', count: 12 },
    { id: 'ai', name: 'AI技术', count: 5 },
    { id: 'frontend', name: '前端开发', count: 4 },
    { id: 'backend', name: '后端开发', count: 2 },
    { id: 'tutorial', name: '教程', count: 1 }
  ];

  // 文章数据
  const articles: Article[] = [
    {
      id: '1',
      slug: 'deep-understanding-llm',
      title: '深入理解大语言模型的工作原理',
      excerpt: '探索LLM的核心机制，从Transformer架构到注意力机制，深入分析现代AI模型的工作原理和优化策略。',
      content: '',
      readTime: 8,
      views: 1250,
      likes: 45,
      category: 'ai',
      tags: ['LLM', 'Transformer', 'AI'],
      featured: true,
      published: true,
      coverImage: '/articles/llm-guide.jpg',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      slug: 'react-18-features',
      title: 'React 18 新特性详解与实战应用',
      excerpt: '全面解析React 18的并发特性、Suspense改进和新的Hooks，通过实际项目案例展示如何应用这些新特性。',
      content: '',
      readTime: 12,
      views: 980,
      likes: 32,
      category: 'frontend',
      tags: ['React', 'JavaScript', 'Frontend'],
      featured: true,
      published: true,
      coverImage: '/articles/react18.jpg',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: '3',
      slug: 'typescript-advanced-types',
      title: 'TypeScript 高级类型系统实践指南',
      excerpt: '深入探讨TypeScript的高级类型特性，包括条件类型、映射类型和模板字面量类型的实际应用场景。',
      content: '',
      readTime: 10,
      views: 756,
      likes: 28,
      category: 'frontend',
      tags: ['TypeScript', 'Types', 'JavaScript'],
      featured: false,
      published: true,
      coverImage: '/articles/typescript.jpg',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05')
    },
    {
      id: '4',
      slug: 'nodejs-api-performance',
      title: '构建高性能的Node.js API服务',
      excerpt: '分享Node.js API开发的最佳实践，包括性能优化、错误处理、安全防护和监控策略。',
      content: '',
      readTime: 15,
      views: 642,
      likes: 18,
      category: 'backend',
      tags: ['Node.js', 'API', 'Performance'],
      featured: false,
      published: true,
      coverImage: '/articles/nodejs-api.jpg',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: '5',
      slug: 'ai-code-generation-tool',
      title: 'AI驱动的代码生成工具开发实战',
      excerpt: '从零开始构建一个AI代码生成工具，涵盖模型选择、提示工程、代码解析和用户界面设计。',
      content: '',
      readTime: 20,
      views: 1100,
      likes: 52,
      category: 'ai',
      tags: ['AI', 'Code Generation', 'Tools'],
      featured: true,
      published: true,
      coverImage: '/articles/ai-codegen.jpg',
      createdAt: new Date('2023-12-28'),
      updatedAt: new Date('2023-12-28')
    },
    {
      id: '6',
      slug: 'tailwind-design-system',
      title: 'Tailwind CSS 最佳实践与设计系统',
      excerpt: '如何使用Tailwind CSS构建一致性的设计系统，包括组件库设计、主题定制和响应式布局策略。',
      content: '',
      readTime: 8,
      views: 520,
      likes: 15,
      category: 'frontend',
      tags: ['Tailwind CSS', 'Design System', 'CSS'],
      featured: false,
      published: true,
      coverImage: '/articles/tailwind.jpg',
      createdAt: new Date('2023-12-25'),
      updatedAt: new Date('2023-12-25')
    }
  ];

  // 筛选文章
  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  // 格式化日期
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 获取分类颜色
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      ai: 'bg-primary-500/20 text-primary-400 border-primary-500/30',
      frontend: 'bg-success-500/20 text-success-400 border-success-500/30',
      backend: 'bg-warning-500/20 text-warning-400 border-warning-500/30',
      tutorial: 'bg-info-500/20 text-info-400 border-info-500/30'
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <section id="articles" className={`py-20 bg-dark-bg ${className}`}>
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
            最新文章
          </h2>
          <p className="text-lg text-dark-text-secondary max-w-2xl mx-auto">
            分享技术见解、开发经验和行业趋势
          </p>
        </motion.div>

        {/* 分类筛选 */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full border transition-all duration-200 flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white border-primary-500'
                  : 'bg-dark-card border-dark-border text-dark-text-secondary hover:border-primary-400 hover:text-primary-400'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter size={14} />
              <span>{category.name}</span>
              <span className="bg-white/20 rounded-full px-2 py-0.5 text-xs">
                {category.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* 文章网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={article.featured ? 'md:col-span-2 lg:col-span-1' : ''}
            >
              <Card 
                variant="glass" 
                className="h-full group hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* 文章封面 */}
                <div className="relative h-48 bg-gradient-to-br from-primary-500/20 to-success-500/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen size={48} className="text-white/60" />
                  </div>
                  
                  {/* 特色标签 */}
                  {article.featured && (
                    <div className="absolute top-4 left-4">
                      <Tag variant="primary" size="sm">
                        精选
                      </Tag>
                    </div>
                  )}
                  
                  {/* 分类标签 */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(article.category)}`}>
                      {categories.find(cat => cat.id === article.category)?.name}
                    </span>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* 文章标题 */}
                  <CardTitle className="text-lg mb-3 group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
                    {article.title}
                  </CardTitle>
                  
                  {/* 文章摘要 */}
                  <p className="text-dark-text-secondary text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <Tag key={tag} variant="default" size="sm">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                  
                  {/* 文章元信息 */}
                  <div className="flex items-center justify-between text-xs text-dark-text-secondary mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>{formatDate(article.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{article.readTime} 分钟</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye size={12} />
                      <span>{article.views}</span>
                    </div>
                  </div>
                  
                  {/* 阅读按钮 */}
                  <Button
                    variant="text"
                    size="sm"
                    className="w-full justify-between group-hover:bg-primary-500/10 transition-colors duration-200"
                    icon={<ArrowRight size={16} />}
                    iconPosition="right"
                  >
                    阅读全文
                  </Button>
                </CardContent>
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
            icon={<BookOpen size={20} />}
            className="group"
          >
            查看所有文章
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

export default ArticlesSection;