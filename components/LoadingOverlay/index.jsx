import { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';

import './loading-overlay.css';

const LoadingOverlay = (props) => {
  const { onClick, hidden = false } = props;
  const { active, progress, errors, item, loaded, total } = useProgress();
  const [currentProgress, setCurrentProgress] = useState(0);
  let progressValue = currentProgress;
  let finished = progressValue > 100 ? true : false;

  const delay = 2;

  const handleOnStart = () => {
    if (onClick) {
      onClick();
    }
  };

  useEffect(() => {
    let interval;
    if (progress >= 100) {
      if (!finished) {
        interval = setInterval(() => {
          setCurrentProgress((prev) => {
            let percentagePerTick = 100 / delay;
            let newValue = prev + percentagePerTick;
            // if (newValue > 100) {
            //   newValue = 100;
            // }
            // return progress;
            return newValue;
          });
        }, delay * 1000);

        if (finished) {
          clearInterval(interval);
        }
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [progress]);

  const handleOnAddProgress = () => {
    setCurrentProgress((prev) => {
      let newValue = prev + 10;
      return newValue;
    });
  };

  return (
    <div className={`loading-overlay-container ${hidden ? 'animate-hide-loading-overlay' : ''}`}>
      <ProgressBar value={progressValue}>
        <div className={`loading-overlay-title-container`}>
          <div
            className={`${
              finished
                ? 'animate__animated animate__fadeOutUp animate__delay-1s2'
                : 'animate__animated animate__fadeIn '
            }`}
          >
            Ready to Dive in?
          </div>
        </div>
        <div className="loading-overlay-button-container">
          <button
            className={`loading-overlay-button ${finished ? 'animate-enable-button' : ''}`}
            onClick={handleOnStart}
          >
            <span
              className={`loading-overlay-button-span-1 ${finished ? 'animate-button-span' : ''}`}
            />
            <div
              className={`loading-overlay-button-label ${
                finished
                  ? 'animate__animated2 animate__fadeIn2 animate__delay-1s2 animate-show-button-label'
                  : ''
              }`}
            >
              <span className={``}>
                <em>Start the experience</em>
              </span>
              <span className={``}>
                <em>Discover now</em>
              </span>
            </div>
            <span
              className={`loading-overlay-button-span-2 ${finished ? 'animate-button-span' : ''}`}
            />
          </button>
        </div>
      </ProgressBar>

      {/* <div className="sample-relative">
        <div className="sample-absolute" style={{ backgroundColor: 'green' }}></div>
        <div className="sample-absolute" style={{ backgroundColor: 'cyan' }}>
          <div
            className="sample-absolute"
            style={{ backgroundColor: 'blue', position: 'relative', height: '50%' }}
          >
            <div className="sample-absolute" style={{ backgroundColor: 'yellow' }}></div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default LoadingOverlay;

const ProgressBar = (props) => {
  const { value = 0, children } = props;
  let progressValue = value;

  let finished = progressValue > 100 ? true : false;
  let indicatorStyle = {
    width: progressValue ? `${progressValue > 100 ? 100 : progressValue}%` : 0,
  };

  return (
    <div className={`progress-bar-container ${finished ? 'animate-progress-bar-container' : ''}`}>
      <div
        className={`progress-bar-indicator ${
          finished ? 'animate-hide-progress-bar-indicator' : ''
        }`}
        style={indicatorStyle}
      />
      {children}
    </div>
  );
};
