/*
 * @Description: 
 * @Author: didadida262
 * @Date: 2024-03-25 15:13:17
 * @LastEditors: didadida262
 * @LastEditTime: 2025-01-16 22:52:04
 */

import { Suspense, lazy } from "react";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

import ColorProvider from "@/pages/Label/ColorProvider";

import AuthRoute from "../components/AuthRoute";
import LabelComponent from "../pages/Label";

// 路由懒加载

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: (
          <ColorProvider>
            <LabelComponent />
          </ColorProvider>
        )
      }
    ]
  }
]);
export default router;
