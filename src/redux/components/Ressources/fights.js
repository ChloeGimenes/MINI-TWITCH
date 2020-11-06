import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';



function Fights (props) {
  
    const [allFights, setAllFights] = useState([]);
    const { wish, added} = props;
    const localStorageRes = localStorage.getItem("email");
    const user = localStorageRes;

    useEffect(() => {
      
      const fetchData = async () => {
  
        try {
          const results = await axios
            .get("http://localhost:3040/fights",  { 
              headers: {
              withCredentials: true,
              credentials: 'same-origin'
              }
            })
            let gotFights = results.data;
            setAllFights(gotFights);
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

  
    const handleClick = async (fight) => {

      props.dispatch({
        type: 'ADD_WISHLIST',
        payload: fight
        
      });
  
      try {
          const body = {
            user : localStorageRes,
            games_id : fight.id,
          }
          let res = await axios.post("http://localhost:3040/fav", body)
          let {data} = res.data
  
  
      } catch (error) {
            console.log(error)
          };
      };
     
  
    /* CLICK DELETE FAVORIS */
    const handleClickDelete = async (fight) => {
      
      props.dispatch({
        type: 'REMOVE_WISHLIST',
        payload: fight
      })

      
    try {
        const user = localStorageRes
        console.log('click', localStorageRes)
        let res = await axios.delete(`http://localhost:3040/favd/${user}/${fight.id}`)
        let {data}= res.data

  
      } catch (error) {
        console.log(error)
      }
  
    };
  
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

        <div>
            <h3 className="subtitreGamesWish">COMBAT</h3>
            
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
            
                {allFights.map((fight, index) => {
                   const inTheBucket = wish.wish.filter(game => fight.id === game.id);
                   
                   return (

                   <div className="cartesGamesWish" key={index}>
                            <img  src={fight.picture} alt="game pic" className="imgCarte" style={style} />
                        <div className="cardBodyGames" >
                          <h4 className="titreCartesGamesName">{fight.name}</h4>
                          <h5 className="titreCartesGamesPrice">{fight.price}&nbsp;€</h5>
                          {inTheBucket.length === 0 && <button 
                              className="button-add" 
                              onClick={()=> handleClick(fight)}
                              style={{
                                textDecoration: added ? 'display' : 'none'
                              }}>
                                ADD ME!
                              </button>
                          }
                        </div>
                    </div>
          
    )})}
                
           </Carousel>
            
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


export default connect(mapStateToProps)(Fights);
