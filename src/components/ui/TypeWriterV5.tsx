/*
 * @Description: 结合useInView，在div进入视图后渲染dom，走动效
 * @Author: didadida262
 * @Date: 2024-08-02 15:34:31
 * @LastEditors: didadida262
 * @LastEditTime: 2024-08-12 16:36:54
 */
'use client';
import { motion, stagger, useAnimate } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { cn } from '@/lib/utils';

interface IProps {
  className?: string;
  filter?: boolean;
  duration?: number;
  children: ReactNode;
  threshold?: number;
}

export const TypeWriterV5 = (props: IProps) => {
  const {
    className,
    filter = true,
    duration = 0.5,
    children,
    threshold = 0.6,
  } = props;

  const [scope, animate] = useAnimate();
  const { ref: containerRef, inView: containerInView } = useInView({
    threshold: threshold, // 设置阈值
  });

  useEffect(() => {
    containerInView &&
      scope.current &&
      animate(
        'div',
        {
          opacity: 1,
          y: 0,
        },
        {
          duration: duration ? duration : 1,
          delay: stagger(0.2),
        },
      );
  }, [containerInView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          className={cn('', className)}>
          {children}
        </motion.div>
      </motion.div>
    );
  };

  return <span ref={containerRef}>{renderWords()}</span>;
};
