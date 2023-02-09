import React from 'react';
import classes from './Footer.module.css';
import { CiFacebook, CiInstagram, CiTwitter } from 'react-icons/ci';
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [t] = useTranslation();

  return (
    <div className={classes.body}>
      <div className={classes.left}>
      <h4>{t('bpShop')}</h4>
      <p>{t('allRightsReserved')}</p>
      </div>
      <div className={classes.right}>
      <CiFacebook style={{margin: '5px'}} />
      <CiInstagram style={{margin: '5px'}} />
      <CiTwitter style={{margin: '5px'}} />
      </div>
    </div>
  )
}

export default Footer
