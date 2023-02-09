/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Moment from "moment";
import { useNavigate } from "react-router-dom";
import Request from "../../Config/Request";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Orders = () => {
  const user = localStorage.getItem("uid");
  const request = new Request();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState(true);

  const [orders, setOrders] = React.useState([]);

  const callPage = async () => {
    const data = { user };
    const order = await request.getOrders(data);
    if (order.data) {
        setOrders(order.data);
        setIsLoading(false);
    }
  };

  React.useEffect(() => {
    callPage();
  }, []);

  return (
    <div style={{ minHeight: "calc(100vh - 250px)" }} className="mt">
      {!isLoading ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container columns={{ xs: 2, sm: 2, md: 8 }}>
            {orders.map((order) => (
              <Grid
                item
                xs={2}
                sm={4}
                md={4}
                key={order._id}
                style={{ padding: "10px", cursor: "pointer" }}
                onClick={() => navigate(`/order/${order._id}`)}
              >
                <Item
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <b style={{ color: "#4C53A5", fontWeight: "900" }}>
                      {Moment(order.date).format("LLL")}
                    </b>
                    <p style={{ fontWeight: "900" }}>${order.total}</p>
                  </div>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
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

export default Orders;
