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
  let fillColor = null as any; // 存储当前绘制的填充颜色
  let strokeColor = null as any; // 存储当前绘制的边框颜色
  
  // 生成随机的半透明颜色（填充用）
  const getRandomFillColor = () => {
    const colors = [
      'rgba(255, 107, 107, 0.3)', // 柔和的红色
      'rgba(78, 205, 196, 0.3)',  // 青色
      'rgba(255, 195, 113, 0.3)', // 橙色
      'rgba(132, 129, 255, 0.3)', // 紫色
      'rgba(54, 215, 183, 0.3)',  // 薄荷绿
      'rgba(255, 159, 243, 0.3)', // 粉色
      'rgba(255, 107, 129, 0.3)', // 樱花粉
      'rgba(142, 202, 230, 0.3)', // 天蓝色
      'rgba(174, 168, 211, 0.3)', // 薰衣草紫
      'rgba(255, 218, 121, 0.3)', // 金黄色
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // 生成对应的边框颜色（不透明度更高，更明显）
  const getStrokeColorFromFill = (fillColorStr) => {
    const strokeColors = [
      'rgba(255, 107, 107, 0.8)', // 柔和的红色
      'rgba(78, 205, 196, 0.8)',  // 青色
      'rgba(255, 195, 113, 0.8)', // 橙色
      'rgba(132, 129, 255, 0.8)', // 紫色
      'rgba(54, 215, 183, 0.8)',  // 薄荷绿
      'rgba(255, 159, 243, 0.8)', // 粉色
      'rgba(255, 107, 129, 0.8)', // 樱花粉
      'rgba(142, 202, 230, 0.8)', // 天蓝色
      'rgba(174, 168, 211, 0.8)', // 薰衣草紫
      'rgba(255, 218, 121, 0.8)', // 金黄色
    ];
    const fillColors = [
      'rgba(255, 107, 107, 0.3)',
      'rgba(78, 205, 196, 0.3)',
      'rgba(255, 195, 113, 0.3)',
      'rgba(132, 129, 255, 0.3)',
      'rgba(54, 215, 183, 0.3)',
      'rgba(255, 159, 243, 0.3)',
      'rgba(255, 107, 129, 0.3)',
      'rgba(142, 202, 230, 0.3)',
      'rgba(174, 168, 211, 0.3)',
      'rgba(255, 218, 121, 0.3)',
    ];
    const index = fillColors.indexOf(fillColorStr);
    return strokeColors[index];
  };
  
  const removeSelection = () => {
    if (path) {
      path.remove();
    }
  };
  const initTool = () => {
    if (activeTool !== name) {
      tool && tool.remove();
    } else {
      tool = new paper.Tool();
      tool.name = name;
      tool.onMouseDown = e => {
        // 每次开始绘制时生成新的随机颜色
        fillColor = getRandomFillColor();
        strokeColor = getStrokeColorFromFill(fillColor);
        path = new paper.Path({
          strokeColor: strokeColor,
          strokeWidth: 4, // 增加线条宽度，从默认值改为4
          fillColor: fillColor
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
        path.strokeColor = strokeColor; // 使用与填充色匹配的边框颜色
        path.strokeWidth = 4; // 增加线条宽度
        path.fillColor = fillColor; // 使用相同的填充颜色
      };
      tool.onMouseMove = e => {};
      tool.onMouseUp = e => {
        path.add(e.point);
        submitPath(path.clone());
        path.remove();
      };
      tool.activate();
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
      initTool();
      console.log(paper);
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
