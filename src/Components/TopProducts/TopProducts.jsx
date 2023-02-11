/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useNavigate } from "react-router-dom";
import Request from "../../Config/Request";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useTranslation } from "react-i18next";

const TopProducts = ({ isIn, getCartLength, getFavorites }) => {
  const [t, i18n] = useTranslation();
  const request = new Request();
  const user = localStorage.getItem("uid");
  const navigate = useNavigate();

  const [products, setProducts] = React.useState([]);

  const callPage = async () => {
    const topProduct = await request.get("product");
    var items = [];
    topProduct.data.forEach((element) => {
      if (!element.discount) {
        items.push(element);
      }
    });
    setProducts(items);
  };

  React.useEffect(() => {
    callPage();
  }, []);

  const addToCart = async (product) => {
    const productId = product._id;
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
      navigate("authentication/login");
    }
  };

  const toggleFavorite = async (product) => {
    const data = { user, product };
    if (isIn === true) {
      await request.toggleFavorites(data);
      getFavorites();
      callPage();
    } else {
      navigate("/authentication/login");
    }
  };

  return (
    <div className="container">
      <h4 style={{ color: "#4C53A5" }}>{t("topProducts")}</h4>
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
                  src={`http://localhost:4000${product.productImage}`}
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
                  <FaRegEye
                    onClick={() => navigate(`/product/${product._id}`)}
                  />
                  {product.usersFavorite.includes(user) ? (
                    <AiFillHeart onClick={() => toggleFavorite(product._id)} />
                  ) : (
                    <AiOutlineHeart
                      onClick={() => toggleFavorite(product._id)}
                    />
                  )}
                  <MdOutlineAddShoppingCart
                    onClick={() => addToCart(product)}
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default TopProducts;
