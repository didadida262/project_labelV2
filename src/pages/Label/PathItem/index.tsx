/*
 * @Description: 
 * @Author: didadida262
 * @Date: 2024-03-19 12:36:19
 * @LastEditors: didadida262
 * @LastEditTime: 2024-11-13 10:18:55
 */
import React, { useEffect } from "react";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";

import "./index.scss";

const PathItemComponent = (props: any) => {
  const { data } = props;
  const handleClickPathItem = item => {
    item.path.selected = !item.path.selected;
  };
  useEffect(() => {}, [data]);
  return (
    <div className="PathItemComponent pd5">
      {data.map((item, index) => {
        return (
          <div className="w-full mb-[5px] rounded-[0px]" key={index}>
            <ButtonCommon
              type={EButtonType.SIMPLE}
              className="w-full"
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
