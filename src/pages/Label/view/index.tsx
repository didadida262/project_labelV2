import { useEffect, useRef, useState } from 'react'
import useSyncCallback from './test'
import './index.scss'
import paper from 'paper'
import imgUrl from '../../../assets/test.webp'
import React from 'react'

const ViewComponent = () => {
  const [initPoint, setinitPoint] = useState({}) as any
  const [curPoint, setcurPoint] = useState({}) as any
  const canvasRef = useRef(null) as any
  useEffect(() => {
    init()
    drawPic()
  }, [])
  useEffect(() => {
    // console.log('useEffectinitPoint>>', initPoint)
  }, [initPoint])
  const drawPic = () => {
    const raster = new paper.Raster(imgUrl)
    raster.onLoad = () => {
      raster.fitBounds(paper.view.bounds, true)
    }
  }
  const onMouseDown = (e) => {
    console.log('tool--down')
    setinitPoint(e.point)
  }
  const onMouseDrag = useSyncCallback(() => {
    console.log('tool--drag')
    const delta = initPoint.subtract(curPoint)
    paper.projects.forEach((pro: any) => {
      const newCenter = pro.view.center.add(delta)
      pro.view.setCenter(newCenter)
    })
  })
  const onMouseMove = (e) => {
    
  }
  const onMouseUp = (e) => {
    
  }
  // 初始化画布，并确认相关参数初始值
  const init = () => {
    paper.setup(canvasRef.current)
    const project = paper.project as any
    project.name = 'test'
    project.view.setCenter(0, 0)
    project.view.onMouseDown = onMouseDown
    project.view.onMouseDrag = (e) => {
      setcurPoint(e.point)
      onMouseDrag()
    }
    project.view.onMouseMove = onMouseMove
    project.view.onMouseUp = onMouseUp
    console.log('paper>>>',paper)
  }
  return (
    <div className="view">
      <canvas ref={ canvasRef } className="main_canvas" />
    </div>
  )
}

export default ViewComponent