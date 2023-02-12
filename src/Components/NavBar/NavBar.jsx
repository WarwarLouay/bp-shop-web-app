/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Request from "../../Config/Request";
import classes from "./NavBar.module.css";
import { MdLanguage } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TocIcon from "@mui/icons-material/Toc";
import PropTypes from "prop-types";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Label from "@mui/icons-material/Label";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation } from "react-i18next";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const NavBar = ({ cartLength, favorites, onLogout, isIn }) => {
  const [t, i18n] = useTranslation();
  const request = new Request();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElLanguage, setAnchorElLanguage] = React.useState(null);

  const [categories, setCategories] = React.useState([]);

  const callPage = async () => {
    const category = await request.get("category");
    setCategories(category.data);
    console.log(category);
  };

  React.useEffect(() => {
    callPage();
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenLanguageMenu = (event) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseLanguageMenu = () => {
    setAnchorElLanguage(null);
  };

  const navigate = useNavigate();
  const [cookie, removeCookie] = useCookies([]);

  const logOut = () => {
    removeCookie("jwt");
    localStorage.removeItem("uid");
    localStorage.removeItem("uEmail");
    navigate("/");
    onLogout();
  };

  return (
    <React.Fragment>
      <AppBar position="fixed" style={{ backgroundColor: "#4C53A5" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/bp-shop-web-app"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {t("bpShop")}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem key="contact" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{t("contactUs")}</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {t("bpShop")}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                key="about"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {t("aboutUs")}
              </Button>
              <Button
                key="contact"
                onClick={() => {
                  navigate("/contact");
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {t("contactUs")}
              </Button>
            </Box>

            {isIn ? (
              <React.Fragment>
                <IconButton
                  aria-label="cart"
                  style={{
                    color: "white",
                    marginRight: i18n.language === "en" ? "" : "20px",
                    marginLeft: i18n.language === "ar" ? "20px" : "0",
                  }}
                  onClick={() => navigate("/favorites")}
                >
                  <StyledBadge
                    badgeContent={favorites.length}
                    color="secondary"
                  >
                    <FavoriteIcon />
                  </StyledBadge>
                </IconButton>
                <IconButton
                  aria-label="cart"
                  style={{
                    color: "white",
                    marginRight: i18n.language === "en" ? "20px" : "0",
                    marginLeft: i18n.language === "ar" ? "20px" : "0",
                  }}
                  onClick={() => {
                    navigate("/cart");
                    handleCloseUserMenu();
                  }}
                >
                  <StyledBadge
                    badgeContent={cartLength.length}
                    color="secondary"
                  >
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <MoreVertIcon style={{ color: "white" }} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        <AccountCircleIcon />
                        {t("profile")}
                      </Typography>
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        navigate("/shipping/address");
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center">
                        <LocalShippingIcon />
                        {t("shippingAddress")}
                      </Typography>
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        navigate("/orders");
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center">
                        <TocIcon />
                        {t("orders")}
                      </Typography>
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        navigate("/language");
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center">
                        <MdLanguage size={20} />
                        {t("language")}
                      </Typography>
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        logOut();
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography textAlign="center">
                        <LockIcon />
                        {t("logout")}
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Button
                  color="inherit"
                  onClick={() => navigate("/authentication/login")}
                >
                  {t("login")}
                </Button>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Change Language">
                    <IconButton onClick={handleOpenLanguageMenu} sx={{ p: 0 }}>
                      <MdLanguage color="white" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElLanguage}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElLanguage)}
                    onClose={handleCloseLanguageMenu}
                  >
                    <MenuItem
                      onClick={() => {
                        i18n.changeLanguage("en");
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography
                        textAlign="center"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src="https://flagcdn.com/us.svg"
                          alt="English"
                          style={{ width: "30px", height: "20px" }}
                        />
                        English
                        {i18n.language === "en" ? <GiCheckMark /> : <div></div>}
                      </Typography>
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        i18n.changeLanguage("ar");
                        handleCloseUserMenu();
                      }}
                    >
                      <Typography
                        textAlign="center"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src="https://flagcdn.com/sa.svg"
                          alt="Arabic"
                          style={{ width: "30px", height: "20px" }}
                        />
                        العربية
                        {i18n.language === "ar" ? <GiCheckMark /> : <div></div>}
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </React.Fragment>
            )}
          </Toolbar>
        </Container>
        <div className={classes.NavFooter}>
          <TreeView
            defaultCollapseIcon={<ArrowDropDownIcon />}
            defaultExpandIcon={<ArrowRightIcon />}
            defaultEndIcon={<div style={{ width: 24 }} />}
            sx={{
              height: "auto",
              flexGrow: 1,
              maxWidth: 400,
              overflowY: "auto",
            }}
          >
            <StyledTreeItem
              nodeId="3"
              labelText={`${t("categories")}`}
              labelIcon={Label}
            >
              {categories.map((category) => {
                return (
                  <StyledTreeItem
                    nodeId={category._id}
                    labelText={
                      i18n.language === "en"
                        ? category.categoryEngName
                        : category.categoryArName
                    }
                    color="#4C53A5"
                    bgColor="#e8f0fe"
                  />
                );
              })}
            </StyledTreeItem>
          </TreeView>
          <div style={{ color: "#4C53A5" }}>{t("justToLetYouKnow")}</div>
        </div>
      </AppBar>

      {/*<div className={classes.NavFooter}>
        <div onClick={toggleCategory} className={classes.leftNavFooter}>
          <BiCategoryAlt />
          Categories
          {openCategory ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        <div className={classes.middleNavFooter}></div>
        <div>
          Just To Let You Know, We're Running As Usual & Working Hard To Keep
          You Safe With Contact-Free Delevery
        </div>
      </div>*/}
    </React.Fragment>
  );
};

export default NavBar;
