import React, { useEffect, useState } from 'react';
import Favoris from './favoris'
import axios from 'axios';
import { connect } from 'react-redux';
import Cat from './kids';
import Fights from './fights';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import logo3 from '../pictures/twitchcat.png'


function Ressources (props) {

  
  const localStorageRes = localStorage.getItem("email");

  const { wish, added} = props;
  
  const [games, setAllGames] = useState([]);

  ////////* GET ALL GAMES *///////
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


////////* GET ALL MY WISH *///////        
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
      let myfav = fav;

      console.log('GET mes FAV au useEffect dans ressources pour les mettre dans le tableau WISH ', myfav)

      props.dispatch({
        type: 'GET_ALL_WISH',
        payload: myfav,
      });
      
      if (!results.ok) {
        throw Error(results.statusText);
      }
  } catch (error) {
    console.log(error)
    }
  }
    fetchData();
}, []);


  ////////* CLICK ADD FAVORIS *////////  
  const handleClick = async (gamed) => {

    props.dispatch({
      type: 'ADD_WISHLIST',
      payload: gamed,
    });

    props.dispatch({
      type: 'TOGGLE_BUTTON_HIDE',
      payload: gamed.id
    })

    console.log('add', localStorageRes, gamed.id)

    try {
        const body = {
          user : localStorageRes,
          games_id : gamed.id,
        }
        let res = await axios.post("http://localhost:3040/api/fav", body)
        let {data} = res.data;
        return data;

    } catch (error) {
          console.log(error)
        };
    };


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1
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
  
  console.log(games, "games")
  


        return (
        <div className="WishList">
            <div>
              <img src={logo3} alt="logo catalogue" className="logo-cat"/>
              <h1 className="titreGamesWish">CATALOGUE JEUX</h1>
              <h3 className="subtitreGamesWish" >NOUVEAUTES</h3>
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
                {games.map((gamed, index) => {
                  const inTheBucket = wish.wish.filter(game => gamed.id === game.id);

                return (
                  
                  <div className="cartesGamesWish" key={index}>
                    <img src={gamed.picture} alt="game pic" className="imgCarte" style={style}/>
                      <div className="cardBodyGames" >
                          <h4 className="titreCartesGamesName">{gamed.name}</h4>
                          <h5 className="titreCartesGamesPrice">{gamed.price}&nbsp;€</h5>
                          {inTheBucket.length === 0 && <button 
                              className="button-add" 
                              onClick={()=> handleClick(gamed)}
                              style={{
                                textDecoration: added ? 'display' : 'none'
                              }}>
                                ADD ME!
                              </button>
                          }
                     </div>
                  </div>
                 )
                }
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
    wish: state.wish,
    added: state.wish.added,
    wishId: state.wish.id,
  };
};


export default connect(mapStateToProps)(Ressources);




