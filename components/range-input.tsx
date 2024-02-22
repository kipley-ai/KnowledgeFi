import { useState } from "react";
import { Range } from "react-range";

type Props = {
    rtl: boolean;
    min: number;
    max: number;
    step: number;
    style?: string;
    values: number[];
    setValues: (values: number[]) => void;
};

export enum Direction {
    Right = 'to right',
    Left = 'to left',
    Down = 'to bottom',
    Up = 'to top'
  }

interface ITrackBackground {
    min: number;
    max: number;
    values: number[];
    colors: string[];
    direction?: Direction;
    rtl?: boolean;
}

const getTrackBackground = ({values, colors, min, max, direction, rtl}: ITrackBackground) => {
    if (rtl && direction === Direction.Right) {
      direction = Direction.Left;
    } else if (rtl && Direction.Left) {
      direction = Direction.Right;
    }
    // sort values ascending
    const progress = values.slice(0).sort((a, b) => a - b).map(value => ((value - min) / (max - min)) * 100);
    const middle = progress.reduce(
      (acc, point, index) =>
        `${acc}, ${colors[index]} ${point}%, ${colors[index + 1]} ${point}%`,
      ''
    );
    return `linear-gradient(${direction}, ${colors[0]} 0%${middle}, ${colors[colors.length - 1]
      } 100%)`;
}

const TwoThumbs= ({ rtl, min, max, step, values, setValues }: Props) => {
  return (
    <div
      className="flex justify-center flex-wrap"
    >
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        rtl={rtl}
        onChange={(values) => {
          setValues(values);
        }}
        renderTrack={({ props, children }) => (
          <div
            className="flex w-full h-9"
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
            }}
          >
            <div
              className="w-full h-[5px] rounded self-center"
              ref={props.ref}
              style={{
                background: getTrackBackground({
                  values,
                  colors: ['#50575F', '#01F7FF', '#50575F'],
                  min: min,
                  max: max,
                  rtl: true,
                }),
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged, index }) => (
          
          <div
            {...props}
            className="flex w-3 h-3 ring ring-[#01F7FF] rounded-lg bg-white items-center justify-center"
            style={{
              ...props.style,
            }}
          >
            
          </div>
        )}
      />
      {/* <output style={{ marginTop: '30px' }} id="output">
        {values[0].toFixed(1)} - {values[1].toFixed(1)}
      </output> */}
    </div>
  );
};

export default TwoThumbs;