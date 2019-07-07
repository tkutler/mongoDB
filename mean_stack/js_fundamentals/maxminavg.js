function minMaxAvg(arr) {
    var min = arr[0];
    var max = arr[0];
    var sum = 0; 
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]; 
        }
        if (arr[i] < min){
            min = arr[i]
        } 
    sum = sum + arr[i]
    }
    var avg = sum / arr.length;
    var newstring = ['The max is'+ max +"the min is" + min + "the average is" + avg]
    return newstring
} 
minMaxAvg([3,4,3,5])