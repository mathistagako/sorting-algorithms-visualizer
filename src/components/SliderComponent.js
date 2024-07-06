import React, { useState } from 'react';

const SliderComponent = ({ onSizeChange }) => {
	const [size, setSize] = useState(20);

	const handleSliderChange = (event) => {
		const newSize = event.target.value;
		setSize(newSize);
		onSizeChange(newSize);
	};

	return (
		<div style={{ marginTop: '5px' }}>
			<label htmlFor="size-slider" className="label-size-slider">
				Size Array: {size}
			</label>
			<input
				type="range"
				id="size-slider"
				min="4"
				max="100"
				value={size}
				onChange={handleSliderChange}
				className="slider"
			/>
		</div>
	);
};

export default SliderComponent;
