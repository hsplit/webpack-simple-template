const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //https://github.com/webpack-contrib/mini-css-extract-plugin
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //https://www.npmjs.com/package/optimize-css-assets-webpack-plugin
const CleanWebpackPlugin = require('clean-webpack-plugin'); //https://github.com/johnagan/clean-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin'); //https://www.npmjs.com/package/html-webpack-plugin
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); //https://github.com/webpack-contrib/uglifyjs-webpack-plugin
const autoprefixer = require('autoprefixer'); //https://blog.zverit.com/frontend/2017/09/15/autoprefixer-webpack-config

module.exports = {
    entry: {
         main: path.resolve(__dirname, './src/app/index.js')
     },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','stage-0']
                    }
                }
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers:['ie >= 8', 'last 2 version']
                                })
                            ],
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack by H.Split',
            filename: 'index.html',
            template: 'src/index.html',
            inject: false,
            files: {
                css: 'style.css',
                js: 'main.js'
            }
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true //,sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
};
