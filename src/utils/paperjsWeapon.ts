// 基于paperjs的游戏引擎0.1版本库

import paper from 'paper';

// tools相关

// 判断当前tool是否已存在

export const judeToolExisted = (paper, name) => {
  const tools: Array<any> = paper.tools;
  const existedCurretnTool = tools.filter((item) => item.name === name)[0];
  if (existedCurretnTool) {
    existedCurretnTool.activate();
    return true;
  }
  return false;
};

// 以左上角为视图原点， 获取试图范围内的随机点
export const randomPoint = (WIDTH, HEIGHT) => {
  return new paper.Point(WIDTH * Math.random(), HEIGHT * Math.random());
};

export const getRandomDirection = (position: paper.Point, range: number) => {
  const newX = position.x - range / 2 + range;
  const newY = position.y - range / 2 + range;
  const newPoint = new paper.Point(newX, newY);
  return newPoint;
};

// 删除指定project的某一层
export const removeLayer = (
  currentProject: paper.Project,
  layerName: String,
) => {
  console.log('removeLayer--currentProject', currentProject);

  let target = currentProject.layers.filter(
    (layer) => layer.name === layerName,
  )[0] as paper.Layer;
  if (target) {
    target.remove();
  }
};
// // 指定项目绘制坐标层次
export const drawXY = (currentProject: paper.Project) => {
  console.log('drawXY>>>');
  if (!currentProject) {
    // throw "project null"
    return;
  }
  const WIDTH = currentProject.view.bounds.width;
  const HEIGHT = currentProject.view.bounds.height;
  currentProject.activate();
  removeLayer(currentProject, 'layerXY');
  const layerXY = new paper.Layer();
  layerXY.name = 'layerXY';
  const currentCenter = currentProject.view.center;
  new paper.Path.Line({
    from: new paper.Point(currentCenter.x - WIDTH / 2, currentCenter.y),
    to: new paper.Point(currentCenter.x + WIDTH / 2, currentCenter.y),
    strokeColor: 'red',
    strokeWidth: getViewBorderSize(currentProject),
  });
  new paper.Path.Line({
    from: new paper.Point(currentCenter.x, currentCenter.y - HEIGHT / 2),
    to: new paper.Point(currentCenter.x, currentCenter.y + HEIGHT / 2),
    strokeColor: 'red',
    strokeWidth: getViewBorderSize(currentProject),
  });
  new paper.PointText({
    point: currentCenter.add(2),
    content: `(${currentCenter.x.toFixed(2)} , ${currentCenter.y.toFixed(2)})`,
    fillColor: 'red',
    justification: 'left',
    fontWeight: 'bold',
    fontSize: getViewFontSize(currentProject),
  });
};
// 获取视图级别的字体大小
export const getViewFontSize = (currentProject: paper.Project) => {
  const ratio = currentProject.view.zoom;
  return 16 / ratio;
};
//     // 获取视图级别的线大小
export const getViewBorderSize = (currentProject: paper.Project) => {
  const ratio = currentProject.view.zoom;
  return 1 / ratio;
};
// // 中心点在坐标原点的圆，给定一个坐标值及radius，返回另一坐标值
// export const getAnotherPoint = (val, radius) => {
//     return Math.sqrt(Math.pow(radius, 2) - Math.pow(Math.abs(val), 2))
//   }

// // 给定圆内任意一点，返回两条以该点原中心点的两条直线数据
// export const getLineData = (point, radius) => {
//     // 通过点坐标的y，获得塬上的两点(-x, y) (x, y)
//     const X = getAnotherPoint(point.y, radius)
//     const Y = getAnotherPoint(point.x, radius)
//     return [
//       // 横轴
//       {
//         one: [-X, point.y],
//         two: [X, point.y]
//       },
//       // 纵轴
//       {
//         one: [point.x, -Y],
//         two: [point.x, Y]
//       }
//     ]
//   }

// export const getMidPoint = (point1, point2) => {
//     const center = point1.add(point2).divide(2)
//     return center
// }
//   // 输出圆弧的两个点
// export const getFlatPoints = (directionAngle, length, radius) => {
//     // 默认为0°
//     const y = length / 2
//     const x = getAnotherPoint(y, radius)
//     const leftPoint = new paper.Point(x, y)
//     const rightPoint = new paper.Point(x, -y)
//     return [leftPoint.rotate(-directionAngle,new paper.Point(0, 0)), rightPoint.rotate(-directionAngle,new paper.Point(0, 0))]
// }

