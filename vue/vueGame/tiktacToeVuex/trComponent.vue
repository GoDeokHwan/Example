<template>
	<tr>		
		<td-component v-for="(cellData,index) in rowData" :key="index" :cell-index="index" :row-index="rowIndex"></td-component>
	</tr>
</template>
<script>
	import TdComponent from './tdComponent';

	export default {
		name : 'TrComponent',
		components : {
			TdComponent
		},
		props : {			
			rowIndex : Number
		},
		data() {
			return {
				a:'1'
			}
		},
		computed : {
			rowData() {
				return this.$store.state.tableData[this.rowIndex];
			}
		},
		methods : {
			
		},
		mounted() {
			
		},
		beforeDestroy() {
			
		}
	};

    

</script>

<style scoped>

</style>