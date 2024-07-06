import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import DropDownMenu from './DropDownMenu';
import SliderComponent from './SliderComponent';

const ColumnsList = () => {
	const [size, setSize] = useState(20);
	const [algorithm, setAlgorithm] = useState('');
	const [array, setArray] = useState([]);
	const [isSorting, setIsSorting] = useState(false);
	const [currentSwappedIndices, setCurrentSwappedIndices] = useState([]);

	useEffect(() => {
		generateArray();
	}, [size]);

	const generateArray = () => {
		const newArray = Array.from({ length: size }, () =>
			Math.floor(Math.random() * 100)
		);
		setArray(newArray);
	};

	const handleSizeChange = (newSize) => {
		setSize(newSize);
	};

	const handleAlgorithmChange = (newAlgorithm) => {
		setAlgorithm(newAlgorithm);
	};

	const sleep = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	//BUBBLE SORT

	const bubbleSort = async () => {
		setIsSorting(true);
		const newArray = array.slice();

		for (let i = 0; i < newArray.length; i++) {
			for (let j = 0; j < newArray.length - i - 1; j++) {
				if (newArray[j] > newArray[j + 1]) {
					const swap = newArray[j + 1];
					newArray[j + 1] = newArray[j];
					newArray[j] = swap;
					setArray(newArray.slice());
					setCurrentSwappedIndices([j]);
					await sleep(50);
				}
			}
		}
		setCurrentSwappedIndices([]);
		setIsSorting(false);
	};

	//MERGE SORT

	const mergeSort = async (arr) => {
		setIsSorting(true);
		await mergeSortHelper(arr, 0, arr.length - 1);
		setCurrentSwappedIndices([]);
		setIsSorting(false);
	};

	const mergeSortHelper = async (arr, left, right) => {
		if (left >= right) {
			return;
		}
		const middle = Math.floor((left + right) / 2);
		await mergeSortHelper(arr, left, middle);
		await mergeSortHelper(arr, middle + 1, right);
		await merge(arr, left, middle, right);
	};

	const merge = async (arr, left, middle, right) => {
		let leftArr = arr.slice(left, middle + 1);
		let rightArr = arr.slice(middle + 1, right + 1);

		let i = 0,
			j = 0,
			k = left;

		while (i < leftArr.length && j < rightArr.length) {
			if (leftArr[i] <= rightArr[j]) {
				setCurrentSwappedIndices([left + i]);
				arr[k] = leftArr[i];
				i++;
			} else {
				setCurrentSwappedIndices([middle + 1 + j]);
				arr[k] = rightArr[j];
				j++;
			}
			setArray([...arr]);
			await sleep(50);
			k++;
		}

		while (i < leftArr.length) {
			setCurrentSwappedIndices([left + i]);
			arr[k] = leftArr[i];
			setArray([...arr]);
			await sleep(50);
			i++;
			k++;
		}

		while (j < rightArr.length) {
			setCurrentSwappedIndices([middle + 1 + j]);
			arr[k] = rightArr[j];
			setArray([...arr]);
			await sleep(50);
			j++;
			k++;
		}
	};

	//HEAP SORT

	const heapify = async (arr, n, i) => {
		let largest = i;
		let left = i * 2 + 1;
		let right = i * 2 + 2;

		if (left < n && arr[left] > arr[largest]) {
			largest = left;
		}

		if (right < n && arr[right] > arr[largest]) {
			largest = right;
		}

		if (largest !== i) {
			setCurrentSwappedIndices([largest]);
			let swap = arr[largest];
			arr[largest] = arr[i];
			arr[i] = swap;
			setArray([...arr]);
			await sleep(50);

			await heapify(arr, n, largest);
		}
	};

	const heapSort = async () => {
		const arr = array.slice();
		const n = arr.length;

		//Max-Heap

		for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
			await heapify(arr, n, i);
		}

		for (let i = n - 1; i > 0; i--) {
			setCurrentSwappedIndices([0]);
			let swap = arr[0];
			arr[0] = arr[i];
			arr[i] = swap;
			setArray([...arr]);
			await sleep(50);

			await heapify(arr, i, 0);
		}
		setCurrentSwappedIndices([]);
	};

	//QUICK SORT

	const partition = async (l, r, arr) => {
		let pivot = l;
		while (l < r) {
			while (l <= r && arr[l] <= arr[pivot]) {
				l++;
			}
			while (l <= r && arr[r] > arr[pivot]) {
				r--;
			}
			if (l < r) {
				setCurrentSwappedIndices([l]);
				let swap = arr[r];
				arr[r] = arr[l];
				arr[l] = swap;
				setArray([...arr]);
				await sleep(50);
			}
		}
		setCurrentSwappedIndices([pivot]);
		let swap = arr[r];
		arr[r] = arr[pivot];
		arr[pivot] = swap;
		setArray([...arr]);
		await sleep(50);

		return r;
	};

	const quickSort = async (l, r, arr) => {
		if (l < r) {
			const pivot = await partition(l, r, arr);
			await quickSort(l, pivot - 1, arr);
			await quickSort(pivot + 1, r, arr);
		}
		setCurrentSwappedIndices([]);
		return;
	};

	const sortArray = () => {
		if (algorithm === 'Bubble Sort') {
			bubbleSort();
		} else if (algorithm === 'Merge Sort') {
			mergeSort(array);
		} else if (algorithm === 'Heap Sort') {
			heapSort();
		} else if (algorithm === 'Quick Sort') {
			quickSort(0, array.length - 1, array);
		}
	};

	return (
		<div className="columns-list">
			<div className="header-column-list">
				<div className="size-array-area">
					<SliderComponent onSizeChange={handleSizeChange} />
				</div>
				<div className="sorting-algorithm-area">
					<DropDownMenu onAlgorithmChange={handleAlgorithmChange} />
					<Button
						type="button"
						variant="success"
						style={{ marginTop: '10px', marginLeft: '20px' }}
						onClick={sortArray}
						disabled={isSorting}
					>
						Sort
					</Button>
				</div>
				<div className="start-button-area">
					<Button
						type="button"
						variant="warning"
						onClick={generateArray}
						style={{ marginTop: '10px' }}
						disabled={isSorting}
					>
						Generate Array
					</Button>
				</div>
			</div>
			<div className="columns-area">
				{array.map((value, index) => (
					<div
						key={index}
						style={{
							height: `${value * 4}px`,
							width: `${600 / size}px`,
							backgroundColor: currentSwappedIndices.includes(index)
								? 'blue'
								: 'turquoise',
							margin: '0 1px',
						}}
					></div>
				))}
			</div>
		</div>
	);
};

export default ColumnsList;
