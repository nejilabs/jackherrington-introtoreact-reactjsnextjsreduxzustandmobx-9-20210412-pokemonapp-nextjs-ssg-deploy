const debug = process.env.NODE_ENV !== 'production'

module.exports = {
  basePath: !debug ? '/<name-of-the-app>' : '',
  assetPrefix: !debug ? '/<name-of-the-app>/' : '',
}