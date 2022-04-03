import React, { useState, useEffect } from "react";

export default function ScreenSize() {
	const [windowDimenion, detectHW] = useState({
		winWidth: window.innerWidth,
		winHeight: window.innerHeight,
	});

	const detectSize = () => {
		detectHW({
			winWidth: window.innerWidth,
			winHeight: window.innerHeight,
		});
	};

	useEffect(() => {
		window.addEventListener("resize", detectSize);

		return () => {
			window.removeEventListener("resize", detectSize);
		};
	}, [windowDimenion]);

	return (
		<div>
			<p>
				Width: <strong>{windowDimenion.winWidth}</strong>
			</p>
			<p>
				Height: <strong>{windowDimenion.winHeight}</strong>
			</p>
		</div>
	);
}
