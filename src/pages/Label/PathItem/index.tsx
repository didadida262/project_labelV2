/*
 * @Description: 
 * @Author: didadida262
 * @Date: 2024-03-19 12:36:19
 * @LastEditors: didadida262
 * @LastEditTime: 2024-11-13 10:18:55
 */
import paper from "paper";
import React, { useState } from "react";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";

import "./index.scss";

interface PathItem {
  key: string;
  name: string;
  path: paper.Path;
}

interface PathItemComponentProps {
  data: PathItem[];
}

const PathItemComponent: React.FC<PathItemComponentProps> = (props) => {
  const { data } = props;
  const [, forceUpdate] = useState({});

  // 从path对象获取颜色并转换为带透明度的背景色
  const getPathBackgroundColor = (path: paper.Path): string | null => {
    let color: paper.Color | null = null;
    if (path.fillColor) {
      color = path.fillColor;
    } else if (path.strokeColor) {
      color = path.strokeColor;
    }
    
    if (!color) return null;
    
    // 转换为rgba格式，设置透明度为0.3
    const r = Math.round(color.red * 255);
    const g = Math.round(color.green * 255);
    const b = Math.round(color.blue * 255);
    return `rgba(${r}, ${g}, ${b}, 0.3)`;
  };

  const handleClickPathItem = (item: PathItem) => {
    // 切换path的selected状态
    item.path.selected = !item.path.selected;
    
    // 强制组件重新渲染以更新背景色
    forceUpdate({});

    // 触发Paper.js视图更新，使选中效果可见
    if (paper.project && paper.project.view) {
      paper.project.view.update();
    }
  };

  return (
    <div className="PathItemComponent pd5">
      {data.map((item: PathItem, index: number) => {
        const isSelected = item.path.selected;
        // 如果path被选中，获取其颜色作为背景色
        const backgroundColor = isSelected ? getPathBackgroundColor(item.path) : undefined;
        
        return (
          <div 
            className="w-full mb-[5px] rounded-[0px]" 
            key={item.key}
            style={backgroundColor ? { backgroundColor } : undefined}
          >
            <ButtonCommon
              type={EButtonType.SIMPLE}
              className="w-full"
              onClick={() => handleClickPathItem(item)}
            >
              {/* {"标注数据：" + item.name.slice(0, 10) + "..."} */}
              {"标注数据：" + (index + 1)}
            </ButtonCommon>
          </div>
        );
      })}
    </div>
  );
};
export default PathItemComponent;
