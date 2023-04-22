import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // import bootstrap
import './Typing.css'; // import poppins font

const WPMChecker = () => {
  //  defining variables with states
  const [typed, setTyped] = useState('');
  const [stringList, setStringList] = useState([]);
  const [text, setText] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showText, setShow] = useState(false);
  const [timeStarted, setTimeStarted] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [wpm, setWpm] = useState(0);

  //get time when user starts typing
  const start = () => {
    const newId = setInterval(() => {
      const elapsed = Date.now() - timeStarted;
      setTimeElapsed(elapsed);
    }, 10);
    setIntervalId(newId);
  };

  //get time elapsed and calc wpm
  const stop = () => {
    calculateWPM(Date.now() - timeStarted);
    clearInterval(intervalId);
    setTimeElapsed(Date.now() - timeStarted);
  };

  //calc wpm
  const calculateWPM = (elapsed) => {
    setWpm((typed.split(' ').length / (elapsed / 1000 / 60)).toFixed(2));
  };

  //when input given, update text typed and run start() if inital time hasnt been gotten yet
  const handleTextChange = (value) => {
    setTyped(value);
    handleSplitString();
    console.log(stringList);
    if (!isRunning) {
      setIsRunning(true);
      start();
    }
    if (value === text) {
      setIsRunning(false);
      stop();
    }
  };

  const handleSplitString = () => {
    const splitString = typed.split(' ');
    setStringList(splitString);
  };

  //get text used for typing and show
  const generateText = () => {
    setText('import from database please');
    setShow(true);
  };

  //char comparison INCOMPLETE
  const checkChar = (e) => {
    handleTextChange(e.target.value);
    for (let i = 0; i < typed.length; i++) {

    }
  };

  useEffect(() => {
    setTimeStarted(Date.now());
    const id = setInterval(() => {
      setTimeElapsed(Date.now() - timeStarted);
    }, 10);
    setIntervalId(id);
  }, []);

  return (
    <div className="container" style={{ backgroundColor: "darkorange" }}>
      <div className="row">
        <div className="col-12">
          {/* title: */}
          <h1 className="display-1">Typeracer</h1>
          <div style={{ height: 20 }} />
        </div>
      </div>
      <div className="row">
        {!showText ? (
          <div>
            {/* button to generate text: */}
            <button
              className="btn btn-secondary btn-block"
              onClick={generateText}
            >
              Generate Text
            </button>
          </div>
        ) : (
          <>
          {/* logic for checking text */}
            <p>
              Text:{' '}
              {text
                .split('')
                .map((char, index) => (
                  <span
                    key={index}
                    style={
                      char === typed[index]
                        ? { color: 'black' }
                        : { color: 'red' }
                    }
                  >
                    {char}
                  </span>
                ))}
            </p>
          </>
        )}
        <div className='col-12'>
          <p>

          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {showText
            ? <div>
              {/* text input */}
              <textarea
                className="form-control"
                rows={10}
                style={{ backgroundColor: "grey", border: "grey" }}
                placeholder=" "
                defaultValue={typed}
                onInput={checkChar}
              />
              {/* prompt user to start typing if timer hasnt started, else show timer */}
              {isRunning ? (
                <div>Timer: {(timeElapsed / 1000).toFixed(2)}</div>
              ) : (
                <div>Start typing!</div>
              )}
            </div>
            : <div></div>
          }
        </div>
      </div>
      <div className="row" style={{ marginTop: '20px' }}>
        <div className="col-12">
          {/* show wpm when done */}
          <p className="text-center">
            {stringList}
            {wpm ? `Your WPM is: ${wpm}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WPMChecker;