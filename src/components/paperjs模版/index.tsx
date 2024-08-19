import React from 'react'
import paper from 'paper'
import { useState, useEffect, useRef } from 'react'
import imgurl from '../../assets/只狼.jpeg'
import './index.scss'

const TadpolesComponent = (props) => {
  const canvasRef = useRef(null) as any
  const initPoint = useRef(new paper.Point(0, 0))

  const onMouseDown = (e) => {
    initPoint.current = e.point
  }
  const onMouseDrag = (e) => {
  }

  const initCanvas = () => {
    paper.setup(canvasRef.current)
  }
  const drawPic = () => {
    const raster = new paper.Raster(imgurl)
    raster.onLoad = () => {
      raster.fitBounds(paper.view.bounds, false)
    }
  }
  useEffect(() => {
  }, [])

  return (
    <div className='TadpolesComponent'>
      paperjs模版
      <canvas ref={ canvasRef } className="main_canvas" />
    </div>
  )
}

export default TadpolesComponent