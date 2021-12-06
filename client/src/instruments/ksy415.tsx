// 3rd party library imports
import * as Tone from 'tone';
import { List, Range } from 'immutable';
import React, { useState, useEffect } from 'react';
import flute from '../img/flute.svg';
// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import { DispatchAction } from '../Reducer';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */
interface FluteButtonProps {
  note: string;
  octave: number;
}

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
  baseUrl: 'http://localhost:3000/samples/flute/',
}).toDestination();

function FluteButton({ note, octave }: FluteButtonProps): JSX.Element {
  return (
    <div
      className='f6 link dim br-pill ba bw2 ph3 pv2 mb2 dib black'
      onClick={() => {
        sampler.triggerAttackRelease(`${note}${octave}`, '4n');
      }}>
      {note}
    </div>
  );
}

function Flute({ synth, setSynth, state, dispatch }: InstrumentProps): JSX.Element {

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
    { note: 'Bb', idx: 5.5 },
    { note: 'B', idx: 6 },
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
      <div className='fl w-50 pa2'>
        <img src={flute} alt='Flute Picture' />
      </div>
      <div className='fl w-100 pa2' style={{marginLeft: '2rem'}}> 
        <label className="f6 b db mb2">
          Current Octave: 
          <select className="input-reset ba b--black-20 pa2 mb2 db w-10"value={octave} onChange={e => setOctave(parseInt(e.target.value))}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        </label>
      </div>
      <div className='relative dib h4 w-100 ml4'>
        {keys.map(key => {
          const note = `${key.note}`;
          return  (<FluteButton note={note} octave={octave}/>) 
        })}
      </div>
      
    </div>
  );
}

export const FluteInstrument = new Instrument('Flute', Flute);
