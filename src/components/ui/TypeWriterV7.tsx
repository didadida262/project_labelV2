/*
 * @Description: 卡片从右往左显示
 * @Author: didadida262
 * @Date: 2024-08-02 15:34:31
 * @LastEditors: didadida262
 * @LastEditTime: 2024-08-12 16:38:20
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
}

export const TypeWriterV7 = (props: IProps) => {
  const { className, filter = true, duration = 0.5, children } = props;

  const [scope, animate] = useAnimate();
  const { ref: containerRef, inView: containerInView } = useInView({
    threshold: 0.6, // 设置阈值
  });

  useEffect(() => {
    containerInView &&
      scope.current &&
      animate(
        'div',
        {
          opacity: 1,
          x: 0,
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
          initial={{ opacity: 0, x: 100 }}
          className={cn('', className)}>
          {children}
        </motion.div>
      </motion.div>
    );
  };

  return <span ref={containerRef}>{renderWords()}</span>;
};
