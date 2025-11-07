
import './index.scss'
import { Button } from 'antd';
import { useState } from 'react';
// import pencil from "@/assets/icons/pencil.svg"
import paper from 'paper'
import React from 'react';

interface IToolItemProps {
  toolItem: any,
  handleClickTool: any
}

const PencilComponent = (props: IToolItemProps) => {
  const { toolItem, handleClickTool } = props
  const [pencil, setpencil] = useState(null)
  const createPencile = new paper.Tool()
  const onMouseDown = (e: paper.ToolEvent) => {
    
  }
  const onMouseDrag = (e: paper.ToolEvent) => {
    
  }
  const onMouseMove = (e: paper.ToolEvent) => {
    
  }
  const onMouseUp = (e: paper.ToolEvent) => {
    
  }
  createPencile.onMouseDown = onMouseDown
  createPencile.onMouseDrag = onMouseDrag
  createPencile.onMouseMove = onMouseMove
  createPencile.onMouseUp = onMouseUp
  return (
    <div className="tool-item">
      <Button
        key={toolItem.key} 
        icon={toolItem.icon} 
        style={{width: 80, marginBottom: 10}}
        onClick={() => handleClickTool(toolItem.key)}
      />
    </div>
  )
}

export default PencilComponent