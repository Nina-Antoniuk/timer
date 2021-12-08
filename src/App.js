import { useState } from 'react';
import { interval, fromEvent } from 'rxjs';
import { filter, scan, timeInterval } from 'rxjs/operators';
import './App.css';

function App() {
  const [timerStatus, setTimerStatus] = useState('inactive');
  const [time, setTime] = useState(0);
  const [subscription, setSubscription] = useState(null);

  const onStartBtnClick = () => {
    activateSubscription();
  };

  const onStopBtnClick = () => {
    if (!subscription) return;
    setTime(0);
    setTimerStatus('inactive');
    subscription.unsubscribe();
    setSubscription(null);
  };

  const onWaitBtnClick = () => {
    const target$ = fromEvent(document.querySelector('#waitBtn'), 'click');
    const doubleClicks = target$
      .pipe(
        timeInterval(),
        scan((acc, val) => (val.interval < 300 ? acc + 1 : 0), 0),
        filter(val => val === 1),
      )
      .subscribe(() => {
        if (!subscription) return;
        setTimerStatus('inactive');
        subscription.unsubscribe();
      });
  };

  const onResetClick = () => {
    if (!subscription) return;
    setTime(0);
    subscription.unsubscribe();
    activateSubscription();
  };

  const activateSubscription = () => {
    const observable$ = interval(1000);
    const subscribtion = observable$.subscribe(data =>
      setTime(state => state + 1000),
    );
    setTimerStatus('active');
    setSubscription(subscribtion);
  };

  return (
    <div className="App">
      <h1>Timer</h1>
      <p className="timer">{new Date(time).toISOString().slice(11, 19)}</p>
      <div className="buttonContainer">
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
          onClick={onResetClick}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
