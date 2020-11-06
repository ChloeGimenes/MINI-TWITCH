import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


function Favoris (props) {

    const {wish} = props;
    const localStorageRes = localStorage.getItem("email");  

  /*CLICK DELETE WISHLIST*/
  const handleClickDelete = async (x) => {
    console.log('CONSOLE LOG DE X DES FAV DES Fav', x);

    props.dispatch({
      type: 'REMOVE_WISHLIST',
      payload: x
    });


  try {
      const user = localStorageRes
      // console.log('remove', localStorageRes, x.id)
      let res = await axios.delete(`http://localhost:3040/favd/${user}/${x.id}`)
      let {data} = res.data;
      return data;

    } catch (error) {
      console.log(error)
    }
  };

  let style = {
    height: '350px',
    width: '280px',
  }

  console.log('LE WISH RECUPERE', wish)

    return (
        <div >
            <h1 className="subtitreGamesWish">MA LISTE DE SOUHAITS</h1>
               <div className="flexAccueil">
              
       { Object.keys(wish).map((fav => (
        wish[fav].map((yo, i) => (

         <div className="cartesGamesWish" key={i}>
              <img src={yo.picture} alt="game pic" className="imgCarte" style={style} />
          <div className="cardBodyGames"  >
          <h4 className="titreCartesGamesName">{yo.name}</h4>
          <h5 className="titreCartesGamesPrice">{yo.price}&nbsp;€</h5>
            <button  className="button-remove" onClick={()=> handleClickDelete(yo)}>DELETE ME</button>
          </div>
      </div>
        )))))
}
    </div>
  </div>            
  )
}    

const mapStateToProps = (state) => {
  return {
    wish: state.wish
  };
};

export default connect(mapStateToProps)(Favoris);