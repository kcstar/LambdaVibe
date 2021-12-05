// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { FluteInstrument } from './instruments/DankPiano';
import { WaveformVisualizer } from './visualizers/Waveform';
import { RippleVisualizer } from './visualizers/Ripple';

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

const instruments = List([PianoInstrument, FluteInstrument]);
const visualizers = List([WaveformVisualizer, RippleVisualizer]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
