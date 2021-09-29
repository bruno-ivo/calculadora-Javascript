const display1E1 = document.querySelector('.display-1');
const display2E1 = document.querySelector('.display-2');
const tempResultE1 = document.querySelector('.temp-result');
const numerosE1 = document.querySelectorAll('.numero');
const operacoesE1 = document.querySelectorAll('.operacao');
const igualE1 = document.querySelector('.igual');
const limpaTudoE1 = document.querySelector('.all-clear');
const limpaUltimoE1 = document.querySelector('.last-clear');

let dis1Numero = '';
let dis2Numero = '';
let resultado = null;
let resultadoMultiplicacao = null;
let resultadoSoma = null;
let temPonto = false;
let calculo = [];

numerosE1.forEach( numero => {
    numero.addEventListener('click', (evento) =>{
        let valor = evento.target.innerText;

        if(valor=="*" || valor=='/'|| valor=="+" || valor=='-'){
            let ultimo = dis1Numero.substring(dis1Numero.length-1 );
            if(ultimo==valor){
                return;
            }
            if(ultimo=="*" || ultimo=='/'|| ultimo=="+" || ultimo=='-'){
                dis1Numero = dis1Numero.substring(dis1Numero.length-1, -1 );
            }
        }
        
        dis1Numero+=valor;
        display1E1.innerText = dis1Numero;

})
});


function limpaVariavel(nome = ''){
    dis1Numero += dis2Numero+ ' ' + nome + ' ';
    display1E1.innerText = dis1Numero;
    display2E1.innerText = '';
    dis2Numero = '';
    tempResultE1.innerText = resultado;
}



function mathOperacao(){
    let regex = /^\d+([\/*-+]\d+)+/g;
    if (regex.test(dis1Numero)) {
        let calculo = dis1Numero.split(/(\d)/).filter(x=>x!="");
       

            for (let i = 0; i < calculo.length; i++) {
                if(calculo[i]=="*" || calculo[i]=="/"){
                    if(calculo[i]=="*"){
                        calculo[i-1] = parseFloat(calculo[i - 1]) * parseFloat(calculo[i + 1]);
                    }
                    if(calculo[i]=="/"){
                        calculo[i-1] = parseFloat(calculo[i - 1]) / parseFloat(calculo[i + 1]);
                    }
                    calculo.splice(i, i+1);
                    i--; 
                     
                       
                }
            }
            for (let i = 0; i < calculo.length; i++) {
                if(calculo[i]=="+" || calculo[i]=="-"){
                    if(calculo[i]=="+"){
                        calculo[i-1] = parseFloat(calculo[i - 1]) + parseFloat(calculo[i + 1]);
                    }
                    if(calculo[i]=="-"){
                        calculo[i-1] = parseFloat(calculo[i - 1]) - parseFloat(calculo[i + 1]);
                    }
                    calculo.splice(i, i+1);
                    i--;     
                }
            }

        return calculo[0];
   }
}
   

    


igualE1.addEventListener('click', (evento) => {
    temPonto = false;
    display2E1.innerText = mathOperacao();
       
});

limpaTudoE1.addEventListener('click' , (evento) =>{
    display1E1.innerText = '0';
    display2E1.innerText = '0';
    dis1Numero = '';
    dis2Numero = '';
    resultado = '';
    tempResultE1.innerText = '0';
});

limpaUltimoE1.addEventListener('click', (evento) => {
    display2E1.innerText = '';
    dis2Numero = '';
});

window.addEventListener('keydown', (evento) =>{
    if(
        evento.key === '0' ||
        evento.key === '1' ||
        evento.key === '2' ||
        evento.key === '3' ||
        evento.key === '4' ||
        evento.key === '5' ||
        evento.key === '6' ||
        evento.key === '7' ||
        evento.key === '8' ||
        evento.key === '9' ||
        evento.key === '.' 
    ){
        clicaBotaoE1(evento.key);
    } else if (
        evento.key === '+' ||
        evento.key === '-' ||
        evento.key === '/' ||
        evento.key === '%' 
    ){
        clicaOperacao(evento.key);
    } else if( evento.key === '*'){
        clicaOperacao('X');
    } else if (evento.key === 'Enter' || evento.key === '='){
        clicaIgual();
    }
});

function clicaBotaoE1(key){
    numerosE1.forEach( button => {
        if (button.innerText === key){
            button.click();
        }
    });
}

function clicaOperacao (key){
    operacoesE1.forEach( button => {
        if (button.innerText === key){
            button.click();
        }
    })
}

function clicaIgual () {
    igualE1.click();
}
