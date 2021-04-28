import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const SelectComp = ({
    options, defaultValue, onChange, value, placeholder
}) => (
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
            value={value ? options.find((opt) => opt.value === value) : null}
            defaultValue={defaultValue ? options.find((opt) => opt.value === defaultValue) : null}
            options={options}
            placeholder={placeholder}
        />
    </div>
);

SelectComp.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    })).isRequired,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types, react/require-default-props
    value: PropTypes.any,
    placeholder: PropTypes.string
};

SelectComp.defaultProps = {
    defaultValue: null,
    onChange: () => {},
    placeholder: 'Select...'
};

export default SelectComp;
