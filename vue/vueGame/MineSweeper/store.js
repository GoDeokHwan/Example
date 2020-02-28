import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
	MINE : -7,
	NORMAL : -1,
	QUESTION : -2,
	FLAG : -3,
	QUESTION_MINE : -4,
	FLAG_MINE : -5,
	CLICKED_MINE : -6,
	OPENED : 0
}

const plantMine = ( row , cell , mine ) => {
	// row*cell 배열에 숫자 채우기
	let candidate = Array( row * cell ).fill().map((arr,idx)=>{ 
		return idx;
	});

	// 배열 섞기
	const shuffle = [];
	while( candidate.length > row*cell-mine) {
		const chosen = candidate.splice(Math.floor(Math.random()*candidate.length),1)[0];
		shuffle.push(chosen);
	}

	// 이차원 배열 생성 NORMAL
	const data = [];
	for (let i = 0; i < row; i++) {
		const rowData = [];
		data.push(rowData);
		for(let j = 0; j < cell; j++) {
			rowData.push(CODE.NORMAL);
		}
	}

	// 지뢰 데이터 생성
	for(let k = 0; k < shuffle.length; k++) {
		const ver = Math.floor( shuffle[k]/cell);
		const hor = shuffle[k]%cell;
		data[ver][hor] = CODE.MINE;
	}

	return data;
};

export default new Vuex.Store({
	state : {
		tableData : [],
		data : {
			row : 0,
			cell : 0,
			mine : 0,
		},
		timer : 0,
		halted : true,
		result : '',
		opendCount : 0
	},	// Vue 의 data와 비슷
	getters : {
		
	},	// vue의 computed 와 비슷
	mutations : {
		[START_GAME]( state , { row  , cell , mine  }) {			
			// Json 객체 바꿀때로 Vue.set 사용
			// stat.data.row = row; -> Vue.set(state.data,row,row);
			state.data = {
				row,
				cell,
				mine
			};

			state.tableData = plantMine(row,cell,mine);
			state.timer = 0;
			state.halted = false;
			state.result = '';
		},	// 대문자로 메서드 이름이 규칙
		[OPEN_CELL]( state , { row , cell }) {
			const checked = [];
			let opendCount = 0;
			// 주변 8칸 지뢰 검색
			function checkAround( row , cell){	
				const checkRowDrCellIsUndefined = row < 0 
					|| row >= state.tableData.length
					|| cell < 0 
					|| cell >= state.tableData[0].length;

				if(checkRowDrCellIsUndefined) {
					return;
				}

				if( [CODE.OPENED , CODE.FLAG , CODE.FLAG_MINE , CODE.QUESTION_MINE , CODE.QUESTION].includes(state.tableData[row][cell])){
					return;
				}
				if(checked.includes(row+"/"+cell)) {
					return;
				} else {
					checked.push(row+"/"+cell);
				}
				let around = [];
				if(state.tableData[row - 1]) {
					around = around.concat([
						state.tableData[row - 1][cell - 1],
						state.tableData[row - 1][cell],
						state.tableData[row - 1][cell + 1]
					]);
				}

				around = around.concat([
					state.tableData[row][cell - 1],					
					state.tableData[row][cell + 1]
				]);

				if( state.tableData[row + 1]) {
					around = around.concat([
						state.tableData[row + 1][cell - 1],
						state.tableData[row + 1][cell],
						state.tableData[row + 1][cell + 1]
					]);	
				}

				const counted = around.filter( function(v) {
					return [CODE.MINE, CODE.FLAG_MINE , CODE.QUESTION_MINE].includes(v);
				});

				if(counted.length === 0 && row > -1) {
					const near = [];
					if( row - 1 > -1) {
						near.push([row-1,cell-1]);
						near.push([row-1,cell]);
						near.push([row-1,cell+1]);
					}
					near.push([row,cell-1]);
					near.push([row,cell+1]);
					if( row + 1 < state.tableData.length) {
						near.push([row+1,cell-1]);
						near.push([row+1,cell]);
						near.push([row+1,cell+1]);
					}
					
					near.forEach((n) => {
						if( state.tableData[n[0]][n[1]] !== CODE.OPENED) {	
							console.log(state.tableData[n[0]][n[1]]);				
							checkAround(n[0],n[1]);
						}
					});		
				}
				if( state.tableData[row][cell] === CODE.NORMAL) {
					opendCount += 1;
				}
				Vue.set(state.tableData[row],cell,counted.length);
			}
			checkAround(row,cell);
			
			let halted = false;
			let result = '';
			if( state.data.row * state.data.cell - state.data.mine === state.opendCount + opendCount) {
				halted = true;
				result = state.timer+'초 승리하셨습니다.';
			}

			state.opendCount += opendCount;
			state.halted = halted;
			state.result = result;
			//const count = checkAround();

			//Vue.set(state.tableData[row],cell,count);
		},	// 대문자로 메서드 이름이 규칙
		[CLICK_MINE]( state , { row , cell }) {			
			Vue.set(state.tableData[row],cell,CODE.CLICKED_MINE);
			state.halted = true;
		},	// 대문자로 메서드 이름이 규칙
		[FLAG_CELL]( state , { row , cell }) {			
			if( state.tableData[row][cell] === CODE.MINE ){
				Vue.set(state.tableData[row], cell , CODE.FLAG_MINE);
			} else {
				Vue.set(state.tableData[row], cell , CODE.FLAG);
			}
		},	// 대문자로 메서드 이름이 규칙
		[QUESTION_CELL]( state , { row , cell } ) {			
			if( state.tableData[row][cell] === CODE.FLAG_MINE ){
				Vue.set(state.tableData[row], cell , CODE.QUESTION_MINE);
			} else {
				Vue.set(state.tableData[row], cell , CODE.QUESTION);
			}
		},	// 대문자로 메서드 이름이 규칙
		[NORMALIZE_CELL]( state , { row , cell } ) {			
			if( state.tableData[row][cell] === CODE.QUESTION_MINE ){
				Vue.set(state.tableData[row], cell , CODE.MINE);
			} else {
				Vue.set(state.tableData[row], cell , CODE.NORMAL);
			}
		},	// 대문자로 메서드 이름이 규칙
		[INCREMENT_TIMER]( state ) {			
			state.timer += 1;
		},	// 대문자로 메서드 이름이 규칙
	},	// state를 수정할 때 사용, 동기적
	actions : {

	}	// 비동기를 사용할때, 또는 여러 mutations을 연달아 실행할 때	
});