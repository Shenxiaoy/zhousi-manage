const test = require('./mockdata/test.json');
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const path = require('path')
const proxyMock = require('obear-mock')

// 跨域伪造来源配置
const bypassConf = url => {
  return (req, res, proxyOptions) => {
    req.headers.referer = url;
    req.headers.host = url;
    req.headers.origin = url;
  };
};

module.exports = {
  // chainWebpack: config => {
  //   config.plugins.delete('prefetch')
  //   // 移除 preload 插件
  //   config.plugins.delete('preload');
  // },
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#ff3938',
          'link-color': '#ff3938'
        },
        globalVars: {
        },
        javascriptEnabled: true,
      },
      scss: {
        prependData: `@import "~@/assets/css/themeSet.scss";`
      }
    },
    // extract: false
  },
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new OpenBrowserPlugin({
        url: 'http://localhost:8080'
      })
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json', 'ts'],
      alias: {
        'static': path.resolve(__dirname, 'src/assets'),
        '@': path.resolve(__dirname, 'src'),
        'API': path.resolve(__dirname, 'src/apis/antv.js'),
        'common': path.resolve(__dirname, 'src/common')
      }
    }
  },
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    https: false,
    open: true,
    proxy: {
      '/': {
        target: 'http://localhost:9101'
      },
      '/user': {
        target: 'http://10.112.6.158',
        changeOrigin: true,
        pathRewrite: {
          '^/jieying': ''
        }
      }
    },
    overlay: {
      warnings: true,
      errors: true
    },
    // lintOnSave: false,
    before: app => {
      app.post('/api/test', (req, res) => {
        res.json(test);
      });
    },
    after: app => {
      proxyMock(app, {configPath: '/setting'})
    }
  }
};
