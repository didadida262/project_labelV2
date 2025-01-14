import paper from "paper";
import React, { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";

import { showPoint } from "@/utils/paperjsWeapon";
import { ColorContext } from "@/pages/Label/ColorProvider";

import imgurl from "../../../assets/只狼.jpeg";

import "./index.scss";

const DrawComponent = props => {
  const { color, setColor } = useContext(ColorContext);
  const { activeTool } = props;
  const canvasRef = useRef(null) as any;
  const initPoint = useRef(new paper.Point(0, 0));
  const [zoom, setZoom] = useState(1);

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
  const changeZoom = (delta, p) => {
    let currentProject = paper.project;
    let view = currentProject.view;
    let oldZoom = view.zoom;
    let c = view.center;
    let factor = 0.11 + zoom;

    let newZoom = delta < 0 ? oldZoom * factor : oldZoom / factor;
    let beta = oldZoom / newZoom;
    let pc = p.subtract(c);
    let a = p.subtract(pc.multiply(beta)).subtract(c);

    return { zoom: newZoom, offset: a };
  };
  const addWheelListener = () => {
    canvasRef.current.addEventListener("wheel", event => {
      event.preventDefault();
      // 获取滚轮的 deltaY 属性，判断滚动方向
      const delta = event.deltaY;
      // // 更新视图的缩放比例和中心点
      const viewPoint = {
        x: event.offsetX,
        y: event.offsetY
      };
      console.log("viewPoint>>>", viewPoint);
      const newPoint = paper.project.view.viewToProject(viewPoint);
      const newZoom = changeZoom(delta, newPoint).zoom;
      console.log("newPoint>>>", newPoint);
      console.log("newZoom>>>", newZoom);
      paper.view.zoom = newZoom;
      paper.view.center = newPoint;
    });
  };
  useEffect(() => {
    initCanvas();
    drawPic();
    // addWheelListener();
    // return () => {
    //   canvasRef.current.removeListener("wheel");
    // };
  }, []);
  useEffect(
    () => {
      setCursorPointer();
    },
    [activeTool]
  );
  return (
    <div className="draw relative">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute right-0 top-0">
        <HexColorPicker color={color} onChange={setColor} />
      </div>
    </div>
  );
};

export default DrawComponent;
