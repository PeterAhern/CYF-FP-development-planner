import React from "react";
import Sketch from "react-p5";

import { Wrapper } from "./LandingCanvas.style";

const LandingCanvas = () => {

    function windowResized(p5) {
        p5.resizeCanvas(window.innerWidth, window.innerHeight);
    }

    let setup = (p5, canvasParentRef) => {
        //Canvas of size 1000x800
        let xyz = p5
					.createCanvas(p5.windowWidth, p5.windowHeight)
					.parent(canvasParentRef);
        xyz.style("display", "block");
        xyz.position(0,0);
        
    };

    let draw = (p5) => {
        p5.background(175,0,0, 0.8);
    };
	return (
		<Wrapper>
			<Sketch setup={setup} draw={draw} className="App" />
		</Wrapper>
	);
};

export default LandingCanvas;
