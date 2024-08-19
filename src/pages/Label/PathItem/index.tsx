/*
 * @Description: 
 * @Author: didadida262
 * @Date: 2024-03-19 12:36:19
 * @LastEditors: didadida262
 * @LastEditTime: 2024-07-17 02:28:01
 */
import React, { useEffect } from 'react'

import { ButtonCommon, EButtonType } from '@/components/ButtonCommon'

import './index.scss'

const PathItemComponent = (props: any) => {
    const { data } = props
    const handleClickPathItem = (item) => {
        item.path.selected = !item.path.selected
    }
    useEffect(() => {
    }, [data])
    return (
        <div className='PathItemComponent pd5'>
            { data.map((item, index) => {
                return (
         
                    <ButtonCommon
                        type={EButtonType.SIMPLE}
                        className='w-full mb-[5px] rounded-[0px]'
                        onClick={() => handleClickPathItem(item)}>
                        { item.name }
                    </ButtonCommon>
                )
            })}
        </div>
    )
}
export default PathItemComponent