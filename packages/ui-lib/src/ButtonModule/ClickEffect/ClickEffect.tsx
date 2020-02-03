import React from 'react';
import classes from './ClickEffect.module.scss';

interface Props {
  rect: ClientRect;
  pageX: number;
  pageY: number;
  durationInSeconds: number;
  onAnimationEnd?: Function;
}

const ClickEffect = ({ rect, pageX, pageY, durationInSeconds, onAnimationEnd }: Props) => {
  const radius = Math.max(rect.height, rect.width);
  const left = pageX - rect.left - radius / 2 - document.body.scrollLeft;
  const top = pageY - rect.top - radius / 2 - document.body.scrollTop;

  const style = {
    width: radius + 'px',
    height: radius + 'px',
    left: left + 'px',
    top: top + 'px',
    animationDuration: durationInSeconds + 's'
  };

  return (
    <span
      className={classes["click-effect"]}
      style={style}
      onAnimationEnd={() => onAnimationEnd && onAnimationEnd()}
      data-testid="click-effect"
    ></span>
  );
};

export default ClickEffect;