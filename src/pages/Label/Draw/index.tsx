import paper from "paper";
import React, { useContext } from "react";
import { useState, useEffect, useRef } from "react";

import { showPoint } from "@/utils/paperjsWeapon";

import "./index.scss";

interface DrawComponentProps {
  activeTool: string;
}

const DrawComponent: React.FC<DrawComponentProps> = (props) => {
  const { activeTool } = props;
  const canvasRef = useRef(null) as any;
  const initPoint = useRef(new paper.Point(0, 0));
  const [zoom, setZoom] = useState(1);

  const onMouseDown = (e: paper.ToolEvent) => {
    initPoint.current = e.point;
  };
  const onMouseDrag = (e: paper.ToolEvent) => {
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
      case "brushv2":
        canvasRef.current.style.cursor = "crosshair";
        break;
      case "brush":
        canvasRef.current.style.cursor = "none";
        break;
      case "eraser":
        // 使用自定义橡皮擦光标
        canvasRef.current.style.cursor = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"%23333\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21\"/><path d=\"M22 21H7\"/><path d=\"m5 11 9 9\"/></svg>') 12 12, auto";
        break;
    }
  };
  const initCanvas = () => {
    paper.setup(canvasRef.current);
  };
  const drawWhiteboard = () => {
    // 创建白板背景 - 填充整个视图区域
    const bounds = paper.view.bounds;
    const whiteboard = new paper.Path.Rectangle(bounds);
    whiteboard.fillColor = new paper.Color("#FFFFFF");
    whiteboard.strokeColor = new paper.Color("#E0E0E0");
    whiteboard.strokeWidth = 1;
    // 标记为白板，防止被橡皮擦擦除
    whiteboard.data = { isWhiteboard: true };
    // 将白板移到最底层，确保标注在上面
    whiteboard.sendToBack();
  };
  const changeZoom = (delta: number, p: paper.Point) => {
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
    canvasRef.current.addEventListener("wheel", (event: WheelEvent) => {
      event.preventDefault();
      // 获取滚轮的 deltaY 属性，判断滚动方向
      const delta = event.deltaY;
      // // 更新视图的缩放比例和中心点
      const viewPoint = {
        x: event.offsetX,
        y: event.offsetY
      };
      const newPoint = paper.project.view.viewToProject(viewPoint);
      const newZoom = changeZoom(delta, newPoint).zoom;
      paper.view.zoom = newZoom;
      paper.view.center = newPoint;
    });
  };
  useEffect(() => {
    initCanvas();
    drawWhiteboard();
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
    </div>
  );
};

export default DrawComponent;
