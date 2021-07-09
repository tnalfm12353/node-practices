

exports.sum = function() {
    let sum = 0;

    // Array.prototype.forEach.call(arguments, element => {
    //     sum += element;
    // });


    Array.from(arguments).forEach(element =>{
        sum += element;
    });

    return sum;
};

exports.max = function() {
    let max = Number.MIN_SAFE_INTEGER;

    Array.from(arguments).forEach(element =>{
        max = element > max ? element : max;
    });

    return max;
};

exports.min = function() {
    let min = Number.MAX_SAFE_INTEGER;

    Array.from(arguments).forEach(element =>{
        min = element < min ? element : min;
    });

    return min;
};