var request = require("request");

request('http://www.omdbapi.com/?i=tt0172495&apikey=thewdb', function(error, response, body) {
    // eval(require('locus'));
    if (error) {
        console.log(error);
    } else {
        if(response.statusCode == 200) {
            const parsedData = JSON.parse(body);
            console.log(parsedData);
        }
    }
});