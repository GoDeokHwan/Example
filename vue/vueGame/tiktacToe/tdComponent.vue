<template>
	<td v-on:click="onClickTd()">{{cellData}}</td>
</template>
<script>

	export default {
		name : 'TdComponent',
		props : {
			cellData : String,
			rowIndex : Number,
			cellIndex : Number
		},		
		methods : {
			onClickTd() {
				if(this.cellData) return;

				const rootData = this.$root.$data;
				// 배열 Index로 update 할 경우는 $set 활용
				this.$set(rootData.tableData[this.rowIndex],this.cellIndex,rootData.turn);

				let win = false;
				if( rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2] === rootData.turn ) {
					win = true;
				}
				if( rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex] === rootData.turn ) {
					win = true;
				}
				if( rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn ) {
					win = true;
				}
				if( rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn ) {
					win = true;
				}

				if(win) {					
					rootData.winner = rootData.turn;
					rootData.turn = 'O';
					rootData.tableData = [['','',''],['','',''],['','','']];
				} else {
					let all = true;
					rootData.tableData.forEach((row) => {
						row.forEach((cell) =>{
							if(!cell) {
								all = false;
							}
						});
					});

					if(all) {
						rootData.winner = null;
						rootData.turn = 'O';
						rootData.tableData = [['','',''],['','',''],['','','']];
					} else {
						rootData.turn = rootData.turn === 'O'?'X':'O';
					}					
				}
			}
		},
		mounted() {
			
		},
		beforeDestroy() {
			
		}
	};

    

</script>

<style scoped>

</style>