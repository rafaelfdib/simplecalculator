let screen = document.querySelector('#screen');
let controls = document.querySelector('#controls');
let memory = [];
controls.addEventListener('click', (e) => {
    e.preventDefault();
    /* new Promise( (resolve, reject){

    }) */
    if (screen.classList.contains('res')){
        screen.classList.remove('res')
        screen.innerText = ''
    }
    let verify = screen.innerText.includes('+') || screen.innerText.includes('-')||screen.innerText.includes('x')||screen.innerText.includes('÷')
    
    switch (e.target.classList.value) {
        case 'number':
            if(verify) {
                memory.push(screen.innerText);
                screen.innerText = ''
            if(screen.innerText.includes('.') ? screen.innerText.length < 9 : screen.innerText.length < 8)
                screen.innerText += e.target.innerText ;
                break;
            };
            if(screen.innerText.includes('.') ? screen.innerText.length < 9 : screen.innerText.length < 8)
                screen.innerText += e.target.innerText ;

            break;
            case 'result':
            
            memory.push(screen.innerText)
             let result = memory.map((v)=>{
                if(v === "x") return '*';
                if(v === "÷") return '\/';
                return v
            }).join("")
            screen.innerText= eval(result); // in this may be ok use eval
            if(!result) screen.innerText= 0
            screen.classList.add('res');
            break; 

        case "system":

                switch (e.target.innerText) {
                    case '.':
                        if(!screen.innerText.includes('.'))
                            screen.innerText += e.target.innerText ;
                        break;

                    case 'C':
                        
                        screen.innerText = '';
                        break;
                    case 'CA':
                        screen.innerText = '';
                        memory = [];
                        break;
                
                    default:
                        break;
                }
                    
            break;
        case 'operator':
           
            switch (e.target.innerText) {
                case "+":
                    if(verify){
                        screen.innerText = '+';
                        break;
                    } ;
                    memory.push(screen.innerText);
                    screen.innerText = '+';
                    break;
                
                case "x":
                    if(verify){
                        screen.innerText = 'x';
                        break;
                    } ;
                    memory.push(screen.innerText);
                    screen.innerText = 'x';               
                    break;
                case "÷":
                    if(verify){
                        screen.innerText = '÷';
                        break;
                    } ;                    
                    memory.push(screen.innerText);
                    screen.innerText = '÷';  
                    break; 
                
                case "-":
                    if(verify){
                        screen.innerText = '-';
                        break;
                    } ;                    
                    memory.push(screen.innerText);
                    screen.innerText = '-';  
                    break;
                
                case "%":
                    screen.innerText = screen.innerText/100;
                    break;

                default:
                    break;
            }
    
         
        
        

        default:

            break;
    }
})