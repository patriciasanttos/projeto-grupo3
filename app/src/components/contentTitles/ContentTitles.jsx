import React from 'react';

import './ContentTitles.scss';

const ContentTitle = ({ title, subtitle }) => {
  return (
    <div>
      <h3 className="subtitles">{subtitle}</h3>
      <h1 className="titles">{title}</h1>
    </div>
  );
};

export default ContentTitle;
