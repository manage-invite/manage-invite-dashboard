import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
import './Tabs.scss';

const Tabs = ({ children, onTabChange }) => {
    const [activeTab, setActiveTab] = useState(children[0].props.label);

    const onClickTabItem = (tab) => {
        setActiveTab(tab);
        onTabChange(tab);
    };

    return (
        <div className="tabs">
            <ol className="tab-list">
                {children.map((child) => {
                    const { label } = child.props;

                    return (
                        <Tab
                            activeTab={activeTab}
                            key={label}
                            label={label}
                            onClick={onClickTabItem}
                        />
                    );
                })}
            </ol>
            <div className="tab-content">
                {children.map((child) => {
                    if (child.props.label !== activeTab) return undefined;
                    return child.props.children;
                })}
            </div>
        </div>
    );
};

Tabs.propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
    onTabChange: PropTypes.func.isRequired
};

export default Tabs;
