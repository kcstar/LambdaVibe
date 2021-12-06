// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { WaveformVisualizer } from './visualizers/Waveform';
import { WaveformVisualizer2 } from './visualizers/mhernandez29';
import { XylophoneInstrument } from './instruments/mhernandez29'
import { RadialWaveformVisualizer } from './visualizers/ksy415';
import { FluteInstrument } from './instruments/ksy415';



/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */

/**
 * Observation: pure map (compare and contrast with impure map)
 *
 * 'instrument': Instrument
 * 'visualizer': Visualizer
 */
export type AppState = Map<string, any>;


const instruments = List([PianoInstrument, XylophoneInstrument, FluteInstrument]);
const visualizers = List([WaveformVisualizer, WaveformVisualizer2, RadialWaveformVisualizer ]);

export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
