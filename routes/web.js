var express = require('express');
var router = express.Router();
const path = require('path');

const fs = require('fs');
const https = require('https');



router.get('web/index', function (req, res){


    var dir = __dirname;
    var p = path.resolve( dir, "../public/pages/", "index");
    res.render(p, { config: getConfig() } )


})


module.exports = router;