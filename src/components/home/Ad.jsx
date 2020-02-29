import React from 'react';
import './Ad.css';
import { Link } from 'react-router-dom';

const Ad = props => {
  return (
    <div className="Ad">
      <Link to={'detail/' + props.data._id}>
        <p>{props.data.name}</p>
        <p>{props.data.price} €</p>
        <img alt={props.data.name} src={props.data.photo} />
      </Link>
      <button>
        <Link to={'update/' + props.data._id}>Update</Link>
      </button>
    </div>
  );
};
export default Ad;
