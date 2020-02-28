import Vue from 'vue';	// npm package 에 설치한 Vue 가져오기
import LottoGenerator from './lottoGenerator'; // vue 확장자 코드 파일 호출

new Vue(LottoGenerator).$mount( '#root' );	// new Vue({el : '#root' }) 와 같은 효과 