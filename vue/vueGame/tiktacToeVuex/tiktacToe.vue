   <template>
	<div>
		<div>{{turn}} 님의 턴입니다.</div>
		<table-component v-bind:table-data="tableData"></table-component>
		<div v-if="winner">{{winner}} 님의 승리입니다.</div>
	</div>
</template>
<script>
	import { mapState } from 'vuex';
	import store from './store';
	import TableComponent from './tableComponent';

	export default {
		store,
		data() {
			return {
				
			};
		},
		components : {
			TableComponent
		},		
		computed : {
			...mapState(['winner','turn','tableData'])
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

</style>