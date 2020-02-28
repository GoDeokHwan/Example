const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');	// nodeJa에서 지원하는 path 찾는 메서드

module.exports = {
	mode : 'development',     // 개발인지 운영인지 모드 설정
    devtool : 'eval',         // eval : 개발용으로 빌드 속도가 빠름
    resolve : {
       extensions : ['.js','.vue'] 			// 확장자 처리
    }, 
	entry : {
		app : path.join(__dirname,'main.js')
	},
	module : {
		rules : [{
			test : /\.vue$/,
			loader : 'vue-loader'
		},
		{
			test : /\.css$/,
			use : [
				'vue-style-loader',
				'css-loader'
			]
		}
		]
	},
	plugins : [
		new VueLoaderPlugin()
	],
	output : {
		filename : '[name].js',
		path : path.join(__dirname,'dist'),
		publicPath : '/dist'
	}
}