/*
 * @Description: 
 * @Author: didadida262
 * @Date: 2024-07-31 10:32:27
 * @LastEditors: didadida262
 * @LastEditTime: 2025-01-16 23:39:27
 */
import { Button } from "antd";
import paper from "paper";
import React, { useRef, useEffect, useContext } from "react";
import { BsPencil } from "react-icons/bs";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import { judeToolExisted } from "@/utils/paperjsWeapon";
import { ColorContext } from "@/pages/Label/ColorProvider";
import { getRandomPencilColor } from "@/utils/randomColors";
import pattern from "@/styles/pattern";

import "./index.scss";

interface PencilComponentProps {
  activeTool: string;
  onClick: (tool: string) => void;
  submitPath: (path: paper.Path) => void;
}

const PencilComponent: React.FC<PencilComponentProps> = (props) => {
  const { activeTool, onClick, submitPath } = props;
  const { color } = useContext(ColorContext);
  const name = "pencil";
  const toolRef = useRef<any>(null);
  const pathRef = useRef<any>(null);
  
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
      toolRef.current.onMouseDown = (e: paper.ToolEvent) => {
        // 每次开始绘制时生成新的随机颜色
        const randomColor = getRandomPencilColor();
        pathRef.current = new paper.Path({
          strokeColor: new paper.Color(randomColor),
          strokeWidth: 5
        });
        pathRef.current.add(e.point);
      };
      toolRef.current.onMouseDrag = (e: paper.ToolEvent) => {
        if (pathRef.current) {
          pathRef.current.add(e.point);
        }
      };
      toolRef.current.onMouseMove = (e: paper.ToolEvent) => {};
      toolRef.current.onMouseUp = (e: paper.ToolEvent) => {
        if (pathRef.current) {
          pathRef.current.add(e.point);
          submitPath(pathRef.current.clone());
          pathRef.current.remove();
          pathRef.current = null;
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
    <div className="pencil mgb10">
      <ButtonCommon
        className={`w-[80px] ${pattern.flexCenter} ${activeTool === name
          ? "bg-white-5"
          : ""}`}
        type={EButtonType.SIMPLE}
        onClick={() => onClick(name)}
      >
        <BsPencil />
      </ButtonCommon>
    </div>
  );
};

export default PencilComponent;
