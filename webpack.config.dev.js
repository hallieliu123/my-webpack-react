const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-Plugin');
const webpack = require('webpack');
module.exports = {
    output: {
        filename: 'assets/js/[name]-[hash:8].js',   // 使用chunkhash的话，hmr会报错
    },
    devServer:{
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,  
        port: 3000,
        open: true,
        hot:true,
        proxy:{
            '/api':'http://127.0.0.1:8080/'  // 设置代理，帮助解决跨域问题
        }
    },
    devtool: 'source-map',
    plugins:[
        new ExtractTextPlugin({
            filename: 'assets/css/[name]-[hash:8].css',
            disable: false
        }),
        new webpack.optimize.CommonsChunkPlugin({  
            name: ['common','vendor'],
            filename: 'assets/js/[name]-[hash:8].js',
        }),
        new webpack.HotModuleReplacementPlugin()  
    ],
    module:{
        rules:[
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // module: true
                        }
                    }
                ],
                exclude:[
                    path.resolve(__dirname,'node_modules')
                ]
            },
            {   
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // module: true
                        }
                    }
                ],
                include:[  
                    path.resolve(__dirname,'node_modules')
                ]
            }
        ]
    }
}






