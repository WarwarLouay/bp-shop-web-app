import React from "react";
import classes from "./Contact.module.css";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";
import { TextInput, Textarea, Group, Button } from "@mantine/core";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const [t, i18n] = useTranslation();
  return (
    <div className={classes.body}>
      <div
        className={classes.card}
        style={{
          marginLeft: i18n.language === "en" ? "7.5vw" : "0",
          marginRight: i18n.language === "ar" ? "7.5vw" : "0",
        }}
      >
        <div className={classes.left}>
          <h1 style={{ fontWeight: "bold" }}>{t("contactUs")}</h1>
          <p>{t("leaveYourEmail")}</p>
          <div className={classes.list}>
            <AlternateEmailIcon />
            <div style={{ lineHeight: "0" }}>
              <p>{t("email")}</p>
              <b>warwarlouay@gmail.com</b>
            </div>
          </div>

          <div className={classes.list}>
            <LocalPhoneIcon />
            <div style={{ lineHeight: "0" }}>
              <p>{t("phone")}</p>
              <b>+96176516918</b>
            </div>
          </div>

          <div className={classes.list}>
            <LocationOnIcon />
            <div style={{ lineHeight: "0" }}>
              <p>{t("address")}</p>
              <b>{t("lebanonTripoli")}</b>
            </div>
          </div>

          <div className={classes.list}>
            <WbSunnyIcon />
            <div style={{ lineHeight: "0" }}>
              <p>{t("workingHours")}</p>
              <b>{t("8To11")}</b>
            </div>
          </div>

          <div className={classes.social}>
            <CiFacebook style={{ margin: "5px" }} />
            <CiInstagram style={{ margin: "5px" }} />
            <CiTwitter style={{ margin: "5px" }} />
          </div>
        </div>
        <div className={classes.right}>
          <TextInput
            label={t("email")}
            placeholder="your@email.com"
            required
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <TextInput
            label={t("fullName")}
            placeholder="Louay Warwar"
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <Textarea
            required
            label={t("yourMessage")}
            placeholder="I want to order your goods"
            minRows={4}
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <Group position="right" mt="md">
            <Button
              style={{ backgroundColor: "#4C53A5" }}
              className={classes.control}
            >
              {t("sendMessage")}
            </Button>
          </Group>
        </div>
      </div>
    </div>
  );
};

export default Contact;
