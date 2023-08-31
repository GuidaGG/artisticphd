export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Artistic PhD HFk Bremen',
    lang: 'en',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      //remove on production
      { name: 'robots', content: 'noindex'},
      { name: 'AdsBot-Google', content: 'noindex'},
      { hid: 'og:image', property: 'og:image', content: "/image.png" },
      { hid: 'og:title', property: 'og:title', content: "Artistic PhD HFk Bremen" },
      { hid: 'og:url', property: 'og:url', content: "https://artisticphd-hfkbremen.net/" },
      { hid: 'og:description', property: 'og:description', content: "The foundation for the PhD program is the artistic or artistic-creative practice and the resulting research and production of, or gain in, knowledge." },
      { hid: 'description', name: 'description', content: 'The foundation for the PhD program is the artistic or artistic-creative practice and the resulting research and production of, or gain in, knowledge.' },
      { hid: 'keywords', name: 'keywords', content: 'artistic, phd, bremen, hfk, research, art, andrea sick, künst, hochschule, germany, doctorate, program, deutschland' }

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
     { src: `~plugins/vimeo-player` },
     { src: '~/plugins/v-video-embed.js', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],
  env: {
  strapiBaseUri: process.env.API_URL || "https://api.phdhfk.uber.space"
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
      '@nuxtjs/apollo',
      ['vue-scrollto/nuxt', { duration: 300, x: true, y: false, container: '#pageContent' }],
      'nuxt-password-protect',
    ],

    passwordProtect: {

      formPath: '/password',
      password: 'staging!AREA',
      tokenSeed: 101010,
      queryString: '_pw',
      cookieName: '_password'
     },
    //Apollo
    apollo: {
      clientConfigs: {
        default: '@/graphql/config/config.js'
      }
    },
    router: {
      middleware: ['password-protect']
    },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
