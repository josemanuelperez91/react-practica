import React from 'react';
import './Edit.css';
import Form from './Form';
import { postAd } from '../../js/apiCalls';
import { Link } from 'react-router-dom';

class Create extends React.Component {
  onCreate = adData => {
    postAd(adData).then(response => {
      if (response.ok) {
        this.props.history.push('/home');
      }
    });
  };

  render() {
    return (
      <div className="Edit">
        <Form onSubmit={this.onCreate}></Form>
        <button>
          <Link to="/home">Back</Link>
        </button>
      </div>
    );
  }
}

export default Create;
