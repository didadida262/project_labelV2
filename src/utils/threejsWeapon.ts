// 搭配threejs的武器库
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as Three from 'three'
import * as dat from 'dat.gui'

  // 设置轨道,实现鼠标拖动效果
export const setOrbit = (camera, renderer) => {
    const orbit = new OrbitControls(camera, renderer.domElement)
    // 搭配阻尼，效果更佳
    orbit.enableDamping = true
}

// 添加坐标轴
export const setAxes = (scene) => {
    const axesHelper = new Three.AxesHelper(500)
    axesHelper.setColors('red','orange','blue')
    scene.add(axesHelper)
}
// grid
export const setGrid = (scene) => {
    const gridHelper = new Three.GridHelper(50,50)
    scene.add(gridHelper)
}
// 配置gui
export const setGui = (cube) => {
     const gui = new dat.GUI()
     gui.add(cube.position, "x")
       .min(0)
       .max(100)
       .step(1)
       .name('移动x')
       .onChange((val) => {
       })
       .onFinishChange((val) => {
       })
     gui.add(cube.position, "y")
       .min(0)
       .max(100)
       .step(1)
       .name('移动y')
       .onChange((val) => {
       })
       .onFinishChange((val) => {
         // 防抖版本...
       })
     gui.add(cube.position, "z")
       .min(0)
       .max(100)
       .step(1)
       .name('移动z')
       .onChange((val) => {
       })
       .onFinishChange((val) => {
         // 防抖版本...
       })
}



