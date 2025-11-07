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

const RectComponent = props => {
  const { activeTool, onClick, submitPath } = props;
  const { color } = useContext(ColorContext);

  const name = "rect";
  let path = {} as any;
  let tool = null as any;
  let first = new paper.Point(0, 0);
  let fillColor = null as any; // 存储当前绘制的填充颜色
  let strokeColor = null as any; // 存储当前绘制的边框颜色
  
  const removeSelection = () => {
    if (path) {
      path.remove();
    }
  };
  const initTool = () => {
    if (activeTool !== name) {
      tool && tool.remove();
    } else {
      tool = new paper.Tool();
      tool.name = name;
      tool.onMouseDown = e => {
        // 每次开始绘制时生成新的随机颜色对
        const colorPair = getRandomColorPair();
        fillColor = colorPair.fillColor;
        strokeColor = colorPair.strokeColor;
        path = new paper.Path({
          strokeColor: strokeColor,
          strokeWidth: 4, // 增加线条宽度，从默认值改为4
          fillColor: fillColor
        });
        first = e.point;
      };
      tool.onMouseDrag = e => {
        removeSelection();
        const width = e.point.x - first.x;
        const height = e.point.y - first.y;
        path = new paper.Path.Rectangle(
          new paper.Point(first.x, first.y),
          new paper.Size(width, height)
        );
        path.strokeColor = strokeColor; // 使用与填充色匹配的边框颜色
        path.strokeWidth = 4; // 增加线条宽度
        path.fillColor = fillColor; // 使用相同的填充颜色
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
