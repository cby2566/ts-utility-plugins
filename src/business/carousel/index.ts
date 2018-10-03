/**
 * @name: business-carousel 业务轮播
 * @author: yyg
 * @version 1.0.0
 */


/**
 * width: 宽
 * height: 高
 * dataSource: 数据
 * afterChange: 切换后的回调
 * beforeChange: 切换前的回调
 * autoPlay: 是否自动切换
 * showDots: 是否显示导航点
 * showArrows: 是否显示箭头
 * easing: 动画效果
 * effect: 切换效果 fade | scroll
 * vertical: 垂直显示
 * duringTime: 间隔时间
 */

namespace Carousel {


  export let yyg_el: HTMLElement | null = null;


  const yyg_settings = {
    width: 0,
    height: 0,
    dataSource: [],
    autoPlay: false,
    showDots: false,
    showArrows: false,
    easing: 'linear',
    effect: 'scroll',
    vertical: false,
    duringTime: 3,
  }


  export namespace IProps {

    export interface IConfigProps {
      dataSource: { text: string, url: string }[];
      width?: number;
      height?: number;
      autoPlay?: boolean;
      showDots?: boolean;
      showArrows?: boolean;
      easing?: string;
      effect?: string;
      vertical?: boolean;
      duringTime?: number;
      beforeChange?: () => void;
      afterChange?: () => void;
    }

    export interface IMainFadeProps {}
  }


  export function config(
    options: IProps.IConfigProps,
  ): any {
    Init.initSettings(options);

    return Carousel;
  }


  export function render(el: string): void {
    Init.initEl(el);
    Init.initWhichEffect();
  }


  namespace Init {
    export function initSettings(
      options: any
    ) {
      for (const key in options) {
        if (options.hasOwnProperty(key)) {
          const element = options[key];
          
          Reflect.set(yyg_settings, key, element);
        }
      }
    }

    export function initEl(el: string) {
      if(Utils.getEle(el)) {
        yyg_el = Utils.getEle(el);
      }else {
        throw new Error('el不存在, 请输入其他的!');
      }
    }

    // 调用轮播图
    export function initWhichEffect(): void {
      new Main.Fade({});
    }
  }


  namespace Utils {
  
    /**
     * 获取元素
     * @param id 元素id
     */
    export function getEle(
      sign: string,
    ): HTMLElement | null {
      return document.querySelector(sign) || null;
    }
  
  
    /**
     * 设置元素属性
     * @param ele 元素
     * @param options 属性配置
     */
    export function setAttr(
      ele: HTMLElement,
      options: any,
    ): any {

      for (const key in options) {
        ele.setAttribute(key, options[key]);
      }
  
      return Utils;
    }
  
  
    /**
     * 设置元素样式
     * @param el 元素
     * @param options 属性配置
     */
    export function setCss(
      ele: HTMLElement,
      options: any,
    ): any {
      for (const item in options) {
        if (options.hasOwnProperty(item)) {
          ele.style.cssText += `${item}: ${options[item]};`;
        }
      }
  
      return Utils;
    }
  
  
    /**
     * 取随机值
     * @param min 最小值
     * @param max 最大值
     */
    export function getRandom(
      min: number,
      max: number,
    ): number {
      return (Math.random() * (max - min) + min);
    }
  
  
    /**
     * 转化弧度
     * @param angle 角度
     */
    export function getRadian(
      angle: number
    ): number {
      return (Math.PI / 180) * angle;
    }
  
  
    /**
     * 获取元素属性值
     * @param ele 元素
     * @param key 属性名
     */
    export function getAttr(
      ele: HTMLElement,
      key: string,
    ): string | null {
      return ele.getAttribute(key);
    }


    /**
     * 添加类名
     * @param el 元素
     * @param className 类名
     */
    export function addClass(
      el: HTMLElement,
      className: string,
    ): any {
      el.classList.add(className);

      return Utils;
    }


    /**
     * 移除类名
     * @param el 元素
     * @param className 类名
     */
    export function removeClass(
      el: HTMLElement,
      className: string,
    ): any {
      el.classList.remove(className);

      return Utils;
    }
  
  };
  

