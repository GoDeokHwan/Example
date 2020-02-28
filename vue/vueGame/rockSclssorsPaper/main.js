import Vue from 'vue';	// npm package 에 설치한 Vue 가져오기
import RockSclssorsPaper from './rockSclssorsPaper'; // vue 확장자 코드 파일 호출

new Vue(RockSclssorsPaper).$mount( '#root' );	// new Vue({el : '#root' }) 와 같은 효과 