let screen = document.querySelector('#screen');
let controls = document.querySelector('#controls');
let memory = []
screen.innerText = ''

let observer = {
    'subjects': [],
    'subscribe': (fn) => observer.subjects.push(fn),
    'unsubscribe': (fn) => observer.subjects = observer.subjects.filter(e => e != fn),
    'notfy': () => observer.subjects.forEach(e => e())
}

let clearView = () => screen.innerText = '';

let updateView = (val) => {
    if (verifyViewContent('.') ? screen.innerText.length < 9 : screen.innerText.length < 8)
        screen.innerText += val;

    observer.notfy()
};

let getViewValue = () => screen.innerText;

let verifyViewContent = (...values) => values.some(e => screen.innerText.includes(e));

let verifyViewMax = () => {
    if (verifyViewContent('.') ? screen.innerText.length > 9 : screen.innerText.length > 8) {
        clearView();
        updateView('ERROR');
        setTimeout(() => clearView(), 500);
    }
};

observer.subscribe(verifyViewMax)

let clearMemory = () => memory = [];

let verifyMemory = () => {
    if (memory.length == 0) {
        observer.unsubscribe(verifyViewMax)
        console.log(observer);
        clearView();
        updateView('Memory is empty');
        setTimeout(() => {
            clearView()
            observer.subscribe(verifyViewMax)
        }, 500);
    }
};

let clearInNextMove = false;

let engine = {
    'operator': {

        'sum': (a, b = 0) => a + b,

        'subtraction': (a, b = 0) => a - b,

        'multiplication': (a, b = 0) => a * b,

        'division': (a, b = 1) => a / b,

        'percentage': (a) => (a / 100),
    },

    'system': {

        'clear': () => clearView(),

        'clearAll': () => {
            clearView();
            clearMemory();
        },

        'dot': () => {
            if (!verifyViewContent('.')) {
                updateView('.');
            }
        }
    },

    'enter': (a) => {
        if (memory.length < 2) memory.push(a);
        clearView();
    },

    'number': (v) => updateView(v)
};


controls.addEventListener('click', (e) => {

    let val = e.target.classList.value;
    let metaData = e.target.getAttribute('meta-data')

    if (val == 'enter') {

        engine[val](parseFloat(getViewValue()));

    } else if (val == 'number') {
        if (clearInNextMove == true) {
            clearView();
            clearInNextMove = false;
        }
        engine[val](metaData);
    } else if (val == 'operator') {

        verifyMemory()
        clearView()
        updateView(engine[val][metaData](memory[0], memory[1]));
        clearMemory()
        clearInNextMove = true;
    } else {
        engine[val][metaData]();
    }

});