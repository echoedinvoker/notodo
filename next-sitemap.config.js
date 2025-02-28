/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // 網站 URL
  siteUrl: 'https://notodo.live',
  
  // 生成 robots.txt
  generateRobotsTxt: true,
  
  // 啟用 App Router 支持
  useAppDir: true,
  
  // 源目錄和輸出目錄
  sourceDir: '.next',
  outDir: 'public',
  
  // 排除所有動態用戶路由和私有頁面
  exclude: [
    '/api/*',
    '/[userId]/*',  // 排除所有用戶相關頁面
    '/[userId]',    // 排除用戶主頁
  ],
  
  // robots.txt 配置 - 阻止爬蟲訪問用戶頁面
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*',
          '/[userId]/*',  // 阻止爬蟲訪問用戶頁面
          '/[userId]',    // 阻止爬蟲訪問用戶主頁
        ],
      },
    ],
  },
  
  // 默認更新頻率和優先級
  changefreq: 'daily',
  priority: 0.7,
  
  // 只添加公開頁面
  additionalPaths: async (config) => {
    return [
      // 主頁/登陸頁
      { loc: '/', changefreq: 'daily', priority: 1.0 },
      
      // 其他公開頁面（如果有）
      // { loc: '/about', changefreq: 'weekly', priority: 0.8 },
      // { loc: '/features', changefreq: 'weekly', priority: 0.8 },
      // { loc: '/pricing', changefreq: 'monthly', priority: 0.8 },
      // { loc: '/faq', changefreq: 'monthly', priority: 0.7 },
      // { loc: '/terms', changefreq: 'monthly', priority: 0.6 },
      // { loc: '/privacy', changefreq: 'monthly', priority: 0.6 },
    ];
  },
  
  // 簡化的轉換器
  transform: async (config, path) => {
    // 只為主頁設置高優先級
    let priority = config.priority;
    if (path === '/') {
      priority = 1.0;
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs || [],
    };
  },
};
