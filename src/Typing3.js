import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // import bootstrap
import './Typing.css'; // import css

const WPM = () => {
  const [time, setTime] = useState(0);

  const [hasMounted, setHasMounted] = useState(false);
  const [getText, setGetText] = useState(false);
  const [showText, setShowText] = useState(false);

  const [toType, setToType] = useState('');
  const [splitToType, setSplitToType] = useState(null);

  const [typed, setTyped] = useState('');
  const [splitTyped, setSplitTyped] = useState(['']);

  const [displayText, setDisplayText] = useState(['']);

  const [wrongWords, setWrongWords] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [isRunning, setIsRunning] = useState(0);

  const [colourList, setColourList] = useState([]);


  const genText = () => {
    setGetText(true);
  }

  const fetchData = async () => {
    /*
    const response = await fetch('/path/to/db');
    const data = await response.json();
    let textUwU = data.toType;
    */
    setToType('good morning children');
  };

  useEffect(() => {
    if (hasMounted) {
      fetchData();
    }
  }, [getText]);

  useEffect(() => {
    if (hasMounted) {
      let splitted = toType.split(' ');
      setSplitToType(splitted);
      setShowText(true);
    } else {
      setHasMounted(true);
    }
  }, [toType]);


  const handleTextChange = (e) => {
    let value = e.target.value;
    let splitted = value.split(' ');
    let reset = false;
    for (let i=splitted.length-2; i>=0; i--) {
      if (splitted[i] === '') {
        splitted.splice(i, 1);
        reset = true;
      }
    }
    if (reset) {
      value = '';
      for (let i=0, n=splitted.length; i<n; i++) {
        value += splitted[i];
        if (i !== n-1) {
          value += ' ';
        }
      }
    }

    setTyped(value);
    setSplitTyped(splitted);
    checkWords();

    if (isRunning === 0) {
      resetTimer();
      startTimer();
      //console.log(splitToType, toType);
    }
  };

  useEffect(() => {
    if (isRunning === 1 && splitToType !== null) {
      if (splitTyped.length > splitToType.length || splitToType[splitToType.length-1] === splitTyped[splitTyped.length-1]) {
        stopTimer();
      }
    }
  }, [splitTyped, splitToType]);

  useEffect(() => {
    checkWords();
  }, [splitTyped]);

  const checkWords = useCallback(() => {
    let colours = [];
    let wrongs = 0;
    for (let i = 0, n = splitTyped.length; i < n; i++) {
      let colour = [];
      let wrong = false;

      for (let j = 0, m = splitTyped[i].length; j < m; j++) {
        let c = 'red';

        if (i < splitToType.length) {
          if (j < splitToType[i].length) {
            if (splitToType[i][j] === splitTyped[i][j]) {
              c = 'green';
            } else {
              wrong = true;
            }
          } else {
            //MIGHT-DO: add to display text?
          }
        }

        colour.push(c);
      }
      if (wrong) wrongs++;
      colours.push(colour);
    }
    setColourList(colours);
    setWrongWords(wrongs);
  }, [splitToType, splitTyped]);


  const matchColour = (i, j) => {
    if (i < colourList.length) {
      if (j < colourList[i].length) {
        return { color: colourList[i][j] };
      }
    }
    return { color: 'white' };
  };


  useEffect(() => {
    let interval;
    if (isRunning === 1) {
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
    setWpm(((splitToType.length - wrongWords) / (elapsed / 1000 / 60)).toFixed(2));
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
              onClick={genText}
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
              {splitToType.map((word, i) => (
                <span key={i}>
                  {word.split('').map((char, j) => (
                    <span key={j} style={matchColour(i, j)}>
                      {char}
                    </span>
                  ))}
                  {' '}
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

      { // <div id="editable" contentEditable="true"></div>
      }

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

      {isRunning === 2 ? (
      <div>
        <h1 style={{ padding: '15px 0 0 0' }}>
          wpm: {wpm}
        </h1>
        <h1 style={{ padding: '15px 0 15px 0' }}>
          wrong words: {wrongWords}
        </h1>
      </div>
      ) : (
        ''
      )}

    </div>
  );
};

export default WPM;