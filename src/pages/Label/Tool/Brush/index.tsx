/*
 * @Description:
 * @Author: didadida262
 * @Date: 2024-03-21 02:14:12
 * @LastEditors: didadida262
 * @LastEditTime: 2025-01-16 23:42:20
 */
import { Button } from "antd";
import paper from "paper";
import React, { useRef, useEffect, useContext } from "react";
import { BsBrush } from "react-icons/bs";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import { judeToolExisted } from "@/utils/paperjsWeapon";
import { ColorContext } from "@/pages/Label/ColorProvider";
import { getRandomPencilColor } from "@/utils/randomColors";
import pattern from "@/styles/pattern";

import "./index.scss";

interface BrushComponentProps {
  activeTool: string;
  onClick: (tool: string) => void;
  submitPath: (path: paper.Path) => void;
}

const brushComponent: React.FC<BrushComponentProps> = (props) => {
  const { activeTool, onClick, submitPath } = props;
  const { color } = useContext(ColorContext);
  const name = "brush";
  const toolRef = useRef<any>(null);
  const circleRef = useRef<any>(null);
  const pathRef = useRef<any>(null);
  const initPointRef = useRef<paper.Point>(new paper.Point(0, 0));
  const currentColorRef = useRef<string | null>(null);

  // 移除预览圆圈
  const removeCircle = () => {
    if (circleRef.current) {
      try {
        circleRef.current.remove();
      } catch (e) {
        // 如果已经移除，忽略错误
      }
      circleRef.current = null;
    }
  };

  const initTool = () => {
    if (activeTool !== name) {
      // 切换工具时，清理工具和预览圆圈
      if (toolRef.current) {
        toolRef.current.remove();
        toolRef.current = null;
      }
      removeCircle();
      if (pathRef.current) {
        try {
          pathRef.current.remove();
        } catch (e) {
          // 如果已经移除，忽略错误
        }
        pathRef.current = null;
      }
    } else {
      toolRef.current = new paper.Tool();
      toolRef.current.name = name;
      circleRef.current = new paper.Path.Circle({
        center: new paper.Point(0, 0),
        radius: 10,
        strokeColor: new paper.Color(color)
      });
      pathRef.current = new paper.CompoundPath({});
      
      toolRef.current.onMouseDown = (e: paper.ToolEvent) => {
        // 每次开始绘制时生成新的随机颜色
        currentColorRef.current = getRandomPencilColor();
        initPointRef.current = e.point;
      };
      
      toolRef.current.onMouseDrag = (e: paper.ToolEvent) => {
        new paper.Path.Circle({
          center: e.point,
          radius: 10,
          fillColor: new paper.Color(currentColorRef.current!)
        });
      };
      
      toolRef.current.onMouseMove = (e: paper.ToolEvent) => {
        removeCircle();
        circleRef.current = new paper.Path.Circle({
          center: e.point,
          radius: 10,
          fillColor: new paper.Color(currentColorRef.current || color)
        });
      };
      
      toolRef.current.onMouseUp = (e: paper.ToolEvent) => {
        if (pathRef.current) {
          submitPath(pathRef.current.clone());
        }
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
        removeCircle();
        if (pathRef.current) {
          try {
            pathRef.current.remove();
          } catch (e) {
            // 如果已经移除，忽略错误
          }
          pathRef.current = null;
        }
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
        removeCircle();
        if (pathRef.current) {
          try {
            pathRef.current.remove();
          } catch (e) {
            // 如果已经移除，忽略错误
          }
          pathRef.current = null;
        }
      };
    },
    [activeTool]
  );
  return (
    <div className="brush mgb10">
      <ButtonCommon
        className={`w-[80px] ${pattern.flexCenter} ${activeTool === name
          ? "bg-white-5"
          : ""}`}
        type={EButtonType.SIMPLE}
        onClick={() => onClick(name)}
      >
        <BsBrush />
      </ButtonCommon>
    </div>
  );
};

export default brushComponent;
