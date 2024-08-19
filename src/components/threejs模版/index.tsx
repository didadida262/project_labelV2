/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './index.scss'
import * as Three from 'three'
import { setOrbit, setAxes, setGrid, setGui} from '../../utils/threejsWeapon'

const threejsComponent = (props) => {
  const canvasRef = useRef(null) as any
  let container = null as any
  let renderer = null as any
  let camera = null as any
  let scene = null as any
  let cube = null as any
  let width = null as any
  let height = null as any

  const initWorld = () => {
    container = canvasRef.current
    width = container.clientWidth; //窗口宽度
    height = container.clientHeight; //窗口高度
    scene = new Three.Scene()
    const geometry  = new Three.BoxGeometry(10, 10, 10)
    const material = new Three.MeshBasicMaterial( {color: 'red'} ); 
    cube = new Three.Mesh( geometry, material ); 
    cube.position.y = 10
    scene.add(cube)

      // 光源设置
     // 点光
     let point = new Three.PointLight(0xffffff, 0.2)
     point.position.set(2,200,300)
     scene.add(point)
     // 环境光
     let ambient = new Three.AmbientLight(0x444444);
     scene.add(ambient);

    //  相机设置
     let k = width / height; //窗口宽高比
     let s = 20; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //  camera = new Three.OrthographicCamera(-s * k, s * k, s, -s, 1, 800);
    camera = new Three.PerspectiveCamera(45, k, 1, 800);
     camera.position.set(100, 50, 100); //设置相机位置
     camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

     /**
      * 创建渲染器对象
      */
     renderer = new Three.WebGLRenderer();
     renderer.setSize(width, height);//设置渲染区域尺寸
     renderer.setClearColor('black', 1); //设置背景颜色
     container.appendChild(renderer.domElement); //body元素中插入canvas对象
     //执行渲染操作   指定场景、相机作为参数
     renderer.render(scene, camera); 

    

  }
  const animate = () => {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.01
    cube.rotation.y += 0.02
    renderer.render(scene, camera)
  }
  useEffect(() => {
    initWorld()
    setOrbit(camera, renderer)
    setAxes(scene)
    setGrid(scene)
    setGui(cube)

    animate()
  }, [])
  return (
    // <div className='threejsComponent'>
    //   <canvas ref={ canvasRef } className="main_canvas" />
    // </div>
    <div className="threejsComponent">
      <div id="container" ref={ canvasRef } className="container"></div>
    </div>
  )
}

export default threejsComponent