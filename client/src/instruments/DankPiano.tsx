// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, { useState } from 'react';
import violin from '../img/665px-Violin-with-bow.svg';
// project imports
import { Instrument } from '../Instruments';
/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Violin.
 ** ------------------------------------------------------------------------ */

const sampler = new Tone.Sampler({
  urls: {
    A3: 'A3.mp3',
    A4: 'A4.mp3',
    A5: 'A5.mp3',
    C3: 'C3.mp3',
    C5: 'C5.mp3',
    C6: 'C6.mp3',
    E3: 'E3.mp3',
    E4: 'E4.mp3',
    E5: 'E5.mp3',
  },
  baseUrl: 'http://localhost:3000/samples/violin/',
}).toDestination();

function Violin(): JSX.Element {
  const [currVString, setCurrVString] = useState(1);
  const vString = {
    1: ['G', 'Ab', 'A', 'Bb', 'B', 'Cb', 'C', 'Db'],
    2: ['D', 'Eb', 'E', 'Fb', 'F', 'Gb', 'G', 'Ab'],
    3: ['A', 'Bb', 'B', 'Cb', 'C', 'Db', 'D', 'Eb'],
    4: ['E', 'Fb', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb'],
  }

  function ViolinButton(): JSX.Element {
    switch (currVString) {
      case 1:
        vString[1].map((note) => <a className="f6 link dim br3 ph3 pv2 mb2 dib white bg-purple" href="#0">{note}</a>)
        break;
      case 2:
      case 3:
      case 4:
    }
  }

  return (<div className = 'pp4'><div
    className='fl w-10 pa2'>
    <img src={violin} alt='Violin photo'/>
    </div>
    <div className='fl w-10 pa2'>
      <label>
        Current String: <input value={currVString} onChange={(e) => setCurrVString(parseInt(e.target.value))}/>
      </label>
    </div>
    <div className='relative dib h4 w-100 ml4'>
      {currVString === 1 ? vString[1].map((note) => <a className="f6 link dim br3 ph3 pv2 mb2 dib white bg-purple" href="#0">{note}</a>) : <div>Hello world</div>}
    </div>
    
  </div>);
}

export const ViolinInstrument = new Instrument('Violin', Violin);