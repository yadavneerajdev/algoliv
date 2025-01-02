import React, { useState } from 'react';
import AlgoInputs from '../Utils/AlgoInputs';
import SortVisuals from './SortVisuals';

const LinearSort = () => {
    const [arrayValues, setArrayValues] = useState([]);

    const handleValuesChange = (values) => {
        setArrayValues(values); // Update array values in real-time
    };

    return (
        <>
            <AlgoInputs onValuesChange={handleValuesChange} />
            {/* <SortVisuals values={arrayValues} sortType="bubble" /> */}
            <SortVisuals values={arrayValues} sortType="selection" />
        </>
    );
};

export default LinearSort;
