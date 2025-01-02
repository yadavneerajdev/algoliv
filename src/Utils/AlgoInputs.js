import React, { useState } from 'react';

const AlgoInputs = ({ onValuesChange }) => {
    const [length, setLength] = useState(2);
    const [values, setValues] = useState(new Array(length).fill(''));

    const handleInputChange = (index, e) => {
        if (isNaN(e.target.value)) {
            alert('The input should be a number.');
            return;
        }
        const newValues = [...values];
        newValues[index] = e.target.value;
        setValues(newValues);
        onValuesChange(newValues);
    };

    const handleLengthChange = (e) => {
        const newLength = parseInt(e.target.value, 10);
        setLength(newLength);
        const newValues = new Array(newLength).fill('');
        setValues(newValues);
        onValuesChange(newValues);
    };

    return (
        <div>
            <div>
                <select name="length" value={length} onChange={handleLengthChange}>
                    {Array.from({ length: 10 }, (_, i) => i + 2).map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
            </div>
            <br />
            <div>
                {Array.from({ length }).map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        className="int-inputs"
                        value={values[index] || ''}
                        onChange={(e) => handleInputChange(index, e)}
                    />
                ))}
            </div>
        </div>
    );
};

export default AlgoInputs;
