/*
 * @Description:
 * @Author: didadida262
 * @Date: 2024-07-24 17:33:04
 * @LastEditors: didadida262
 * @LastEditTime: 2024-08-02 10:57:36
 */
import cn from 'classnames';
import Lottie from 'lottie-react';
import { useInView } from 'react-intersection-observer';

interface IUseLottieInViewProps {
  animationData: unknown;
  className?: string;
  inViewCheck?: boolean;
}
export function LottieInView(props: IUseLottieInViewProps) {
  const { animationData, className, inViewCheck = true } = props;
  const { ref: containerRef, inView: containerInView } = useInView();
  if (inViewCheck) {
    return (
      <div className={cn(className)} ref={containerRef}>
        {containerInView && (
          <Lottie animationData={animationData} autoplay={true} loop={false} />
        )}
      </div>
    );
  }
  return <Lottie animationData={animationData} autoplay={true} loop={false} />;
}
