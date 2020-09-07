// Requires a webpack config based on the internal --mode [ development / production ] property

module.exports = (env, argv) => {
    let configType = argv.mode !== 'production' ? 'dev' : 'prod' ;
    return require('./config/webpack.'+configType);
}
