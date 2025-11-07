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
  let initPoint = new paper.Point(0, 0);
  let path = null as any;
  let tool = null as any;

  const initTool = () => {
    if (activeTool !== name) {
      tool && tool.remove();
      return;
    }
    tool = new paper.Tool();
    tool.name = name;
    path = new paper.CompoundPath({});
    tool.onMouseDown = (e: paper.ToolEvent) => {
      // 每次开始绘制时生成新的随机颜色
      const randomColor = getRandomPencilColor();
      path = new paper.Path();
      path.fillColor = randomColor;
      initPoint = e.point;
    };
    tool.onMouseDrag = (e: paper.ToolEvent) => {
      path.add(e.middlePoint.add(e.delta.rotate(90).normalize().multiply(10)));
      path.insert(
        0,
        e.middlePoint.subtract(e.delta.rotate(90).normalize().multiply(10))
      );
    };
    tool.onMouseUp = (e: paper.ToolEvent) => {
      submitPath(path.clone());
    };
    tool.activate();
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
