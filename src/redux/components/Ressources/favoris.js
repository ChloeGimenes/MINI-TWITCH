import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


function Favoris (props) {

    const {wish, allwish} = props;

    console.log('les wish des fav', wish)

    const localStorageRes = localStorage.getItem("email");

  /*CLICK ADD WISHLIST*/
  const handleClick = async (yo) => {

  const localStorageRes = localStorage.getItem("email");
  const user = localStorageRes;
  try {
    const body = {
        user : localStorageRes,
        games_id : yo.id,
    }
    let res = await axios.post("http://localhost:3040/fav", body)
    let {data} = res.data

  } catch (error) {
          console.log(error)
        };
    };

  

  /*CLICK DELETE WISHLIST*/
  const handleClickDelete = async (x) => {

    console.log('CONSOLE LOG DE X DES FAV DES Fav', x);

    props.dispatch({
      type: 'REMOVE_WISHLIST',
      payload: x
    })

  try {
      const user = localStorageRes
      console.log('remove', localStorageRes, x.id)
      let res = await axios.delete(`http://localhost:3040/favd/${user}/${x.id}`)
      let {data} = res.data;

    } catch (error) {
      console.log(error)
    }
  };

  let style = {
    height: '350px',
    width: '280px',
  }

  console.log('LE WISH RECUPERE', wish)



  console.log('LE WISH RECUPERE', )
    return (
        <div >
            <h1 className="subtitreGamesWish">MA LISTE DE SOUHAITS</h1>
               <div className="flexAccueil">
              
           { Object.keys(wish).map === 0 ? (

                  Object.keys(wish).map((fav => (
                    wish[fav].map((yo) => (
                      yo.map((x, i) =>
                        <div className="cartesGamesWish" key={i}>
                            <img src={x.picture} alt="game pic" className="imgCarte" style={style} />
                           <div className="cardBodyGames"  >
                             <h4 className="titreCartesGamesName">{x.name}</h4>
                               <h5 className="titreCartesGamesPrice">{x.price}&nbsp;€</h5>
                                 <button onClick={()=> handleClick(x)}>ADD ME IN YUR FAV !</button>
                                 <button onClick={()=> handleClickDelete(x)}>DELETE ME</button>
                             </div>
                         </div>
                      ))))))
           ) :  (
            
            Object.keys(wish).map((fav => (
              wish[fav].map((yo, i) => (

           <div className="cartesGamesWish" key={i}>
                    <img src={yo.picture} alt="game pic" className="imgCarte" style={style} />
                <div className="cardBodyGames"  >
                <h4 className="titreCartesGamesName">{yo.name}</h4>
                  <h5 className="titreCartesGamesPrice">{yo.price}&nbsp;€</h5>
                    <button onClick={()=> handleClick(yo)}>ADD ME IN YOUR FAV !</button>
                    <button onClick={()=> handleClickDelete(yo)}>DELETE ME</button>
                </div>
            </div>
         )
       ))
        )
      )
    )
              }   
            </div>
        </div>
    
  )
}    

const mapStateToProps = (state: Object) => {
  return {
    wish: state.wish
  
  };
};

export default connect(mapStateToProps)(Favoris);