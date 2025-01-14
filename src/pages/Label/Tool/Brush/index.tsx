/*
 * @Description:
 * @Author: didadida262
 * @Date: 2024-03-21 02:14:12
 * @LastEditors: didadida262
 * @LastEditTime: 2025-01-14 14:38:36
 */
import { Button } from "antd";
import paper from "paper";
import React, { useRef, useEffect, useContext } from "react";
import { BsBrush } from "react-icons/bs";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import { judeToolExisted } from "@/utils/paperjsWeapon";
import { ColorContext } from "@/pages/Label/ColorProvider";
import pattern from "@/styles/pattern";

import "./index.scss";

const brushComponent = props => {
  const { activeTool, onClick, submitPath } = props;
  const { color } = useContext(ColorContext);
  const name = "brush";
  let initPoint = new paper.Point(0, 0);
  let circle = null as any;
  let path = null as any;
  let tool = null as any;

  const initTool = () => {
    tool = new paper.Tool();
    tool.name = name;
    circle = new paper.Path.Circle({
      center: 0,
      radius: 10,
      strokeColor: color
    });
    path = new paper.CompoundPath({});
    tool.onMouseDown = e => {
      console.log("down", e.point);
      initPoint = e.point;
    };
    tool.onMouseDrag = e => {
      new paper.Path.Circle({
        center: e.point,
        radius: 10,
        fillColor: color
      });
    };
    tool.onMouseMove = e => {
      circle.remove();
      circle = new paper.Path.Circle({
        center: e.point,
        radius: 10,
        fillColor: color
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
    if (activeTool !== name) return;
    initTool();
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
