const AuthenticationController = require("./controllers/authentication");
require("./services/passport");
const passport = require("passport");


const requireToken = passport.authenticate("jwt", { session: false});

const requireValidCredentials = passport.authenticate("local", {session: false});


module.exports = function (expressServer) {

        ///exemple test:
        // expressServer.get('/', function(req, res, next) {

        //     res.send({serverData: ["Gibson", "Ibanez", "Yamaha"]})
        // });

        expressServer.post('/signup', AuthenticationController.signup );

        expressServer.get("/ressources", requireToken, function(req, res){
            res.send({data: "Ceci est du contenu sécurisé"});
        });

        expressServer.get("/ressources/:id", requireToken, function(req, res){
            res.send({data: "Ceci est du contenu sécurisé"});
        });

        expressServer.post(
            "/signin", 
            requireValidCredentials, 
            AuthenticationController.signin
            );

    
}