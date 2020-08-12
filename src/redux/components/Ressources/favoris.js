import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';



function Favoris (props) {
  
    const {wish} = props;
    
  const localStorageRes = localStorage.getItem("email");

  
    // useEffect(() => {
        
    //   axios
    //     .get("http://localhost:3040/fav",  { 
    //       headers: {
    //       withCredentials: true,
    //       credentials: 'same-origin'
    //       }
    //     })
    //     .then(res => res.data)
    //     .then(data => setAllFav(data));
        
    // }, []);
  
//  /* GET MY FAVORIS */ 
//  useEffect(() => {
      
//     const fetchData = async () => {
    
//      const localStorageRes = localStorage.getItem("email");
//      const user = localStorageRes;

//      try{
//        const results = await axios
//       .get(`http://localhost:3040/favoris/${user}`,  { 
//         headers: {
//         withCredentials: true,
//         credentials: 'same-origin',
//         'Access-Control-Allow-Credentials' : true,
//         'Access-Control-Allow-Origin':'*',
//         'Access-Control-Allow-Methods':'GET',
//         'Access-Control-Allow-Headers':'application/json',
//         },
//       })
//         let fav = results.data;
//         setAllFav(fav);

//         if (!results.ok) {
//           throw Error(results.statusText);
//         }
//     } catch (error) {
//       console.log(error)
//       }
//     }
//       fetchData();
//   }, []);

//   console.log ("les favs !", allFav);


// /* REFRESH FAV */  
// const refreshWisList = async (fav) => {
//     const user = localStorageRes;
//     try{
//       const results = await axios
//      .get(`http://localhost:3040/favoris/${user}`,  { 
//        headers: {
//        withCredentials: true,
//        credentials: 'same-origin',
//        'Access-Control-Allow-Credentials' : true,
//        'Access-Control-Allow-Origin':'*',
//        'Access-Control-Allow-Methods':'GET',
//        'Access-Control-Allow-Headers':'application/json',
//        },
//      })
//        let fav = results.data;
//        setAllFav(fav);

//        if (!results.ok) {
//          throw Error(results.statusText);
//        }
//    } catch (error) {
//      console.log(error)
//      }
//    }


  /*CLICK ADD WISHLIST*/
  const handleClick = async (yo) => {

  const localStorageRes = localStorage.getItem("email");
  const user = localStorageRes;
  try {
    const body = {
        user : localStorageRes,
        games_id : yo.id,
    }
    let res = await axios.post(`http://localhost:3040/favd/${user}/${yo.id}`, body)
    let {data} = res.data

    // refreshWisList();

  } catch (error) {
          console.log(error)
        };
    };

  

  /*CLICK DELETE WISHLIST*/
  const handleClickDelete = async (yo) => {

    props.dispatch({
      type: 'REMOVE_WISHLIST',
      payload: yo.id
    })

  try {
      const user = localStorageRes
      console.log('click', localStorageRes)
      let res = await axios.delete(`http://localhost:3040/favd/${user}/${yo.id}`)
      let {data} = res.data;

      // refreshWisList();

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
            <h1 className="titreGamesWish">WISH LIST</h1>
               <div className="flexAccueil">
                {Object.keys(wish).map((fav, i) => (
                  wish[fav].map((yo =>
                    <div className="cartesGamesWish" key={i}>
                    <img src={yo.picture} alt="game pic" className="imgCarte" style={style} />
                <div className="cardBodyGames"  >
                <h4 className="titreCartesGamesName">{yo.name}</h4>
                  <h5 className="titreCartesGamesPrice">{yo.price}&nbsp;€</h5>
                    <button onClick={()=> handleClick(yo)}>ADD ME IN YOUR FAV !</button>
                    <button onClick={()=> handleClickDelete(yo)}>DELETE ME</button>
                </div>
            </div>
                    
                    
                    ))
                    
                    
                  )
               )}
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