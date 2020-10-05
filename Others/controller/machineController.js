import { NumericMemory } from '../model/NumericMemory.js';
import { OperatorsMemory } from '../model/OperatorsMemory.js';

export function machineController(numericMemory, operatorsMemory) {

    if (!numericMemory instanceof NumericMemory)
        throw Error('The first argument must be an instance of NumericMemory');

    if (!operatorsMemory instanceof OperatorsMemory)
        throw Error('The second argument must be an instance of OperatorsMemory');

    let nM = numericMemory.arr;

    let engine = {
        'sum': (a, b) => a + b,

        'subtraction': (a, b) => a - b,

        'multiplication': (a, b) => a * b,

        'division': (a, b) => a / b

    }

    if (!(numericMemory.arr.length == operatorsMemory.arr.length + 1))
        throw Error('The number of elements in NumericMemory must be a unit larger than the number of elements in NumericMemory.');
    operatorsMemory.arr.forEach((e, i) => nM[i+1] = engine[e](nM[i],nM[i+1]));

    return nM[nM.length -1]  
}






