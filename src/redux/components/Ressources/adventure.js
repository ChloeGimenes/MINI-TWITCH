import React, { useEffect, useState } from 'react';
import axios from 'axios';



function Adventure (props) {
  
    const [allAdv, setAllAdv] = useState([]);
  
    useEffect(() => {
        
      axios
        .get("http://localhost:3040/adv",  { 
          headers: {
          withCredentials: true,
          credentials: 'same-origin'
          }
        })
        .then(res => res.data)
        .then(data => setAllAdv(data));
        
    }, []);
  

    return (

        <div>
            <h1 className="titreGames">AVENTURE</h1>
            <div className="flexAccueil">
                {allAdv.map((adv, index) => (
                    <div className="cartesGames" key={index}>
                            <img  src={adv.picture} alt="game pic" className="imgCarte" />
                        <div className="cardBodyGames" >
                            <h5 className="titreCartesGames">{adv.name}</h5>
                        </div>
                    </div>
          
                ))}
            </div>
        </div>
    )

}    

export default Adventure;