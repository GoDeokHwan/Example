import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

export default new Vuex.Store({
	state : {
		tableData : [
			['','',''],
			['','',''],
			['','','']
		],
		turn : 'O',
		winner : ''
	},	// Vue 의 data와 비슷
	getters : {
		turnMessage(state) {
			return state.turn +'님이 승리하였습니다.';
		}
	},	// vue의 computed 와 비슷
	mutations : {
		[SET_WINNER]( state, winner ) {			
			state.winner = winner;
		},	// 대문자로 메서드 이름이 규칙
		[CLICK_CELL]( state, { row , cell } ) {		
			Vue.set(state.tableData[row],cell,state.turn);
		},
		[CHANGE_TURN](state) {
			state.turn = state.turn === 'O'?'X':'O';
		},
		[RESET_GAME](state) {
			state.turn = 'O';
			state.tableData = [
				['','',''],
				['','',''],
				['','','']
				];
		},
		[NO_WINNER](state) {			
			state.winner = '';
		}
	},	// state를 수정할 때 사용, 동기적
	actions : {

	}	// 비동기를 사용할때, 또는 여러 mutations을 연달아 실행할 때	
});