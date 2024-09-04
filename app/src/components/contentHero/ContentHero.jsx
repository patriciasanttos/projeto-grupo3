import React from 'react';

import styles from './styles.module.css';
import ContentTitle from '../contentTitles/ContentTitles';

const ContentHero = ({ title, subtitle, text, text2 }) => {
  return (
    <div className={styles.container}>
      <ContentTitle
        title = {title}
        subtitle = {subtitle}
      />
      <p className={styles.text}>{text}</p>
      <p className={styles.text}>{text2}</p>
    </div>
  );
};

export default ContentHero;
