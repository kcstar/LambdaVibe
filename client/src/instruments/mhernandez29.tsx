// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, { useState, useEffect } from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import '../Xylophone.css'
import { DispatchAction } from '../Reducer';

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

function Xylophone({ synth, setSynth, state, dispatch }: InstrumentProps): JSX.Element {
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

  const notes = state.get('notes');

  useEffect(() => {
    if (notes && sampler) {
      let eachNote = notes.split(' ');
      let noteObjs = eachNote.map((note: string, idx: number) => ({
        idx,
        time: `+${idx / 4}`,
        note,
        velocity: 1,
      }));

      new Tone.Part((time, value) => {
        // the value is an object which contains both the note and the velocity
        sampler.triggerAttackRelease(value.note, '4n', time, value.velocity);
        if (value.idx === eachNote.length - 1) {
          dispatch(new DispatchAction('STOP_SONG'));
        }
      }, noteObjs).start(0);

      Tone.Transport.start();

      return () => {
        Tone.Transport.cancel();
      };
    }

    return () => {};
  }, [notes, sampler, dispatch]);
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

export const XylophoneInstrument = new Instrument('mhernandez29', Xylophone);
