const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    output: {
        filename: 'assets/js/[name]-[chunkhash:8].js',     
    },
    plugins:[
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
        new ExtractTextPlugin({
            filename: 'assets/css/[name]-[chunkhash:8].css',
            disable: false
        })
    ],
    module:{
        rules:[
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }]
                }),
                exclude:[
                    path.resolve(__dirname,'node_modules')
                ]
            },
            {   
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }]
                }),
                include:[  
                    path.resolve(__dirname,'node_modules')
                ]
            }
        ]
    }
}






