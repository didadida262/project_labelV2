/*
 * @Description:
 * @Author: didadida262
 * @Date: 2024-03-14 00:32:06
 * @LastEditors: didadida262
 * @LastEditTime: 2024-10-11 11:17:12
 */
import { message } from "antd";
import paper from "paper";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import pattern from "@/styles/pattern";

import Brush from "./Brush";
import CenterComponent from "./Center";
import DrawComponent from "./Draw";
import PathItem from "./PathItem";
import Pencil from "./Pencil";
import Pointer from "./Pointer";
import Rect from "./Rect";
// import ToolsComponent from './Tools'

const LabelComponent = () => {
  const [activeTool, setactiveTool] = useState("pencil");
  const [categories, setcategories] = useState([]) as any;
  const [currentPath, setcurrentPath] = useState(null) as any;

  const handleClickTool = tool => {
    setactiveTool(tool);
    message.success(`激活${tool}`);
  };
  useEffect(
    () => {
      if (!currentPath) return;
      const ID = uuidv4();
      const newPath = {
        key: ID,
        name: ID,
        path: currentPath
      };
      console.log("新增数据>>>", newPath);
      console.log("paper>>>", paper);
      setcategories(prevItems => [...prevItems, newPath]);
    },
    [currentPath]
  );
  const submitPath = data => {
    setcurrentPath(data);
  };
  return (
    <div
      className={`w-full h-full label px-[10px] py-[10px]  ${pattern.flexbet}`}
    >
      <div
        className={`${pattern.flexBetCol} tools-container h-full w-[100px] `}
      >
        <div>
          <Pointer activeTool={activeTool} onClick={handleClickTool} />
          <Pencil
            activeTool={activeTool}
            onClick={handleClickTool}
            submitPath={submitPath}
          />
          <Rect
            activeTool={activeTool}
            onClick={handleClickTool}
            submitPath={submitPath}
          />
          <Brush
            activeTool={activeTool}
            onClick={handleClickTool}
            submitPath={submitPath}
          />
          <CenterComponent />
        </div>
        <div>
          <ButtonCommon
            className="w-[100px] text-[12px]"
            type={EButtonType.SIMPLE}
            onClick={() => {
              paper.view.element.toBlob(function(blob: any) {
                console.log("blob>>", blob);
                // 将 Blob 对象转换为 URL
                let url = URL.createObjectURL(blob);
                // 创建一个链接并设置下载属性
                let a = document.createElement("a");
                a.href = url;
                a.download = "myImage.png";
                // 模拟点击链接进行下载
                a.click();
                // 释放 URL 对象
                URL.revokeObjectURL(url);
              });
            }}
          >
            <span className="ml-[8px]">Export Picture</span>
          </ButtonCommon>
        </div>
      </div>
      <div className="h-full max-w-[calc(100%_-_320px)] flex-1 rounded-[4px] border-[1px] border-solid border-borderSecondColor ">
        <DrawComponent activeTool={activeTool} />
      </div>
      <div className="w-[200px] h-full rounded-[4px] border-[1px] border-solid border-borderSecondColor ">
        <PathItem data={categories} />
      </div>
    </div>
  );
};

export default LabelComponent;
