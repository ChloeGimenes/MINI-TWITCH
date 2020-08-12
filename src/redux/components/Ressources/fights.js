import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';



function Fights (props) {
  
    const [allFights, setAllFights] = useState([]);
  
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
            <h1 className="titreGamesWish">COMBAT</h1>
            
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
            
                {allFights.map((fight, index) => (
                    <div className="cartesGamesWish" key={index}>
                            <img  src={fight.picture} alt="game pic" className="imgCarte" style={style} />
                        <div className="cardBodyGames" >
                          <h4 className="titreCartesGamesName">{fight.name}</h4>
                          <h5 className="titreCartesGamesPrice">{fight.price}&nbsp;€</h5>
                        </div>
                    </div>
          
                ))}
                
           </Carousel>
            
        </div>
    )

}    

export default Fights;