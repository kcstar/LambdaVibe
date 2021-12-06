// 3rd party library imports
import { Ppt24 } from '@carbon/icons-react';
import P5 from 'p5';
import * as Tone from 'tone';
import { StereoFeedbackEffect } from 'tone/build/esm/effect/StereoFeedbackEffect';
import { couldStartTrivia } from 'typescript';

// project imports
import { Visualizer } from '../Visualizers';


export const WaveformVisualizer2 = new Visualizer(
  'mhernandez29',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);
    
    p5.background(51)
    p5.translate(width/2, height/2)
    

    const values = analyzer.getValue();
    p5.beginShape();
    for(let i = 0; i < values.length; i++){
        p5.stroke('red')
        const amplitude = values[i] as number;
        
        let r = p5.map(amplitude, 0, 1, 10, 300)
        let x = r * p5.cos(i)
        let y = r * p5.sin(i)
        p5.vertex(x,y)
        
    }
    p5.endShape();


    // p5.strokeWeight(dim * 0.01);//sets the width of the line for the graph

    // p5.stroke(255, 255, 255, 255);//sets the color of the line?

    // p5.noFill();//disables filling in shapes

    //  const values = analyzer.getValue();//values from sound
    // p5.beginShape();//start of graph shape
    // for (let i = 0; i < values.length; i++) {//maps old values to new
    //   const amplitude = values[i] as number;
    //   const x = p5.map(i, 0, values.length - 1, 0, width);
    //   const y = height / 2 + amplitude * height;
    //   // Place vertex
    //   p5.vertex(x, y);
    // }
    // p5.endShape();
  },
);
