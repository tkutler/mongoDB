function fizzbuzz(n) {
    for (var i = 1; i < n; i++) {
        if (i % 3 == 0 && i % 5 == 0) {
            console.log('fizzbuzz')
        }
        if (i % 3 == 0 && i % 5 == 1){ 
            console.log('fizz')  
        }
        if (i % 3 == 1 && i % 5 == 0) {
            console.log('buzz') 

        }
        else {
            console.log(i)
        }
            
        }
    }
fizzbuzz(15) 