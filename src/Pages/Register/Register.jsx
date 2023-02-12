import React from "react";
import axios from "axios";
import Constant from "../../Config/Constant";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

const Register = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const registerHandler = async () => {
    setIsLoading(true);
    if (!fullName || !email || !phone || !password) {
      setMessage(`${t("fillAllInfo")}`);
      setOpen(true);
    } else if (confirmPassword !== password) {
      setMessage(`${t("passwordMismatch")}`);
      setOpen(true);
    } else {
      try {
        const { data } = await axios.post(
          Constant.serverlink + "/api/user",
          {
            fullName,
            email,
            phone,
            password,
          },
          { withCredentials: true }
        );
        if (data.message === "Email already exist") {
          setMessage(`${t("an_account_already_created")}`);
          setOpen(true);
        }
        if (!data.message) {
          navigate("/authentication/login");
        }
        console.log(data);
      } catch (err) {
        setMessage(`${t("something_wrong")}`);
        setOpen(true);
      }
    }
    setIsLoading(false);
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
    <div className="fav">
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
          {t("alreadyHaveAnAccount")}{" "}
          <Anchor
            href="#"
            style={{ color: "#4C53A5" }}
            size="sm"
            onClick={() => navigate("/authentication/login")}
          >
            {t("login")}
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label={`${t("fullName")}`}
            placeholder="Louay Warwar"
            required
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextInput
            label={`${t("email")}`}
            placeholder="example@domain.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label={`${t("phoneNumber")}`}
            placeholder="03000000"
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <PasswordInput
            label={`${t("password")}`}
            placeholder="******"
            required
            mt="md"
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordInput
            label={`${t("confirmPassword")}`}
            placeholder="******"
            required
            mt="md"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            style={{ backgroundColor: "#4C53A5" }}
            fullWidth
            mt="xl"
            onClick={registerHandler}
          >
            {t("create")}
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

export default Register;
