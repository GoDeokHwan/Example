<template>
	<table>		
		<tr-component v-for="(rowData,index) in tableData" :key="index" :row-index="index"></tr-component>
	</table>	
</template>
<script>
	import TrComponent from './trComponent';

	export default {
		name : 'TableComponent',
		components : {
			TrComponent
		},
		props : {
			
		},
		data() {
			return {
				
			}
		},
		computed : {
			tableData() {
				return this.$store.state.tableData;
			},
			turnMessage(){
				return this.$store.getters.turnMessage;		
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

<style>
table { border-collapse : collapse; }
td { border : 1px solid black; width : 40px; height : 40px; text-align : center; }
</style>