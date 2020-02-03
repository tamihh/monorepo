import React from 'react';
import styles from './Button.module.scss';
import ClickEffect from './ClickEffect/ClickEffect';

  // tslint:disable-next-line:interface-name
  export interface Props {
    /** Button id */
    id?: string;
    /** Text to be displayed on button */
    label?: string;
    /** Function to handle click event */
    onClick?: (e: any) => void;
    /** Is the button enabled */
    disabled?: boolean;
    /** Shows spinner inside the button while waiting for a response */
    useLoadingSpinner?: boolean;
    /** Type is used to apply proper styles for buttons that can be Primary, Secondary, Tertiary */
    type?: ButtonType;
    /** Used in unit and automation tests */
    'data-testid'?: string;
  }

type ButtonType = 'primary' | 'primary-thin' | 'secondary' | 'tertiary' | 'primary-blue';

export const ButtonModule = (props: Props) => {
  const { id, label, onClick, disabled, type = 'primary' } = props;

  const [isRipple, setRipple] = React.useState(false);
  const [clickX, setClickX] = React.useState(0);
  const [clickY, setClickY] = React.useState(0);
  const button = React.useRef<HTMLButtonElement>(null);

  const cssClasses = {
    primary: styles['ts-c-btn-primary'],
    'primary-blue': styles['ts-c-btn-primary-blue'],
    'primary-thin': styles['ts-c-btn-primary-thin'],
    secondary: styles['ts-c-btn-secondary'],
    tertiary: styles['ts-c-btn-tertiary'],
  };
  const style = [styles['ts-c-btn'], cssClasses[type]].join(' ');

  const getBoundingClientRect = (): ClientRect => {
    if (button.current) {
      const el = button.current;
      return el.getBoundingClientRect();
    }

    return new ClientRect();
  };

  const showClickEffect = () => {
    if (!isRipple) {
      return null;
    }

    const animationEnded = () => {
      setRipple(false);
    };

    return (
      <ClickEffect
        rect={getBoundingClientRect()}
        pageX={clickX}
        pageY={clickY}
        durationInSeconds={0.8}
        onAnimationEnd={animationEnded}
      />
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.currentTarget.blur();
    setClickX(e.pageX);
    setClickY(e.pageY);
    setRipple(true);
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      id={id}
      ref={button}
      className={style}
      disabled={disabled}
      onClick={handleClick}
      data-testid={props['data-testid']}
    >
      <span>{label}</span>
      {showClickEffect()}
    </button>
  );
};

export default ButtonModule;
