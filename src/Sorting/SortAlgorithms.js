// SortAlgorithms.js
import { useState } from 'react';

const useSortingAlgorithm = (array, sortType) => {
    const [arrayState, setArrayState] = useState(array);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [nextIndex, setNextIndex] = useState(null);
    const [storeValue, setStoreValue] = useState(null);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const performSelectionSort = async () => {
        const newArray = [...arrayState];
        for (let i = 0; i < newArray.length - 1; i++) {
            setStoreValue(newArray[i]);
            setCurrentIndex(i);

            let minIndex = i;
            for (let j = i + 1; j < newArray.length; j++) {
                setNextIndex(j);
                await delay(800);

                if (newArray[j] < newArray[minIndex]) {
                    minIndex = j;
                    setStoreValue(newArray[minIndex]);
                }
            }

            if (minIndex !== i) {
                [newArray[i], newArray[minIndex]] = [newArray[minIndex], newArray[i]];
                setArrayState([...newArray]);
                await delay(1000);
            }

            setNextIndex(null);
        }

        setCurrentIndex(null);
        setNextIndex(null);
    };

    const performBubbleSort = async () => {
        const newArray = [...arrayState];
        for (let i = 0; i < newArray.length - 1; i++) {
            for (let j = 0; j < newArray.length - 1 - i; j++) {
                setCurrentIndex(j);
                setNextIndex(j + 1);
                await delay(800);

                if (newArray[j] > newArray[j + 1]) {
                    [newArray[j], newArray[j + 1]] = [newArray[j + 1], newArray[j]];
                    setArrayState([...newArray]);
                    await delay(800);
                }
            }
        }

        setCurrentIndex(null);
        setNextIndex(null);
    };

    const performSort = async () => {
        if (sortType === 'selection') {
            await performSelectionSort();
        } else if (sortType === 'bubble') {
            await performBubbleSort();
        }
    };

    return {
        arrayState,
        currentIndex,
        nextIndex,
        storeValue,
        performSort,
    };
};

export default useSortingAlgorithm;
