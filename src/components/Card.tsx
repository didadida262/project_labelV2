/*
 * @Description:
 * @Author: didadida262
 * @Date: 2024-07-16 19:30:39
 * @LastEditors: didadida262
 * @LastEditTime: 2024-08-01 10:33:34
 */
import cn from 'classnames';
import React, { ReactNode } from 'react';

import pattern from '../styles/pattern';

interface ICardLayoutProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card(props: ICardLayoutProps) {
  const { children, className, onClick } = props;
  return (
    <div
      onClick={onClick}
      className={cn(
        className,
        ` h-[196px] w-full cursor-pointer rounded-[4px] border-[1px] border-solid border-borderSecondColor ${pattern.flexCenter} `,
      )}>
      {children}
    </div>
  );
}
