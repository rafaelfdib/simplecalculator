export class Observer {
    constructor(){
        this._arr = []
    }

    subscribe(fn){
        if( !fn instanceof Function)
            throw Error('Only functions can subscribe to an Observer')

        this._arr.push(fn);
    }

    unsubcribe(fn){
        this._arr.filter( e => e != fn)
    }

    notify(...args){
        this._arr.forEach( (e,i) => e(args[i]))
    }

}