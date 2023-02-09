/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Request from "../../Config/Request";
import { TextInput, Paper, Title, Container, Button } from "@mantine/core";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

const ShippingAddress = () => {
  const [t] = useTranslation();
  const user = localStorage.getItem("uid");
  const request = new Request();

  const [isLoading, setIsLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");

  const [address, setAddress] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [building, setBuilding] = React.useState("");

  const callPage = async () => {
    const data = { user };
    const shippingAddress = await request.getShippingAddress(data);
    setAddress(shippingAddress.data.Address);
    setStreet(shippingAddress.data.Street);
    setBuilding(shippingAddress.data.Building);
  };

  React.useEffect(() => {
    callPage();
  }, []);

  const saveHandler = async () => {
    setIsLoading(true);
    const data = { user, address, street, building };
    try {
      await request.updateShippingAddress(data);
      setMessage(`${t("shipping_adddress_updated")}`);
      setSeverity("info");
      setOpen(true);
    } catch (error) {
      setMessage(`${t("something_wrong")}`);
      setSeverity("error");
      setOpen(true);
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
    <div style={{ marginTop: "150px", height: 'calc(100vh - 250px)' }}>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          {t("shippingAddress")}
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label={`${t("address")}`}
            placeholder={`${t("address")}`}
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextInput
            label={`${t("street")}`}
            placeholder={`${t("street")}`}
            required
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <TextInput
            label={`${t("building")}`}
            placeholder={`${t("building")}`}
            required
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
          />
          <Button
            style={{ backgroundColor: "#4C53A5" }}
            fullWidth
            mt="xl"
            onClick={saveHandler}
          >
            {t("save")}
          </Button>
        </Paper>
      </Container>

      {
        isLoading && 
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ShippingAddress;
