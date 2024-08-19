
import './index.scss'
import { Button } from 'antd';
import { useState } from 'react';
import PencilComponent from './pencil';
import React from 'react';
// import pencil from "@/assets/icons/pencil.svg"

interface IToolsprops {
  toolsList: Array<any>,
  handleClickTool: any
}

const ToolComponent = (props: IToolsprops) => {
  const { toolsList, handleClickTool } = props
  
  return (
    <div className="tools">
      <PencilComponent toolItem={toolsList[0]} handleClickTool={handleClickTool}/>
    </div>
  )
}

export default ToolComponent