  namespace Main {

    export class Fade {

      public constructor(
        _props: IProps.IMainFadeProps,
      ) {
        this.initDOM();
      }
      
      public initDOM(): void {
        if(yyg_el) {
          yyg_el.innerHTML = this.createDOMTree();
          this.createStyle();
        }
      }

      public createDOMTree(): string {
        const dataSource: any[] = yyg_settings.dataSource;
        const { showArrows, showDots } = yyg_settings;
        let dotsSpan: string = '';
        let contentLi: string = '';

        dataSource.forEach((item: any) => {
          dotsSpan += `<span class="yyg-dot-item"></span>`;
          contentLi += `
            <li class="yyg-content-item">
              ${
                item.url
                  ? `<img src=${item.url} alt="图片提示" />`
                  : item.text
              }
            </li>
          `;
        });

        const final: string = `
          <div class="yyg-carousel-container">
            <div class="yyg-carousel-main">
              <div class="yyg-content-wrapper">
                <ul class="yyg-content-list">${contentLi}</ul>
              </div>
              ${
                showArrows
                  ? `
                    <div class="yyg-arrow-wrapper yyg-arrow-prev-wrapper">
                      <i class="yyg-arrow yyg-arrow-prev">&lt;</i>
                    </div>
                    <div class="yyg-arrow-wrapper yyg-arrow-next-wrapper">
                      <i class="yyg-arrow yyg-arrow-next">&gt;</i>
                    </div>
                  `
                  : ''
                }
              ${
                showDots
                  ? `<div class="yyg-dots-wrapper">${dotsSpan}</div>`
                  : ''
              }
            </div>
          </div>
        `;

        return final;
      }

      public createStyle(): void {
        let oStyle: HTMLElement | null = Utils
          .getEle('style');
        const { dataSource } = yyg_settings;

        // style标签不存在
        if(!oStyle) {
          oStyle = document.createElement('style');
          const oHead = Utils
            .getEle('head') as HTMLHeadElement;
            
          oHead.appendChild(oStyle);
        }

        oStyle.innerText += `
          .yyg-carousel-container {
            box-sizing: border-box;
            height: 100%;
            padding: 10px;
            border: 5px solid #1890ff;
            border-radius: 20px;
          }
          .yyg-carousel-main {
            position: relative;
            height: 100%;
          }
          .yyg-arrow-wrapper {
            position: absolute;
            z-index: 999;
            top: 50%;
            width: 30px;
            heigth: 45px;
            border-top-right-radius: 15px;
            border-bottom-right-radius: 15px;
            background-clip: padding-box;
            background-color: rgba(0,0,0,.5);
            color: #fff;
            line-height: 45px;
            font-size: 24px;
            text-align: center;
            cursor: pointer;
            user-select: none;
            transform: translateY(-50%);
          }
          .yyg-arrow-prev-wrapper {
            left: 0;
          }
          .yyg-arrow-next-wrapper {
            right: 0;
          }
          .yyg-content-wrapper {
            overflow: hidden;
            height: 100%;
          }
          .yyg-content-list {
            width: ${dataSource.length * 100}%;
            height: 100%;
          }
          .yyg-content-item {
            float: left;
            width: ${100 / dataSource.length}%;
            height: 100%;
            text-align: center;
          }
          .yyg-dots-wrapper {
            position: absolute;
            left: 50%;
            bottom: 10px;
            padding: 2px 0;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: rgba(0,0,0,.5);
            font-size: 0;
            transform: translateX(-50%);
          }
          .yyg-dot-item {
            display: inline-block;
            margin-left: 5px;
            width: 12px;
            height: 12px;
            background-color: #fff;
            border-radius: 50%;
          }
          .yyg-dot-item:last-child {
            margin-right: 5px;
          }
        `;
      }

    }

  }

}


Carousel.config({
  dataSource: [{
    text: 'Slide One',
    url: '',
  }, {
    text: 'Slide Two',
    url: '',
  }, {
    text: 'Slide Three',
    url: '',
  }, {
    text: 'Slide Four',
    url: '',
  }],
  showArrows: true,
  showDots: true,
}).render('#app');

  