/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Constant from "../../Config/Constant";
import { useParams, useNavigate } from "react-router-dom";
import classes from "./ProductDetails.module.css";
import Request from "../../Config/Request";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Tada from "react-reveal/Tada";
import { useTranslation } from "react-i18next";

const ProductDetails = ({ getCartLength, isIn }) => {
  const [t, i18n] = useTranslation();
  const params = useParams();
  const request = new Request();
  const user = localStorage.getItem("uid");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(true);
  const [productDetails, setProductDetails] = React.useState([]);
  const [size, setSize] = React.useState("M");
  const [quantity, setQuantity] = React.useState(1);
  const [cartActionProduct, setCartActionProduct] = React.useState("");

  React.useEffect(() => {
    callPage();
  }, []);

  async function callPage() {
    setIsLoading(true);
    const response = await request.getProductById(params.id);
    if (response.data) {
      console.log(response.data);
      setProductDetails(response.data);
      setIsLoading(false);
    }
  }

  const increaseQty = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = async (product) => {
    const productId = product._id;
    setCartActionProduct(productId);
    const qty = quantity;
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

  return (
    <div>
      {!isLoading ? (
        <div className={`container ${classes.body}`}>
          <div className={classes.left}>
            <img
              src={`${Constant.serverlink}${productDetails.productImage}`}
              alt=""
            />
          </div>
          <div className={classes.right}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 style={{ color: "#4C53A5" }}>
                {i18n.language === "ar"
                  ? productDetails.productArName
                  : productDetails.productEngName}
              </h4>
              <h4 style={{ color: "#4C53A5" }}>
                ${productDetails.productPrice}
              </h4>
            </div>
            <hr />
            <p style={{ color: "gray" }}>
              {i18n.language === "ar"
                ? productDetails.productArDescription
                : productDetails.productEngDescription}
            </p>
            <hr />
            <h4 style={{ color: "#4C53A5" }}>{t("size")}</h4>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& > *": {
                  m: 1,
                },
              }}
            >
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                <Button
                  onClick={() => setSize("S")}
                  style={{
                    color: size === "S" ? "white" : "#4C53A5",
                    backgroundColor: size === "S" ? "#4C53A5" : "",
                    borderColor: "#4C53A5",
                    marginLeft: "10px",
                  }}
                >
                  S
                </Button>
                <Button
                  onClick={() => setSize("M")}
                  style={{
                    color: size === "M" ? "white" : "#4C53A5",
                    backgroundColor: size === "M" ? "#4C53A5" : "",
                    borderColor: "#4C53A5",
                    marginLeft: "10px",
                  }}
                >
                  M
                </Button>
                <Button
                  onClick={() => setSize("L")}
                  style={{
                    color: size === "L" ? "white" : "#4C53A5",
                    backgroundColor: size === "L" ? "#4C53A5" : "",
                    borderColor: "#4C53A5",
                    marginLeft: "10px",
                  }}
                >
                  L
                </Button>
                <Button
                  onClick={() => setSize("XL")}
                  style={{
                    color: size === "XL" ? "white" : "#4C53A5",
                    backgroundColor: size === "XL" ? "#4C53A5" : "",
                    borderColor: "#4C53A5",
                    marginLeft: "10px",
                  }}
                >
                  XL
                </Button>
              </ButtonGroup>
            </Box>
            <hr />
            <h4 style={{ color: "#4C53A5" }}>{t("quantity")}</h4>
            <div className={classes.quantity}>
              <button onClick={decreaseQty}>-</button>
              <b style={{ color: "#4C53A5" }}>{quantity}</b>
              <button onClick={increaseQty}>+</button>
            </div>
            <hr />
            <Tada spy={cartActionProduct === productDetails._id}>
              <Button
                style={{ backgroundColor: "#4C53A5", width: "100%" }}
                variant="contained"
                onClick={() => addToCart(productDetails)}
              >
                {t("addToCart")}
              </Button>
            </Tada>
          </div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      ) : (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
};

export default ProductDetails;
