/*
 * @Description: 
 * @Author: didadida262
 * @Date: 2024-03-25 15:13:17
 * @LastEditors: didadida262
 * @LastEditTime: 2024-08-19 17:48:15
 */

import { Suspense, lazy } from "react";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

import AuthRoute from "../components/AuthRoute";
import LabelComponent from "../pages/Label";

// 路由懒加载

const router = createBrowserRouter([
  {
    path: "/",
    element: <LabelComponent />
  }
]);
export default router;
