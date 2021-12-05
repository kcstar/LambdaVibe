// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { WaveformVisualizer } from './visualizers/Waveform';
import { WaveformVisualizer2 } from './visualizers/mhernandez29';

import { XylophoneInstrument } from './instruments/Xylophone'

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

const instruments = List([PianoInstrument, XylophoneInstrument]);
//const visualizers = List([WaveformVisualizer]);//orginal
const visualizers = List([WaveformVisualizer, WaveformVisualizer2]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
