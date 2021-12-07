// 3rd party library imports
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as Tone from 'tone';
import { Music32 } from '@carbon/icons-react';
import { send } from './Socket';

// project imports
import { InstrumentContainer } from './Instruments';
import { AppState } from './State';
import { DispatchAction } from './Reducer';
import { SideNav } from './SideNav';
import { VisualizerContainer } from './Visualizers';



type PanelProps = {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
};

/** ------------------------------------------------------------------------ **
 * Instrument and visualizer component
 ** ------------------------------------------------------------------------ */

function InstrumentPanel({ state, dispatch }: PanelProps): JSX.Element {
  /**
   * This React component is the top-level for the instrument.
   */
  const instrument = state.get('instrument');

  return (
    <div>
      {instrument && (
        <InstrumentContainer
          state={state}
          dispatch={dispatch}
          instrument={instrument}
        />
      )}
    </div>
  );
}

function VisualizerPanel({ state }: PanelProps): JSX.Element {
  /**
   * This React component is the top-level for the visualizer.
   */
  const visualizer = state.get('visualizer');

  return (
    <div>
      {visualizer && (
        <VisualizerContainer key={visualizer.name} visualizer={visualizer} />
      )}
    </div>
  );
}

function InstrumentAndVisualizer({ state, dispatch }: PanelProps): JSX.Element {
  /**
   * This React component bundles the instrument panel and visualizer panel together.
   */

  return (
    <div
      className="absolute right-0 bottom-0 top-0 flex flex-column"
      style={{ left: '16rem' }}
    >
      <InstrumentPanel state={state} dispatch={dispatch} />
      <VisualizerPanel state={state} dispatch={dispatch} />
    </div>
  );
}

function ShowWelcome(): JSX.Element {
  return (
    <div
      className="absolute right-0 bottom-0 top-0 flex flex-column items-center justify-center"
      style={{ left: '16rem' }}
    >
      <div className="mw6 lh-copy mb4">
        <Music32 />
        <div className="f3 fw7 mb2">Welcome to the case study.</div>
        <div className="f4 mb3">
          Select an instrument and a visualizer on the left to serve some fresh
          beats.
        </div>
        <div className="f5">The UI is yours to design. Express yourself.</div>
      </div>
    </div>
  );
}

function AddSong({ state, dispatch }: PanelProps): JSX.Element {
  const [songTitle, setSongTitle] = useState('test title');
  const [notes, setNotes] = useState('A1 B1 C1 D1');

  async function handleSubmit(e: any) {
    alert('Song successfully added');
    e.preventDefault();


    const socket = state.get('socket');

    try {
      // console.log('test');
      await send(socket, 'add_song', {songTitle, notes});
      const { songs } = await send(socket, 'get_songs', {});
      dispatch(new DispatchAction('SET_SONGS', { songs }));
    } catch (err) {
      console.log(err);
    }

  }
  return (
    <div
      className='absolute right-0 bottom-0 top-0 flex flex-column items-center justify-center'
      style={{ left: '16rem' }}>
      <form className='measure center' onSubmit={handleSubmit}>
        <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
          
          <legend className='f4 fw6 ph0 mh0'>Add a Song</legend>
          
          <div className='mt3'>
            <label className='db fw6 lh-copy f6' htmlFor='song-title'>
              Song Title
            </label>
            <input
              className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
              type='text'
              name='song-title'
              id='song-title'
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
            />
          </div>
          <div className='mv3'>
            <label htmlFor="comment" className="f6 b db mb2">Notes</label>
            <textarea
              className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2"
              id="comment"
              name="comment" 
              aria-describedby="comment-desc" 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </fieldset>
        <div className=''>
          <input
            className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
            type='submit'
            value='Submit'
          />
        </div>
      </form>
    </div>
  );
}

/** ------------------------------------------------------------------------ **
 * Main page component
 ** ------------------------------------------------------------------------ */

export function MainPage({ state, dispatch }: PanelProps): JSX.Element {
  /**
   * This React component bundles together the entire main page.
   */

  const location = useLocation();
  const isWelcome = !state.get('instrument');
  const isAddingSong = location.pathname === '/AddSong' ? true : false;

  console.log('INSTRUMENT', isWelcome);

  useEffect(() => {
    console.log(`location = ${JSON.stringify(location)}`)
    dispatch(new DispatchAction('SET_LOCATION', { location }));
  }, [dispatch, location]);

  return (
    <div
      className='fixed top-0 left-0 h-100 w-100 bg-white'
      onClick={() => Tone.start()}>
      <SideNav state={state} dispatch={dispatch} />

      {isWelcome ? (
        isAddingSong ? <AddSong  state={state} dispatch={dispatch}/> : <ShowWelcome />
      ) : (
        <InstrumentAndVisualizer state={state} dispatch={dispatch} />
      )}
    </div>
  );
}
