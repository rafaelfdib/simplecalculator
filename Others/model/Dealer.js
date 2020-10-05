import { NumericMemory } from './NumericMemory.js';
import { OperatorsMemory } from './OperatorsMemory.js';
export class Dealer {

    constructor(){
        this._arr = []
    }
    static watch(obj){
        if(!(obj instanceof NumericMemory || obj instanceof OperatorsMemory))
            throw Error('Must be a instance of NumericMemory or OperatorsMemory')
        if(this._arr.length == 0) this._arr.push(obj)
        

    }
}