// // 输出凹槽所需的三个点信息
// export const getNotchPoints = (directionAngle, grooveLength, grooveAngle, radius) => {
//     const grooveWidth = grooveLength * Math.sin(grooveAngle / 2 / 180 * Math.PI)
//     const grooveHeight = grooveLength * Math.cos(grooveAngle / 2 / 180 * Math.PI)
//     // 默认为0°
//     const y = grooveWidth
//     const x = getAnotherPoint(y, radius)
//     const leftPoint = new paper.Point(x, y)
//     const rightPoint = new paper.Point(x, -y)
//     const center = getMidPoint(leftPoint, rightPoint)
//     const mid = center.normalize().multiply(center.length - grooveHeight)
//     return [leftPoint.rotate(-directionAngle,new paper.Point(0, 0)),mid.rotate(-directionAngle,new paper.Point(0, 0)), rightPoint.rotate(-directionAngle,new paper.Point(0, 0))]
//   }

// // 在目标层上绘制带平边的弧，若该层已有path，取两者交集,即：取交集合并式绘制
// export const drawFlat = (currentProject, layerName, directionAngle, length, radius) =>  {
//     currentProject.activate()
//     let layerArc = currentProject.layers[layerName]
//     let existedPath = layerArc.children[0]
//     const flatPoints = getFlatPoints(directionAngle, length, radius)
//     const through = flatPoints[0].rotate(180, 0)
//     const newPath = new paper.Path.Arc({
//       from: flatPoints[0],
//       through: through,
//       to: flatPoints[1],
//       strokeColor: '#FFDE2C',
//       closed: true,
//       strokeWidth: 1
//     })
//     if (existedPath) {
//       const resPath = newPath.intersect(existedPath)
//       resPath.selected = true
//       existedPath.remove()
//       newPath.remove()
//     } else {
//       const resPath = newPath.clone()
//       resPath.selected = true
//       newPath.remove()
//     }
//   }

// // 在目标层上绘制带凹槽的弧，若该层已有path，取两者交集,即：取交集合并式绘制
// export const drawNotch = (currentProject, layerName, directionAngle, grooveLength, grooveAngle, radius) =>  {
//     currentProject.activate()
//     let layerArc = currentProject.layers[layerName]
//     let existedPath = layerArc.children[0]
//     const notchPoints = getNotchPoints(directionAngle, grooveLength, grooveAngle, radius)

//     const through = notchPoints[0].rotate(180, 0)
//     const currentPath = new paper.Path.Arc({
//       from: notchPoints[0],
//       through: through,
//       to: notchPoints[2],
//       strokeColor: '#FFDE2C',
//       closed: false,
//       strokeWidth: 1
//     })
//     currentPath.add(notchPoints[1])
//     currentPath.closed = true
//     if (existedPath) {
//       const resPath = currentPath.intersect(existedPath)
//       resPath.selected = true
//       existedPath.remove()
//       currentPath.remove()
//     } else {
//       const resPath = currentPath.clone()
//       resPath.selected = true
//       currentPath.remove()
//     }
//   }

// // 获取当前视图的随机点
// export const getRandomPoint = (currentProject) => {
//   const bounds = currentProject.view.bounds
//   const WIDTH = bounds.width
//   const HEIGHT = bounds.height
//   const topLeft = bounds.topLeft
//   const stepPoint = new paper.Point(Math.random() * WIDTH, Math.random() * HEIGHT)
//   return topLeft.add(stepPoint)
// }

// // 测试功能函数
// export const testPaper = (currentProject) => {
//   currentProject.activate()
//   const c1 = new paper.Path.Circle({
//     center: new paper.Point(-100, 0),
//     radius: 110,
//     fillColor: 'green'
//   })
//   const c2 = new paper.Path.Circle({
//     center: new paper.Point(100, 0),
//     radius: 110,
//     fillColor: 'red'
//   })
//   const res = c1.intersect(c2)
//   res.selected = true
//   c1.remove()
//   c2.remove()
// }

export const showPoint = (point, color) => {
  const p = new paper.Path.Circle({
    center: point,
    radius: 8,
    fillColor: color,
  });
};
