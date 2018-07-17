const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    env: NODE_ENV,
    dev_port: '9009',
    basePath: __dirname,
    srcDir: '../src',
    outDir: '../dist',
    publicPath:  NODE_ENV != 'development' ? '../' : `http://localhost:9000/`,
    sourceMap: NODE_ENV == 'development' ? true : false,
    externals  : {},
    vendor: ['vue', 'vue-router']
}
