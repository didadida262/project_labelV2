/*
 * @Description:
 * @Author: didadida262
 * @Date: 2024-08-01 10:23:15
 * @LastEditors: didadida262
 * @LastEditTime: 2024-08-01 10:23:18
 */
/* eslint-disable node/no-unsupported-features/node-builtins */

export function useSearchUpdate() {
  const putRouterParams = (params: Record<string, string>) => {
    const searchParams = new URLSearchParams(location.search);
    for (const key in params) {
      const value = params[key];
      if (value === '') {
        searchParams.delete(key);
      } else {
        searchParams.set(key, params[key]);
      }
    }
    console.log('跳转');
  };

  const deleteRouterParams = (keys: string[]) => {
    const searchParams = new URLSearchParams(location.search);
    for (const key of keys) {
      searchParams.delete(key);
    }
    const hasSearchKey = !!searchParams.size;
    console.log('跳转');
  };

  return { putRouterParams, deleteRouterParams };
}
