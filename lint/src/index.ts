console.log("hello world!");
let variable_naming;
function check_cyclomatic_complexity(x:number){
    if (x>0) {
        return x; 
    }  else {
        return 4; 
    }
}
// check_cyclomatic_complexity(2);


// No unnecessary condition
// function check(){
//     if (true) return 1;
//     else return 0;
// }

// async function check_promise(){
//     const promise = new Promise((resolve, reject) => resolve('value'));
//     promise;
// }

//shadow error
// const nameString = 'abc';
// const change = () =>{
//     const nameString = 'xyz';
//     console.log(nameString);
// };



console.log("for pr");