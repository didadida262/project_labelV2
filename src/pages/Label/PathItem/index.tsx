/*
 * @Description: 
 * @Author: didadida262
 * @Date: 2024-03-19 12:36:19
 * @LastEditors: didadida262
 * @LastEditTime: 2024-11-13 10:18:55
 */
import paper from "paper";
import React, { useEffect, useState } from "react";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";

import "./index.scss";

interface PathItem {
  key: string;
  name: string;
  path: paper.Path;
}

interface PathItemComponentProps {
  data: PathItem[];
}

const PathItemComponent: React.FC<PathItemComponentProps> = (props) => {
  const { data } = props;
  // 跟踪哪些标签被选中
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  const handleClickPathItem = (item: PathItem) => {
    // 切换path的selected状态
    item.path.selected = !item.path.selected;
    
    // 更新选中状态
    setSelectedKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(item.key)) {
        newSet.delete(item.key);
      } else {
        newSet.add(item.key);
      }
      return newSet;
    });

    // 触发Paper.js视图更新，使选中效果可见
    if (paper.project && paper.project.view) {
      paper.project.view.update();
    }
  };

  // 当data变化时，同步selectedKeys（移除不存在的item）
  useEffect(() => {
    const currentKeys = new Set(data.map(item => item.key));
    setSelectedKeys(prev => {
      const newSet = new Set<string>();
      prev.forEach(key => {
        if (currentKeys.has(key)) {
          newSet.add(key);
        }
      });
      return newSet;
    });
  }, [data]);

  return (
    <div className="PathItemComponent pd5">
      {data.map((item: PathItem, index: number) => {
        const isSelected = selectedKeys.has(item.key);
        return (
          <div className="w-full mb-[5px] rounded-[0px]" key={item.key}>
            <ButtonCommon
              type={EButtonType.SIMPLE}
              className={isSelected ? "w-full path-item-selected" : "w-full"}
              onClick={() => handleClickPathItem(item)}
            >
              {/* {"标注数据：" + item.name.slice(0, 10) + "..."} */}
              {"标注数据：" + (index + 1)}
            </ButtonCommon>
          </div>
        );
      })}
    </div>
  );
};
export default PathItemComponent;
