<template>
	<div>
		<div id="computer" v-bind:style="computedStyleObject"></div>
		<div>
			<button @click="onClickButton('a')">바위</button>
			<button @click="onClickButton('b')">가위</button>
			<button @click="onClickButton('c')">보</button>
		</div>
		<div>{{result}}</div>
		<div>현재 : {{score}}점</div>
	</div>
</template>
<script>
	const rspCoords = {
		a : '0',
		b : '-142px',
		c : '-284px'
	}
	const scores = {
		b : 1,
		a : 0,
		c : -1
	}

	const computerChoice = (imgCoord) => {
		return Object.entries(rspCoords).find(function (v) {
			return v[1] === imgCoord;
		})[0];
	}

	let interval;

	export default {
		data() {
			return {
				imgCoord : rspCoords.a ,
				result : '',
				score : 0
			}
		},
		computed : {
			computedStyleObject() {
				return { background : `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0` };
			}
		},
		methods : {
			changeHandle() {
				interval = setInterval(() => {
					if(this.imgCoord === rspCoords.a){
						this.imgCoord = rspCoords.b;
					} else if(this.imgCoord === rspCoords.b){
						this.imgCoord = rspCoords.c;
					} else if(this.imgCoord === rspCoords.c){
						this.imgCoord = rspCoords.a;
					}
				}, 100);
			},
			onClickButton( choice ) {
				clearInterval(interval);
				const myScore = scores[choice];
				const cpuScore = scores[computerChoice(this.imgCoord)];
				const diff = myScore - cpuScore;
				if( diff === 0 ) {
					this.result = "비겼습니다.";
				} else if([-1,2].includes(diff)) {
					this.result = '이겼습니다.';
					this.score += 1;
				} else {
					this.result = '졌습니다.';
					this.score -= 1;
				}

				setTimeout(() => {this.changeHandle()},1000);
			}
		},
		beforeCreate(){
			console.log("beforCreate");
		},
		created() {
			console.log("created");
		},
		beforeMount(){
			console.log("beforeMount");
		},
		mounted() {
			this.changeHandle();
			
			console.log("mounted");
		},
		updated(){
			console.log("updated");	
		},
		beforeDestroy() {
			clearInterval(interval);
			console.log("beforeDestroy");
		},
		destroyed(){
			console.log("destroyed");
		}
	};

    

</script>

<style scoped>
#computer {
	width : 142px;
 	height : 200px;	
}
</style>