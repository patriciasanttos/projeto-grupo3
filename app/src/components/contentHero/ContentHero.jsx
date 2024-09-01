import React from 'react';

import styles from './styles.module.css';

const ContentHero = ({ title, subtitle, text }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.subtitle}>{subtitle}</h3>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default ContentHero;
