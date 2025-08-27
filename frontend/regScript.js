document.addEventListener('DOMContentLoaded', function() {
    const input3 = document.querySelector('#confirm');
    const label3 = document.querySelector('label[for=confirm]');
    const input1 = document.querySelector('#email');
    const input2 = document.querySelector('#password');
    const label1 = document.querySelector('label[for=email]');
    const label2 = document.querySelector('label[for=password]');
    if(input3 && label3 && input2 && label2 && input1 && label1){
        function ch(){
            if(input3.value.trim()!=='') label3.classList.add('has-content');
            else label3.classList.remove('has-content');
            if(input2.value.trim()!=='') label2.classList.add('has-content');
            else label2.classList.remove('has-content');
            if(input1.value.trim()!=='') label1.classList.add('has-content');
            else label1.classList.remove('has-content');
        }
        ch();
        input3.addEventListener('input',ch);
        input2.addEventListener('input',ch);
        input1.addEventListener('input',ch);
    }
});

function obs2(){
    const con = document.querySelector('#confirm');
    con.type = con.type === 'password'? 'text' : 'password';
}
function obs(){
    const pass = document.querySelector('#password');
    pass.type = pass.type === 'password'? 'text' : 'password';
}
