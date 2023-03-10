// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

let expansionFactor = 50;
let isTimeToExpand = false;

export const RippleVisualizer = new Visualizer(
  'kcstar',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);
    p5.strokeWeight(dim * 0.001);
    p5.stroke(255, 255, 255, 255);
    p5.noFill();
    p5.translate(width / 2 - 125, height / 2);

    const values = analyzer.getValue();
    p5.angleMode('radians');

    for (let i = -1; i <= 1; i+=2) {
      p5.beginShape();
      for (let j = 0; j <= 180; j++) {
        const index = Math.floor(p5.map(j, 0, 100, 0, values.length - 1));
        const amplitude = values[index] as number;
        const r = p5.map(amplitude, -1, 1, 100, 150);
        const x = r * Math.sin(j) * i;
        const y = r * Math.cos(j);
        p5.vertex(x, y);
      }
      p5.endShape();
    }

    p5.beginShape();
    for (let i = 0; i < 360; i++) {
      const amplitude = values[i] as number;
      const r = p5.map(amplitude, 0, 1, 50, 200);
      const x = r * p5.cos(i);
      const y = r * p5.sin(i);
      p5.vertex(x, y);
    }
    p5.endShape();

    p5.angleMode('degrees');

    // p5.beginShape();
    // for (let i = 0; i < 360; i++) {
    //   const amplitude = values[i] as number;
    //   const r = p5.map(amplitude, 0, 1, 100 + expansionFactor, height);
    //   const x = r * p5.cos(i);
    //   const y = r * p5.sin(i);
    //   p5.vertex(x, y);
    // }
    // p5.endShape();

    // if (expansionFactor === 0) {
    //   isTimeToExpand = true;
    // }
    // if (expansionFactor === 50) {
    //   isTimeToExpand = false;
    // }

    // if (isTimeToExpand) {
    //   expansionFactor++;
    // } else {
    //   expansionFactor--;
    // }
  },
);
