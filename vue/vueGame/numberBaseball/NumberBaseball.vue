<template>
	<div>
		<h1>{{result}}</h1>
		<form @submit.prevent="onSubmitForm">
			<input type="text" ref="answer" minlength="4" maxlength="4" v-model="value"></input>
			<button type="submit">입력</button>
		</form>
		<div>시도 : {{tries.length}}</div>
		<ul>
			<li v-for="t in tries">
				<div>{{t.try}}</div>
				<div>{{t.result}}</div>
			</li>
		</ul>
	</div>
</template>
<script>
	const randomNumber = () => {
		const candidates = [1,2,3,4,5,6,7,8,9,0];
		const array = [];
		for (let i = 0; i < 4; i++) {
			const chosen = candidates.splice(Math.floor(Math.random()*(9-i)),1)[0];
			array.push(chosen);
		}
		
		return array;
	}

	export default {
		data() {
			return {
				answer : randomNumber(),			
				tries : [],
				value : '',
				result : ''				
			}
		},
		methods : {
		   onSubmitForm(e) {
		   		if(this.value === this.answer.join('')) {	// 배열 문자열로 변환 Join
		   			this.tries.push({
		   				try : this.value,
		   				result : '홈런'
		   			});
		   			this.reuslt = '홈런';
		   			alert('게임을 다시 실행합니다.');
		   			this.value = '';
		   			this.tries = [];
		   			this.$refs.answer.focus();		   			 
		   		} else {
		   			let strike = 0;
		   			let ball = 0;
		   			const answerArray = this.value.split('').map(v => parseInt(v));
		   			for(let i = 0; i < 4; i++) {
		   				if( answerArray[i] === this.answer[i]) {
		   					strike++;
		   				} 
		   				else if( this.answer.includes(answerArray[i]) ) {
		   					ball++;
		   				}
		   			}
					this.tries.push({
		   				try : this.value,
		   				result : `스트라이크 : ${strike} , 볼 : ${ball}`
		   			});
					this.value = '';		   			
		   			this.$refs.answer.focus();		

		   		}
		    console.log(this.answer);
		   }
		}		
	};

    

</script>

<style>

</style>