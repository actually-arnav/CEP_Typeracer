import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // import bootstrap

const Bots = () => {

  return (
    <div className='container'>
      <button
        className="btn btn-secondary btn-block"
        // onClick={clickBack}
        style={{ padding: '10px 20px 10px 20px', borderRadius: '15px', marginRight: '10px', fontSize: '25px' }}
      >
        Easy
      </button>

      <button
        className="btn btn-secondary btn-block"
        // onClick={clickBack}
        style={{ padding: '10px 20px 10px 20px', borderRadius: '15px', marginRight: '10px', fontSize: '25px' }}
      >
        Medium
      </button>

      <button
        className="btn btn-secondary btn-block"
        // onClick={clickBack}
        style={{ padding: '10px 20px 10px 20px', borderRadius: '15px', marginRight: '10px', fontSize: '25px' }}
      >
        Hard
      </button>
    </div>
  );
};

export default Bots;