const CrudRouter = require("./crudrouter");

class GmapRouter {

    static getConfig()
    {
        return {};
    }

    static getRouter(logic)
    {
        var express = require('express');
        const path = require('path');
        var router = express.Router();
        router.logic = logic;
        let me = this;

        router.get('/go/:keyword', (req, res)=>{
            let keyword = req.params.keyword;
            logic.go(keyword).then((result)=>{
                console.log("result")
                console.log(result)
                res.send(result);
            }).catch((res)=>{
                console.log("error")
                console.log(result)
                res.send(result);
            })
        });

        router.get('/search-near-by/:lat/:lng/:keyword/:radius',(req, res)=>{
            let keyword = req.params.keyword;
            let lat = req.params.lat;
            let lng = req.params.lng;
            let radius = req.params.radius;

            logic.searchNearBy(lat, lng, keyword, radius).then((result)=>{
                res.send(result);
            }).catch((res)=>{
                res.send(result);
            })
        });

        return router;
    }
}

module.exports = GmapRouter;