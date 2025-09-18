import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui';
import { SocialLink } from '@/types';

interface FooterProps {
  className?: string;
  onNavigate?: (sectionId: string) => void;
}

/**
 * 网站页脚组件
 * 包含社交链接、版权信息和回到顶部功能
 */
const Footer: React.FC<FooterProps> = ({ className = '', onNavigate }) => {
  // 社交链接数据
  const socialLinks: SocialLink[] = [
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
  ];

  // 快速链接
  const quickLinks = [
    { name: '关于我', href: '#about' },
    { name: '最新文章', href: '#articles' },
    { name: '项目展示', href: '#projects' },
    { name: '技能', href: '#skills' },
    { name: '联系我', href: '#contact' }
  ];

  // 技术栈链接
  const techLinks = [
    { name: 'React', href: 'https://reactjs.org' },
    { name: 'TypeScript', href: 'https://typescriptlang.org' },
    { name: 'Tailwind CSS', href: 'https://tailwindcss.com' },
    { name: 'Framer Motion', href: 'https://framer.com/motion' }
  ];

  // 回到顶部功能
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 平滑滚动到指定部分
  const scrollToSection = (href: string) => {
    if (onNavigate && href.startsWith('#')) {
      onNavigate(href.substring(1));
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // 获取社交图标组件
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
    <footer className={`bg-dark-surface border-t border-dark-border ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 主要内容区域 */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 个人信息 */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold gradient-text mb-4">
                大模型开发工程师
              </h3>
              <p className="text-dark-text-secondary mb-6 leading-relaxed max-w-md">
                专注于AI技术和前端开发，分享技术见解和项目经验。
                致力于用技术创造价值，用代码改变世界。
              </p>
              
              {/* 社交链接 */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = getSocialIcon(social.icon);
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-dark-card rounded-lg text-dark-text-secondary transition-all duration-200 ${social.color} hover:scale-110 hover:shadow-lg`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.name}
                    >
                      <IconComponent size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* 快速链接 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-dark-text-primary mb-4">
                快速导航
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-dark-text-secondary hover:text-primary-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* 技术栈 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-dark-text-primary mb-4">
                技术栈
              </h4>
              <ul className="space-y-3">
                {techLinks.map((tech, index) => (
                  <motion.li
                    key={tech.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={tech.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark-text-secondary hover:text-primary-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {tech.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* 分割线 */}
        <div className="border-t border-dark-border"></div>

        {/* 底部版权信息 */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* 版权信息 */}
            <motion.div
              className="flex items-center space-x-2 text-dark-text-secondary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span>© 2024 DevBlog. Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <Heart size={16} className="text-red-400" fill="currentColor" />
              </motion.div>
              <span>by AI Developer</span>
            </motion.div>

            {/* 回到顶部按钮 */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Button
                variant="text"
                size="sm"
                onClick={scrollToTop}
                icon={<ArrowUp size={16} />}
                className="text-dark-text-secondary hover:text-primary-400"
              >
                回到顶部
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-success-500/5 rounded-full blur-2xl"></div>
      </div>
    </footer>
  );
};

export default Footer;