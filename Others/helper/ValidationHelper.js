export class ValidationHelper {

    static validateToScreen(value) {
        if (!(value.includes('.') ? value.length <= 9 : value.length <= 8))
            throw Error('The calculator supports only up to 8 numeric characters.');
        return value;
    }

    static validateNumber(value){
        if(isNaN(value)) throw Error('This value must be a number.'); 
        return value;
    }

    static validateOperator(value){
        let operators = ['sum','subtraction','multiplication','division']
        if(!operators.includes(value)) Error('This value must be a operator.'); 
        return value;
    }
}