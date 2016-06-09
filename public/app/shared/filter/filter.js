angular.module('devHousing')

.filter('orderByCampus', () => {
    return (input, attribute) => {
        if (!angular.isObject(input)) return input;
        let array = [];
        for (let key in input) {
            array.push(input[key]);
        }
        let i = 0;
        array.sort( (a, b) => {
            a = a[attribute];
            b = b[attribute];

            if (a < b) {
                return -1;
            } else {
                return 1;
            }
            return 0;
        })
        return array;
    }


    // END of Filter
})
