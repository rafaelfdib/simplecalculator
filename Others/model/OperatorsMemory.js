import { Memory } from './Memory.js';
import { ValidationHelper } from '../helper/ValidationHelper.js';
export class OperatorsMemory extends Memory{
    constructor(){
        super()
    }

    add(value){
        this._arr.push(ValidationHelper.validateOperator(value));       
    }
}