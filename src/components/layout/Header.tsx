import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Github, Linkedin, Mail } from 'lucide-react';
import { NavItem } from '@/types';

interface HeaderProps {
  className?: string;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
  onNavigate?: (sectionId: string) => void;
  scrollY?: number;
}

/**
 * 网站头部导航组件
 * 包含Logo、导航菜单、主题切换和移动端菜单
 */
const Header: React.FC<HeaderProps> = ({ 
  className = '',
  isDarkMode = true,
  onThemeToggle,
  onNavigate,
  scrollY = 0
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // 导航菜单项
  const navItems: NavItem[] = [
    { name: '首页', href: '#home' },
    { name: '关于', href: '#about' },
    { name: '文章', href: '#articles' },
    { name: '项目', href: '#projects' },
    { name: '技能', href: '#skills' },
    { name: '联系', href: '#contact' }
  ];

  // 社交链接
  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com', color: 'hover:text-gray-400' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', color: 'hover:text-blue-400' },
    { name: 'Email', icon: Mail, href: 'mailto:contact@example.com', color: 'hover:text-green-400' }
  ];

  // 监听滚动事件
  useEffect(() => {
    setIsScrolled(scrollY > 50);
  }, [scrollY]);

  useEffect(() => {
    const handleScroll = () => {
      
      // 检测当前活跃的部分
      const sections = navItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  // 切换主题
  const toggleTheme = () => {
    if (onThemeToggle) {
      onThemeToggle();
    }
  };

  // 平滑滚动到指定部分
  const scrollToSection = (href: string) => {
    const sectionId = href.substring(1);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  // 头部样式类
  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled 
      ? 'glass border-b border-dark-border/50' 
      : 'bg-transparent'
  } ${className}`;

  return (
    <motion.header
      className={headerClasses}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity"
            >
              DevBlog
            </a>
          </motion.div>

          {/* 桌面端导航菜单 */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    isActive 
                      ? 'text-primary-400' 
                      : 'text-dark-text-secondary hover:text-dark-text-primary'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>

          {/* 右侧操作区 */}
          <div className="flex items-center space-x-4">
            {/* 社交链接 - 桌面端 */}
            <div className="hidden lg:flex items-center space-x-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 text-dark-text-secondary transition-colors ${social.color}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.name}
                  >
                    <IconComponent size={18} />
                  </motion.a>
                );
              })}
            </div>

            {/* 主题切换按钮 */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 text-dark-text-secondary hover:text-dark-text-primary transition-colors"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              aria-label="切换主题"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* 移动端菜单按钮 */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-dark-text-secondary hover:text-dark-text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="切换菜单"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden glass border-t border-dark-border/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 py-6 space-y-4">
              {/* 移动端导航菜单 */}
              <nav className="space-y-3">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive 
                          ? 'text-primary-400 bg-primary-500/10' 
                          : 'text-dark-text-secondary hover:text-dark-text-primary hover:bg-dark-border/20'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.a>
                  );
                })}
              </nav>

              {/* 移动端社交链接 */}
              <div className="pt-4 border-t border-dark-border">
                <div className="flex justify-center space-x-6">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 text-dark-text-secondary transition-colors ${social.color}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (navItems.length + index) * 0.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={social.name}
                      >
                        <IconComponent size={20} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;