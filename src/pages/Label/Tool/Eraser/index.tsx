/*
 * @Description: 橡皮擦工具
 * @Author: didadida262
 * @Date: 2025-11-07
 */
import { Button } from "antd";
import paper from "paper";
import React, { useRef, useEffect, useContext } from "react";
import { BsEraser } from "react-icons/bs";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import { judeToolExisted } from "@/utils/paperjsWeapon";
import { ColorContext } from "@/pages/Label/ColorProvider";
import pattern from "@/styles/pattern";

import "./index.scss";

interface EraserComponentProps {
  activeTool: string;
  onClick: (tool: string) => void;
  submitPath: (path: paper.Path) => void;
}

const EraserComponent: React.FC<EraserComponentProps> = (props) => {
  const { activeTool, onClick, submitPath } = props;
  const { color } = useContext(ColorContext);
  const name = "eraser";
  let tool = null as any;
  let eraserRadius = 20; // 橡皮擦半径
  let eraserIndicator = null as any; // 橡皮擦指示器

  // 创建橡皮擦指示器
  const createEraserIndicator = (point: paper.Point) => {
    removeEraserIndicator();
    // 创建一个圆形指示器显示橡皮擦范围
    eraserIndicator = new paper.Path.Circle({
      center: point,
      radius: eraserRadius,
      strokeColor: new paper.Color("#FF6B6B"),
      strokeWidth: 2,
      dashArray: [4, 4],
      opacity: 0.7
    });
  };

  // 移除橡皮擦指示器
  const removeEraserIndicator = () => {
    if (eraserIndicator) {
      eraserIndicator.remove();
      eraserIndicator = null;
    }
  };

  const initTool = () => {
    if (activeTool !== name) {
      tool && tool.remove();
      removeEraserIndicator();
    } else {
      tool = new paper.Tool();
      tool.name = name;
      
      tool.onMouseDown = (e: paper.ToolEvent) => {
        removeEraserIndicator();
        eraseAtPoint(e.point);
      };
      
      tool.onMouseDrag = (e: paper.ToolEvent) => {
        eraseAtPoint(e.point);
      };
      
      tool.onMouseMove = (e: paper.ToolEvent) => {
        // 鼠标移动时显示橡皮擦指示器
        createEraserIndicator(e.point);
      };
      
      tool.onMouseUp = (e: paper.ToolEvent) => {
        // 擦除完成后重新显示指示器
        createEraserIndicator(e.point);
      };
      
      tool.activate();
    }
  };

  // 在指定点执行擦除操作
  const eraseAtPoint = (point: paper.Point) => {
    // 创建一个圆形区域用于检测碰撞
    const hitOptions = {
      segments: true,
      stroke: true,
      fill: true,
      tolerance: eraserRadius,
      match: (hit: any) => {
        // 排除白板背景和其他不应该被擦除的元素
        const item = hit.item;
        if (item.data && item.data.isWhiteboard === true) {
          return false;
        }
        // 排除橡皮擦指示器本身
        if (item === eraserIndicator) {
          return false;
        }
        return true;
      }
    };

    // 检测该点附近的所有路径
    const hitResult = paper.project.hitTest(point, hitOptions);
    
    if (hitResult && hitResult.item) {
      const item = hitResult.item;
      // 如果命中的是路径、组合路径或组，删除它
      if (item instanceof paper.Path || 
          item instanceof paper.CompoundPath || 
          item instanceof paper.Group) {
        // 确保不是白板背景
        if (!item.data || item.data.isWhiteboard !== true) {
          item.remove();
        }
      }
    }
  };

  useEffect(
    () => {
      initTool();
      return () => {};
    },
    [color]
  );
  
  useEffect(
    () => {
      initTool();
    },
    [activeTool]
  );
  
  return (
    <div className="eraser mgb10">
      <ButtonCommon
        className={`w-[80px] ${pattern.flexCenter} ${activeTool === name
          ? "bg-white-5"
          : ""}`}
        type={EButtonType.SIMPLE}
        onClick={() => onClick(name)}
      >
        <BsEraser />
      </ButtonCommon>
    </div>
  );
};

export default EraserComponent;

