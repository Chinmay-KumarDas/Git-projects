let inputSlider = document.querySelector("#range");
let rangeVal = document.querySelector("#rangeVal");
let pass = document.querySelector("#pass");
let lowercase = document.querySelector("#lowercase");
let uppercase = document.querySelector("#uppercase");
let numbers = document.querySelector("#numbers");
let symbols = document.querySelector("#symbols");
let  submit= document.querySelector("#submit");
let copy = document.querySelector("#copy");

rangeVal.textContent = inputSlider.value = 8;
inputSlider.addEventListener("input", ()=>{
    rangeVal.textContent = inputSlider.value;
});

submit.addEventListener('click', ()=>{
    pass.value = generatePass();
});

copy.addEventListener("click", ()=>{
    if(pass.value != "")
        navigator.clipboard.writeText(pass.value);
});

let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let numberChar = "0123456789";
let symbolChar = "~!@#$%^&*_";


function generatePass(){
    let password = "";
    let allChars = "";

    allChars += lowercase.checked ? lowerChars:"";
    allChars += uppercase.checked ? upperChars:"";
    allChars += numbers.checked ? numberChar:"";
    allChars += symbols.checked ? symbolChar:"";

    for(let i=0; i<inputSlider.value;i++ )
        password +=allChars.charAt(Math.floor(Math.random()*allChars.length));
    return password;
}