import React from "react";
import { useNavigate } from "react-router-dom";
import Request from "../../Config/Request";
import ckassesCss from "./ForgotPassword.module.css";
import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
} from "@mantine/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Fade from "react-reveal/Fade";
import OTPInput from "otp-input-react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

const ForgotPassword = () => {
  const [t] = useTranslation();
  const { classes } = useStyles();

  const navigate = useNavigate();
  const request = new Request();

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
  const [severity, setSeverity] = React.useState("");

  const [activeCard, setActiveCard] = React.useState("emailCard");

  const [email, setEmail] = React.useState("");
  const [code, setCode] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [minutes, setMinutes] = React.useState(1);
  const [seconds, setSeconds] = React.useState(30);

  React.useEffect(() => {
    if(activeCard === 'otpCard') {
        if (seconds > 0) {
            setTimeout(() => {
              setSeconds(seconds - 1);
            }, 1000);
          }
          if (minutes > 0 && seconds === 0) {
            setSeconds(59);
            setMinutes(0);
            setTimeout(() => {
              setSeconds(seconds - 1);
            }, 1000);
          }
    }
  }, [seconds, activeCard, minutes]);

  const forgotPassword = async () => {
    const data = { email };
    const response = await request.forgotPassword(data);
    console.log(response);
    if (response.data.message === "find") {
      setActiveCard("otpCard");
    } else {
      setMessage(`${t("incorrect_email")}`);
      setSeverity("error");
      setOpen(true);
    }
  };

  const verifyCode = async () => {
    const data = { code };
    const response = await request.verifyCode(data);
    console.log(response);
    if (response.data.message === "true") {
      setActiveCard("changePasswordCard");
    } else {
      setMessage(`${t("verificationCodeIsIncorrect")}`);
      setSeverity("error");
      setOpen(true);
    }
  };

  const changePassword = async () => {
    if (confirmPassword !== password) {
      setMessage(`${t("passwordMismatch")}`);
      setSeverity("error");
      setOpen(true);
    } else {
      const data = { email, password };
      const response = await request.changePassword(data);
      if (response.data.message === "updated") {
        setMessage(`${t("yourPasswordChanged")}`);
        setSeverity("success");
        setOpen(true);
        setTimeout(() => {
          navigate("/authentication/login");
        }, 2000);
      } else {
        setMessage(`${t("something_wrong")}`);
        setSeverity("error");
        setOpen(true);
      }
    }
  };

  const resendCode = async () => {
    setMinutes(1);
    setSeconds(30);
    const data = { email };
    const response = await request.resendCode(data);
    console.log(response);
  };

  return (
    <div className="fav">
      <div
        className={
          activeCard === "emailCard"
            ? ckassesCss.activeCard
            : ckassesCss.notActiveCard
        }
      >
        <Fade bottom>
          <Container size={460} my={30}>
            <Title className={classes.title} align="center">
              {t("forgotYourPassword")}
            </Title>
            <Text color="dimmed" size="sm" align="center">
              {t("enterYourEmailToGetAVerificationCode")}
            </Text>

            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
              <TextInput
                label={t("email")}
                placeholder="example@domain.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Group position="apart" mt="lg" className={classes.controls}>
                <Anchor
                  onClick={() => navigate("/authentication/login")}
                  style={{ color: "#4C53A5" }}
                  size="sm"
                  className={classes.control}
                >
                  <Center inline>
                    <ArrowBackIcon />
                    <Box ml={5}>{t("backToLogin")}</Box>
                  </Center>
                </Anchor>
                <Button
                  style={{ backgroundColor: "#4C53A5" }}
                  onClick={forgotPassword}
                  className={classes.control}
                >
                  {t("continue")}
                </Button>
              </Group>
            </Paper>
          </Container>
        </Fade>
      </div>

      <div
        className={
          activeCard === "otpCard"
            ? ckassesCss.activeCard
            : ckassesCss.notActiveCard
        }
      >
        <fade bottom>
          <Container size={460} my={30}>
            <Title className={classes.title} align="center">
              {t("verificationCode")}
            </Title>
            <Text color="dimmed" size="sm" align="center">
              {t("enterTheVerificationCode")}
            </Text>

            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
              <OTPInput
                value={code}
                onChange={setCode}
                autoFocus
                OTPLength={6}
                otpType="number"
                disabled={false}
              />
              <Group position="apart" mt="lg">
                <Text color="dimmed" size="sm" align="center" mt={5}>
                  Didn't get a verification code?
                </Text>
                {minutes > 0 || seconds > 0 ? (
                    <Text color="dimmed" size="sm" align="center" mt={5}>
                      0{minutes}:{seconds > 9 ? seconds : "0" + seconds}
                    </Text>
                  ) : (
                    <Text
                      style={{ color: "#4C53A5" }}
                      size="sm"
                      onClick={resendCode}
                    >
                      Resend
                    </Text>
                  )}
              </Group>
              <Button
                style={{ backgroundColor: "#4C53A5" }}
                onClick={verifyCode}
                className={classes.control}
              >
                {t("continue")}
              </Button>
            </Paper>
          </Container>
        </fade>
      </div>

      <div
        className={
          activeCard === "changePasswordCard"
            ? ckassesCss.activeCard
            : ckassesCss.notActiveCard
        }
      >
        <Fade bottom>
          <Container size={460} my={30}>
            <Title className={classes.title} align="center">
              {t("createNewPassword")}
            </Title>

            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
              <TextInput
                label={t("newPasword")}
                placeholder="******"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextInput
                label={t("confirmPassword")}
                placeholder="******"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Group position="apart" mt="lg" className={classes.controls}>
                <Button
                  style={{ backgroundColor: "#4C53A5" }}
                  onClick={changePassword}
                  className={classes.control}
                >
                  {t("save")}
                </Button>
              </Group>
            </Paper>
          </Container>
        </Fade>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ForgotPassword;
