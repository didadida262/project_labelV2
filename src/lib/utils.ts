/*
 * @Description:
 * @Author: didadida262
 * @Date: 2024-08-02 11:17:30
 * @LastEditors: didadida262
 * @LastEditTime: 2024-08-06 18:14:56
 */
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
