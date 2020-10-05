export class Memory {
    constructor(){
        if(this.constructor == Memory)
            throw 'This is an abstract class, do not instantiate an object.'
        this._arr = [];

    }

    add(){
        throw Error('This method is abstract, needs to be implemented.') 
    }

    clear(){
        this._arr = [];
    }

    get arr(){
        let protectionLayerArray = [];
        return protectionLayerArray.concat(...this._arr);
    }
}

