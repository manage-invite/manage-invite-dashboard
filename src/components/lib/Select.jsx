import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const SelectComp = ({ options, defaultValue }) => (
    <Select
        styles={{
            menuList: (base) => ({
                ...base,
                backgroundColor: '#373c42',
                color: 'white'
            }),
            menu: (base) => ({
                ...base,
                backgroundColor: '#373c42',
                color: 'white',
                '&:hover': {
                    borderColor: '#7289da'
                }
            }),
            option: (base, { isFocused }) => ({
                ...base,
                backgroundColor: isFocused ? '#7289da' : null
            }),
            singleValue: (base) => ({
                ...base,
                color: 'white'
            }),
            control: (base) => ({
                ...base,
                backgroundColor: '#373c42',
                color: 'white',
                '&:hover': {
                    borderColor: '#7289da'
                }
            })
        }}
        defaultValue={defaultValue ? options.find((opt) => opt.value === defaultValue) : null}
        options={options}
    />

);

SelectComp.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    })).isRequired,
    defaultValue: PropTypes.string
};

SelectComp.defaultProps = {
    defaultValue: null
};

export default SelectComp;
