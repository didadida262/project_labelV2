/*
 * @Description:
 * @Author: didadida262
 * @Date: 2024-03-14 02:04:27
 * @LastEditors: didadida262
 * @LastEditTime: 2024-08-19 17:50:25
 */
import paper from "paper";
import React from "react";
import { useState, useEffect, useRef } from "react";

import { showPoint } from "@/utils/paperjsWeapon";

import imgurl from "../../../assets/只狼.jpeg";

import "./index.scss";

const DrawComponent = props => {
  const { activeTool } = props;
  const canvasRef = useRef(null) as any;
  const initPoint = useRef(new paper.Point(0, 0));

  const onMouseDown = e => {
    initPoint.current = e.point;
  };
  const onMouseDrag = e => {
    const delta = initPoint.current.subtract(e.point);
    const newCenter = paper.project.view.center.add(delta);
    const view: paper.View = paper.project.view;
    paper.project.view.center = newCenter;
  };
  const setCursorPointer = () => {
    switch (activeTool) {
      case "pointer":
        canvasRef.current.style.cursor = "pointer";
        break;
      case "rect":
        canvasRef.current.style.cursor = "crosshair";
        break;
      case "pencil":
        canvasRef.current.style.cursor = "crosshair";
        break;
      case "brush":
        canvasRef.current.style.cursor = "none";
        break;
    }
  };
  const initCanvas = () => {
    paper.setup(canvasRef.current);
  };
  const drawPic = () => {
    const raster = new paper.Raster(imgurl);
    raster.onLoad = () => {
      raster.fitBounds(paper.view.bounds, false);
    };
  };
  useEffect(() => {
    initCanvas();
    drawPic();
  }, []);
  useEffect(
    () => {
      setCursorPointer();
    },
    [activeTool]
  );
  return (
    <div className="draw">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default DrawComponent;
