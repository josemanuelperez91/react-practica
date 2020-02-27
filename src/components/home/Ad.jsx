import React from 'react';
import './Ad.css';

const Ad = props => {
  return (
    <div className="Ad">
      <p>{props.data.name}</p>
      <p>{props.data.price} €</p>
      <img src={props.data.photo} />
    </div>
  );
};
export default Ad;
