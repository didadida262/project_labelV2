import { Button } from "antd";
import paper from "paper";
import React, { useRef, useEffect, useContext } from "react";
import { BsTextareaResize } from "react-icons/bs";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import { judeToolExisted } from "@/utils/paperjsWeapon";
import { ColorContext } from "@/pages/Label/ColorProvider";
import pattern from "@/styles/pattern";

import "./index.scss";

const RectComponent = props => {
  const { activeTool, onClick, submitPath } = props;
  const { color } = useContext(ColorContext);

  const name = "rect";
  let path = {} as any;
  let tool = null as any;
  let first = new paper.Point(0, 0);
  const removeSelection = () => {
    if (path) {
      path.remove();
    }
  };
  const initTool = () => {
    tool = new paper.Tool();
    tool.name = name;
    tool.onMouseDown = e => {
      path = new paper.Path({
        strokeColor: color,
        strokeWidth: 10
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
      path.strokeColor = color;
    };
    tool.onMouseMove = e => {};
    tool.onMouseUp = e => {
      path.add(e.point);
      submitPath(path.clone());
      path.remove();
    };
    tool.activate();
  };
  const switchTool = () => {
    if (activeTool !== name) return;
    if (!judeToolExisted(paper, name)) {
      initTool();
    }
  };
  useEffect(
    () => {
      if (activeTool !== name) return;
      initTool();
      return () => {};
    },
    [color]
  );
  useEffect(
    () => {
      switchTool();
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
