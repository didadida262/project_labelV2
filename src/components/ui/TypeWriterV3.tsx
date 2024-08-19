/*
 * @Description: 段落模糊显示
 * @Author: didadida262
 * @Date: 2024-08-06 10:30:31
 * @LastEditors: didadida262
 * @LastEditTime: 2024-08-12 16:32:32
 */
'use client';
import { motion, stagger, useAnimate } from 'framer-motion';
import { useEffect } from 'react';

import { cn } from '@/lib/utils';

export const TypeWriterV3 = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
        filter: 'none',
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
      },
    );
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.span ref={scope}>
        <motion.span
          className={cn('opacity-0', className)}
          style={{
            filter: 'blur(10px)',
          }}>
          {words}
        </motion.span>
      </motion.span>
    );
  };

  return <span>{renderWords()}</span>;
};
