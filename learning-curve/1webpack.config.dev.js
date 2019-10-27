const path = require('path');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'assets/js/main.js',     
        path: path.resolve(__dirname,'dist/'), // 这个输出目录不仅是js文件的输出目录，还是所有img,fonts的输出目录,还有自动生成的html
    },
    devServer:{
        port: 3000,
        open: true,
    },
    plugins:[
        new htmlWebpackPlugin({  // 自动处理插入html中的输出的js文件路径   
            filename: 'index.html',
            template: path.join(__dirname,'src','template.html')
        }),
        new cleanWebpackPlugin(['dist'])   
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
                use: [
                    'style-loader',
                    {
                        loader:'css-loader',
                        options: {
                            module: true,
                            localIdentName:'[name]-[local]-[hash:base64:3]'
                        }
                    }
                ],
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






