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
  const [currVString, setCurrVString] = useState('1');
  const vString: any = {
    1: ['G3', 'Ab3', 'A3', 'Bb3', 'B3', 'Cb4', 'C4', 'Db4'],
    2: ['D4', 'Eb4', 'E4', 'Fb4', 'F4', 'Gb5', 'G5', 'Ab5'],
    3: ['A5', 'Bb5', 'B5', 'Cb6', 'C6', 'Db6', 'D6', 'Eb6'],
    4: ['E6', 'Fb6', 'F6', 'Gb6', 'G6', 'Ab7', 'A7', 'Bb7'],
  };

  function ViolinButton(): JSX.Element | null {
    if (
      currVString === '1' ||
      currVString === '2' ||
      currVString === '3' ||
      currVString === '4'
    ) {
      return vString[currVString].map((note: any) => (
        <div
          className='f6 link dim br3 ph3 pv2 mb2 dib white bg-purple'
          onClick={() => {
            sampler.triggerAttackRelease(`${note}`, '4n');
          }}>
          {note}
        </div>
      ));
    }

    return null;
  }

  return (
    <div className='pp4'>
      <div className='fl w-20 pa2'>
        <img src={violin} alt='Violin photo' />
      </div>
      <div className='fl w-10 pa2'>
        <label>
          Current String:{' '}
          <input
            value={currVString}
            onChange={e => setCurrVString(e.target.value)}
          />
        </label>
      </div>
      <div className='relative dib h4 w-100 ml4'>
        {/* {vString[currVString].map((note: any) => (
          <a
            className='f6 link dim br3 ph3 pv2 mb2 dib white bg-purple'
            href='#0'>
            {note}
          </a>
        ))} */}
        <ViolinButton/>
      </div>
    </div>
  );
}

export const ViolinInstrument = new Instrument('kcstar', Violin);
