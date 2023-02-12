import React from "react";
import image from "../../assets/subscribe.png";
import {
  createStyles,
  Text,
  Title,
  TextInput,
  Button,
  Image,
} from "@mantine/core";
import Fade from "react-reveal/Fade";
import { useTranslation } from "react-i18next";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing.xl * 2,
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: "column-reverse",
      padding: theme.spacing.xl,
    },
  },

  image: {
    maxWidth: "40%",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  body: {
    paddingRight: theme.spacing.xl * 4,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      paddingRight: 0,
      marginTop: theme.spacing.xl,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },

  controls: {
    display: "flex",
    marginTop: theme.spacing.xl,
  },

  inputWrapper: {
    width: "100%",
    flex: "1",
  },

  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

const Subscribe = () => {
  const [t] = useTranslation();
  const { classes } = useStyles();

  return (
    <Fade bottom cascade>
      <div className={`container sub ${classes.wrapper}`}>
        <div className={classes.body}>
          <Title className={classes.title}>{t("waitAminute")}</Title>
          <Text weight={500} size="lg" mb={5}>
            {t("subscribeToOurNewsletter")}
          </Text>
          <Text size="sm" color="dimmed">
            {t("youWillNeverMiss")}
          </Text>

          <div className={classes.controls}>
            <TextInput
              placeholder={`${t("yourEmail")}`}
              classNames={{ input: classes.input, root: classes.inputWrapper }}
            />
            <Button
              style={{ backgroundColor: "#4C53A5" }}
              className={classes.control}
            >
              {t("subscribe")}
            </Button>
          </div>
        </div>
        <Image src={image} className={classes.image} />
      </div>
    </Fade>
  );
};

export default Subscribe;
