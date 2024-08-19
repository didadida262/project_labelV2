/*
 * @Description:
 * @Author: didadida262
 * @Date: 2024-07-31 10:32:27
 * @LastEditors: didadida262
 * @LastEditTime: 2024-08-07 10:55:54
 */
import React, { useState, useRef, useEffect } from 'react';

interface IProps {
  uids: Array<number>;
}
export default function TemplateReact(props: IProps) {
  const { uids } = props;
  return (
    <div>
      <span>template!!</span>
    </div>
  );
}
