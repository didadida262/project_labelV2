/*
 * @Description: 标注工具随机颜色生成器
 * @Author: didadida262
 * @Date: 2025-11-07
 */

/**
 * 颜色配置 - 10种精心挑选的美观配色
 */
const FILL_COLORS = [
  'rgba(255, 107, 107, 0.3)', // 柔和的红色
  'rgba(78, 205, 196, 0.3)',  // 青色
  'rgba(255, 195, 113, 0.3)', // 橙色
  'rgba(132, 129, 255, 0.3)', // 紫色
  'rgba(54, 215, 183, 0.3)',  // 薄荷绿
  'rgba(255, 159, 243, 0.3)', // 粉色
  'rgba(255, 107, 129, 0.3)', // 樱花粉
  'rgba(142, 202, 230, 0.3)', // 天蓝色
  'rgba(174, 168, 211, 0.3)', // 薰衣草紫
  'rgba(255, 218, 121, 0.3)', // 金黄色
];

const STROKE_COLORS = [
  'rgba(255, 107, 107, 0.8)', // 柔和的红色
  'rgba(78, 205, 196, 0.8)',  // 青色
  'rgba(255, 195, 113, 0.8)', // 橙色
  'rgba(132, 129, 255, 0.8)', // 紫色
  'rgba(54, 215, 183, 0.8)',  // 薄荷绿
  'rgba(255, 159, 243, 0.8)', // 粉色
  'rgba(255, 107, 129, 0.8)', // 樱花粉
  'rgba(142, 202, 230, 0.8)', // 天蓝色
  'rgba(174, 168, 211, 0.8)', // 薰衣草紫
  'rgba(255, 218, 121, 0.8)', // 金黄色
];

const PENCIL_COLORS = [
  'rgba(255, 107, 107, 0.7)', // 柔和的红色
  'rgba(78, 205, 196, 0.7)',  // 青色
  'rgba(255, 195, 113, 0.7)', // 橙色
  'rgba(132, 129, 255, 0.7)', // 紫色
  'rgba(54, 215, 183, 0.7)',  // 薄荷绿
  'rgba(255, 159, 243, 0.7)', // 粉色
  'rgba(255, 107, 129, 0.7)', // 樱花粉
  'rgba(142, 202, 230, 0.7)', // 天蓝色
  'rgba(174, 168, 211, 0.7)', // 薰衣草紫
  'rgba(255, 218, 121, 0.7)', // 金黄色
];

/**
 * 生成随机的填充颜色（用于标注框填充，透明度0.3）
 * @returns 随机的rgba颜色字符串
 */
export const getRandomFillColor = (): string => {
  return FILL_COLORS[Math.floor(Math.random() * FILL_COLORS.length)];
};

/**
 * 根据填充颜色获取对应的边框颜色（透明度0.8，更明显）
 * @param fillColor 填充颜色字符串
 * @returns 对应的边框颜色字符串
 */
export const getStrokeColorFromFill = (fillColor: string): string => {
  const index = FILL_COLORS.indexOf(fillColor);
  return index !== -1 ? STROKE_COLORS[index] : STROKE_COLORS[0];
};

/**
 * 生成随机的铅笔颜色（透明度0.7）
 * @returns 随机的rgba颜色字符串
 */
export const getRandomPencilColor = (): string => {
  return PENCIL_COLORS[Math.floor(Math.random() * PENCIL_COLORS.length)];
};

/**
 * 一次性获取配对的填充色和边框色
 * @returns { fillColor: string, strokeColor: string }
 */
export const getRandomColorPair = (): { fillColor: string; strokeColor: string } => {
  const index = Math.floor(Math.random() * FILL_COLORS.length);
  return {
    fillColor: FILL_COLORS[index],
    strokeColor: STROKE_COLORS[index]
  };
};

/**
 * 将 hex 颜色转换为 rgba 格式
 * @param hex hex 颜色字符串，如 "#FF0000" 或 "#F00"
 * @param alpha 透明度，0-1之间
 * @returns rgba 颜色字符串
 */
export const hexToRgba = (hex: string, alpha: number = 1): string => {
  // 移除 # 符号
  hex = hex.replace('#', '');
  
  // 处理 3 位 hex 颜色
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  // 转换为 RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * 根据用户选择的颜色生成填充色和边框色对
 * @param hexColor 用户选择的 hex 颜色
 * @returns { fillColor: string, strokeColor: string }
 */
export const getColorPairFromHex = (hexColor: string): { fillColor: string; strokeColor: string } => {
  return {
    fillColor: hexToRgba(hexColor, 0.3), // 填充色透明度 0.3
    strokeColor: hexToRgba(hexColor, 0.8) // 边框色透明度 0.8
  };
};

/**
 * 根据用户选择的颜色生成铅笔颜色
 * @param hexColor 用户选择的 hex 颜色
 * @returns rgba 颜色字符串
 */
export const getPencilColorFromHex = (hexColor: string): string => {
  return hexToRgba(hexColor, 0.7); // 铅笔颜色透明度 0.7
};

