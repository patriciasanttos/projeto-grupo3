import React from 'react';

import styles from './styles.module.css';

const ContentTitle = ({ title, subtitle }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.subtitle}>{subtitle}</h3>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};

export default ContentTitle;
