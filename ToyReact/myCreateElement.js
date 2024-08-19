/*
 * @Description: 
 * @Author: didadida262
 * @Date: 2024-04-23 23:13:07
 * @LastEditors: didadida262
 * @LastEditTime: 2024-05-14 15:40:48
 */

const createTextNode = (child) => {
  return {
    type: 'text',
    props: {
      nodeValue: child,
      children: []
    }
  }
}
const myCreateElement = (type, props, ...children) => {
    return {
      type: type,
      props: {
        ...props,
        children: children.map((child) => typeof child === 'object'? child: createTextNode(child))
      },
    }
  }

