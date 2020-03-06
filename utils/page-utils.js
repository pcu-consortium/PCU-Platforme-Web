
var debug = require('debug')('arma:utils:page-utils');

var computePage = function(manager, params, layout, req, res){
    params.site = req.site;

    try {
        manager.resolveSite(params, function (error, siteParameters) {
            if (error) {
                debug(error);
                res.statusCode = 500;
                res.end();

                return;
            }

            if (siteParameters === null) {
                res.statusCode = 404;
                res.end();

                return;
            }
            // var content = params.content;
            // if (content){
            //     for(var key in content){
            //         if (content.hasOwnProperty(key)){
            //             siteParameters.content[key] = content[key];
            //         }
            //     }
            // }
            if (params.content){
                siteParameters.content = params.content;
            }

            res.render(layout, siteParameters);
            res.end();
        });
    } catch (error) {
        debug(error);
        res.statusCode = 500;
        res.end();
    }
};

module.exports = {
    computePage: computePage
};