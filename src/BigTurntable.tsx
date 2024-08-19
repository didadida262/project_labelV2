import React, { useState, useRef } from 'react'
import { LuckyWheel, LuckyGrid } from '@lucky-canvas/react'

export default function BigTurntable() {
  const myLucky = useRef() as any
  const [blocks] = useState([
    { padding: '19px', 
      // background: '#869cfa',
      imgs: [
        {
          src: require('./test.png'),
          width: '320px',
          height: '320px',
          top: '-10px'
        }
      ]
  },
  ])
  const [prizes] = useState([
    { background: '#e9e8fe', fonts: [{ text: '0' }] },
    { background: '#b8c5f2', fonts: [{ text: '1' }] },
    { background: '#e9e8fe', fonts: [{ text: '2' }] },
    { background: '#b8c5f2', fonts: [{ text: '3' }] },
    { background: '#e9e8fe', fonts: [{ text: '4' }] },
    { background: '#b8c5f2', fonts: [{ text: '5' }] },
  ])
  const [buttons] = useState([
    { radius: '40%', background: '#617df2' },
    { radius: '35%', background: '#afc8ff' },
    {
      radius: '30%', background: '#869cfa',
      pointer: true,
      fonts: [{ text: '开始', top: '-10px' }]
    }
  ])
  const handleEnd = prize => { // 抽奖结束会触发end回调
    alert('恭喜你抽到 ' + prize.fonts[0].text + ' 号奖品')
  }
  const handleStart = () => { // 点击抽奖按钮会触发star回调
    myLucky.current.play()
    console.log('myLucky>>>', myLucky)
    setTimeout(() => {
      // const index = Math.random() * 6 >> 0
      const index = 1
      myLucky.current.stop(index)
    }, 2500)
  }
  return <div>
    <LuckyWheel
      ref={ myLucky }
      width="300px"
      height="300px"
      blocks={ blocks }
      prizes={ prizes }
      buttons={ buttons }
      onStart={ handleStart }
      onEnd={ handleEnd }
    />
  </div>
}