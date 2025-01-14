import { Button } from "antd";
import paper from "paper";
import React, { useRef, useEffect, useContext } from "react";
import { BsPencil } from "react-icons/bs";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import { getRandomColor } from "@/utils/common_weapons";
import { judeToolExisted } from "@/utils/paperjsWeapon";
import pattern from "@/styles/pattern";

import { ColorContext } from "../../ColorProvider";

import "./index.scss";

const PencilComponent = props => {
  const { activeTool, onClick, submitPath } = props;
  const { color, setColor } = useContext(ColorContext);
  const name = "pencil";
  let path = {} as any;
  let tool = null as any;
  const initTool = () => {
    tool = new paper.Tool();
    tool.name = name;
    tool.onMouseDown = e => {
      path = new paper.Path({
        strokeColor: color,
        strokeWidth: 5
      });
      path.add(e.point);
    };
    tool.onMouseDrag = e => {
      path.add(e.point);
      console.log("drag", e.point);
    };
    tool.onMouseMove = e => {};
    tool.onMouseUp = e => {
      console.log("up", e.point);

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
