import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

const Login = ({ onLogin }) => {
  const [t] = useTranslation();
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
        "http://localhost:4000/api/user/login",
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
        navigate("/");
      }
      console.log(data);
      localStorage.setItem("uid", data.user._id);
      localStorage.setItem("uEmail", data.user.email);
    } catch (err) {
      setMessage(`${t("something_wrong")}`);
      setOpen(true);
    }
    setIsLoading(false);
  };

  return (
    <div style={{ marginTop: "150px", height: "calc(100vh - 250px)" }}>
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
