# Webpack 4. Simple template
Webpack, webpack-cli, style-loader, css-loader, mini-css-extract-plugin, optimize-css-assets-webpack-plugin, clean-webpack-plugin, rimraf, html-webpack-plugin, node-sass, sass-loader, less, less-loader, autoprefixer, postcss-loader, uglifyjs-webpack-plugin, babel-core, babel-loader, babel-preset-env, babel-preset-stage-0, file-loader, image-webpack-loader, webpack-dev-server, typescript, ts-loader.
___
#### package.json
Create file **package.json**
```json
{
  "name": "Simple template",
  "version": "0.0.1",
}
```
___
#### Install [webpack](https://webpack.js.org/guides/installation/)
```bash
npm i -D webpack webpack-cli
```
Create file **webpack.config.js**
```js
const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/app/index.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
    },
    devtool: 'source-map'
}
```
#### scripts
Change **package.json**
```json
{
    "scripts": {
        "dev": "node_modules/.bin/webpack --mode development",
        "prod": "node_modules/.bin/webpack --mode production"
    }
}
```
___
#### [style-loader](https://github.com/webpack-contrib/style-loader), [css-loader](https://github.com/webpack-contrib/css-loader)
```bash
npm i -D style-loader css-loader
```
Change **webpack.config.js**
```js
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
    ...
}
```
___
#### [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
```bash
npm i -D mini-css-extract-plugin
```
Change **webpack.config.js**
```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    ...
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ]
}
```
___
#### [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)
```bash
npm i -D optimize-css-assets-webpack-plugin
```
Change **webpack.config.js**
```js
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    ...
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
    }
};
```
___
#### [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin)
```bash
npm i -D clean-webpack-plugin
```
Change **webpack.config.js**
```js
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ]
}
```
___
#### [rimraf](https://www.npmjs.com/package/rimraf)
```bash
npm i -D rimraf
```
Change **package.json**
```json
{
    "scripts": {
        "clean": "rimraf dist"
  }
}
```
___
#### [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
```bash
npm i -D html-webpack-plugin
```
Change **webpack.config.js**
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    ...
    plugins: [
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
    ]
```
Change **index.html**
```html
<link rel="stylesheet" href="<%= htmlWebpackPlugin.options.files.css %>">
<script src="<%= htmlWebpackPlugin.options.files.js %>" defer></script>
```
___
#### [sass](https://github.com/webpack-contrib/sass-loader) || [less](https://github.com/webpack-contrib/less-loader)
```bash
npm i -D node-sass sass-loader
or
npm i -D less less-loader
```
Change **webpack.config.js**
```js
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}
```
___
#### [autoprefixer postcss-loader](https://blog.zverit.com/frontend/2017/09/15/autoprefixer-webpack-config/)
```bash
npm i -D autoprefixer postcss-loader
```
Change **webpack.config.js**
```js
const autoprefixer = require('autoprefixer');

module.exports = {
    ...
    module: {
        rules: [
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
            }
        ]
    }
}
```
___
#### [uglifyjs-webpack-plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)
```bash
npm i -D uglifyjs-webpack-plugin
```
Change **webpack.config.js**
```js
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    ...
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true 
                //,sourceMap: true
            })
        ]
    }
};
```
___
#### [babel](https://github.com/babel/babel-loader)
```bash
npm i -D babel-core babel-loader babel-preset-env
```
Change **webpack.config.js**
```js
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    }
}
```
___
#### [babel-preset-stage-0](https://www.npmjs.com/package/babel-preset-stage-0)
```bash
npm i -D babel-preset-stage-0
```
Change **webpack.config.js**
```js
loader: 'babel-loader',
options: {
    presets: ['env','stage-0']
}
```
___
#### [file-loader](https://github.com/webpack-contrib/file-loader)
```bash
npm i -D file-loader
```
Change **webpack.config.js**
```js
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            }
        ]
    }
}
```
___
#### [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader)
```bash
npm i -D image-webpack-loader
```
Change **webpack.config.js**
```js
module.exports = {
    ...
    module: {
        rules: [
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
    }
}
```
___
#### [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
```bash
npm i -D webpack-dev-server
```
Change **webpack.config.js**
```js
module.exports = {
    ...
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
}
```
Change **package.json**
```json
{
    "scripts": {
        "start:dev": "node_modules/.bin/webpack-dev-server --inline --mode development"
    }
}
```
___
#### [ts-loader](https://github.com/TypeStrong/ts-loader)
```bash
npm i -D typescript ts-loader
```
Change **webpack.config.js**
```js
module.exports = {
    ...
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    }
}
```

Create file **tsconfig.json**
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "sourceMap": true
  },
  "exclude": [
    "node_modules"
  ]
}
```
___
webpack --json --profile >stats.json
http://webpack.github.io/analyse/