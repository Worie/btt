module.exports = {
  title: 'btt.js',
  base: 'btt/guide/',
  // base: '/docs/dist',
  description: 'BetterTouchTool MacOS automation in JS',
  // themeConfig: {
  nav: [
    { text: 'API', link: '/api' },
    { text: 'Guide', link: '/guide' },
    { text: 'Staying secure', link: '/stay-secure'},
    { text: 'Community forum', link: 'https://community.folivora.ai/' },
  ],
  sidebar: [
    '/guide/introduction',
    '/guide/getting-started',
    '/guide/configuration',
    '/guide/actions',
    '/guide/events',
    '/guide/variables',
    '/guide/triggers',
    '/guide/widgets',
    '/guide/web-view',
    '/guide/community',
  ],
  head: [
    ['script', { src: 'btt.js'}]
  ],
  dest: '../dist/docs/guide'
}