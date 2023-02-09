/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams } from "react-router-dom";
import classes from "./OrderDetails.module.css";
import Request from "../../Config/Request";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const OrderDetails = () => {
  const [t, i18n] = useTranslation();
  const params = useParams();
  const request = new Request();

  const [isLoading, setIsLoading] = React.useState(true);
  const [orderDetails, setOrderDetails] = React.useState([]);

  React.useEffect(() => {
    callPage();
  }, []);

  async function callPage() {
    setIsLoading(true);
    const response = await request.getOrderById(params.id);
    if (response.data) {
      setOrderDetails(response.data);
      setIsLoading(false);
    }
  }

  return (
    <div>
      {!isLoading ? (
        <div className={classes.body}>
          <Box sx={{ flexGrow: 1 }} className={classes.box}>
            <Grid container columns={{ xs: 2, sm: 2, md: 2 }}>
              {orderDetails.product.map((order) => {
                return (
                  <Grid
                    item
                    xs={2}
                    sm={4}
                    md={4}
                    key={order._id}
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
                        src={`http://localhost:4000${order.product.productImage}`}
                        style={{
                          width: "150px",
                          height: "100px",
                          borderRadius: "10px",
                        }}
                        alt=""
                      />
                      <div>
                        <b style={{ color: "#4C53A5", fontWeight: "900" }}>
                          {i18n.language === "en"
                            ? order.product.productEngName
                            : order.product.productArName}
                        </b>
                        <p style={{ fontWeight: "900" }}>
                          ${order.product.productPrice}
                        </p>
                      </div>
                      <div>
                        <div style={{ margin: "10% 0" }}>
                          <b
                            style={{
                              padding: "0 2px",
                              color: "#4C53A5",
                              fontWeight: "900",
                            }}
                          >
                            X{order.qty}
                          </b>
                        </div>
                      </div>
                    </Item>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <div className={classes.summary}>
            <div
              className={
                i18n.language === "en" ? classes.infoEng : classes.infoAr
              }
            >
              <div>
                {orderDetails.status === "1" ? (
                  <Badge badgeContent={"Delivered"} color="primary"></Badge>
                ) : orderDetails.status === "0" ? (
                  <Badge badgeContent={"Pending"} color="secondary"></Badge>
                ) : (
                  <Badge badgeContent={"Cancelled"} color="danger"></Badge>
                )}
              </div>
              <b>{t("shippingAddress")}</b>
              <hr />
              <div className={classes.orderSummary}>
                <div className={classes.orderSummaryInfo}>
                  <div className={classes.line}>
                    <p>{t("fullName")}</p>
                    <p>{orderDetails.user.fullName}</p>
                  </div>

                  <div className={classes.line}>
                    <p>{t("email")}</p>
                    <p>{orderDetails.user.email}</p>
                  </div>

                  <div className={classes.line}>
                    <p>{t("phone")}</p>
                    <p>
                      {orderDetails.user.countryCode}
                      {orderDetails.user.phone}
                    </p>
                  </div>

                  <hr />

                  <div className={classes.line}>
                    <p>{t("address")}</p>
                    <p>{orderDetails.shipping.Address}</p>
                  </div>

                  <div className={classes.line}>
                    <p>{t("street")}</p>
                    <p>{orderDetails.shipping.Street}</p>
                  </div>

                  <div className={classes.line}>
                    <p>{t("building")}</p>
                    <p>{orderDetails.shipping.Building}</p>
                  </div>

                  <hr />

                  <div style={{ color: "#4C53A5" }} className={classes.line}>
                    <b>{t("total")}</b>
                    <b>${orderDetails.total}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default OrderDetails;
