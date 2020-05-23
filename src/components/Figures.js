import PropTypes from 'prop-types'
import React from 'react'

export default function Figures({ value }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 483.37 686"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <g id="figure">
          <path
            transform="translate(-119.21 -12.7)"
            fill="#BB0000"
            d="M602.58,289.84a309.93,309.93,0,0,1-12.2,83.5c-8.52,30-20.85,58.36-37.87,84.58a222.86,222.86,0,0,1-38.77,45.81c-16.41,14.57-34.72,25.88-55.84,32.34a122.05,122.05,0,0,1-38.25,5.39c-14.32-.27-29.83-2.47-43.06-7.9a36,36,0,0,0-7.21-2.38,29.46,29.46,0,0,0-8.65,0c-5.26.62-10.44,1.76-15.61,2.9-5.9,1.3-11.43,3.15-17.33,4.25a116.37,116.37,0,0,1-32.07.41c-23.76-3-44.83-12.59-64.12-26.43-17.95-12.88-33.16-28.55-46.53-46.06-21.07-27.58-36.74-58-48.19-90.74a326.64,326.64,0,0,1-13.47-51.31,232.52,232.52,0,0,1-3.76-31.93c-.31-8.66-.62-17.35-.28-26,.79-20.11,4.36-39.71,12.27-58.34,18.77-44.18,61-66.19,107.37-69.86,27.6-2.18,55.38,1.86,82.24,8.57a204.74,204.74,0,0,1,23.2,7c3.85,1.46,7.64,3.11,11.53,4.45,8.94,3.09,17.36,2.75,26.61,2.26,7.91-.42,13.29-3.88,20.52-7.15a172.37,172.37,0,0,1,55.24-14.81c46.4-4.19,93.73,13.13,119.46,53.33,9.34,14.59,15.34,30.55,19.23,47.35A200.47,200.47,0,0,1,602,274.21C602.24,279.42,602.38,284.63,602.58,289.84Z"
          />
          <path
            transform="translate(-119.21 -12.7)"
            fill="green"
            d="M382.66,102.65c-.17,1.63-3.67,1.65-4.72,1.8a142,142,0,0,1-32.55.59C309.2,101.85,274.84,92,242.11,76.35c-10-4.76-19.51-10.29-28-17.45-4.28-3.61-8.26-7.51-10.92-12.57-4-7.56-1.93-13.85,4.07-18.81A45,45,0,0,1,221,20.23a129.45,129.45,0,0,1,30.27-6.69,135,135,0,0,1,19.59-.76c22.65.89,44,6.42,63.48,18.29A111.64,111.64,0,0,1,364.66,58C373.1,68.91,378,80.4,382.27,93.18c-16.49-8.74-32.3-17.72-49.79-24.54a530,530,0,0,0-52.48-17c-16.83-4.62-34-8.76-51.46-8.8,53.22,12.5,107.28,27,152.54,57.61a3.47,3.47,0,0,1,1.46,1.52A1.55,1.55,0,0,1,382.66,102.65Z"
          />
          <path
            transform="translate(-119.21 -12.7)"
            fill="#661100"
            d="M435.38,44.07q-.16.61-.36,1.2c-2.38,6.92-11.31,9.17-16,14.81a12,12,0,0,0-1.24,2.08,212.63,212.63,0,0,0-19.57,53.18c-3.28,14.13.36,38.65-18.21,42.25-5.27,1-10.77,0-15.79-1.87a5.69,5.69,0,0,1-1.95-1.07,4.13,4.13,0,0,1-.84-4.13,12.15,12.15,0,0,1,2.23-3.8c13.68-17.92,22.71-38.66,30.06-59.95,3.2-9.27,7.88-18.81,9.72-28.44,1.89-9.89.83-20.09,2.68-30a12.83,12.83,0,0,1,1.3-4.06c5.11-8.92,18.62-.29,23.51,4A16.06,16.06,0,0,1,435.38,44.07Z"
          />
          <path
            transform="translate(-119.21 -12.7)"
            fill="none"
            d="M432.67,125l-.33-.33"
          />
        </g>
      </defs>

      {value === 1 && (
        <g id="value1">
          <use transform="scale(0.4) translate(350, 570)" xlinkHref="#figure" />
        </g>
      )}

      {value === 2 && (
        <g id="value2">
          <use transform="scale(0.3) translate(280, 450)" xlinkHref="#figure" />
          <use
            transform="scale(0.3) translate(800, 1350)"
            xlinkHref="#figure"
          />
        </g>
      )}

      {value === 3 && (
        <g id="value3">
          <use
            transform="scale(0.25) translate(280, 410)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.25) translate(700, 1100)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.25) translate(1150, 1800)"
            xlinkHref="#figure"
          />
        </g>
      )}

      {value === 4 && (
        <g id="value4">
          <use
            transform="scale(0.25) translate(300, 720)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.25) translate(1150, 720)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.25) translate(300, 1750)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.25) translate(1150, 1750)"
            xlinkHref="#figure"
          />
        </g>
      )}

      {value === 5 && (
        <g id="value5">
          <use
            transform="scale(0.2) translate(600, 1250)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(1290, 1250)"
            xlinkHref="#figure"
          />

          <use
            transform="scale(0.2) translate(300, 2300)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(950, 2300)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(1600, 2300)"
            xlinkHref="#figure"
          />
        </g>
      )}

      {value === 6 && (
        <g id="value6">
          <use
            transform="scale(0.2) translate(300, 1250)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(950, 1250)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(1600, 1250)"
            xlinkHref="#figure"
          />

          <use
            transform="scale(0.2) translate(300, 2300)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(950, 2300)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(1600, 2300)"
            xlinkHref="#figure"
          />
        </g>
      )}

      {value === 7 && (
        <g id="value7">
          <use transform="scale(0.2) translate(300, 350)" xlinkHref="#figure" />

          <use
            transform="scale(0.2) translate(300, 1380)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(950, 1380)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(1600, 1380)"
            xlinkHref="#figure"
          />

          <use
            transform="scale(0.2) translate(300, 2500)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(950, 2500)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(1600, 2500)"
            xlinkHref="#figure"
          />
        </g>
      )}

      {value === 8 && (
        <g id="value8">
          <use
            transform="scale(0.2) translate(300, 1050)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(950, 1050)"
            xlinkHref="#figure"
          />

          <use
            transform="scale(0.2) translate(300, 1750)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(950, 1750)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(1601, 1750)"
            xlinkHref="#figure"
          />

          <use
            transform="scale(0.2) translate(300, 2500)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(950, 2500)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(1601, 2500)"
            xlinkHref="#figure"
          />
        </g>
      )}

      {value === 9 && (
        <g id="value9">
          <use
            transform="scale(0.2) translate(300, 1050)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(950, 1050)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(1601, 1050)"
            xlinkHref="#figure"
          />

          <use
            transform="scale(0.2) translate(300, 1750)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(950, 1750)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(1601, 1750)"
            xlinkHref="#figure"
          />

          <use
            transform="scale(0.2) translate(300, 2500)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(950, 2500)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(1601, 2500)"
            xlinkHref="#figure"
          />
        </g>
      )}

      {value === 10 && (
        <g id="value10">
          <use transform="scale(0.2) translate(300, 350)" xlinkHref="#figure" />

          <use
            transform="scale(0.2) translate(300, 1050)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(950, 1050)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(1601, 1050)"
            xlinkHref="#figure"
          />

          <use
            transform="scale(0.2) translate(300, 1750)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(950, 1750)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(1601, 1750)"
            xlinkHref="#figure"
          />

          <use
            transform="scale(0.2) translate(300, 2500)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(950, 2500)"
            xlinkHref="#figure"
          />
          <use
            transform="scale(0.2) translate(1601, 2500)"
            xlinkHref="#figure"
          />
        </g>
      )}
    </svg>
  )
}

Figures.propTypes = {
  value: PropTypes.number.isRequired,
}
