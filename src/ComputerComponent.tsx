import React, { useState, useRef, useEffect } from 'react'
import './style.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './store/mouduls/counterStoreA';
import { fetchData } from './store/mouduls/counterStoreB';

interface IProps {
  uids: Array<number>
}

export default function ComputerComponent(props: IProps) {
  const [show, setshow] = useState(true)
  const { count } = useSelector((state: any) => state.counter)
  const { channelList } = useSelector((state: any) => state.channel)
  const dispatch = useDispatch()
  
  const handleClick = () => {
    setshow(!show)
  }
  useEffect(() => {
      dispatch(fetchData() as any)
  }, [])
  return (<div>
    { show && <div className='test'>我是div</div>}
    <button onClick={handleClick}>toggle</button>
    <div>
    <button onClick={() => {dispatch(decrement(10))}}>-</button>
    {count}
    <button onClick={() => {dispatch(increment(10))}}>+</button>
    {/* <button onClick={() => {fetchData(dispatch)}}>异步修改数据</button> */}
    <ul>
      {channelList.map((item) => <li key={item.id}>{item.name}</li>)}
    </ul>
    </div>
  </div>) 
}