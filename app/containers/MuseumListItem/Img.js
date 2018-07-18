/* eslint-disable react/prop-types */
import NormalImg from 'components/Img';

import React from 'react';

function Img(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <NormalImg
      src={`data:image;base64,${props.icon}`}
      alt={props.alt}
      style={{ display: 'block' }}
    />
  );
}

export default Img;
