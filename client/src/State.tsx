// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { WaveformVisualizer } from './visualizers/Waveform';
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

const instruments = List([PianoInstrument, FluteInstrument]);
const visualizers = List([WaveformVisualizer, RadialWaveformVisualizer]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
