document.addEventListener('DOMContentLoaded', function(){

    const input1 = document.querySelector('#email');
    const input2 = document.querySelector('#password');
    const label1 = document.querySelector('label[for=email]');
    const label2 = document.querySelector('label[for=password]');
    if(input1 && input2 && label1 && label2){
        function ch(){
            if(input1.value.trim()!=='') label1.classList.add('has-content');
            else label1.classList.remove('has-content');
            if(input2.value.trim()!=='') label2.classList.add('has-content');
            else label2.classList.remove('has-content');
        }
        ch();
        input1.addEventListener('input',ch);
        input2.addEventListener('input',ch);
    }
});

function obs(){
    const pass = document.querySelector('#password');
    pass.type = pass.type === 'password'? 'text' : 'password';
}