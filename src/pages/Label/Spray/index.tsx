import { Button } from "antd";
import paper from "paper";
import React, { useRef, useEffect, useContext } from "react";
import { BsCrosshair2 } from "react-icons/bs";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import { getRandomColor } from "@/utils/common_weapons";
import { ColorContext } from "@/pages/Label/ColorProvider";
import { hexToRgba } from "@/utils/randomColors";

import pattern from "../../../styles/pattern";
import { judeToolExisted } from "../../../utils/paperjsWeapon";

import "./index.scss";

interface SprayComponentProps {
  activeTool: string;
  onClick: (tool: string) => void;
  submitPath: (path: paper.Path) => void;
}

const Spray: React.FC<SprayComponentProps> = (props) => {
  function mix(a: number, b: number, t: number) {
    return a + (b - a) * t;
  }
  const { activeTool, onClick, submitPath } = props;
  const { color, isColorSelected } = useContext(ColorContext);
  const name = "Spray";
  const toolRef = useRef<any>(null);
  const pathRef = useRef<any>(null);
  const initPointRef = useRef<paper.Point>(new paper.Point(0, 0));
  const colorRef = useRef<string>(getRandomColor());
  const minRadius = 5;
  const maxRadius = 20;
  const jitter = 40;

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
      if (!judeToolExisted(paper, name)) {
        toolRef.current = new paper.Tool();
        toolRef.current.name = name;
        pathRef.current = new paper.CompoundPath({});
        
        toolRef.current.onMouseDown = (e: paper.ToolEvent) => {
          // 如果用户选择了颜色，使用选择的颜色；否则使用随机颜色
          colorRef.current = isColorSelected 
            ? hexToRgba(color, parseFloat(Math.random().toFixed(1)))
            : getRandomColor();
          pathRef.current = new paper.Path();
          pathRef.current.fillColor = new paper.Color(colorRef.current);
          initPointRef.current = e.point;
        };
        
        toolRef.current.onMouseDrag = (e: paper.ToolEvent) => {
          const radius = mix(minRadius, maxRadius, Math.random());
          const offset = new paper.Point(
            mix(-jitter, jitter, Math.random()),
            mix(-jitter, jitter, Math.random())
          );

          const pt = e.point.add(offset);

          // 如果用户选择了颜色，使用选择的颜色（带随机透明度）；否则使用随机颜色
          const fillColor = isColorSelected 
            ? hexToRgba(color, parseFloat(Math.random().toFixed(1)))
            : getRandomColor();

          new paper.Path.Circle({
            center: pt,
            radius: radius,
            fillColor: new paper.Color(fillColor)
          });
        };
        
        toolRef.current.onMouseUp = (e: paper.ToolEvent) => {
          if (pathRef.current) {
            submitPath(pathRef.current.clone());
          }
        };
        
        toolRef.current.activate();
      }
    }
  };

  useEffect(() => {
    return () => {
      // 清理函数：组件卸载时清理
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
  }, [color, isColorSelected]);

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
    <div className="spray mgb10">
      <ButtonCommon
        className={`w-[80px] ${pattern.flexCenter} ${activeTool === name
          ? "bg-white-5"
          : ""}`}
        type={EButtonType.SIMPLE}
        onClick={() => onClick(name)}
      >
        <BsCrosshair2 />
      </ButtonCommon>
    </div>
  );
};

export default Spray;
