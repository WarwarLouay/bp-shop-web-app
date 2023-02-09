/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TocIcon from "@mui/icons-material/Toc";
import { MdLanguage } from "react-icons/md";
import { useTranslation } from "react-i18next";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Settings = ({ isIn, onLogout }) => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [cookie, removeCookie] = useCookies([]);

  const logOut = () => {
    removeCookie("jwt");
    localStorage.removeItem("uid");
    localStorage.removeItem("uEmail");
    onLogout();
  };

  return (
    <div style={{height: 'calc(100vh - 100px)'}}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container columns={{ xs: 2, sm: 2, md: 2 }}>
          {isIn ? (
            <div style={{ width: "100vw" }}>
              <Grid item xs={2} sm={4} md={4} style={{ padding: "10px" }}>
                <Item
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography textAlign="center">
                    <AccountCircleIcon />
                    {t("profile")}
                  </Typography>
                </Item>
              </Grid>

              <Grid
                onClick={() => navigate("/shipping/address")}
                item
                xs={2}
                sm={4}
                md={4}
                style={{ padding: "10px" }}
              >
                <Item
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography textAlign="center">
                    <LocalShippingIcon />
                    {t("shippingAddress")}
                  </Typography>
                </Item>
              </Grid>

              <Grid onClick={() => navigate("/orders")} item xs={2} sm={4} md={4} style={{ padding: "10px" }}>
                <Item
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography textAlign="center">
                    <TocIcon />
                    {t("orders")}
                  </Typography>
                </Item>
              </Grid>

              <Grid
                onClick={() => navigate("/language")}
                item
                xs={2}
                sm={4}
                md={4}
                style={{ padding: "10px" }}
              >
                <Item
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography textAlign="center">
                    <MdLanguage size={20} />
                    {t("language")}
                  </Typography>
                </Item>
              </Grid>

              <Grid
                onClick={logOut}
                item
                xs={2}
                sm={4}
                md={4}
                style={{ padding: "10px" }}
              >
                <Item
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography textAlign="center">
                    <LockIcon size={20} />
                    {t("logout")}
                  </Typography>
                </Item>
              </Grid>
            </div>
          ) : (
            <div style={{ width: "100vw" }}>
              <Grid
                onClick={() => navigate("/authentication/login")}
                item
                xs={2}
                sm={4}
                md={4}
                style={{ padding: "10px" }}
              >
                <Item
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography textAlign="center">
                    <LockOpenIcon size={20} />
                    {t("login")}
                  </Typography>
                </Item>
              </Grid>

              <Grid
                onClick={() => navigate("/language")}
                item
                xs={2}
                sm={4}
                md={4}
                style={{ padding: "10px" }}
              >
                <Item
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography textAlign="center">
                    <MdLanguage size={20} />
                    {t("language")}
                  </Typography>
                </Item>
              </Grid>
            </div>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default Settings;
