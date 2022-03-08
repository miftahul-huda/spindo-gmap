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

            if(req.session.login != true)
            {
                var dir = __dirname;
                var p = path.resolve( dir, "../public/pages/", "login");
                res.render(p, { config: me.getConfig() } )
            }
            else 
            {
                var dir = __dirname;
                var p = path.resolve( dir, "../public/pages/", "index");
                res.render(p, { config: me.getConfig() } )
            }
            
        });

        router.get("/login/:password", (req, res)=>{
            let password = req.params.password;
            if(password == "rotikeju98*")
            {
                req.session.login = true;
                res.send({ result: true })
            }
            else 
            {
                req.session.login = null;
                res.send({ result: false })
            }
        })

        return router;
    }
}

module.exports = WebRouter;