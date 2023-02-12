import React from "react";
import axios from "axios";
import Request from "../../Config/Request";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Divider,
  Container,
  Group,
  Button,
} from "@mantine/core";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { LoginSocialGoogle } from "reactjs-social-login";
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "react-i18next";

const Login = ({ onLogin }) => {
  const [t, i18n] = useTranslation();
  const request = new Request();
  const navigate = useNavigate();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const [values, setValues] = React.useState({
    email: "",
    password: "",
  });

  const loginHandler = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://smiling-coveralls-crow.cyclic.app/api/user/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data.user.message === "Incorrect email") {
        setMessage(`${t("incorrect_email")}`);
        setOpen(true);
      }
      if (data.user.message === "Incorrect password") {
        setMessage(`${t("incorrect_password")}`);
        setOpen(true);
      }
      if (!data.user.message) {
        onLogin();
        localStorage.setItem("uid", data.user._id);
        localStorage.setItem("uEmail", data.user.email);
        navigate("/");
      }
    } catch (err) {
      setMessage(`${t("something_wrong")}`);
      setOpen(true);
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.body}>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          {t("welcome_back")}
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          {t("doNotHaveAnAccountYet")}{" "}
          <Anchor
            href="#"
            style={{ color: "#4C53A5" }}
            size="sm"
            onClick={() => navigate("/authentication/register")}
          >
            {t("createAccount")}
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label={`${t("email")}`}
            name="email"
            placeholder="example@domain.com"
            required
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
          <PasswordInput
            label={`${t("password")}`}
            name="password"
            placeholder="******"
            required
            mt="md"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
          <Group position="apart" mt="lg">
            <Checkbox label={`${t("rememberMe")}`} sx={{ lineHeight: 1 }} />
            <Anchor
              onClick={(event) => event.preventDefault()}
              href="#"
              style={{ color: "#4C53A5" }}
              size="sm"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            >
              {t("forgotPassword")}
            </Anchor>
          </Group>
          <Button
            style={{ backgroundColor: "#4C53A5" }}
            fullWidth
            mt="xl"
            onClick={loginHandler}
          >
            {t("login")}
          </Button>
          <Divider
            label={t("orContinueWithGoogle")}
            labelPosition="center"
            my="lg"
          />
          <LoginSocialGoogle
            client_id={
              "730557315418-2rhd1fpjb2geqpq548mquuf03svta7i5.apps.googleusercontent.com"
            }
            scope="openid profile email"
            discoveryDocs="claims_supported"
            access_type="offline"
            onResolve={async ({ provider, data }) => {
              setIsLoading(true);
              const email = data.email;
              const fullName = data.name;
              const password = data.name;
              const d = { email, fullName };
              const response = await request.loginWithGoogle(d);
              if (
                response.data.message === "created" ||
                response.data.message === "loggedin"
              ) {
                const { data } = await axios.post(
                  "https://smiling-coveralls-crow.cyclic.app/api/user/login",
                  {
                    email,
                    password,
                  },
                  { withCredentials: true }
                );
                if (!data.user.message) {
                  onLogin();
                  localStorage.setItem("uid", data.user._id);
                  localStorage.setItem("uEmail", data.user.email);
                  navigate("/");
                }
                setIsLoading(false);
              }

              if (response.data.message === "Email already exist") {
                setIsLoading(false);
                setMessage(`${t("an_account_already_created")}`);
                setOpen(true);
              }
            }}
            onReject={(err) => {
              console.log(err);
            }}
          >
            <div className={classes.loginWithGoogle}>
              <FcGoogle size={25} />
              <div
                style={{
                  marginLeft: i18n.language === "en" ? "5%" : "0",
                  marginRight: i18n.language === "ar" ? "5%" : "0",
                }}
              >
                {t("login_with_google")}
              </div>
            </div>
          </LoginSocialGoogle>
        </Paper>
      </Container>

      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
