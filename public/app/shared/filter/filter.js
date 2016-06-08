angular.module('devHousing')

.filter('orderByCampus', () => {
    console.log(`made it to my custom filter, bitches!!`);
    return (input, attribute) => {
        console.log(`filter's: ${JSON.stringify(input)}`);
        if (!angular.isObject(input)) return input;
        console.log(`made it past the IF!!`);
        let array = [];
        for (let key in input) {
            array.push(input[key]);
        }
        console.log(`Starting the .sort()`);
        let i = 0;
        array.sort( (a, b) => {
            console.log(`This is the ${i++} iteration`);
            a = a[attribute];
            b = b[attribute];

            if (a < b) {
                return -1;
            } else {
                return 1;
            }
            return 0;
        })

        console.log(array);
        return array;
    }


    // END of Filter
})
