import React from "react";
import {
  createStyles,
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
} from "@mantine/core";
import { FaShippingFast } from "react-icons/fa";
import { MdHighQuality, MdOutlinePriceChange } from "react-icons/md";
import Fade from "react-reveal/Fade";
import { useTranslation } from "react-i18next";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 34,
    fontWeight: 900,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 24,
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: "#4C53A5",
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: "#4C53A5",
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },
}));

const Features = () => {
  const [t] = useTranslation();

  const mockdata = [
    {
      title: `${t("fastShipping")}`,
      description: `${t("customersFinalizes")}`,
      icon: FaShippingFast,
    },
    {
      title: `${t("hightQuality")}`,
      description: `${t("weDefine")}`,
      icon: MdHighQuality,
    },
    {
      title: `${t("bestPrices")}`,
      description: `${t("sellinAllProducts")}`,
      icon: MdOutlinePriceChange,
    },
  ];

  const { classes } = useStyles();
  const features = mockdata.map((feature) => (
    <Fade bottom>
      <Card
        key={feature.title}
        shadow="md"
        radius="md"
        className={classes.card}
        p="xl"
      >
        <feature.icon size={50} stroke={2} color="#4C53A5" />
        <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
          {feature.title}
        </Text>
        <Text size="sm" color="dimmed" mt="sm">
          {feature.description}
        </Text>
      </Card>
    </Fade>
  ));

  return (
    <Container size="lg" py="xl">
      <Fade bottom cascade>
        <Group position="center">
          <Badge
            variant="filled"
            size="lg"
            style={{ backgroundColor: "#4C53A5" }}
          >
            {t("best_company_ever")}
          </Badge>
        </Group>
      </Fade>

      <Fade bottom cascade>
        <Title order={2} className={classes.title} align="center" mt="sm">
          {t("theBestOneInLebanon")}
        </Title>
      </Fade>

      <Fade bottom cascade>
        <Text
          color="dimmed"
          className={classes.description}
          align="center"
          mt="md"
        >
          {t("bpShopIsOne")}
        </Text>
      </Fade>

      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
};

export default Features;
