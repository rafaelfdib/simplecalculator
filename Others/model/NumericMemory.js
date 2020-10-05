import { Memory } from './Memory.js';
import { ValidationHelper } from '../helper/ValidationHelper.js';

export class NumericMemory extends Memory{

    constructor(){
        super()     
    }

    add(value){
        this._arr.push(ValidationHelper.validateNumber(value));       
    }


}

