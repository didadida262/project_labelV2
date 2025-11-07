/*
 * @Description: 
 * @Author: didadida262
 * @Date: 2024-07-31 10:32:27
 * @LastEditors: didadida262
 * @LastEditTime: 2025-01-16 23:39:27
 */
import { Button } from "antd";
import paper from "paper";
import React, { useRef, useEffect, useContext } from "react";
import { BsPencil } from "react-icons/bs";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import { judeToolExisted } from "@/utils/paperjsWeapon";
import { ColorContext } from "@/pages/Label/ColorProvider";
import pattern from "@/styles/pattern";

import "./index.scss";

const PencilComponent = props => {
  const { activeTool, onClick, submitPath } = props;
  const { color } = useContext(ColorContext);
  const name = "pencil";
  let path = {} as any;
  let tool = null as any;
  
  // 生成随机的半透明颜色
  const getRandomColor = () => {
    const colors = [
      'rgba(255, 107, 107, 0.7)', // 柔和的红色
      'rgba(78, 205, 196, 0.7)',  // 青色
      'rgba(255, 195, 113, 0.7)', // 橙色
      'rgba(132, 129, 255, 0.7)', // 紫色
      'rgba(54, 215, 183, 0.7)',  // 薄荷绿
      'rgba(255, 159, 243, 0.7)', // 粉色
      'rgba(255, 107, 129, 0.7)', // 樱花粉
      'rgba(142, 202, 230, 0.7)', // 天蓝色
      'rgba(174, 168, 211, 0.7)', // 薰衣草紫
      'rgba(255, 218, 121, 0.7)', // 金黄色
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const initTool = () => {
    if (activeTool !== name) {
      tool && tool.remove();
    } else {
      tool = new paper.Tool();
      tool.name = name;
      tool.onMouseDown = e => {
        // 每次开始绘制时生成新的随机颜色
        const randomColor = getRandomColor();
        console.log("3>>>", randomColor);
        path = new paper.Path({
          strokeColor: randomColor,
          strokeWidth: 5
        });
        path.add(e.point);
      };
      tool.onMouseDrag = e => {
        path.add(e.point);
      };
      tool.onMouseMove = e => {};
      tool.onMouseUp = e => {
        console.log("up", e.point);
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
