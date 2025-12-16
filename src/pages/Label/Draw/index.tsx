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
  const wheelHandlerRef = useRef<(e: WheelEvent) => void>();
  const rafIdRef = useRef<number | null>(null);
  const targetZoomRef = useRef<number>(1);
  const zoomAnchorViewRef = useRef<paper.Point>(new paper.Point(0, 0));
  const zoomAnchorProjectRef = useRef<paper.Point>(new paper.Point(0, 0));

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
    // 创建“足够大”的白板背景，避免拖动画布时露出空白
    const SIZE = 200000;
    const whiteboardBounds = new paper.Rectangle(
      new paper.Point(-SIZE / 2, -SIZE / 2),
      new paper.Size(SIZE, SIZE)
    );
    const whiteboard = new paper.Path.Rectangle(whiteboardBounds);
    whiteboard.fillColor = new paper.Color("#2D2D2D");
    whiteboard.strokeColor = new paper.Color("#404040");
    whiteboard.strokeWidth = 1;
    // 标记为白板，防止被橡皮擦擦除
    whiteboard.data = { isWhiteboard: true };
    // 将白板移到最底层，确保标注在上面
    whiteboard.sendToBack();
  };
  useEffect(() => {
    initCanvas();
    drawWhiteboard();
  }, []);

  // 只在“手/指针工具（pointer）”下启用滚轮缩放；切换到其他工具时，不触发任何缩放逻辑
  useEffect(() => {
    const cleanup = () => {
      if (rafIdRef.current != null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (wheelHandlerRef.current) {
        canvasRef.current?.removeEventListener("wheel", wheelHandlerRef.current as any);
        wheelHandlerRef.current = undefined;
      }
    };

    if (activeTool !== "pointer") {
      cleanup();
      return;
    }

    const MIN_ZOOM = 0.2;
    const MAX_ZOOM = 8;
    // 缩放步进（越接近 1 越“慢”）
    const STEP = 1.08;
    // 鼠标滚轮每次常见 deltaY 约 100；用指数映射能兼容触控板的细小 delta
    const DELTA_DIVISOR = 100;
    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

    targetZoomRef.current = paper.view.zoom;

    const applyZoomAtAnchor = (zoom: number) => {
      const view = paper.view;
      view.zoom = zoom;
      // 保持 anchorView 对应的项目坐标仍然是 anchorProject（缩放不“跳”）
      const p2 = view.viewToProject(zoomAnchorViewRef.current);
      const delta = zoomAnchorProjectRef.current.subtract(p2);
      view.center = view.center.add(delta);
    };

    const tick = () => {
      rafIdRef.current = null;
      const view = paper.view;
      const current = view.zoom;
      const target = targetZoomRef.current;

      const diff = target - current;
      if (Math.abs(diff) < 0.0005) {
        applyZoomAtAnchor(target);
        return;
      }

      // 插值，制造丝滑动画（0.2~0.35 都可以；数值越大响应越快但越不丝滑）
      const next = current + diff * 0.25;
      applyZoomAtAnchor(next);
      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    const requestTick = () => {
      if (rafIdRef.current != null) return;
      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const view = paper.view;
      const oldZoom = view.zoom;

      // 记录缩放锚点：鼠标位置（view坐标）和对应的项目坐标（project坐标）
      zoomAnchorViewRef.current = new paper.Point(event.offsetX, event.offsetY);
      zoomAnchorProjectRef.current = view.viewToProject(zoomAnchorViewRef.current);

      // 指数映射：deltaY 越大，缩放越多；同时兼容触控板细小 delta
      const factor = Math.pow(STEP, -event.deltaY / DELTA_DIVISOR);
      const newZoom = clamp(oldZoom * factor, MIN_ZOOM, MAX_ZOOM);
      if (newZoom === oldZoom) return;

      targetZoomRef.current = newZoom;
      requestTick();
    };

    wheelHandlerRef.current = onWheel;
    canvasRef.current?.addEventListener("wheel", onWheel, { passive: false });

    return cleanup;
  }, [activeTool]);
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
