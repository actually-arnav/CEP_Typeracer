import React, { useState, useEffect } from "react";

const TypingSpeedChecker = () => {
  const [text, setText] = useState("");
  const [time, setTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [errors, setErrors] = useState(0);
  const [typingTest, setTypingTest] = useState("");
  const [testIndex, setTestIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    setWpm(Math.round((text.length / 5) / (time / 60000)));
  }, [text, time]);

  const startTest = () => {
    setTypingTest(sampleText);
    setIsRunning(true);
  };

  const checkChar = (e) => {
    if (e.target.value[e.target.value.length - 1] === typingTest[testIndex]) {
      setTestIndex(testIndex + 1);
    } else {
      setErrors(errors + 1);
    }
    setText(e.target.value);
  };

  const finishTest = () => {
    setIsRunning(false);
  };

  return (
    <>
      <h1>Typing Speed Checker</h1>
      {!isRunning ? (
        <>
          <button onClick={startTest}>Start Test</button>
        </>
      ) : (
        <>
          <p>Time: {time / 1000} seconds</p>
          <p>WPM: {wpm}</p>
          <p>Errors: {errors}</p>
          <p>
            Typing:{" "}
            {typingTest
              .split("")
              .map((char, index) => (
                <span
                  key={index}
                  style={
                    index < testIndex
                      ? { color: "green" }
                      : { color: "black" }
                  }
                >
                  {char}
                </span>
              ))}
          </p>
          <textarea onChange={checkChar} onBlur={finishTest} autoFocus />
        </>
      )}
    </>
  );
};

export default TypingSpeedChecker;
