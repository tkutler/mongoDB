function bubblesort(arr){
    for (var j= 0; j < arr.length; j++) { 
        // var count = 0; 
        // if (arr[i] > arr[i + 1]) {
        //     count ++
        // }
        // if (count === 0) {
        //     console.log("in order")
        //     return (arr)
        // }
        var count = 0;

        for (var i = 0; i < arr.length-j-1; i++) {
            if (arr[i] > arr[i +1]) {
                count ++
                var temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;

            }     
        }
        if (count === 0){
            console.log("early exit")
            return(arr)
        }
    
    } return(arr)
} 
bubblesort([1,2,3,4,5])