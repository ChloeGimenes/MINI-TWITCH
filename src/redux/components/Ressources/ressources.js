import React, { useEffect, useState } from 'react';
import Favoris from './favoris'
import axios from 'axios';
import { connect } from 'react-redux';
import Cat from './kids';
import Fights from './fights';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import FontAwesome from 'react-fontawesome';


function Ressources (props) {

  // const {games} = props;
  
  const localStorageRes = localStorage.getItem("email");
  const user = localStorageRes;
  
  const [games, setAllGames] = useState([]);
  const [wish, setAllWish] = useState([]);


  /* GET ALL GAMES */  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await axios
          .get("http://localhost:3040/db",  { 
            headers: {
            withCredentials: true,
            credentials: 'same-origin'
            }
          })

          let gotGames = results.data;
          setAllGames(gotGames);

          console.log('GAMES', gotGames)

          if (!results.ok) {
            throw Error(results.statusText);
          }
        }
        catch (error) {
          console.log(error)
        }
    }
    fetchData();
  }, []);



/* GET ALL MY WISH */         
  useEffect(() => {
      
        const fetchData = async () => {
        
         const localStorageRes = localStorage.getItem("email");
         const user = localStorageRes;
    
         try{
           const results = await axios
          .get(`http://localhost:3040/favoris/${user}`,  { 
            headers: {
            withCredentials: true,
            credentials: 'same-origin',
            'Access-Control-Allow-Credentials' : true,
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'GET',
            'Access-Control-Allow-Headers':'application/json',
            },
          })
            let fav = results.data;
            setAllWish(fav);
    
            if (!results.ok) {
              throw Error(results.statusText);
            }
        } catch (error) {
          console.log(error)
          }
        }
          fetchData();
      }, []);
    
props.dispatch({
  type: 'GET_ALL_WISH',
  payload: wish
});



  /* CLICK ADD FAVORIS */  
  const handleClick = async (gamed) => {

    props.dispatch({
      type: 'ADD_WISHLIST',
      payload: gamed
      
    });

    try {
        const body = {
          user : localStorageRes,
          games_id : gamed.id,
        }
        let res = await axios.post("http://localhost:3040/fav", body)
        let {data} = res.data

        // refreshWisList();

    } catch (error) {
          console.log(error)
        };
    };
   

  /* CLICK DELETE FAVORIS */
  const handleClickDelete = async (gamed) => {

  try {
      const user = localStorageRes
      console.log('click', localStorageRes)
      let res = await axios.delete(`http://localhost:3040/favd/${user}/${gamed.id}`)
      let {data}= res.data

      // refreshWisList();

    } catch (error) {
      console.log(error)
    }

  };

//     /* REFRESH FAV */  
// const refreshWisList = async () => {
//   const user = localStorageRes;
//   try{
//     const results = await axios
//    .get(`http://localhost:3040/favoris/${user}`,  { 
//      headers: {
//      withCredentials: true,
//      credentials: 'same-origin',
//      'Access-Control-Allow-Credentials' : true,
//      'Access-Control-Allow-Origin':'*',
//      'Access-Control-Allow-Methods':'GET',
//      'Access-Control-Allow-Headers':'application/json',
//      },
//    })
//      let fav = results.data;
//      setAllWish(fav);

//      if (!results.ok) {
//        throw Error(results.statusText);
//      }
//  } catch (error) {
//    console.log(error)
//    }
//  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };
 
  let style = {
    height: '350px',
    width: '280px',
  }


        return (
        <div className="WishList">
            <div>
              <h1 className="titreGamesWish">CATALOGUE NOUVEAUTES</h1>
              <Carousel
                sliderClass=""
                slidesToSlide={1}
                minimumTouchDrag={80}
                additionalTransfrom={0}
                centerMode={true}
                swipeable={true}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                keyBoardControl={true}
                customTransition="all 0.4"
                transitionDuration={100}
                containerClass="carousel-container"
                removeArrowOnDeviceType={['tablet', 'mobile']}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {games.map((gamed, index) => (
  
                  <div className="cartesGamesWish" key={index}>
                    <img src={gamed.picture} alt="game pic" className="imgCarte" style={style}/>
                      <div className="cardBodyGames" >
                          <h4 className="titreCartesGamesName">{gamed.name}</h4>
                          <h5 className="titreCartesGamesPrice">{gamed.price}&nbsp;€</h5>
                          <button onClick={()=> handleClick(gamed)}>ADD ME IN YOUR FAV !</button>
                          <button onClick={()=> handleClickDelete(gamed)} >DELETE ME</button>
                      </div>
                  </div>
                 )
               )}
               
            </Carousel>
            </div>
            <Fights />
            <Cat />
            <Favoris />
        </div>
    
  )
}

const mapStateToProps = state => {
  return {
    wish: state.wish
  };
};


export default connect(null, null)(Ressources);




