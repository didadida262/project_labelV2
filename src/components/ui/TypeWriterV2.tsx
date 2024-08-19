/*
 * @Description: 段落单词分割模糊显示
 * @Author: didadida262
 * @Date: 2024-08-06 10:30:31
 * @LastEditors: didadida262
 * @LastEditTime: 2024-08-06 11:00:45
 */
'use client';
import { motion, stagger, useAnimate } from 'framer-motion';
import { useEffect } from 'react';

import { cn } from '@/lib/utils';

export const TypeWriterV2 = ({
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
  let wordsArray = words.split(' ');
  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
        filter: filter ? 'blur(0px)' : 'none',
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
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={cn('opacity-0', className)}
              style={{
                filter: filter ? 'blur(10px)' : 'none',
              }}>
              {word}{' '}
            </motion.span>
          );
        })}
      </motion.span>
    );
  };

  return <span>{renderWords()}</span>;
};
