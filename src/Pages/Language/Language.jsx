/* eslint-disable no-unused-vars */
import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { GiCheckMark } from "react-icons/gi";
import { useTranslation } from "react-i18next";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Language = () => {
  const [t, i18n] = useTranslation();

  return (
    <div style={{ textAlign: "center", height: "calc(100vh - 250px)" }}>
      <h3 style={{ marginTop: "150px" }}>{t("selectLanguage")}</h3>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container columns={{ xs: 2, sm: 2, md: 2 }}>
          <Grid
            onClick={() => i18n.changeLanguage("en")}
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
                <img
                  src="https://flagcdn.com/us.svg"
                  alt="English"
                  style={{ width: "30px", height: "20px" }}
                />
                English
                {i18n.language === "en" ? <GiCheckMark /> : <div></div>}
              </Typography>
            </Item>
          </Grid>

          <Grid
            onClick={() => i18n.changeLanguage("ar")}
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
                <img
                  src="https://flagcdn.com/sa.svg"
                  alt="English"
                  style={{ width: "30px", height: "20px" }}
                />
                العربية
                {i18n.language === "ar" ? <GiCheckMark /> : <div></div>}
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Language;
