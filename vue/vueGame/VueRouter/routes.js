import Vue from 'vue';
import VueRouter from 'vue-router';

import NumberBaseball from '../numberBaseball/NumberBaseball';
import responceCheck from '../responceCheck/responceCheck';
import rockSclssorsPaper from '../rockSclssorsPaper/rockSclssorsPaper';
import lottoGenerator from '../lotto/lottoGenerator';
import GameMatcher from './GameMatcher';

Vue.use(VueRouter);

export default new VueRouter({
	mode : 'history',
	routes : [
		{ path : '/number-baseball', component : NumberBaseball },
		{ path : '/response-check', component : responceCheck },
		{ path : '/rock-sclssors-paper', component : rockSclssorsPaper },
		{ path : '/lotto-generator', component : lottoGenerator },
		{ path : '/game/:name', component : GameMatcher },	// 동적 라우트 매칭
	]
});