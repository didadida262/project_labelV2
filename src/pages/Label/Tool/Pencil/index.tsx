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

const PencilComponent = props => {
  const { activeTool, onClick, submitPath } = props;
  const { color } = useContext(ColorContext);
  const name = "pencil";
  let path = {} as any;
  let tool = null as any;
  
  const initTool = () => {
    if (activeTool !== name) {
      tool && tool.remove();
    } else {
      tool = new paper.Tool();
      tool.name = name;
      tool.onMouseDown = e => {
        // 每次开始绘制时生成新的随机颜色
        const randomColor = getRandomPencilColor();
        path = new paper.Path({
          strokeColor: randomColor,
          strokeWidth: 5
        });
        path.add(e.point);
      };
      tool.onMouseDrag = e => {
        path.add(e.point);
      };
      tool.onMouseMove = e => {};
      tool.onMouseUp = e => {
        path.add(e.point);
        submitPath(path.clone());
        path.remove();
      };
      tool.activate();
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
