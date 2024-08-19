/*
 * @lastTime: 2021-03-05 15:29:11
 * @Description: 同步hooks
 */

import { useEffect, useState, useCallback } from 'react'

const useSyncCallback = callback => {
    const [proxyState, setProxyState] = useState({ current: false })

    const Func = useCallback(() => {
        // console.log('start')
        setProxyState({ current: true })
    }, [proxyState])

    useEffect(() => {
        // console.warn(1)
        // console.warn('proxyState>>1', proxyState)
        if (proxyState.current === true) setProxyState({ current: false })
    }, [proxyState])

    useEffect(() => {
        // console.warn(2)
        // console.warn('proxyState>>2', proxyState)
        proxyState.current && callback()
    })

    return Func
}

export default useSyncCallback
/*
 * @lastTime: 2021-02-26 15:29:11
 * @param: callback为回调函数
 * @Description: 用法 const newFunc = useSyncCallback(yourCallback)
 */