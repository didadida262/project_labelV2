/*
 * @Description: div容器的动画显示(由下方渐入)
 * @Author: didadida262
 * @Date: 2024-08-06 10:30:31
 * @LastEditors: didadida262
 * @LastEditTime: 2024-08-12 16:32:25
 */
'use client';
import { motion, stagger, useAnimate } from 'framer-motion';
import { ReactNode, useEffect } from 'react';

import { cn } from '@/lib/utils';

interface IProps {
  className?: string;
  filter?: boolean;
  duration?: number;
  children: ReactNode;
}

export const TypeWriterV4 = (props: IProps) => {
  const { className, filter = true, duration = 0.5, children } = props;
  const [scope, animate] = useAnimate();
  useEffect(() => {
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
  }, [scope.current]);

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

  return <span>{renderWords()}</span>;
};
