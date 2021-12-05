// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, { useState } from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import '../Xylophone.css'

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Xylophone
 ** ------------------------------------------------------------------------ */

const sampler = new Tone.Sampler({
  urls: {
    C4: 'C4.mp3',
    C5: 'C5.mp3',
    C6: 'C6.mp3',
    C7: 'C7.mp3',
    G3: 'G3.mp3',
    G4: 'G4.mp3',
    G5: 'G5.mp3',
    G6: 'G6.mp3',
  },
  baseUrl: 'http://localhost:3000/samples/xylophone/'
}).toDestination();

interface XylophoneButtonProps {
  note: string;
  octave: number;
  index: number;
}

function XylophoneButton({ note, octave, index }: XylophoneButtonProps): JSX.Element {
  return (
    <button
      className="note-button"
      style={{ height: (200 - (15 * index)) + 'px' }}//creating the size of the tile
      onClick={() => {
        sampler.triggerAttackRelease(`${note}${octave}`, '4n');
      }}>
      {note}
    </button>
  );
}

function Xylophone(): JSX.Element {
  const [octave, setOctave] = useState(6);
  const keys = List([
    { note: 'C', idx: 0 },
    { note: 'Db', idx: 0.5 },
    { note: 'D', idx: 1 },
    { note: 'Eb', idx: 1.5 },
    { note: 'E', idx: 2 },
    { note: 'F', idx: 3 },
    { note: 'Gb', idx: 3.5 },
    { note: 'G', idx: 4 },
    { note: 'Ab', idx: 4.5 },
    { note: 'A', idx: 5 },
  ]);
  return (
    <div className='pv4'>
      <div className="xylophone">

        {keys.map((key, index) => {
          const note = `${key.note}`;
          return  (<XylophoneButton note={note} octave={octave} index={index}/>) 
        })}

      </div>
    </div>
  );
}

export const XylophoneInstrument = new Instrument('Xylophone', Xylophone);
