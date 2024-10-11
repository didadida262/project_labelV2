/*
 * @Description: 
 * @Author: didadida262
 * @Date: 2024-03-19 12:13:47
 * @LastEditors: didadida262
 * @LastEditTime: 2024-10-11 11:25:09
 */
import { Button } from "antd";
import paper from "paper";
import React, { useRef, useEffect } from "react";
import { BsCursor } from "react-icons/bs";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";

import pattern from "../../../styles/pattern";
import { judeToolExisted } from "../../../utils/paperjsWeapon";

import "./index.scss";

const pointerComponent = props => {
  const { activeTool, onClick } = props;
  const name = "pointer";
  let initPoint = new paper.Point(0, 0);
  let cursorPoint = null as any;
  let hitResult = null as any;
  let tool = null as any;
  const hitOptions = {
    // type: fill(类似矩形框)、segment（点）、pixel（raster）
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 2
    // match: hit => {
    //   return !hit.item.hasOwnProperty('indicator') && !hit.item.parent.hasOwnProperty('ignore')
    // }
  };

  const createCursor = point => {
    removeCursor();
    cursorPoint = new paper.Path.Circle({
      center: point,
      radius: 10,
      strokeColor: "black",
      strokeWidth: 5
    });
  };
  const removeCursor = () => {
    if (cursorPoint) {
      cursorPoint.remove();
      cursorPoint = null;
    }
  };
  const dragView = e => {
    const delta = initPoint.subtract(e.point);
    const currentProject: paper.Project = paper.project;
    const currentCenter = currentProject.view.center;
    currentProject.view.center = currentCenter.add(delta);
  };
  const initTool = () => {
    tool = new paper.Tool();
    tool.name = name;
    tool.onMouseDown = e => {
      initPoint = e.point;
      const activateProject = paper.project;
      hitResult = activateProject.hitTest(e.point, hitOptions);
      console.log("hitResult>>>>", hitResult);
    };
    tool.onMouseDrag = e => {
      console.warn("hitResult>>>>", hitResult);
      if (!hitResult) {
        dragView(e);
        return;
      }
      switch (hitResult.type) {
        case "segment":
          removeCursor();
          const segment = hitResult.segment;
          segment.point = e.point;
          break;
      }
    };
    tool.onMouseMove = e => {
      const activateProject = paper.project;
      hitResult = activateProject.hitTest(e.point, hitOptions);
      if (hitResult && hitResult.type === "segment") {
        createCursor(e.point);
      } else {
        removeCursor();
      }
    };
    tool.onMouseUp = e => {};
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
        <BsCursor />
      </ButtonCommon>
    </div>
  );
};

export default pointerComponent;
