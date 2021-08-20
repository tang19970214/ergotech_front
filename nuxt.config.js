import router from "./router.js";

export default {
  server: {
    port: 1803, // default: 3000
    // host: '0.0.0.0' // default: localhost
  },
  router: {
    scrollBehavior: () => ({
      y: 0
    }),
    extendRoutes(routes, resolve) {
      return router;
    }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '人因工程檢核表',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/css/index.css",
    "@/assets/css/iconfont.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/apis',
    '~/plugins/day',
    '~/plugins/font-awesome',
    '~/plugins/sweet-alert',
    {src: '@/assets/js/iconfont.js', ssr: false} // ssr: false 代表只會在客戶端被打包引入
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-fontawesome'
  ],
  fontawesome: {
    // See https://github.com/vaso2/nuxt-fontawesome
    // 这里设置了组建的标签为fa
    // 如果不设置，则默认为在font-awesome.js中，生成的：font-awesome-icon
    component: 'fa',
    imports: [{
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
      {
        set: '@fortawesome/free-regular-svg-icons',
        icons: ['far']
      },
      {
        set: '@fortawesome/free-brands-svg-icons',
        icons: ['fab']
      }
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: "http://renyin.mass.org.tw/"
  },

  buildModules: [
    ["@nuxtjs/dotenv", {
      filename: ".env." + process.env.NODE_ENV
    }],
    '@nuxtjs/tailwindcss'
  ],
}
