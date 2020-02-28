<template>
	<div>
		<div v-if="currentGame === 'number-baseball'">
			<number-baseball></number-baseball>
		</div>
		<div v-else-if="currentGame === 'response-check'">
			<response-check></response-check>
		</div>
		<div v-else-if="currentGame === 'rock-sclssors-paper'">
			<rock-sclssors-paper></rock-sclssors-paper>
		</div>
		<div v-else-if="currentGame === 'lotto-generator'">
			<lotto-generator></lotto-generator>
		</div>
		<div v-else>
			<div>일치하지 않습니다.</div>
		</div>
	</div>
</template>
<script>
	import NumberBaseball from '../numberBaseball/NumberBaseball';
	import ResponseCheck from '../responceCheck/responceCheck';
	import RockSclssorsPaper from '../rockSclssorsPaper/rockSclssorsPaper';
	import LottoGenerator from '../lotto/lottoGenerator';

	export default {
		components : {
			NumberBaseball,
			ResponseCheck,
			RockSclssorsPaper,
			LottoGenerator
		},
		mounted() {
			console.log(this.$router);
			console.log(this.$route);
		},
		computed : {
			currentGame() {
				return this.$route.params.name;
			}
		}
	}
</script>