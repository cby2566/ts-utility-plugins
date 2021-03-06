/**
 * @name: business-carousel
 * @description 业务轮播插件
 * @author: yyg
 * @constant 最近修改于 2019/4/28
 */

import Scroll from './carousel-scroll/carouselScroll';
import Fade from './carousel-fade/carouselFade';


export interface IConfigProps {
  container?: string,
  dataSource?: {
    text: string,
    img: {
      url: string,
      target: string,
    },
  }[];
  autoPlay?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
  easing?: string;
  effect?: string;
  vertical?: boolean;
  duringTime?: number;
  delayTime?: number;
  isHoverPause?: boolean;
  beforeChange?: () => void;
  afterChange?: () => void;
}

export default class Carousel {
  public constructor(
    config: IConfigProps,
  ) {
    this.__init(config);
  }

  private __init(
    config: IConfigProps,
  ): void {
    this.__initWhichEffect(config);
  }

  private __initWhichEffect(
    config: IConfigProps,
  ): void {
    switch (config.effect) {
      case 'scroll': {
        new Scroll(config);
        return;
      }
      case 'fade': {
        new Fade(config);
        return;
      }
      default: {
        new Scroll(config);
        return;
      }
    }
  }
}