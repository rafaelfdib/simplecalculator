let screen = document.querySelector('#screen');
let controls = document.querySelector('#controls');
let memory = [];
let operatorsOrigin = ["÷", "x", "+", '-'];
let operators = ["\/", "*", "+", '-'];
let lastResult = 0;
let forPercent = 0;
let godHelpMe = false;

controls.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('memory:', memory, 'target:', e.target);
    console.log(`lastResult: ${lastResult}, forPercent: ${forPercent}, godHelpMe: ${godHelpMe} `);
    if (screen.classList.contains('res')) {
        screen.classList.remove('res')
        screen.innerText = ''
    }

    let verify = screen.innerText.includes('+') || screen.innerText.includes('-') || screen.innerText.includes('x') || screen.innerText.includes('÷')

    switch (e.target.classList.value) {
        case 'number':

            if (godHelpMe) {
                screen.innerText = '';
                godHelpMe = false
                lastResult = 0
            }
            if (memory.length > 1) {
                if (lastResult != 0) {
                    memory = [];
                    lastResult = 0;
                }
                if (verify) {
                    memory.push(screen.innerText);
                    screen.innerText = ''
                    if (screen.innerText.includes('.') ? screen.innerText.length < 9 : screen.innerText.length < 8)
                        screen.innerText += e.target.innerText;
                } else {
                    if (godHelpMe) {
                        screen.innerText = '';
                        godHelpMe = false
                        if (screen.innerText.includes('.') ? screen.innerText.length < 9 : screen.innerText.length < 8)
                            screen.innerText += e.target.innerText;
                    } else {
                        if (screen.innerText.includes('.') ? screen.innerText.length < 9 : screen.innerText.length < 8)
                            screen.innerText += e.target.innerText;
                    }

                };
                break
            } else if (memory.length == 1) {
                if (lastResult != 0) {
                    if (verify) {
                        lastResult = 0;
                        memory.push(screen.innerText);
                        screen.innerText = ''
                        if (screen.innerText.includes('.') ? screen.innerText.length < 9 : screen.innerText.length < 8)
                            screen.innerText += e.target.innerText;

                    } else {
                        if (godHelpMe) {
                            screen.innerText = '';
                            godHelpMe = false
                            if (screen.innerText.includes('.') ? screen.innerText.length < 9 : screen.innerText.length < 8)
                                screen.innerText += e.target.innerText;
                            memory = [];
                        } else {
                            if (screen.innerText.includes('.') ? screen.innerText.length < 9 : screen.innerText.length < 8)
                                screen.innerText += e.target.innerText;
                            memory = [];
                        }

                    };

                } else {
                    if (verify) {
                        memory.push(screen.innerText);
                        screen.innerText = ''
                        if (screen.innerText.includes('.') ? screen.innerText.length < 9 : screen.innerText.length < 8)
                            screen.innerText += e.target.innerText;
                        break;
                    };
                    if (screen.innerText.includes('.') ? screen.innerText.length < 9 : screen.innerText.length < 8) {
                        if (godHelpMe) {
                            screen.innerText = '';
                            godHelpMe = false
                            if (screen.innerText.includes('.') ? screen.innerText.length < 9 : screen.innerText.length < 8)
                                screen.innerText += e.target.innerText;
                        } else {
                            if (screen.innerText.includes('.') ? screen.innerText.length < 9 : screen.innerText.length < 8)
                                screen.innerText += e.target.innerText;
                        }
                    }

                }
                lastResult = 0
                break;
            } else if (memory.length == 0) {
                if (verify) {
                    memory.push(screen.innerText);
                    screen.innerText = ''
                    if (screen.innerText.includes('.') ? screen.innerText.length < 9 : screen.innerText.length < 8)
                        screen.innerText += e.target.innerText;
                    break;
                };
                if (screen.innerText.includes('.') ? screen.innerText.length < 9 : screen.innerText.length < 8) {
                    if (godHelpMe) {
                        screen.innerText = '';
                        godHelpMe = false
                        screen.innerText += e.target.innerText;
                    }
                    screen.innerText += e.target.innerText;
                    break;
                }

                break;
            }

        case 'result':

            if (screen.innerText == '.') {

            } else {
                memory.push(screen.innerText)
            }
            let result = memory
                .map((v, i, arr) => {
                    if (operatorsOrigin.includes(arr[i - 1]) && operatorsOrigin.includes(v)) return '';
                    if (operatorsOrigin.includes(v) && i == (arr.length - 1)) return '';
                    if (v === "x") return '*';
                    if (v === "÷") return '\/';
                    if (v === ".") return '';

                    return v
                })
                .map((v, i, arr) => {
                    if (operators.includes(v)) {
                        if (!arr.slice(i + 1).some(x => x != '')) {
                            return ''
                        } else {
                            return v
                        }
                    } else {
                        return v
                    }


                })
                .join("")
            lastResult = eval(result); // in this may be ok use eval
            screen.innerText = lastResult
            if (!result) screen.innerText = 0
            screen.classList.add('res');
            break;

        case "system":

            switch (e.target.innerText) {
                case '.':
                    if (!(screen.innerText.includes('.') || verify))
                        screen.innerText += e.target.innerText;
                    break;

                case 'C':

                    screen.innerText = '';
                    break;
                case 'CA':
                    screen.innerText = '';
                    lastResult = 0;
                    forPercent = 0;
                    godHelpMe = false;
                    memory = [];
                    break;

                default:
                    break;
            }

            break;
        case 'operator':

            forPercent = lastResult

            if (godHelpMe) {

                screen.innerText = '';
                memory = []
                memory.push(forPercent)
                forPercent = 0
                lastResult = 0
                godHelpMe = false
                console.log("operator");
                console.log('memory:', memory, 'target:', e.target);
                console.log(`lastResult: ${lastResult}, forPercent: ${forPercent}, godHelpMe: ${godHelpMe} `);

            };
            if (lastResult != 0) {
                screen.innerText = '';
                memory = []
                memory.push(lastResult)
                lastResult = 0;
            }


            switch (e.target.innerText) {
                case "+":
                    if (verify || screen.innerText == '.' || screen.innerText == '') {
                        screen.innerText = '+';
                        break;
                    };
                    memory.push(screen.innerText);
                    screen.innerText = '+';
                    break;

                case "x":
                    if (memory.length == 0 && screen.innerText == '') {

                        break
                    };
                    if (verify || screen.innerText == '.' || screen.innerText == '') {
                        screen.innerText = 'x';
                        break;
                    };
                    memory.push(screen.innerText);
                    screen.innerText = 'x';
                    break;
                case "÷":
                    if (memory.length == 0 && screen.innerText == '') {

                        break
                    };
                    if (verify || screen.innerText == '.' || screen.innerText == '') {
                        screen.innerText = '÷';
                        break;
                    };
                    memory.push(screen.innerText);
                    screen.innerText = '÷';
                    break;

                case "-":
                    if (verify || screen.innerText == '.' || screen.innerText == '') {
                        screen.innerText = '-';
                        break;
                    };
                    memory.push(screen.innerText);
                    screen.innerText = '-';
                    break;

                case "%":
                    if (forPercent != 0) {

                        screen.innerText = forPercent / 100
                        lastResult = forPercent / 100
                        godHelpMe = true

                    } else if (!isNaN(screen.innerText)){
                        lastResult = screen.innerText / 100;
                    screen.innerText = lastResult;
                    godHelpMe = true
                    }

                    break;

                default:
                    break;
            }





        default:

            break;
    }
})