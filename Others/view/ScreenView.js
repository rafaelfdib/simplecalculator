class ScreenView {
    constructor(){
        this.view = document.querySelector('#screen');
    }

    update(value){
       this.view.innerHTML = ValidationHelper.validateToScreen(value);      
    }

    clean(){
        this.view.innerHTML = '';
    }
}