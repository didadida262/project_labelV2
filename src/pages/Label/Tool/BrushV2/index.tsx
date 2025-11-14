import { Button } from "antd";
import paper from "paper";
import React, { useRef, useEffect, useState, useContext } from "react";
import { BsBrushFill } from "react-icons/bs";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import { getRandomColor } from "@/utils/common_weapons";
import { judeToolExisted } from "@/utils/paperjsWeapon";
import { ColorContext } from "@/pages/Label/ColorProvider";
import { getRandomPencilColor } from "@/utils/randomColors";
import pattern from "@/styles/pattern";

import "./index.scss";

interface BrushV2ComponentProps {
  activeTool: string;
  onClick: (tool: string) => void;
  submitPath: (path: paper.Path) => void;
}

const brushV2: React.FC<BrushV2ComponentProps> = (props) => {
  const { activeTool, onClick, submitPath } = props;
  const { color } = useContext(ColorContext);
  const name = "brushv2";
  const toolRef = useRef<any>(null);
  const pathRef = useRef<any>(null);
  const initPointRef = useRef<paper.Point>(new paper.Point(0, 0));

  const initTool = () => {
    if (activeTool !== name) {
      // 切换工具时，清理工具和路径
      if (toolRef.current) {
        toolRef.current.remove();
        toolRef.current = null;
      }
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
      pathRef.current = new paper.CompoundPath({});
      
      toolRef.current.onMouseDown = (e: paper.ToolEvent) => {
        // 每次开始绘制时生成新的随机颜色
        const randomColor = getRandomPencilColor();
        pathRef.current = new paper.Path();
        pathRef.current.fillColor = new paper.Color(randomColor);
        initPointRef.current = e.point;
      };
      
      toolRef.current.onMouseDrag = (e: paper.ToolEvent) => {
        if (pathRef.current) {
          pathRef.current.add(e.middlePoint.add(e.delta.rotate(90, new paper.Point(0, 0)).normalize().multiply(10)));
          pathRef.current.insert(
            0,
            e.middlePoint.subtract(e.delta.rotate(90, new paper.Point(0, 0)).normalize().multiply(10))
          );
        }
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
        <BsBrushFill />
      </ButtonCommon>
    </div>
  );
};

export default brushV2;
