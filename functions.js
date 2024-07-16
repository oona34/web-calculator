export function add(nb1, nb2) {
	return nb1 + nb2;
};

export function subtract(nb1, nb2) {
    return nb1 - nb2; 
};
  
// const sum = function(arr) {
//     return arr.reduce((total, currentItem) => total + currentItem, 0);
// };
  
export function multiply(arr) {
    return arr.reduce((total, currentItem) => total * currentItem, 1);
};

export function divide(nb1, nb2) {
    return nb1/nb2;
}

export function callOperation(name, nb1 = null, nb2 = null) {
    if (nb1 === null) {
        return 0;
    } else if (nb2 === null) {
        return Number.parseFloat(nb1);
    } else {
        nb1 = Number.parseFloat(nb1);
        nb2 = Number.parseFloat(nb2);
    }

    switch (name) {
        case "add":
            return add(nb1, nb2);
        case "subtract":
            return subtract(nb1, nb2);
        case "divide":
            return divide(nb1, nb2);
        case "multiply":
            return multiply([nb1, nb2]);
        default:
            return; 
    }
}

