/*
 * @Description: 
 * @Author: didadida262
 * @Date: 2024-07-31 10:32:27
 * @LastEditors: didadida262
 * @LastEditTime: 2024-08-19 17:49:18
 */
import paper from "paper";
import React from "react";

import { drawXY, removeLayer } from "./utils/paperjsWeapon";

import "./CanvasComponent.css";

export default class CanvasComponent extends React.Component {
  num: number = 0;
  canvasRef: any;
  project: any;
  tool: any;
  initPoint: any;
  constructor(props: {}) {
    super(props);
    this.canvasRef = React.createRef();
    this.project = null;
    this.tool = null;
  }
  initCanvas = () => {
    console.log("this.canvasRef", this.canvasRef);
    paper.setup(this.canvasRef.current);
    this.project = paper.project;
    this.project.name = "canvas";
    this.project.view.setCenter(0, 0);
    this.tool = new paper.Tool();
    this.tool.onMouseDown = (e: paper.MouseEvent) => {
      this.initPoint = e.point;
      this.onMouseDown(e);
    };
    this.tool.onMouseDrag = (e: paper.MouseEvent) => {
      if (!this.initPoint) return;
      const delta = this.initPoint.subtract(e.point);
      const newCenter = this.project.view.getCenter().add(delta);
      this.project.view.setCenter(newCenter);
      this.onMouseDrag(e);
    };
    this.tool.onMouseMove = (e: paper.MouseEvent) => {
      this.onMouseMove(e);
    };
    this.tool.onMouseUp = (e: paper.MouseEvent) => {
      this.onMouseUp(e);
    };
    console.log("init--this.project", this.project);
    console.log("init--paper", paper);
  };
  onMouseDown(event: paper.MouseEvent): void {
    removeLayer(this.project, "layerXY");
  }
  onMouseUp(event: paper.MouseEvent): void {
    drawXY(this.project);
  }
  onMouseDrag(event: paper.MouseEvent): void {}
  onMouseMove(event: paper.MouseEvent): void {}
  draw() {}
  componentDidMount(): void {
    if (this.num === 1) return;
    console.log("componentDidMount>>>>>>>>>");
    this.initCanvas();
    this.draw();
    drawXY(this.project);
    this.num = 1;
  }
  render() {
    return (
      <div className="canvasContainer">
        <canvas ref={this.canvasRef} className="canvasClass" />
      </div>
    );
  }
}
