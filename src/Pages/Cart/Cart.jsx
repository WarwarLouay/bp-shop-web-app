/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Cart.module.css";
import Request from "../../Config/Request";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Cart = ({ getCartLength, isIn }) => {
  const [t, i18n] = useTranslation();
  const user = localStorage.getItem("uid");
  const email = localStorage.getItem("uEmail");
  const request = new Request();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(true);
  const [cart, setCart] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");

  const [visible, setVisible] = React.useState(false);

  const [shipping, setShipping] = React.useState("");

  var cartOrder = [];

  const callPage = async () => {
    const data = { user };
    const cart = await request.getCart(data);
    if (cart.data) {
      setCart(cart.data);
      setIsLoading(false);
    }
  };

  var total = 0.0;

  const totalAmount = () => {
    cart.forEach((element) => {
      total += element.qty * Number(element.productId.productPrice);
    });
    return total.toFixed(2);
  };

  React.useEffect(() => {
    callPage();
    totalAmount();
  }, [total]);

  const increaseQty = (id) => {
    cart.forEach((element) => {
      if (element._id === id) {
        element.qty += 1;
      }
      getCartLength();
    });
  };

  const decreaseQty = (id) => {
    cart.forEach((element) => {
      if (element._id === id) {
        if (element.qty > 1) {
          element.qty -= 1;
        }
      }
      getCartLength();
    });
  };

  const deleteProduct = async (productCart) => {
    const id = productCart._id;
    const data = { id, user };
    try {
      await request.deleteFromcart(data);
      setMessage(productCart.productId.productEngName + " deleted.");
      setSeverity("info");
      setOpen(true);
      callPage();
    } catch {
      setMessage(`${t("something_wrong")}`);
      setSeverity("error");
      setOpen(true);
    }
    getCartLength();
  };

  const checkout = async () => {
    const data = { user };
    const shippingAddress = await request.getShippingAddress(data);
    if (
      shippingAddress.data.Address === "" ||
      shippingAddress.data.Street === "" ||
      shippingAddress.data.Building === ""
    ) {
      setMessage(`${t("please_update_your_shipping_address")}`);
      setSeverity("error");
      setOpen(true);
      setTimeout(() => {
        navigate("/shipping/address");
      }, 2000);
    } else {
      setShipping(shippingAddress.data._id);
      setVisible(true);
    }
  };

  const submitCheckoutHandler = async () => {
    setIsLoading(true);
    cart.forEach((element) => {
      cartOrder.push({
        product: element.productId._id,
        qty: element.qty,
      });
    });
    const product = cartOrder;
    const date = new Date().toISOString();
    const data = { product, user, shipping, total, date, email };
    const response = await request.checkout(data);
    if (response.data.shipping) {
      setVisible(false);
      setMessage("Thank you");
      setSeverity("success");
      setOpen(true);
      getCartLength();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    setIsLoading(false);
  };

  const editAddressHandler = () => {
    navigate("/shipping/address");
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.body}>
      <Box sx={{ flexGrow: 1 }} className={classes.box}>
        <Grid container columns={{ xs: 2, sm: 2, md: 2 }}>
          {cart.map((product) => (
            <Grid
              item
              xs={2}
              sm={4}
              md={4}
              key={product.productId._id}
              style={{ padding: "10px" }}
            >
              <Item
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <img
                  src={`http://localhost:4000${product.productId.productImage}`}
                  style={{
                    width: "150px",
                    height: "100px",
                    borderRadius: "10px",
                  }}
                  onClick={() => navigate(`/product/${product.productId._id}`)}
                  alt=""
                />
                <div>
                  <b style={{ color: "#4C53A5", fontWeight: "900" }}>
                    {i18n.language === "en"
                      ? product.productId.productEngName
                      : product.productId.productArName}
                  </b>
                  <p style={{ fontWeight: "900" }}>
                    ${product.productId.productPrice}
                  </p>
                </div>
                <div>
                  <DeleteSweepIcon
                    color="error"
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteProduct(product)}
                  />
                  <div style={{ margin: "10% 0" }}>
                    <button
                      className={classes.qtyButton}
                      onClick={() => decreaseQty(product._id)}
                    >
                      -
                    </button>
                    <b
                      style={{
                        padding: "0 2px",
                        color: "#4C53A5",
                        fontWeight: "900",
                      }}
                    >
                      {product.qty}
                    </b>
                    <button
                      className={classes.qtyButton}
                      onClick={() => increaseQty(product._id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      <div className={classes.summary}>
        <div
          className={classes.info}
          style={{
            marginLeft: i18n.language === "en" ? "30%" : "0",
            marginRight: i18n.language === "ar" ? "30%" : "0",
          }}
        >
          <p>{t("free2Days")}</p>
          <hr />
          <div className={classes.orderSummary}>
            <b>{t("orderSummary")}</b>
            <div className={classes.orderSummaryInfo}>
              <div className={classes.line}>
                <p>{t("subtotal")}</p>
                <p>${totalAmount()}</p>
              </div>

              <div className={classes.line}>
                <p>{t("2Day")}</p>
                <p style={{ color: "#4C53A5" }}>{t("free")}</p>
              </div>
              <hr />
              <button disabled={cart.length <= 0} onClick={checkout}>
                {t("checkout")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={visible}
        onClose={() => setVisible(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={visible}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Notice
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Make sure that you put the correct shipping address in your
              profile.
            </Typography>
            <Button style={{ color: "#4C53A5" }} onClick={editAddressHandler}>
              Edit
            </Button>
            <Button
              style={{ backgroundColor: "#4C53A5", color: "white" }}
              onClick={submitCheckoutHandler}
            >
              Continue
            </Button>
          </Box>
        </Fade>
      </Modal>

      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;
