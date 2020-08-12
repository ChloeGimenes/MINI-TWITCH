import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';



function Kids (props) {
  
    const [allKids, setAllKids] = useState([]);
  
    // useEffect(() => {
        
    //   axios
    //     .get("http://localhost:3040/kids",  { 
    //       headers: {
    //       withCredentials: true,
    //       credentials: 'same-origin'
    //       }
    //     })
    //     .then(res => res.data)
    //     .then(data => setAllKids(data));
        
    // }, []);

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
            <h1 className="titreGamesWish">KIDS</h1>
            
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
            
                {allKids.map((kids, index) => (
                    <div className="cartesGamesWish" key={index}>
                            <img src={kids.picture} alt="game pic" className="imgCarte" style={style}/>
                        <div className="cardBodyGames" >
                          <h4 className="titreCartesGamesName">{kids.name}</h4>
                            <h5 className="titreCartesGamesPrice">{kids.price}&nbsp;€</h5>
                        </div>
                    </div>
          
                ))}
                
           </Carousel>
            
        </div>
    )

}    

export default Kids;