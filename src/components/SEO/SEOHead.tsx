import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO头部组件接口
 */
export interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  siteName?: string;
  locale?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  canonicalUrl?: string;
  alternateUrls?: Array<{ href: string; hreflang: string }>;
  structuredData?: object;
}

/**
 * SEO头部组件
 * 提供完整的SEO元数据管理
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  title = '个人作品集',
  description = '展示我的技能、项目和经验的个人作品集网站',
  keywords = ['前端开发', 'React', 'TypeScript', '作品集', 'Web开发'],
  author = '开发者',
  image = '/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  siteName = '个人作品集',
  locale = 'zh-CN',
  twitterCard = 'summary_large_image',
  twitterSite,
  twitterCreator,
  noIndex = false,
  noFollow = false,
  canonicalUrl,
  alternateUrls = [],
  structuredData,
}) => {
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const keywordsString = keywords.join(', ');
  const robotsContent = `${noIndex ? 'noindex' : 'index'},${noFollow ? 'nofollow' : 'follow'}`;

  return (
    <Helmet>
      {/* 基础元数据 */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent} />
      
      {/* 视口和字符集 */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* 语言和地区 */}
      <meta httpEquiv="content-language" content={locale} />
      <html lang={locale} />
      
      {/* 规范URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* 替代语言版本 */}
      {alternateUrls.map((alt, index) => (
        <link
          key={index}
          rel="alternate"
          hrefLang={alt.hreflang}
          href={alt.href}
        />
      ))}
      
      {/* Open Graph 元数据 */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:alt" content={description} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}
      
      {/* Twitter Card 元数据 */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
      
      {/* 移动端优化 */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      
      {/* 主题颜色 */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      
      {/* 图标 */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* 结构化数据 */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* 预连接到外部资源 */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS预取 */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
    </Helmet>
  );
};

/**
 * 创建结构化数据的工具函数
 */
export const createStructuredData = {
  /**
   * 创建个人资料结构化数据
   */
  person: ({
    name,
    jobTitle,
    description,
    url,
    image,
    email,
    telephone,
    address,
    sameAs = [],
  }: {
    name: string;
    jobTitle?: string;
    description?: string;
    url?: string;
    image?: string;
    email?: string;
    telephone?: string;
    address?: string;
    sameAs?: string[];
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    ...(jobTitle && { jobTitle }),
    ...(description && { description }),
    ...(url && { url }),
    ...(image && { image }),
    ...(email && { email }),
    ...(telephone && { telephone }),
    ...(address && { address }),
    ...(sameAs.length > 0 && { sameAs }),
  }),

  /**
   * 创建网站结构化数据
   */
  website: ({
    name,
    url,
    description,
    author,
    inLanguage = 'zh-CN',
  }: {
    name: string;
    url: string;
    description?: string;
    author?: string;
    inLanguage?: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    ...(description && { description }),
    ...(author && { author: { '@type': 'Person', name: author } }),
    inLanguage,
  }),

  /**
   * 创建作品集结构化数据
   */
  portfolio: ({
    name,
    description,
    author,
    works = [],
  }: {
    name: string;
    description?: string;
    author: string;
    works?: Array<{
      name: string;
      description?: string;
      url?: string;
      image?: string;
      dateCreated?: string;
      technology?: string[];
    }>;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': '#portfolio',
    name,
    ...(description && { description }),
    author: {
      '@type': 'Person',
      name: author,
    },
    ...(works.length > 0 && {
      hasPart: works.map(work => ({
        '@type': 'CreativeWork',
        name: work.name,
        ...(work.description && { description: work.description }),
        ...(work.url && { url: work.url }),
        ...(work.image && { image: work.image }),
        ...(work.dateCreated && { dateCreated: work.dateCreated }),
        ...(work.technology && {
          about: work.technology.map(tech => ({
            '@type': 'Thing',
            name: tech,
          })),
        }),
        author: {
          '@type': 'Person',
          name: author,
        },
      })),
    }),
  }),

  /**
   * 创建面包屑导航结构化数据
   */
  breadcrumb: (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
};

export default SEOHead;