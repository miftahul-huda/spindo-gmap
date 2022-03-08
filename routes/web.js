const CrudRouter = require("./crudrouter");

class WebRouter {

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

        router.get('', (req, res)=>{
            var dir = __dirname;
            var p = path.resolve( dir, "../public/pages/", "index");
            res.render(p, { config: me.getConfig() } )
        });

        return router;
    }
}

module.exports = WebRouter;