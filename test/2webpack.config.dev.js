const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-Plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        main: './src/app.js',
        a: './src/a.js',
        vendor: ['react','react-dom']
    },
    // {
    //     app: './src/app.js',
    //     a: './src/a.js'
    // },
    output: {
        filename: 'assets/js/[name]-[chunkhash:8].js',     
        // filename: 'assets/js/[name]-[hash:8].js',     
        path: path.resolve(__dirname,'dist/'), // 这个输出目录不仅是js文件的输出目录，还是所有img,fonts的输出目录,还有自动生成的html
    },
    devServer:{
        port: 3000,
        open: true,
        // hot:true,
        proxy:{
            '/api':'http://127.0.0.1:8080/'  // 设置代理，帮助解决跨域问题
        }
    },
    devtool: 'source-map',
    plugins:[
        new HtmlWebpackPlugin({  // 自动处理插入html中的输出的js文件路径   
            filename: 'index.html',
            // chunks:['app'],  // 允许插入的js模块
            template: path.join(__dirname,'src','template.html')
        }),
        new ExtractTextPlugin({
            filename: 'assets/css/[name]-[chunkhash:8].css',
            disable: true
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: false, 
                drop_console: true,
                drop_debugger: true
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({  
            name: ['common','vendor'],
            filename: 'assets/js/[name]-[chunkhash:8].js',
        }),
        // new webpack.HotModuleReplacementPlugin()  
    ],
    module:{
        rules:[
            {
                test: /\.js$/,
                use: [{
                        loader: 'babel-loader',
                        // options:{  // 抽出去写入.babelrc
                        //     presets:['react','env'],
                        //     plugins:['transform-object-rest-spread']
                        // }
                }],
                exclude:[
                    path.resolve(__dirname,'node_modules') 
                ]
            },
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use: 'css-loader'
                }),
                exclude:[
                    path.resolve(__dirname,'node_modules')
                ]
            },
            {   
                test: /\.css$/,
                use: ['style-loader','css-loader'],
                include:[  
                    path.resolve(__dirname,'node_modules')
                ]
            },
            {  
                test: /\.(eot)|(svg)|(ttf)|(woff)|(woff2)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options:{
                            name: 'assets/fonts/[name]-[hash:3].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use:[
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            module: true,
                            localIdentName: '[name]-[local]-[hash:base64:3]'
                        }
                    },
                    'sass-loader'
                ],
                exclude:[
                    path.resolve(__dirname,'node_modules')
                ]
            },
            {   
                test: /\.scss$/,
                use: ['style-loader','css-loader','sass-loader'],
                include:[  
                    path.resolve(__dirname,'node_modules')
                ]
            },
            {
                test: /\.(jpg)|(png)|(gif)|(jpeg)$/,
                use:[{
                    loader: 'url-loader',
                    options:{
                        limit: 13000,
                        name: 'assets/img/[name]-[hash:3].[ext]'
                    }
                }]
            }
        ]
    }
}






