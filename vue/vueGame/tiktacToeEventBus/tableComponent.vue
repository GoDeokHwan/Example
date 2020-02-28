<template>
	<table>
		<tr-component v-for="(rowData,index) in tableData" :key="index" :row-data="rowData" :row-index="index"></tr-component>
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
			tableData : Array
		},
		data() {
			return {
				
			}
		},
		computed : {
			
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