import React from "react";
import { useNavigate } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import Paper from "@mui/material/Paper";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useTranslation } from "react-i18next";

const BottomNavBar = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          zIndex: "1",
          backgroundColor: "#4C53A5",
          "& .Mui-selected": {
            color: "white",
          },
        }}
        onChange={(e, newValue) => setValue(newValue)}
      >
        <BottomNavigationAction
          onClick={() => navigate("/")}
          label={`${t('home')}`}
          icon={<HomeIcon style={{ color: value === 0 ? "white" : "" }} />}
        />
        <BottomNavigationAction
          onClick={() => navigate("/favorites")}
          label={`${t('favorite')}`}
          icon={<FavoriteIcon style={{ color: value === 1 ? "white" : "" }} />}
        />
        <BottomNavigationAction
          onClick={() => navigate("/cart")}
          label={`${t('cart')}`}
          icon={<LocalMallIcon style={{ color: value === 2 ? "white" : "" }} />}
        />
        <BottomNavigationAction
          onClick={() => navigate("/settings")}
          label={`${t('settings')}`}
          icon={<SettingsIcon style={{ color: value === 3 ? "white" : "" }} />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNavBar;
