import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const DropDownMenu = ({ onAlgorithmChange }) => {
	const [algorithm, setAlgorithm] = useState('Algorithm');

	const handleItemClick = (newAlgorithm) => {
		setAlgorithm(newAlgorithm);
		onAlgorithmChange(newAlgorithm);
	};

	return (
		<div>
			<Dropdown style={{ marginTop: '10px' }}>
				<Dropdown.Toggle variant="success" id="dropdown-basic">
					{algorithm}
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item onClick={() => handleItemClick('Merge Sort')}>
						Merge Sort
					</Dropdown.Item>
					<Dropdown.Item onClick={() => handleItemClick('Quick Sort')}>
						Quick Sort
					</Dropdown.Item>
					<Dropdown.Item onClick={() => handleItemClick('Heap Sort')}>
						Heap Sort
					</Dropdown.Item>
					<Dropdown.Item onClick={() => handleItemClick('Bubble Sort')}>
						Bubble Sort
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
};

export default DropDownMenu;
