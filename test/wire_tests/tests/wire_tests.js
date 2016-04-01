describe('wire_tests.js', function () {
    
    //simple test is defined in test/wire_tests/data/imposter_data.js
    
    var data = JSON3.stringify(simpleTest);
    
    
     //set up mb to have the imposter in place
     beforeAll(function (done)
     {
     $.ajax({
     type: "POST",
     url: "http://localhost:2525/imposters",
     data: data,
     error: error,
     complete: complete,
     success: success
     });
     function error(err)
     {
     console.log("errorin beforeAll " + JSON3.stringify(err));
     done();
     }
     function success(data)
     {
     //console.log(JSON3.stringify(data));
     done();
     }
     function complete()
     {
         console.log("finished beforeAll");
     done();
     }
     }, 5000);
     
     //remove the imposter
     afterAll(function (done)
     {
     //simpleTest is in wire_tests/data/imposter_data.js
     var data = JSON3.stringify(simpleTest);
     $.ajax({
     type: "DELETE",
     url: "http://localhost:2525/imposters/7777",
     error: error,
     complete: complete,
     success: success
     });
     function error(err)
     {
     console.log("error in afterAll " + JSON3.stringify(err));
     }
     function success(data)
     {
     console.log("delete success " );
     done();
     }
     function complete()
     {
       console.log("delete complete")
     done();
     }
     
     
     
     
     }, 5000);
    

    /**
     * crossOrigin = true will cause a preflight options request
     * if that's the case, mb needs to handle it by responding to it
     * see simpleTest for an example of an options response mocked in mb
     * 
     * 
     * @param {type} done
     * @returns {undefined}
     */
    
    it('testTalkingToMb', function (done)
    {
        $.ajax({
                    type: "POST",
                     url: "http://localhost:7777/decorate",
                  // url: "http://donhenton-node.herokuapp.com/morguefile/getData",
                    data: JSON3.stringify({alpha: 25}),

                    contentType: 'application/json',
                   // crossOrigin: true,  
                    error: error,
                    complete: complete,
                    success: success
                });
        function error(err)
        {
            console.log("error in test " + JSON3.stringify(err));
            done.fail();
        }
        function success(data)
        {
            expect(data.indexOf(
                    'The time is') > 0).toBeTruthy();
            done();
        }
        function complete()
        {
            console.log("finished test");
            done();
        }
    }, 5000);
    
    
});