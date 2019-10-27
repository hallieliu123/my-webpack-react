const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');
const baseConfig = {
    entry: {
        main: './src/app.js',
        // a: './src/a.js',
        vendor: ['react','react-dom']
    },
    output: {
        path: path.resolve(__dirname,'dist/'), // 这个输出目录不仅是js文件的输出目录，还是所有img,fonts的输出目录,还有自动生成的html
    },
    plugins:[
        new HtmlWebpackPlugin({  // 自动处理插入html中的输出的js文件路径   
            filename: 'index.html',
            // chunks:['app'],  // 允许插入的js模块
            template: path.join(__dirname,'src','template.html')
        }),
        new CleanWebpackPlugin(['dist']),
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
                test: /\.(jpg)|(png)|(gif)|(jpeg)$/,
                use:[{
                    loader: 'url-loader',
                    options:{
                        limit: 13000,
                        name: 'assets/img/[name]-[hash:3].[ext]'
                    }
                }]
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
            }
        ]
    }
}

module.exports = (env) => {
    if( env && env.production ){
        return merge(baseConfig,prodConfig);
    }
    return merge(baseConfig,devConfig);
}



