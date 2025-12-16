/*
 * @Description: 
 * @Author: didadida262
 * @Date: 2024-03-19 12:13:47
 * @LastEditors: didadida262
 * @LastEditTime: 2024-11-13 10:17:25
 */
import { Button } from "antd";
import paper from "paper";
import React, { useRef, useEffect } from "react";
import { BsHandIndex } from "react-icons/bs";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";

import pattern from "../../../styles/pattern";
import { judeToolExisted } from "../../../utils/paperjsWeapon";

import "./index.scss";

interface PointerComponentProps {
  activeTool: string;
  onClick: (tool: string) => void;
}

const pointerComponent: React.FC<PointerComponentProps> = (props) => {
  const { activeTool, onClick } = props;
  const name = "pointer";
  const toolRef = useRef<any>(null);
  const cursorPointRef = useRef<any>(null);
  const initPointRef = useRef<paper.Point>(new paper.Point(0, 0));
  const hitResultRef = useRef<any>(null);
  const panStartCenterRef = useRef<paper.Point>(new paper.Point(0, 0));
  const panStartViewPointRef = useRef<paper.Point>(new paper.Point(0, 0));
  const dragModeRef = useRef<"none" | "pan" | "segment">("none");
  
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

  const createCursor = (point: paper.Point) => {
    removeCursor();
    cursorPointRef.current = new paper.Path.Circle({
      center: point,
      radius: 10,
      strokeColor: new paper.Color("black"),
      strokeWidth: 5
    });
  };
  
  const removeCursor = () => {
    if (cursorPointRef.current) {
      try {
        cursorPointRef.current.remove();
      } catch (e) {
        // 如果已经移除，忽略错误
      }
      cursorPointRef.current = null;
    }
  };
  const getViewPointFromEvent = (e: paper.ToolEvent): paper.Point => {
    // 优先使用原生事件的 offsetX/Y（稳定，不受 view.center 改变影响）
    const native = (e as any).event as MouseEvent | undefined;
    if (native && typeof native.offsetX === "number" && typeof native.offsetY === "number") {
      return new paper.Point(native.offsetX, native.offsetY);
    }
    // fallback：从 project 坐标转回 view 坐标
    return paper.view.projectToView(e.point);
  };

  const handleDragView = (e: paper.ToolEvent) => {
    const view = paper.view;
    const currentViewPoint = getViewPointFromEvent(e);

    // 关键：用 view 坐标计算 delta，再转换成 project 位移。
    // viewToProject(p) = (p - size/2)/zoom + center，因此两点差值与 center 无关 -> 不会抖。
    const deltaProject = view.viewToProject(panStartViewPointRef.current).subtract(
      view.viewToProject(currentViewPoint)
    );
    view.center = panStartCenterRef.current.add(deltaProject);
  };
  
  const handleDragPath = (e: paper.ToolEvent) => {
    const delta = initPointRef.current.subtract(e.point);
    if (hitResultRef.current && hitResultRef.current.item) {
      const path = hitResultRef.current.item;
      const currentCenter = path.position;
    }
  };
  const initTool = () => {
    if (activeTool !== name) {
      // 切换工具时，清理工具和光标
      if (toolRef.current) {
        toolRef.current.remove();
        toolRef.current = null;
      }
      removeCursor();
    } else {
      if (!judeToolExisted(paper, name)) {
        toolRef.current = new paper.Tool();
        toolRef.current.name = name;
        
        toolRef.current.onMouseDown = (e: paper.ToolEvent) => {
          initPointRef.current = e.point;
          panStartCenterRef.current = paper.project.view.center.clone();
          panStartViewPointRef.current = getViewPointFromEvent(e);
          const activateProject = paper.project;
          hitResultRef.current = activateProject.hitTest(e.point, hitOptions);
          // 规则：命中节点就拖节点；否则（包括命中背景/路径/图片/空白）拖动画布
          dragModeRef.current =
            hitResultRef.current && hitResultRef.current.type === "segment"
              ? "segment"
              : "pan";
        };
        
        toolRef.current.onMouseDrag = (e: paper.ToolEvent) => {
          removeCursor();
          if (dragModeRef.current === "segment" && hitResultRef.current) {
            const segment = hitResultRef.current.segment;
            segment.point = e.point;
            return;
          }
          // 默认拖动画布
          handleDragView(e);
        };
        
        toolRef.current.onMouseMove = (e: paper.ToolEvent) => {
          const activateProject = paper.project;
          hitResultRef.current = activateProject.hitTest(e.point, hitOptions);
          if (hitResultRef.current && hitResultRef.current.type === "segment") {
            createCursor(e.point);
          } else {
            removeCursor();
          }
        };
        
        toolRef.current.onMouseUp = (e: paper.ToolEvent) => {
          dragModeRef.current = "none";
        };
        toolRef.current.activate();
      }
    }
  };
  
  useEffect(() => {
    return () => {
      // 清理函数：组件卸载时清理
      if (toolRef.current) {
        toolRef.current.remove();
        toolRef.current = null;
      }
      removeCursor();
    };
  }, []);
  
  useEffect(
    () => {
      initTool();
      return () => {
        // 清理函数：切换工具时清理
        if (toolRef.current) {
          toolRef.current.remove();
          toolRef.current = null;
        }
        removeCursor();
      };
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
        <BsHandIndex />
      </ButtonCommon>
    </div>
  );
};

export default pointerComponent;
