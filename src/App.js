import { useState } from 'react';
import { interval } from 'rxjs';
import './App.css';

function App() {
  const [timerStatus, setTimerStatus] = useState('inactive');
  const [time, setTime] = useState(0);
  const [subscribtion, setSubscribtion] = useState(null);

  const onStartBtnClick = () => {
    const observable$ = interval(1000);
    const subscription = observable$.subscribe(data =>
      setTime(state => state + 1000),
    );
    setTimerStatus('active');
    setSubscribtion(subscription);
  };

  const onStopBtnClick = () => {
    setTime(0);
    setTimerStatus('inactive');
    subscribtion.unsubscribe();
  };

  const onWaitBtnClick = () => {
    setTimerStatus('inactive');
    subscribtion.unsubscribe();
  };

  const onResetnClick = () => {
    setTime(0);
  };

  return (
    <div className="App">
      <h1>Timer</h1>
      <p className="timer">{new Date(time).toISOString().slice(11, 19)}</p>
      <div>
        <button
          className="button"
          id="startBtn"
          type="button"
          onClick={onStartBtnClick}
          disabled={timerStatus === 'active' ? true : false}
        >
          Start
        </button>
        <button
          className="button"
          id="stopBtn"
          type="button"
          onClick={onStopBtnClick}
        >
          Stop
        </button>
        <button
          className="button"
          id="waitBtn"
          type="button"
          onClick={onWaitBtnClick}
        >
          Wait
        </button>
        <button
          className="button"
          id="resetBtn"
          type="button"
          onClick={onResetnClick}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
