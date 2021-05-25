const debug = process.env.NODE_ENV !== 'production'

module.exports = {
  basePath: !debug ? '/jackherrington-introtoreact-reactjsnextjsreduxzustandmobx-9-20210412-pokemonapp-nextjs-ssg-deploy' : '',
  assetPrefix: !debug ? '/jackherrington-introtoreact-reactjsnextjsreduxzustandmobx-9-20210412-pokemonapp-nextjs-ssg-deploy/' : '',
}