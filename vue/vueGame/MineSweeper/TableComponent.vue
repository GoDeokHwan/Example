<template>
	<table>
		<tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
			<td v-for="(cellData,cellIndex) in rowData" 
			:key="cellIndex" 
			:style="cellDataStyle(rowIndex,cellIndex)" 
			@click="onClickTd( rowIndex , cellIndex)"
			@contextmenu.prevent="onRightClickTd( rowIndex , cellIndex)"
			>
			{{cellDataText(rowIndex,cellIndex)}}</td>
		</tr>
	</table>
</template>
<script>
	import { mapState } from 'vuex';
	import { CODE , OPEN_CELL , FLAG_CELL , QUESTION_CELL , NORMALIZE_CELL , CLICK_MINE } from './store';

	export default {		
		computed : {
			...mapState(['tableData','halted']),
			cellDataStyle(state) {
				return (row,cell) => {
					switch(this.$store.state.tableData[row][cell]) {
						case CODE.NORMAL :
						case CODE.MINE :
							return {
								background :'#444'
							};
						case CODE.CLICKED_MINE :	
						case CODE.OPENED : 
							return {
								background : '#FFF'
							};
						case CODE.FLAG :
						case CODE.FLAG_MINE :
							return {
								background : '#F00'
							}					
						case CODE.QUESTION :
						case CODE.QUESTION_MINE :
							return {
								background : '#FF0'
							};
						default :
							return {};
					}
				}
			},
			cellDataText(state) {
			    return (row,cell) => {
					switch(this.$store.state.tableData[row][cell]) {
						case CODE.NORMAL :
							return '';
						case CODE.MINE :
							return 'X';
						case CODE.CLICKED_MINE :	
							return '펑';					
						case CODE.FLAG : 
							return '!';
						case CODE.QUESTION_MINE :
						case CODE.QUESTION : return '?';					
						default :
							return this.$store.state.tableData[row][cell] || '';
					}
				}
			}
		},
		methods : {
			onClickTd( row , cell ) {
				if( this.halted) {
					return;					
				} 
				
				switch(this.tableData[row][cell]) {
					case CODE.NORMAL :
						this.$store.commit(OPEN_CELL , { row , cell });	
						return;
					case CODE.MINE :
						this.$store.commit(CLICK_MINE , { row , cell });
						return;
					defualt
						return;
				}
				
				
			},
			onRightClickTd( row , cell) {
				if( this.halted) {
					return;					
				}

				switch(this.tableData[row][cell]) {
					case CODE.NORMAL :
					case CODE.MINE : 
						this.$store.commit(FLAG_CELL, { row , cell });
						return;
					case CODE.FLAG_MINE :
					case CODE.FLAG : 
						this.$store.commit(QUESTION_CELL, { row , cell });
						return; 
					case CODE.QUESTION_MINE :
					case CODE.QUESTION :
						this.$store.commit(NORMALIZE_CELL, { row , cell });
						return;
					default :
						return;

				}

			}
		},
		mounted() {
			
		},
		beforeDestroy() {
			
		}
	};

    

</script>

<style>
table { border-collapse : collapse; }
td { border : 1px solid black; width : 40px; height : 40px; text-align : center; }
</style>