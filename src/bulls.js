import React from 'react';
import BullsForm from './form';
import Header from './Header/header';

class Bulls extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
  
      return (
        <div>
          <Header/>
          <BullsForm />
        </div>
      );
    }
  }

  export default Bulls;