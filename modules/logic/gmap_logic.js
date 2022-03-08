
const axios = require('axios');

class GmapLogic {

    static async go(keyword)
    {
        let promise = new Promise((resolve, reject)=>{

            let url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?";
        
            let key = process.env.KEY;
            let parameters = "input=" + encodeURIComponent(keyword);
            parameters += "&&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=" + key;
    
            url += parameters;
            console.log(url);
    
            // Make a request for a user with a given ID
            axios.get(url)
            .then(function (response) {
                // handle success
                //console.log(response.data);
                console.log("Response")
                let response2 = { result: true, payload: response.data }
                console.log(response2)
                resolve(response2);
            })
            .catch(function (error) {
                // handle error
                //console.log(error);
                reject({ result: false, error: error });
            })
            .then(function () {
                // always executed
            });
        })

        return promise;
    }

    static async searchNearBy(lat, lng, keyword, radius)
    {
        let promise = new Promise((resolve, reject)=>{

            let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
            //radius = radius * 1000;

            let key = process.env.KEY;

            let parameters = "location=" + encodeURIComponent(lat) + "%2C" + encodeURIComponent(lng) + "&keyword=" + encodeURIComponent(keyword);
            parameters += "&radius=" + encodeURIComponent(radius) + "&key=" + key;

            url += parameters;
            console.log(url);
    
            // Make a request for a user with a given ID
            axios.get(url)
            .then(function (response) {
                // handle success
                console.log(response.data);
                resolve({ result: true, payload: response.data });
            })
            .catch(function (error) {
                // handle error
                //console.log(error);
                reject({ result: false, error: error });
            })
            .then(function () {
                // always executed
            });
        })

        return promise;
    }
}

module.exports = GmapLogic;