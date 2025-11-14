import { createContext, useEffect, useState, useCallback } from "react";

interface ColorContext {
  color: any;
  setColor: (color: any) => void;
  isColorSelected: boolean;
  resetColorSelection: () => void;
}

export const ColorContext = createContext({} as ColorContext);
export default function ColorProvider(props: any) {
  const [color, setColorState] = useState("#000000");
  const [isColorSelected, setIsColorSelected] = useState(false);

  // 包装 setColor，当用户选择颜色时标记为已选择
  const setColor = useCallback((newColor: any) => {
    setColorState(newColor);
    setIsColorSelected(true);
  }, []);

  // 重置颜色选择状态（可选，用于重置为随机颜色模式）
  const resetColorSelection = useCallback(() => {
    setIsColorSelected(false);
  }, []);

  return (
    <ColorContext.Provider
      value={{
        color,
        setColor,
        isColorSelected,
        resetColorSelection
      }}
    >
      {props.children}
    </ColorContext.Provider>
  );
}
