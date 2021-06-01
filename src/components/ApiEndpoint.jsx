import { React, useState } from 'react';
import PropTypes from 'prop-types';

const ApiEndpoint = ({
    method, endpoint, description, params
}) => {
    const [collapsOpened, setCollapsOpened] = useState(false);

    return (
        <>
            <div
                style={{
                    padding: '0.5rem',
                    display: 'flex'
                }}
                onClick={() => setCollapsOpened(!collapsOpened)}
                aria-hidden="true"
            >
                <div style={{
                    backgroundColor: method === 'GET' ? 'green' : 'darkorange',
                    padding: '1rem',
                    width: '5%',
                    borderTopLeftRadius: '1rem',
                    borderBottomLeftRadius: '1rem'
                }}
                >
                    {method}
                </div>
                <div style={{
                    cursor: 'pointer',
                    backgroundColor: 'black',
                    padding: '1rem',
                    minWidth: '70%',
                    borderTopRightRadius: '1rem',
                    borderBottomRightRadius: '1rem'
                }}
                >
                    {endpoint}
                    <div style={{
                        display: collapsOpened ? 'block' : 'none',
                        paddingTop: '0.5rem',
                        color: 'gray'
                    }}
                    >
                        {description}
                        {' '}
                        {params.map((p) => (
                            <div style={{
                                display: 'flex'
                            }}
                            >
                                <div>
                                    {p.type}
                                </div>
                                <div>{p.name}</div>
                                <div>{p.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

ApiEndpoint.propTypes = {
    method: PropTypes.string,
    description: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired,
    params: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        type: PropTypes.string
    }))
};

ApiEndpoint.defaultProps = {
    method: 'GET',
    params: []
};

export default ApiEndpoint;
