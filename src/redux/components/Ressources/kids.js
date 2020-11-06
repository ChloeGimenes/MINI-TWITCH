import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import FontAwesome from 'react-fontawesome';



function Kids (props) {

    const { wish, added} = props;
    const [allKids, setAllKids] = useState([]);
    
    const localStorageRes = localStorage.getItem("email");
    const user = localStorageRes;

    useEffect(() => {
       
      const fetchData = async () => {
    
          try {
            const results = await axios
              .get("http://localhost:3040/kids",  { 
                headers: {
                withCredentials: true,
                credentials: 'same-origin'
                }
              })
    
              let gotKids = results.data;
              setAllKids(gotKids);
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


      const handleClick = async (kids) => {
        
          props.dispatch({
          type: 'ADD_WISHLIST',
          payload: kids
        });
        try {
            const body = {
              user : localStorageRes,
              games_id : kids.id,
            }
            let res = await axios.post("http://localhost:3040/fav", body)
            let {data} = res.data
    
        } catch (error) {
              console.log(error)
            };
        };
       
    
      /* CLICK DELETE FAVORIS */
      const handleClickDelete = async (kids) => {
 
       props.dispatch({
          type: 'REMOVE_WISHLIST',
          payload: kids
        })

      try {
          const user = localStorageRes
          console.log('click', localStorageRes)
          let res = await axios.delete(`http://localhost:3040/favd/${user}/${kids.id}`)
          let {data}= res.data
  
    
        } catch (error) {
          console.log(error)
        }
    
      };

//*/CAROUSEL*/////
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
            <h3 className="subtitreGamesWish">KIDS</h3>
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
        infinite={false}
        keyBoardControl={true}
        customTransition="all 0.4"
        transitionDuration={100}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
            
                {allKids.map((kids, index) => {

                const inTheBucket = wish.wish.filter(game => kids.id === game.id);

                return (
                    <div className="cartesGamesWish" key={index}>
                      <img src={kids.picture} alt="game pic" className="imgCarte" style={style}/>
                        <div className="cardBodyGames" >
                          <h4 className="titreCartesGamesName">{kids.name}</h4>
                            <h5 className="titreCartesGamesPrice">{kids.price}&nbsp;€</h5> 
                            {inTheBucket.length === 0 && <button 
                              className="button-add" 
                              onClick={()=> handleClick(kids)}
                              style={{
                                textDecoration: added ? 'display' : 'none'
                              }}>
                                ADD ME!
                              </button>
                          }
                        </div>
                    </div>
          
                 ) }
                
                )}
                
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


export default connect(mapStateToProps)(Kids);
