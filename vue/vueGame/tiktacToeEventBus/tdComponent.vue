<template>
	<td v-on:click="onClickTd()">{{cellData}}</td>
</template>
<script>
	import EventBus from './EventBus';

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

				EventBus.$emit('clickTd', this.rowIndex , this.cellIndex);
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