import React from 'react';

import ContentTitle from '../contentTitles/ContentTitles';
import './ContentHero.scss'

const ContentHero = ({ title, subtitle, text, text2 }) => {
  return (
    <div className="container-hero">
      <ContentTitle title={title} subtitle={subtitle} />
      <p className="text-hero">{text}</p>
      <p className="text-hero">{text2}</p>
    </div>
  );
};

export default ContentHero;
