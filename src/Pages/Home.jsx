/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Request from "../Config/Request";
import classes from "./Home.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Features from "../Components/Features/Features";
import Banner from "../Components/Banner/Banner";
import TopProducts from "../Components/TopProducts/TopProducts";
import Discounts from "../Components/Discounts/Discounts";
import Subscribe from "../Components/Subscribe/Subscribe";

const Home = ({ openCategory, getCartLength, getFavorites, isIn }) => {
  const request = new Request();

  const [categories, setCategories] = React.useState([]);
  const [topProducts, setTopProducts] = React.useState([]);

  const callPage = async () => {
    const category = await request.get("category");
    setCategories(category.data);
    const topProduct = await request.get("product");
    setTopProducts(topProduct.data);
  };

  React.useEffect(() => {
    callPage();
  }, []);

  return (
    <div>
      <div className={classes.body}>
        <Banner />
        <Features />
        <TopProducts
          topProducts={topProducts}
          getCartLength={getCartLength}
          getFavorites={getFavorites}
          isIn={isIn}
        />
        <div className="container">
          <hr />
        </div>
        <Discounts
          topProducts={topProducts}
          getCartLength={getCartLength}
          getFavorites={getFavorites}
          isIn={isIn}
        />
        <div className="container">
          <hr />
        </div>
        <Subscribe />

        {openCategory && (
          <div className={classes.category}>
            <FormGroup style={{ marginLeft: "25%" }}>
              {categories.map((category) => {
                return (
                  <FormControlLabel
                    key={category._id}
                    control={<Checkbox name="gilad" />}
                    label={category.categoryEngName}
                  />
                );
              })}
            </FormGroup>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
