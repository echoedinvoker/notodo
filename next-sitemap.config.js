/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://notodo.live',
  generateRobotsTxt: true,
  // 排除不需要索引的路徑
  exclude: [
    '/api/*',
    '*/delete/*',
    '*/edit/*',
    '*/create/*',
    '*/giveup/*',
  ],
  // 設定機器人規則
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*',
          '*/delete/*',
          '*/edit/*',
          '*/create/*',
          '*/giveup/*',
        ],
      },
    ],
  },
  // 設定更新頻率和優先級
  changefreq: 'daily',
  priority: 0.7,
  // 自訂轉換器，可以根據路徑調整優先級
  transform: async (config, path) => {
    // 為主要頁面設定更高優先級
    let priority = config.priority;
    if (path === '/') {
      priority = 1.0;
    } else if (path.match(/^\/[^\/]+\/?$/)) {
      // 用戶主頁
      priority = 0.9;
    } else if (path.match(/^\/[^\/]+\/notodo\/?$/)) {
      // Notodo 列表頁
      priority = 0.8;
    } else if (path.match(/^\/[^\/]+\/reward\/?$/)) {
      // 獎勵列表頁
      priority = 0.8;
    } else if (path.match(/^\/[^\/]+\/achievement\/?$/)) {
      // 成就列表頁
      priority = 0.8;
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
