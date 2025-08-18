/*
  _HY5_p5_hydra // cc teddavis.org 2024
  pass p5 with type into hydra
  docs: https://github.com/ffd8/hy5
*/

export default function sketch(p) {
  let random1, random2, random3;
  let movingObjs;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0);
    p.frameRate(20);
    p.rectMode(p.CENTER);
    p.textAlign(p.CENTER, p.CENTER);
    random1 = p.random(p.width/3);
    random2 = p.random(p.width/3);
    random3 = p.random(p.width/3);

    // HY5/hydra setup (wait for globals)
    function setupHydra() {
      console.log('Hydra/Hy5 debug:', {
        H: typeof window.H,
        s0: typeof window.s0,
        P5: typeof window.P5,
        p5Instance: typeof window.p5Instance,
        src: typeof window.src,
        o0: typeof window.o0,
        noize: typeof window.noize
      });
      if (typeof window.H !== 'undefined' && typeof window.s0 !== 'undefined' && typeof window.P5 !== 'undefined') {
        window.H.pixelDensity(0.3);
        window.s0.initP5(window.p5Instance);
        window.P5.toggle(0);
        window.src(window.s0)
          .add(window.src(window.o0).scale(0.91), .9)
          .modulateScale(window.noize(1), 0.1)
          .out();
        console.log('Hydra/Hy5 setup complete');
        return true;
      }
      return false;
    }
    // Try immediately, then poll if not ready
    if (!setupHydra()) {
      let hydraInterval = setInterval(() => {
        if (setupHydra()) clearInterval(hydraInterval);
      }, 100);
    }
  };

  p.draw = function () {
    p.clear();
    p.blendMode(p.DIFFERENCE);
    p.background(0, 200);
    p.textSize(p.height/10);
    p.noStroke();

    let b = (p.sin(p.frameCount * 0.01) * 0.5 + 0.5) * 150;
    p.fill(b, 0, 190-b, 150);

    // Mouse Circles
    p.circle(p.mouseX, p.mouseY, p.height/5);
    p.circle(p.width-p.mouseX, p.height-p.mouseY, p.height/3);

    // Middle Circle
    let rSize = (p.sin(p.frameCount * 0.0025) * 0.5 + 0.5) * 330;
    p.fill(100,0,b, 100);
    p.noStroke();
    p.circle(p.width/2, p.height/2, p.height/2 + rSize);

    // Moving texts
    let tx;
    p.fill(255, 200);
    tx = p.constrain(p.noise(100 + p.frameCount * 0.0006) * p.width, 0, p.width);

    // Create moving objects if not already created
    if (!movingObjs) {
      movingObjs = [
        new MovingObject(100, 200, 100, 'design'),
        new MovingObject(300, 400, 100, 'photos'),
        new MovingObject(500, 600, 100, 'p5')
      ];
    }

    // Update and display each moving object
    for (let obj of movingObjs) {
      obj.update(p);
      obj.display(p);
    }
  };

  class MovingObject {
    constructor(xNoiseSeed, yNoiseSeed, size, label) {
      this.xNoiseSeed = xNoiseSeed;
      this.yNoiseSeed = yNoiseSeed;
      this.size = size;
      this.label = label;
      this.x = 0;
      this.y = 0;
    }
    update(p) {
      this.x = p.constrain(p.noise(this.xNoiseSeed + p.frameCount * 0.006) * p.width, 0, p.width);
      this.y = p.constrain(p.noise(this.yNoiseSeed + p.frameCount * 0.0065) * p.height, 0, p.height);
    }
    display(p) {
      p.noStroke();
      p.textSize(this.size/1.5);
      let tw = p.textWidth(this.label);
      let th = this.size;
      p.rectMode(p.CENTER);
      p.fill(255);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(this.label, this.x, this.y);
    }
  }
}
