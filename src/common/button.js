import React from 'react';
import classNames from 'classnames';
import Icon from './icon';

import '../styles/button.scss';

const Button = ({
    image,
    icon,
    icons,
    iconClass = '',
    iconClasses = [],
    buttonClass = '',
    round,
    plain,
    purple,
    label,
    onclick,
    testId
}) => (
    <button
        type="button"
        onClick={onclick}
        className={classNames('btn', {
            [buttonClass]: true,
            round,
            plain,
            purple
        })}
        data-test={testId}
    >
        {image ? (
            <img src={image} alt="" />
        ) : icons ? (
            icons.map((icon, index) => (
            <Icon
                key={icon + index}
                icon={icon}
                className={classNames({
                [iconClasses[index]]: iconClasses[index]
                })}
            />
            ))
        ) : icon ? (
            <Icon
            icon={icon}
            className={classNames({
                [iconClass]: true
            })}
            />
        ) : null}
        {label && <strong>{label}</strong>}
    </button>
);

export default Button;