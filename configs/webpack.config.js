const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const project = require('./project.config');

const envDev = project.env === 'development';
const envPro = project.env === 'production';
const devtool = project.sourceMap ? 'cheap-source-map' : false;

const SRC_DIR = path.join(project.basePath, project.srcDir);

const config = {

    mode: project.env,

    entry:{
        main: [SRC_DIR + '/main.js']
    },

    output: {
        path: path.resolve(project.basePath, project.outDir),
        filename: envDev ? '[name].js' : '[name].[chunkhash:5].js',
        publicPath: project.publicPath
    },

    devtool: devtool,

    resolve: {
        modules: [
            project.srcDir,
            'node_modules'
        ],

        alias: {
            'src': SRC_DIR
        },

        extensions: ['*','.js', '.vue', '.json', '.less', '.scss', '.css']
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /(\.jsx|\.js)$/,
                use : {
                    loader: 'babel-loader?cacheDirectory'
                },
                include: SRC_DIR,
                exclude: /node_modules/
            },
            {
                test:/\.(sa|sc|c)ss$/,
                use :[

                    envDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader : 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.join(project.basePath, 'postcss.config.js')
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: "url-loader",
                    options : {
                        limit: 8192,
                        name: 'images/[name].[hash:5].[ext]'
                    }
                }]
            }
        ]
    },

    optimization: {
        sideEffects: false,
        splitChunks: {
            chunks     :'all',
            minSize    : 30000,
            minChunks  : 1,
            cacheGroups: {
                commons: {
                    name    : 'thirdParty',
                    test    : /[\\/]node_modules[\\/]/,
                    chunks  : 'initial',
                    priority: -10,
                    enforce : true
                },
                components: {
                    name  : 'components',
                    test  : /common\/|components\//,
                    chunks  : 'all',
                    enforce : true
                },
                styles: {
                    name   : 'main',
                    test   : /[\\/]main.scss[\\/]/,
                    chunks : 'all',
                    enforce: true,
                }
            }
        }
    },

    performance: {
        hints: false
    },

    plugins: [
        new webpack.DllReferencePlugin({
            context : project.basePath,
            manifest: path.resolve(project.basePath, '../dll', 'manifest.json')
        }),

        new CopyWebpackPlugin([{
            from : path.join(project.basePath,'../dll'),
            to   : path.join(project.basePath,'../dist','dll')
        }]),

        new HtmlWebpackPlugin({
            template : 'src/index.html',
            inject   : true,
            favicon  : path.resolve('favicon.ico'),
            minify   : {
                collapseWhitespace: envDev? false : true,
                ignoreCustomComments: envDev ? false : [ /^!/ ]
            }
        }),

        new MiniCssExtractPlugin({
            filename: envDev? '[name].css': '[name].[chunkhash:5].css',
            chunkFilename: envDev? '[id].css' : '[name].[chunkhash:5].css'
        }),

        new VueLoaderPlugin()
    ],
};

module.exports = config;
