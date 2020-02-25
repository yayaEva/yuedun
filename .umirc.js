// https://umijs.org/config/
import { resolve } from 'path'
import pxtorem from 'postcss-pxtorem'
import { i18n } from './src/utils/config'

export default {
  context: {
    title: '岳盾—网络安全动态感知平台',
  },
  ignoreMomentLocale: true,
  history: 'hash',
  publicPath: './',
  targets: { ie: 9 },
  treeShaking: true,
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 128,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    })
  ],
  plugins: [
    [
      // https://umijs.org/plugin/umi-plugin-react.html
      'umi-plugin-react',
      {
        dva: { immer: true },
        antd: true,
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/Loader/Loader',
        },
        routes: {
          exclude: [
            /model\.(j|t)sx?$/,
            /service\.(j|t)sx?$/,
            /models\//,
            /components\//,
            /services\//,
          ],
          update: routes => {
            if (!i18n) return routes
            const deep = (routes) => {
              const newRoutes = []
              for (const item of routes) {
                if (item.routes && item.routes.length > 0) {
                  item.routes = deep(item.routes)
                }
                newRoutes.push(item)
                if (item.path) {
                  newRoutes.push(
                    Object.assign({}, item, {
                      path:
                        `/:lang(${i18n.languages
                          .map(item => item.key)
                          .join('|')})` + item.path,
                    })
                  )
                }
              }
              return newRoutes
            }
            routes[0].routes = deep(routes[0].routes)
            return routes
          },
        },
        dll: {
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
        },
        pwa: {
          manifestOptions: {
            srcPath: 'manifest.json'
          },
        }
      },
    ],
  ],
  chainWebpack: (config, { webpack }) => {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          automaticNameMaxLength: 30,
          name: true,
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      },
    })
    // 开发环境启用代理，解决跨域问题
    if (process.env.ENV === 'development') {
      config.merge({
        devServer: {
          proxy: {
            '/api': {
              'target': 'http://localhost:8001',
              'changeOrigin': true,
              'pathRewrite': { '^/api' : '' }
            }
          },
        },
      })
    }
  },
  define: {
    'process.env.ENV': process.env.ENV,
  },
  // Theme for antd
  // https://ant.design/docs/react/customize-theme
  theme: './config/theme.config.js',
  alias: {
    api: resolve(__dirname, './src/services/'),
    components: resolve(__dirname, './src/components'),
    config: resolve(__dirname, './src/utils/config'),
    models: resolve(__dirname, './src/models'),
    routes: resolve(__dirname, './src/routes'),
    services: resolve(__dirname, './src/services'),
    themes: resolve(__dirname, './src/themes'),
    utils: resolve(__dirname, './src/utils'),
  },
  extraBabelPresets: ['@lingui/babel-preset-react'],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'lodash',
    ],
  ],
}
