import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // import bootstrap
import './Typing.css'; // import css

const WPM = () => {
  const [time, setTime] = useState(0);

  const [showText, setShowText] = useState(false);
  const [toType, setToType] = useState('');
  const [splitToType, setSplitToType] = useState(null);

  const [typed, setTyped] = useState('');
  const [splitTyped, setSplitTyped] = useState(['']);

  const [wpm, setWpm] = useState(0);
  const [isRunning, setIsRunning] = useState(0);

  const [colourList, setColourList] = useState([]);


  // generate text
  const generateText = () => {
    fetchData();
    checkWords();
  }

  const fetchData = async () => {
    /*
    const response = await fetch('/path/to/db');
    const data = await response.json();
    let textUwU = data.toType;
    */
    setToType('morning children');
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let splitted = toType.split(' ');
    setSplitToType(splitted);
    setShowText(true);
  }, [toType]);


  const handleTextChange = (e) => {
    let value = e.target.value;
    setTyped(value);
    let splitted = value.split(' ');
    setSplitTyped(splitted);
    checkWords();
    if (isRunning === 0) {
      resetTimer();
      startTimer();
      console.log(splitToType, toType);
    }
    if (value === toType) {
      console.log('yes');
      stopTimer();
    }
  };

  const checkWords = () => {
    if (splitTyped.length > splitToType.length) {
      stopTimer();
    }
    for (let i = 0, n = splitToType.length; i < n; i++) {
      let colours = [];
      for (let j = 0, m = splitToType[i].length; j < m; j++) {
        let c = 'black';

        if (splitTyped[i] && j <= splitTyped[i].length && splitTyped[i][j] === splitToType[i][j]) {
          c = 'green';
        }
        colours.push(c);
      }
      setColourList(prevList => [...prevList, colours]);
    }
  }

  function getSpanStyle(char) {
    for (let i = 0, n = splitToType.length; i < n; i++) {
      for (let j = 0, m = splitToType[i].length; j < m; j++) {
        if (splitToType[i][j].includes(char)) {
          const colours = colourList[i];
          const colour = colours ? colours[j] : null;
          return { color: colour || 'black' };
        }
      }
    }
    return {};
  }


  useEffect(() => {
    let interval;
    if (isRunning == 1) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(1);
  };

  const stopTimer = () => {
    setIsRunning(2);
    calculateWPM(time);
  };

  const resetTimer = () => {
    setTime(0);
  };

  const calculateWPM = (elapsed) => {
    setWpm((2 / (elapsed / 1000 / 60)).toFixed(2));
  };

  // document.addEventListener("DOMContentLoaded", function() {
  //   const editableDiv = document.getElementById('editable');
  //   editableDiv.innerHTML = "Type your text here.";

  //   editableDiv.addEventListener('input', function() {
  //     const text = editableDiv.innerText;
  //     setTyped(text);
  //     console.log(typed);
  //   });
  // });

  return (
    <div className="container" style={{ backgroundColor: "darkorange" }}>

      {/* title */}
      <div className="row">
        <div className="col-12">
          {/* title: */}
          <h1 className="display-1" style={{ padding: '1em 2em 15px 2em' }}>Typeracer</h1>
          <div style={{ height: 20 }} />
        </div>
      </div>

      {/* text+typebox / button for text */}
      <div className="row">
        {!showText ? (
          <div style={{ padding: '20px' }}>

            {/* button to generate text: */}
            <button
              className="btn btn-secondary btn-block"
              onClick={generateText}
              style={{ padding: '10px 20px 10px 20px' }}
            >
              Generate Text
            </button>
          </div>
        ) : (
          <div>

            {/* text */}
            <p>
              Text:{' '}
              {toType
                .split('')
                .map((char, index) => (
                  <span key={index} style={getSpanStyle(char)}>
                    {char}
                  </span>
                ))}
            </p>

            {/* <p style={{ padding: '0 0 10px 0' }}>{toType}</p> */}

            {/* textbox */}
            <textarea
              className="form-control"
              rows={10}
              style={{ backgroundColor: "grey", border: "grey", resize: 'none' }}
              placeholder=""
              defaultValue={typed}
              onInput={handleTextChange}
            />
          </div>
        )}
      </div>

      {/* <div id="editable" contentEditable="true"></div> */}

      {/* display time */}
      <h1 style={{ padding: '15px 0 15px 0' }}>
        {(time / 1000).toFixed(2)}s
      </h1>

      <div className="row" style={{ marginTop: '20px' }}>
        <div className="col-12">
          <p className="text-center">
            {typed}
          </p>
        </div>
      </div>

      <h1 style={{ padding: '15px 0 15px 0' }}>
        { isRunning === 2 ? wpm : '' }
      </h1>

    </div>
  );
};

export default WPM;