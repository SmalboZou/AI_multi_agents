// 基础类型定义
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// 文章类型
export interface Article extends BaseEntity {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  category: string;
  readTime: number;
  published: boolean;
  featured: boolean;
  views: number;
  likes: number;
}

// 项目类型
export interface Project extends BaseEntity {
  name: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  imageUrl?: string;
  images?: string[];
  technologies: string[];
  features?: string[];
  githubUrl?: string;
  demoUrl?: string;
  liveUrl?: string;
  status: 'completed' | 'in-progress' | 'planned';
  featured: boolean;
  category: string;
  startDate?: string;
  endDate?: string;
}

// 技能类型
export interface Skill {
  name: string;
  level: number; // 1-5
  category: 'frontend' | 'backend' | 'ai-ml' | 'tools' | 'other';
  icon?: string;
  description?: string;
  years?: number;
}

// 技能分类
export interface SkillCategory {
  name: string;
  skills: Skill[];
  icon: string;
  description: string;
}

// 工作经验类型
export interface Experience {
  id: string;
  company: string;
  position: string;
  title: string;
  duration: string;
  period: string;
  description: string;
  technologies?: string[];
  achievements?: string[];
}

// 个人信息类型
export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  description: string;
  avatar: string;
  email: string;
  location: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  resume?: string;
  socialLinks: SocialLink[];
}

// 导航项类型
export interface NavItem {
  name: string;
  href: string;
  icon?: string;
  external?: boolean;
}

// 社交链接类型
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color?: string;
}

// 主题类型
export type Theme = 'light' | 'dark';

// 组件Props基础类型
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// 按钮变体类型
export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

// 卡片变体类型
export type CardVariant = 'default' | 'hover' | 'glass';

// 动画类型
export interface AnimationProps {
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

// API响应类型
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

// 分页类型
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// 搜索参数类型
export interface SearchParams {
  query?: string;
  category?: string;
  tags?: string[];
  sortBy?: 'date' | 'title' | 'views' | 'likes';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// 表单验证错误类型
export interface FormError {
  field: string;
  message: string;
}

// 联系表单类型
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// 评论类型
export interface Comment extends BaseEntity {
  articleId: string;
  author: string;
  email: string;
  content: string;
  approved: boolean;
  parentId?: string;
  replies?: Comment[];
}

// SEO元数据类型
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

// 统计数据类型
export interface Statistics {
  totalArticles: number;
  totalProjects: number;
  totalViews: number;
  totalLikes: number;
  monthlyViews: number[];
  popularTags: { name: string; count: number }[];
}