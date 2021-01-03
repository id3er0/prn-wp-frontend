// import Fiber from 'fibers';
// import Sass from 'sass';

// const customSass = {
//   implementation: Sass,
//   fiber: Fiber,
// };

const title = '[App name]';
const description = '[Description]';
const meta_image_url = '/images/meta-image.jpg';

const head = {
  title,
  meta: [
    {charset: 'utf-8'},
    {name: 'viewport', content: 'width=device-width,initial-scale=1.0,maximum-scale=1'},
    {hid: 'description', name: 'description', content: description},
    {hid: 'og_title', property: 'og:title', content: title},
    {hid: 'og_description', property: 'og:description', content: description},
    {hid: 'og_type', property: 'og:type', content: 'website'},
    {hid: 'og_image', property: 'og:image', content: meta_image_url},
    {hid: 'fb_app_id', property: 'fb:app_id', content: process.env.NUXT_ENV_FB_APP_ID},
    {hid: 'twitter_title', name: 'twitter:title', content: title},
    {hid: 'twitter_description', name: 'twitter:description', content: description},
    {hid: 'twitter_card', name: 'twitter:card', content: 'summary'},
    {hid: 'twitter_image', name: 'twitter:image', content: meta_image_url},
  ],
  link: [
    {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
  ],
};

// Add icons.
head.meta = [
  ...head.meta,
  {name: 'msapplication-TileColor', content: '#da532c'},
  {name: 'theme-color', content: '#ffffff'},
];
head.link = [
  ...head.link,
  {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
  {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
  {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
  {rel: 'manifest', href: '/site.webmanifest'},
  {rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5'},
];

module.exports = {
  // mode: 'spa',
  mode: 'universal',
  ssr: true,
  server: {
    // port: 8080, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  /*
  ** Headers of the page
  */
  head,
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Env variables
   */
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.API_URL
    }
  },
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.API_URL
    }
  },
  // privateRuntimeConfig: {},
  /*
  ** Build configuration
  */
  build: {
    loaders: {
      // scss: customSass,
    },
    // postcss: [
    //   require('postcss-scrollbar')(),
    // ],
    // vendor: [],
    // plugins: [],
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
  components: true,
  plugins: [
    {src: '@/plugins/content-placeholders.client.js'},
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources', // Globally import Sass files
    '@nuxtjs/dayjs',
    ['nuxt-vuex-localstorage', {
      localStorage: [
        'favourites',
      ],
      // sessionStorage: [
      //   'favourites',
      // ],
    }],
  ],
  /*
  ** Globally import Sass files
  */
  styleResources: {
    scss: [
      'normalize.css/normalize.css',
      'assets/styles/index.scss',
    ],
  },
};

