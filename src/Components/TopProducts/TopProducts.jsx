/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Constant from "../../Config/Constant";
import { useNavigate } from "react-router-dom";
import Request from "../../Config/Request";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Skeleton from "@mui/material/Skeleton";
import RubberBand from "react-reveal/RubberBand";
import Fade from "react-reveal/Fade";
import { useTranslation } from "react-i18next";

const TopProducts = ({ isIn, getCartLength, getFavorites }) => {
  const [t, i18n] = useTranslation();
  const request = new Request();
  const user = localStorage.getItem("uid");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);

  const [cartActionProduct, setCartActionProduct] = React.useState("");
  const [favoriteActionProduct, setFavoriteActionProduct] = React.useState("");

  const callPage = async () => {
    const topProduct = await request.get("product");
    var items = [];
    topProduct.data.forEach((element) => {
      if (!element.discount) {
        items.push(element);
      }
    });
    setProducts(items);
    setIsLoading(false);
  };

  React.useEffect(() => {
    callPage();
  }, []);

  const addToCart = async (product) => {
    const productId = product._id;
    setCartActionProduct(productId);
    const qty = 1;
    const size = "M";
    const data = { user, productId, qty, size };
    if (isIn) {
      try {
        await request.addToCart(data);
        getCartLength(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/authentication/login");
    }
    setCartActionProduct("");
  };

  const toggleFavorite = async (product) => {
    setFavoriteActionProduct(product);
    const data = { user, product };
    if (isIn === true) {
      await request.toggleFavorites(data);
      getFavorites();
      callPage();
    } else {
      navigate("/authentication/login");
    }
    setFavoriteActionProduct("");
  };

  return (
    <div className="container">
      <h4 style={{ color: "#4C53A5" }}>{t("topProducts")}</h4>
      {!isLoading ? (
        <Fade bottom>
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            className="mySwiper"
            style={{ zIndex: "0" }}
          >
            {products.map((product) => {
              return (
                <SwiperSlide key={product._id} className="productSwiper">
                  <div className="card">
                    <img
                      src={`${Constant.serverlink}${product.productImage}`}
                      alt=""
                    />
                    <div className="title">
                      <h6>
                        {i18n.language === "en"
                          ? product.productEngName
                          : product.productArName}
                      </h6>
                      <p>${product.productPrice}</p>
                    </div>
                    <div className="icons">
                      <RubberBand spy="">
                        <FaRegEye
                          onClick={() => navigate(`/product/${product._id}`)}
                        />
                      </RubberBand>
                      {product.usersFavorite.includes(user) ? (
                        <RubberBand spy={favoriteActionProduct === product._id}>
                          <AiFillHeart
                            onClick={() => toggleFavorite(product._id)}
                          />
                        </RubberBand>
                      ) : (
                        <RubberBand spy={favoriteActionProduct === product._id}>
                          <AiOutlineHeart
                            onClick={() => toggleFavorite(product._id)}
                          />
                        </RubberBand>
                      )}
                      <RubberBand spy={cartActionProduct === product._id}>
                        <MdOutlineAddShoppingCart
                          onClick={() => addToCart(product)}
                        />
                      </RubberBand>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Fade>
      ) : (
        <Fade bottom>
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            className="mySwiper"
            style={{ zIndex: "0" }}
          >
            <SwiperSlide className="productSwiper">
              <div className="card">
                <Skeleton variant="rectangular" width={210} height={250} />
              </div>
            </SwiperSlide>
            <SwiperSlide className="productSwiper">
              <div className="card">
                <Skeleton variant="rectangular" width={210} height={250} />
              </div>
            </SwiperSlide>
            <SwiperSlide className="productSwiper">
              <div className="card">
                <Skeleton variant="rectangular" width={210} height={250} />
              </div>
            </SwiperSlide>
            <SwiperSlide className="productSwiper">
              <div className="card">
                <Skeleton variant="rectangular" width={210} height={250} />
              </div>
            </SwiperSlide>
            <SwiperSlide className="productSwiper">
              <div className="card">
                <Skeleton variant="rectangular" width={210} height={250} />
              </div>
            </SwiperSlide>
            <SwiperSlide className="productSwiper">
              <div className="card">
                <Skeleton variant="rectangular" width={210} height={250} />
              </div>
            </SwiperSlide>
            <SwiperSlide className="productSwiper">
              <div className="card">
                <Skeleton variant="rectangular" width={210} height={250} />
              </div>
            </SwiperSlide>
          </Swiper>
        </Fade>
      )}
    </div>
  );
};

export default TopProducts;
