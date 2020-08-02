import React from 'react'

function Ressources () {

    function getRandomPic() {
        let pics = [

            "",
            "",
            "",
            "",
            "",

        ]
        let result = '';

        for ( var i = 0; i < 1000; i++ ) {
            result += Math.floor(Math.random());
        }
        return result;
        setInterval(getRandomPic, 2000);
    }
    
   
        return (

            <div className="row justify-content-md-center">
                <h1 className="mt-5">Ressources secrètes</h1>
                <img />
            </div>

        )
    
}

export default Ressources
