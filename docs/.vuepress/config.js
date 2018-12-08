module.exports = {
  title: 'btt.js',
  base: '/btt/guide/',
  description: 'BetterTouchTool MacOS automation in JS',
  themeConfig: {
    nav: [
      { text: 'API', link: 'https://worie.github.io/btt/api' },
      { text: 'Guide', link: '/introduction' },
      { text: 'Staying secure', link: 'https://worie.github.io/btt/guide/getting-started.html#staying-secure'},
      { text: 'Community forum', link: 'https://community.folivora.ai/' },
    ],
    sidebar: [
      '/introduction',
      '/getting-started',
      '/configuration',
      '/actions',
      '/events',
      '/variables',
      '/triggers',
      '/widgets',
      '/web-view',
      '/community',
    ],
  },
  head: [
    ['script', { src: 'btt.js'}]
  ],
  dest: 'dist/docs/guide'
}