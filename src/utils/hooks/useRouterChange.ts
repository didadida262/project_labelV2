/*
 * @Description:
 * @Author: didadida262
 * @Date: 2024-08-01 10:22:11
 * @LastEditors: didadida262
 * @LastEditTime: 2024-08-01 10:31:45
 */
import { useEffect } from 'react';

export function useRouterChange(onChange: () => void) {
  useEffect(() => {
    onChange();
  }, [window.location.href]);
}
