import { Button } from "antd";
import paper from "paper";
import React, { useRef, useEffect, useContext } from "react";
import { BsTextareaResize } from "react-icons/bs";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import { judeToolExisted } from "@/utils/paperjsWeapon";
import { ColorContext } from "@/pages/Label/ColorProvider";
import { getRandomColorPair } from "@/utils/randomColors";
import pattern from "@/styles/pattern";

import "./index.scss";

interface RectComponentProps {
  activeTool: string;
  onClick: (tool: string) => void;
  submitPath: (path: paper.Path) => void;
}

const RectComponent: React.FC<RectComponentProps> = (props) => {
  const { activeTool, onClick, submitPath } = props;
  const { color } = useContext(ColorContext);

  const name = "rect";
  const toolRef = useRef<any>(null);
  const pathRef = useRef<any>(null);
  const firstRef = useRef<paper.Point>(new paper.Point(0, 0));
  const fillColorRef = useRef<string | null>(null);
  const strokeColorRef = useRef<string | null>(null);
  const crosshairRef = useRef<any>(null);
  
  // 创建十字光标
  const createCrosshair = (point: paper.Point) => {
    removeCrosshair();
    const size = 15; // 十字光标的大小
    // 水平线
    const horizontalLine = new paper.Path.Line(
      new paper.Point(point.x - size, point.y),
      new paper.Point(point.x + size, point.y)
    );
    // 垂直线
    const verticalLine = new paper.Path.Line(
      new paper.Point(point.x, point.y - size),
      new paper.Point(point.x, point.y + size)
    );
    // 组合成十字
    crosshairRef.current = new paper.Group([horizontalLine, verticalLine]);
    crosshairRef.current.strokeColor = new paper.Color("#666666");
    crosshairRef.current.strokeWidth = 1.5;
    crosshairRef.current.opacity = 0.8;
  };
  
  // 移除十字光标
  const removeCrosshair = () => {
    if (crosshairRef.current) {
      try {
        crosshairRef.current.remove();
      } catch (e) {
        // 如果已经移除，忽略错误
      }
      crosshairRef.current = null;
    }
  };
  
  const removeSelection = () => {
    if (pathRef.current) {
      try {
        pathRef.current.remove();
      } catch (e) {
        // 如果已经移除，忽略错误
      }
      pathRef.current = null;
    }
  };
  
  const initTool = () => {
    if (activeTool !== name) {
      // 切换工具时，清理工具和指示器
      if (toolRef.current) {
        toolRef.current.remove();
        toolRef.current = null;
      }
      removeCrosshair();
      removeSelection();
    } else {
      toolRef.current = new paper.Tool();
      toolRef.current.name = name;
      toolRef.current.onMouseDown = (e: paper.ToolEvent) => {
        // 移除十字光标，开始绘制
        removeCrosshair();
        // 每次开始绘制时生成新的随机颜色对
        const colorPair = getRandomColorPair();
        fillColorRef.current = colorPair.fillColor;
        strokeColorRef.current = colorPair.strokeColor;
        pathRef.current = new paper.Path({
          strokeColor: new paper.Color(strokeColorRef.current),
          strokeWidth: 4, // 增加线条宽度，从默认值改为4
          fillColor: new paper.Color(fillColorRef.current)
        });
        firstRef.current = e.point;
      };
      toolRef.current.onMouseDrag = (e: paper.ToolEvent) => {
        removeSelection();
        const width = e.point.x - firstRef.current.x;
        const height = e.point.y - firstRef.current.y;
        pathRef.current = new paper.Path.Rectangle(
          new paper.Point(firstRef.current.x, firstRef.current.y),
          new paper.Size(width, height)
        );
        pathRef.current.strokeColor = new paper.Color(strokeColorRef.current!); // 使用与填充色匹配的边框颜色
        pathRef.current.strokeWidth = 4; // 增加线条宽度
        pathRef.current.fillColor = new paper.Color(fillColorRef.current!); // 使用相同的填充颜色
      };
      toolRef.current.onMouseMove = (e: paper.ToolEvent) => {
        // 鼠标移动时显示十字光标
        createCrosshair(e.point);
      };
      toolRef.current.onMouseUp = (e: paper.ToolEvent) => {
        if (pathRef.current) {
          pathRef.current.add(e.point);
          submitPath(pathRef.current.clone());
          pathRef.current.remove();
          pathRef.current = null;
        }
        // 绘制完成后重新显示十字光标
        createCrosshair(e.point);
      };
      toolRef.current.activate();
    }
  };

  useEffect(
    () => {
      initTool();
      return () => {
        // 清理函数：组件卸载或依赖变化时清理
        if (toolRef.current) {
          toolRef.current.remove();
          toolRef.current = null;
        }
        removeCrosshair();
        removeSelection();
      };
    },
    [color]
  );
  
  useEffect(
    () => {
      initTool();
      return () => {
        // 清理函数：切换工具时清理
        if (toolRef.current) {
          toolRef.current.remove();
          toolRef.current = null;
        }
        removeCrosshair();
        removeSelection();
      };
    },
    [activeTool]
  );
  return (
    <div className="rect mgb10">
      <ButtonCommon
        className={`w-[80px] ${pattern.flexCenter} ${activeTool === name
          ? "bg-white-5"
          : ""}`}
        type={EButtonType.SIMPLE}
        onClick={() => onClick(name)}
      >
        <BsTextareaResize />
      </ButtonCommon>
    </div>
  );
};

export default RectComponent;
