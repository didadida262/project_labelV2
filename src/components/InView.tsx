/*
 * @Description:
 * @Author: didadida262
 * @Date: 2024-08-02 15:34:31
 * @LastEditors: didadida262
 * @LastEditTime: 2024-08-02 16:06:06
 */
import cn from 'classnames';
import React from 'react';
import { useInView } from 'react-intersection-observer';

interface IUseLottieInViewProps {
  className?: string;
  inViewCheck?: boolean;
  children: React.ReactNode;
  Empty: React.ReactNode;
}
export function InView(props: IUseLottieInViewProps) {
  const { children, className, inViewCheck = true, Empty } = props;
  const { ref: containerRef, inView: containerInView } = useInView({
    threshold: 0.001, // 设置阈值
  });
  if (inViewCheck) {
    return (
      <div className={cn(className)} ref={containerRef}>
        {containerInView && children}
      </div>
    );
  }
  return Empty;
}
