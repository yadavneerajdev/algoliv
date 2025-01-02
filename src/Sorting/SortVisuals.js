import React, { useState, useEffect } from 'react';
import './SortVisuals.css';

const SortVisuals = ({ values, sortType }) => {
  const [array, setArray] = useState([...values]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [nextIndex, setNextIndex] = useState(null);
  const [storeValue, setStoreValue] = useState(null);
  const [sortedArray, setSortedArray] = useState(null);
  const [swappedIndexes, setSwappedIndexes] = useState([]); // Track swapped indexes for animation

  useEffect(() => {
    setArray([...values]);
    setSortedArray(null); // Reset sorted array when new values are passed
  }, [values]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const performSelectionSort = async () => {
    const newArray = [...array]; // Clone the array for manipulation
    for (let i = 0; i < newArray.length - 1; i++) {
      setStoreValue(newArray[i]); // Assume the first element is the minimum
      setCurrentIndex(i);

      let minIndex = i;
      for (let j = i + 1; j < newArray.length; j++) {
        setNextIndex(j);
        await delay(800); // Delay for better visualization

        if (newArray[j] < newArray[minIndex]) {
          minIndex = j; // Update the index of the smallest element
          setStoreValue(newArray[minIndex]); // Update storeValue to show the current minimum
        }
      }

      // Swap the minimum element with the current element
      if (minIndex !== i) {
        setSwappedIndexes([i, minIndex]);

        // Perform the swap
        [newArray[i], newArray[minIndex]] = [newArray[minIndex], newArray[i]];
        setArray([...newArray]); // Update state to reflect the swap
        await delay(1000); // Add delay to visualize the swap
      }

      setNextIndex(null); // Reset nextIndex after each outer loop iteration
    }

    setSortedArray([...newArray]); // Set the sorted array for final position animation
    setCurrentIndex(null); // Reset currentIndex after sorting is complete
    setNextIndex(null);    // Clear the nextIndex after sorting
  };

  const performBubbleSort = async () => {
    const newArray = [...array]; // Clone the array for manipulation

    for (let i = 0; i < newArray.length - 1; i++) {
      for (let j = 0; j < newArray.length - 1 - i; j++) {
        setCurrentIndex(j);
        setNextIndex(j + 1);
        await delay(800); // Delay for better visualization

        if (newArray[j] > newArray[j + 1]) {
          setSwappedIndexes([j, j + 1]);

          // Perform the swap
          [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
          setArray([...newArray]); // Update state to reflect the swap
          await delay(800); // Add delay to visualize the swap
        }
      }
    }

    setSortedArray([...newArray]); // Set the sorted array for final position animation
    setCurrentIndex(null); // Reset currentIndex after sorting is complete
    setNextIndex(null);    // Clear the nextIndex after sorting
    setStoreValue(null)
  };

  const performSort = async () => {
    if (sortType === 'selection') {
      await performSelectionSort();
    } else if (sortType === 'bubble') {
      await performBubbleSort();
    }
  };

  return (
    <div className="sort-visuals">
      <div className="array-container">
        {array.map((value, index) => (
          <div
            key={index}
            className={`array-box ${
              index === currentIndex || index === nextIndex || value === storeValue ? 'highlight' : ''
            }`}
          >
            {value}
            {index === currentIndex && <div className="arrow">⬆</div>}
            {index === nextIndex && <div className="arrow">⬆</div>}
            {index === currentIndex && <div className="current-value-line"></div>}
            {index === nextIndex && <div className="next-value-line"></div>}
            {value === storeValue && <div className="store-value-line"></div>}
          </div>
        ))}
      </div>

      {/* Display the current minimum value */}
      <div className="min-value-container">
        <div className="min-value-box">
          {storeValue !== null ? `Current min value : ${storeValue}` : 'null'}
        </div>
      </div>

      <button className="sort-button" onClick={performSort}>
        Sort ({sortType === 'selection' ? 'Selection' : 'Bubble'})
      </button>
    </div>
  );
};

export default SortVisuals;
