import React from 'react';
import './switch.styles.css';
import { string } from 'prop-types';

const noop = () => {};

export interface Prop {
  on: boolean;
  className?: string;
  onClick: () => void;
  'aria-label'?: string,
}

function Switch({
  on,
  className = '',
  'aria-label': ariaLabel,
  onClick,
  ...props
}: Prop) {
  const btnClassName = [
    className,
    'toggle-btn',
    on ? 'toggle-btn-on' : 'toggle-btn-off',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <label aria-label={ariaLabel || 'Toggle'} style={{ display: 'block' }}>
    {/* <div> */}
      <input
        className="toggle-input"
        type="checkbox"
        checked={on}
        onChange={noop}
        onClick={onClick}
        data-testid="toggle-input"
      />
      <span className={btnClassName} {...props} />
      </label>
    // </div>
  );
}

export default Switch;
