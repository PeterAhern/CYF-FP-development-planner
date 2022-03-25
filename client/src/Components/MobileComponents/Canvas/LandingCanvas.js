import React from "react";
// import Sketch from "react-p5";

import { Wrapper } from "./LandingCanvas.style";
import mobileLanding from "../../../Assets/mp4/mobileLanding.mp4";

const LandingCanvas = () => {
	return (
		<Wrapper>
			{/* <Sketch setup={setup} draw={draw} className="App" /> */}
            {/* <video src={mobileLanding}></video> */}
            <video className="video-container" autoPlay loop muted >
                <source type="video/mp4"  src={mobileLanding} />
            </video>
		</Wrapper>
	);
};

export default LandingCanvas;
