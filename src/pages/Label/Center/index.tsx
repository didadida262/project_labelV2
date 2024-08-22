/*
 * @Description:
 * @Author: didadida262
 * @Date: 2024-03-21 02:14:12
 * @LastEditors: didadida262
 * @LastEditTime: 2024-08-22 10:56:11
 */
import { Button } from "antd";
import paper from "paper";
import React, { useRef, useEffect } from "react";
import { BsTextCenter } from "react-icons/bs";

import { ButtonCommon, EButtonType } from "@/components/ButtonCommon";

import pattern from "../../../styles/pattern";
import { judeToolExisted } from "../../../utils/paperjsWeapon";

import "./index.scss";

const CenterComponent = props => {
  const name = "center";

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="brush mgb10">
      <ButtonCommon
        className={`w-[80px] ${pattern.flexCenter} `}
        type={EButtonType.SIMPLE}
        onClick={() => {
          console.log(paper);
          const originPoint = paper.project.activeLayer.children[0].position;
          paper.project.view.center = originPoint;
        }}
      >
        <BsTextCenter />
      </ButtonCommon>
    </div>
  );
};

export default CenterComponent;
