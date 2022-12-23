import React from 'react';
import Select from 'react-select'
import SelectIcon from "../../../assets/icons/select/Select";

const CustomSelect = ({options = []}) => {
    const colourStyles = {};


    return (
        <>
            <Select
                defaultValue={options[0]}
                label="Single select"
                options={options}
                styles={colourStyles}
                components={{}}
            />
        </>
    );
};

export default CustomSelect;