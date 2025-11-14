import { message } from "antd";
import cn from "classnames";
import paper from "paper";
import React, { useContext, useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useClickAway } from "react-use";
import { v4 as uuidv4 } from "uuid";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";
import { ColorContext } from "@/pages/Label/ColorProvider";
import Brush from "@/pages/Label/Tool/Brush";
import BrushV2 from "@/pages/Label/Tool/BrushV2";
import pattern from "@/styles/pattern";
import Pencil from "@/pages/Label/Tool/Pencil";
import Rect from "@/pages/Label/Tool/Rect";

import CenterComponent from "./Center";
import DrawComponent from "./Draw";
import PathItem from "./PathItem";
import Pointer from "./Pointer";
import Spray from "./Spray";
import Eraser from "./Tool/Eraser";
// import ToolsComponent from './Tools'

interface PathItem {
  key: string;
  name: string;
  path: paper.Path;
}

const LabelComponent: React.FC = () => {
  const [activeTool, setactiveTool] = useState<string>("pencil");
  const [categories, setcategories] = useState<PathItem[]>([]);
  const [currentPath, setcurrentPath] = useState<paper.Path | null>(null);
  const { color, setColor, resetColorSelection } = useContext(ColorContext);
  const [colorSelector, setcolorSelector] = useState<boolean>(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleClickTool = (tool: string): void => {
    // 如果切换了工具，重置颜色选择状态，使用随机颜色
    if (activeTool !== tool) {
      resetColorSelection();
    }
    setactiveTool(tool);
    message.success(`激活${tool}`);
  };
  const handleExportPicture = (): void => {
    paper.view.element.toBlob(function(blob: Blob | null) {
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = "myImage.png";
      a.click();
      URL.revokeObjectURL(url);
    });
  };
  useClickAway(dropdownRef, (e: MouseEvent) => {
    // 如果點擊事件的目標不在 triggerRef 中，則關閉 dropdown
    if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
      setcolorSelector(false);
    }
  });
  useEffect(
    () => {
      if (!currentPath) return;
      const ID = uuidv4();
      const newPath: PathItem = {
        key: ID,
        name: ID,
        path: currentPath
      };
      setcategories(prevItems => [...prevItems, newPath]);
    },
    [currentPath]
  );
  const submitPath = (data: paper.Path): void => {
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
          <Spray
            activeTool={activeTool}
            onClick={handleClickTool}
            submitPath={submitPath}
          />

          <BrushV2
            activeTool={activeTool}
            onClick={handleClickTool}
            submitPath={submitPath}
          />
          <Eraser
            activeTool={activeTool}
            onClick={handleClickTool}
            submitPath={submitPath}
          />

          <CenterComponent />
        </div>
        <div className={cn("flex flex-col gap-y-2")}>
          <div
            className={cn(
              "w-[100px] text-[12px] h-[36px]",
              "flex justify-center items-center",
              "border-solid border-[1px] border-[#383B45] rounded-[4px]",
              "hover:cursor-pointer select-none"
            )}
            ref={triggerRef}
          >
            <div className="ml-[8px] relative">
              <span onClick={() => setcolorSelector(!colorSelector)}>
                Color Selector
              </span>
              {colorSelector &&
                <div
                  ref={dropdownRef}
                  className="absolute right-[-200px] top-[-200px] z-50"
                >
                  <HexColorPicker color={color} onChange={setColor} />
                </div>}
            </div>
          </div>
          <ButtonCommon
            className="w-[100px] text-[12px]"
            type={EButtonType.SIMPLE}
            onClick={handleExportPicture}
          >
            <span className="ml-[8px]">Export Picture</span>
          </ButtonCommon>
        </div>
      </div>
      {/* <div className="center flex-col justify-center markBorderR"> */}
      <div className={cn("h-full max-w-[calc(100%_-_320px)] flex-1 rounded-[4px] border-[1px] border-solid border-borderSecondColor")}>
        <DrawComponent activeTool={activeTool} />
      </div>
      {/* <div>picturelist</div>
      </div> */}

      <div className={cn("w-[200px] h-full rounded-[4px] border-[1px] border-solid border-borderSecondColor flex flex-col")}>
        <div className="labels-header relative px-4 py-3 border-b border-borderSecondColor">
          <h2 className="labels-title text-lg font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            标签列表
          </h2>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
        </div>
        <div className="flex-1 overflow-y-scroll">
          <PathItem data={categories} />
        </div>
      </div>
    </div>
  );
};

export default LabelComponent;
