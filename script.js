const CALC = {
    buttons: [
    'btn_0',
    'btn_1',
    'btn_2',
    'btn_3',
    'btn_4',
    'btn_5',
    'btn_6',
    'btn_7',
    'btn_8',
    'btn_9',
    'btn_backspace',
    'btn_divide',
    'btn_multiply',
    'btn_subtract',
    'btn_add',
    'btn_operate',
    'btn_decimal',
],
    keys: {
        number: [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
        ],
        operate: [
            '+',
            '-',
            '*',
            '/',
            '.',
            'Enter',
            'Backspace',
        ]
    }
}
    
let equation = {
    firstTerm: document.getElementById('firstTerm'),
    secondTerm: document.getElementById('secondTerm'),
    operation: document.getElementById('operation'),
    operate: function(){
        let firstTermNum = +this.firstTerm.innerText;
        let secondTermNum = +this.secondTerm.innerText;

        if(!(this.firstTerm.innerText && this.operation.innerText && this.secondTerm.innerText)){
            return 'requires three terms'
        }
        switch(this.operation.innerText){
            case "+":
                firstTermNum += secondTermNum
                break;
            case "-":
                firstTermNum -= secondTermNum
                break;
            case "*":
                firstTermNum *= secondTermNum
                break;
            case "/":
                if(secondTermNum == 0){
                    return 'cannot divide by zero'
                }
                firstTermNum /= secondTermNum
                break;
        }
        this.firstTerm.innerText = firstTermNum.toString()
        this.operation.innerText = ''
        this.secondTerm.innerText = ''
    },
    backspace: function(){
        let target = this.activeTerm();
        target.innerText = target.innerText.slice(0,target.innerText.length-1);
    },
    calcInput: function(inputRequest){
        const operationRegex = /\+|\-|\/|\*/
        switch(inputRequest){
            case 'Enter':
                if(this.activeTerm() == this.secondTerm){
                   this.operate() 
                };
                break;
            case 'Backspace':
                this.backspace()
                break;
            case '.':
                if(this.activeTerm().innerText.match(/\./)){
                    return
                }
                break;
        }
        if(inputRequest.match(operationRegex)){
            if(this.activeTerm() == this.secondTerm){
                this.operate()
            };
            if(this.activeTerm() == this.operation && inputRequest == '-'){
                this.secondTerm.innerText += inputRequest;
            }else if(this.activeTerm() == this.firstTerm && !(this.firstTerm.innerText) && inputRequest == '-'){
                this.firstTerm.innerText += inputRequest;
            }else{this.operation.innerText = inputRequest;}
        }else if(inputRequest.match(/[0-9]|\./)){
            if(this.activeTerm() == this.operation){
                this.secondTerm.innerText += inputRequest
            }else{
                this.activeTerm().innerText += inputRequest
            }
        }
    },
    activeTerm: function(){
        if(this.secondTerm.innerText){
            return this.secondTerm
        }else if(this.operation.innerText){
            return this.operation
        }else{
            return this.firstTerm
        }
    }
}

function setInputEventListeners(buttons){
    for(i = 0; i < buttons.length; i++){
        document.getElementById(buttons[i]).addEventListener(('click'), (event) => {handleBtnClick(event.target)})
    }
    document.addEventListener(('keydown'), (event) => {handleKeyDown(event.key)})
}

setInputEventListeners(CALC.buttons, CALC.keys);

function handleBtnClick(htmlTarget){
    var targetText = htmlTarget.innerText
    if(targetText == '<-'){
        targetText = 'Backspace'
    }else if(targetText == '='){
        targetText = 'Enter'
    }
    equation.calcInput(targetText);
};

function handleKeyDown(keyRequest){
    console.log(keyRequest)
    if (CALC.keys.number.includes(keyRequest) || CALC.keys.operate.includes(keyRequest)){
        equation.calcInput(keyRequest)
    };
};