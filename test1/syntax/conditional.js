//입력받는 곳
var args = process.argv;
console.log(args);
//args 에 담기 내용들 섹션별 해석
/*
[
    'C:\\Program Files\\nodejs\\node.exe',
    'C:\\workspace\\nodejs\\syntax\\conditional.js',
    'ghdwpaks'
]
*/
//1.'노드js의 런타임이 어디 위치하고있는지에 대한 정보'
//2.'실행시킨 파일의 경로'
//3.'입력값'
//4.'그다음 입력값'
console.log(args[2]);
//배열형식으로 args 가 생성되고 활용되니까
//args[2]라는것은 '첫번째 입력값'을 나타내게 됨
//입력값 섹션에 들어가는 모든 단어 및 숫자, 문장들은
//전부 문자열 처리 되어 입력됨.



console.log('A');
console.log('B');

if (args[2] === '1') {
    console.log('C1_t');
} else {
    console.log('C1_f');
}
if (args[2] === 1) {
    console.log('C2_t');
} else {
    console.log('C2_f');
}
//입력값 섹션에 들어가는 모든 단어 및 숫자, 문장들은
//전부 문자열 처리 되어 입력됨.

//따라서, 문자열로 감싼 '1'이라는 것에는 true를 반환하지만
//문자열이 아닌 숫자 1이라는것에는 false를 반환함
console.log('D');





