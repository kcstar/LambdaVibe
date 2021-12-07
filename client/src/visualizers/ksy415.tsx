// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';


// project imports
import { Visualizer } from '../Visualizers';

export const RadialWaveformVisualizer = new Visualizer(
  'ksy415',
  (p5: P5, analyzer: Tone.Analyser) => {
    p5.angleMode('degrees');
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    
 
    p5.background(0, 0, 0, 255);
    p5.strokeWeight(dim * 0.01);
    p5.stroke(255, 255, 255, 255);
    p5.noFill();
    p5.translate(width/2, height/2);


    let values = analyzer.getValue();


    p5.beginShape();
    for (let i = 0; i < 360; i++) {
      const amplitude = values[i] as number;
      const r = p5.map(amplitude, 0, 1, 100, height);
      const x = r * p5.cos(i);
      const y = r * p5.sin(i);

   
      p5.vertex(x, y);
    
      p5.triangle(x, y, x-30, y-20, x+20, y+20)
    
    }
    p5.endShape();
    

  },
);

