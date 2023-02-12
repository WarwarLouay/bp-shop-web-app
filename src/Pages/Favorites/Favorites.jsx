import React from "react";
import { useNavigate } from "react-router-dom";
import Request from "../../Config/Request";
import { FaRegEye } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Favorites = ({ isIn, getCartLength, getFavorites, favorites }) => {
  const [t, i18n] = useTranslation();
  const request = new Request();
  const user = localStorage.getItem("uid");
  const navigate = useNavigate();

  const addToCart = async (product) => {
    const productId = product.product._id;
    const qty = 1;
    const data = { user, productId, qty };
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
    } else {
      navigate("/authentication/login");
    }
  };

  return (
    <div className="container fav">
      <h4 style={{ color: "#4C53A5" }}>{t("favoriteProducts")}</h4>
      <Row className="col-12">
        {favorites.map((product) => {
          return (
            <Col key={product._id} className="productSwiper col-3">
              <div className="card">
                {product.product.discount && (
                  <div className="discount">{product.product.discount}%</div>
                )}
                <img
                  src={`http://localhost:4000${product.product.productImage}`}
                  alt=""
                />
                <div className="title">
                  <h6>
                    {i18n.language === "ar"
                      ? product.product.productArName
                      : product.product.productEngName}
                  </h6>
                  <p>${product.product.productPrice}</p>
                </div>
                <div className="icons">
                  <FaRegEye />
                  <AiFillHeart
                    onClick={() => toggleFavorite(product.product._id)}
                  />
                  <MdOutlineAddShoppingCart
                    onClick={() => addToCart(product)}
                  />
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Favorites;
