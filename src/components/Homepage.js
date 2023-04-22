import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // import bootstrap
import Solo from './Solo.js';
import Bots from './Bots.js';

const Homepage = () => {
  const [showButtons, setShowButtons] = useState(true);
  const [mode, setMode] = useState(0);

  const clickSolo = () => {
    setMode(1);
  };

  const clickBots = () => {
    setMode(2);
  };

  const clickBack = () => {
    setMode(0);
  };

  useEffect(() => {
    if (mode !== 0) {
      setShowButtons(false);
    } else {
      setShowButtons(true);
    }
  }, [mode]);

  return (
    <div className="container" style={{ backgroundColor: "#ffbf00", boxShadow: "25px 25px  #d49b00", padding: '25px', borderRadius: '50px' }}>

      {/* title */}
      <div className="row">
        <div className="col-12">
          {/* title: */}
          <h1 className="display-1" style={{ padding: '1em 2em 15px 2em' }}>
            typeracer
          </h1>
          <div style={{ height: 20 }} />
        </div>
      </div>

      {showButtons ? (
        <div className='row'>
          <div>
            <button
              className="btn btn-success btn-block"
              onClick={clickSolo}
              style={{ padding: '10px 20px 10px 20px', borderRadius: '15px', marginRight: '10px', fontSize: '25px' }}
            >
              Solo
            </button>

            <button
              className="btn btn-success btn-block"
              onClick={clickBots}
              style={{ padding: '10px 20px 10px 20px', borderRadius: '15px', marginLeft: '10px', fontSize: '25px' }}
            >
              VS Bots
            </button>
          </div>

          <div style={{ height: '20px' }}></div>
        </div>
      ) : (
        <div>
          {mode === 1 ? (
          <div>
            <Solo />
          </div>
          ) : (
          <div>
            <Bots />
          </div>
          )}

          <button
            className="btn btn-light btn-block"
            onClick={clickBack}
            style={{ padding: '10px 20px 10px 20px', borderRadius: '15px' }}
          >
            Back
          </button>

        </div>
      )}


    </div>
  );
};

export default Homepage;