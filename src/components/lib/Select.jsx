import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const SelectComp = ({ options, defaultValue, onChange }) => (
    <div style={{
        marginRight: '2rem'
    }}
    >
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
                    padding: '0.1rem',
                    backgroundColor: '#373c42',
                    color: 'white',
                    '&:hover': {
                        borderColor: '#7289da'
                    }
                })
            }}
            onChange={onChange}
            defaultValue={defaultValue ? options.find((opt) => opt.value === defaultValue) : null}
            options={options}
        />
    </div>
);

SelectComp.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    })).isRequired,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func
};

SelectComp.defaultProps = {
    defaultValue: null,
    onChange: () => {}
};

export default SelectComp;
