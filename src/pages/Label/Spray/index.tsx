import { Button } from "antd";
import paper from "paper";
import React, { useRef, useEffect } from "react";
import { BsCrosshair2 } from "react-icons/bs";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import { getRandomColor } from "@/utils/common_weapons";

import pattern from "../../../styles/pattern";
import { judeToolExisted } from "../../../utils/paperjsWeapon";

import "./index.scss";

const Spray = props => {
  function mix(a, b, t) {
    return a + (b - a) * t;
  }
  const { activeTool, onClick, submitPath } = props;
  const name = "Spray";
  let initPoint = new paper.Point(0, 0);
  let path = null as any;
  let tool = null as any;
  let color = getRandomColor();
  const minRadius = 5;
  const maxRadius = 20;
  const jitter = 40;

  const initTool = () => {
    tool = new paper.Tool();
    tool.name = name;
    path = new paper.CompoundPath({});
    tool.onMouseDown = e => {
      color = getRandomColor();
      path = new paper.Path();
      path.fillColor = color;
      initPoint = e.point;
    };
    tool.onMouseDrag = e => {
      const radius = mix(minRadius, maxRadius, Math.random());
      const offset = new paper.Point(
        mix(-jitter, jitter, Math.random()),
        mix(-jitter, jitter, Math.random())
      );

      const pt = e.point.add(offset);
      const t = Math.random();

      let circle = new paper.Path.Circle({
        center: pt,
        radius: radius,
        fillColor: getRandomColor()
      });
    };
    tool.onMouseUp = e => {
      submitPath(path.clone());
    };
    tool.activate();
  };
  const switchTool = () => {
    if (activeTool !== name) return;
    if (!judeToolExisted(paper, name)) {
      initTool();
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(
    () => {
      switchTool();
      console.log("paper>>>", paper);
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
