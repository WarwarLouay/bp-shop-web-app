import React from 'react';
import { Carousel } from "react-responsive-carousel";
import classes from './Banner.module.css';
import image1 from "../../assets/1.png";
import image2 from "../../assets/2.png";
import image3 from "../../assets/3.png";

const Banner = () => {
  return (
    <Carousel
          showThumbs={false}
          autoPlay={true}
          infiniteLoop={true}
          className={classes.carousel}
        >
          <div>
            <img src={image1} alt="" />
          </div>
          <div>
            <img src={image2} alt="" />
          </div>
          <div>
            <img src={image3} alt="" />
          </div>
        </Carousel>
  )
}

export default Banner
