/**
 * @name: canvas-jumping-characters 
 * @description 字节跳动, 博客背景插件
 * @author: yyg
 * @version 1.0.4
 */


/**
 * @param ele 画布元素
 * @param cvsWidth 画布宽
 * @param cvsHeight 画布高
 * @param cvsBgColor 画布背景
 * @param text   string | string[] 文字
 * @param textColor string | string[] 文字颜色
 * @param textSize 文字大小
 * @param safeDistance 安全距离(移动多远消失)
 * @param initialOpacity 初始透明度
 */


namespace JumpingCharacters {

  export const yyg_settings: IProps.IRenderProps = {
    ele: '',
    cvsWidth: 500,
    cvsHeight: 500,
    cvsBgColor: '#fff',
    text: [
      '富强', '民主', '文明', '和谐',
      '自由', '平等', '公正', '法治',
      '爱国', '敬业', '诚信', '友善',
    ],
    textColor: [
      '#1890ff', '#f5222d', '#fa8c16', '#faad14',
      '#fadb14', '#a0d911', '#52c41a', '#13c2c2',
      '#2f5418', '#722ed1', '#eb2f96', '#fa541c',
    ],
    textSize: 16,
    safeDistance: 20,
    initialOpacity: 1,
  }
  export const mousePoint: {
    x: number,
    y: number,
  } = {
    x: 0,
    y: 0,
  }

  export let yyg_pen: any = null;


  
  export function render(
    _props: IProps.IRenderProps,
  ) {
    _aidedInitSettings(_props);
    _aidedInitJC();

    return JumpingCharacters;
  }


  /**
   * 初始化自定义配置辅助函数
   * @param options 配置项
   */
  function _aidedInitSettings(
    options: any,
  ) {
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        const element = options[key];
        
        key === 'ele'
          ? _aidedInitCvs(element)
          : Reflect.set(yyg_settings, key, element);
      }
    }
  }


  /**
   * 初始化canvas
   * @param ele canvas元素
   */
  function _aidedInitCvs(
    ele: string
  ): void {
    const el = Utils.getEle(ele);

    if (el) {
      if (el.localName === 'canvas') {
        const e = el as HTMLCanvasElement;

        Reflect.set(yyg_settings, 'ele', e);
        yyg_pen = e.getContext('2d');
      } else {
        throw new Error('Please enter the HTMLCanvasElement!');
      }
    } else {
      throw new Error('Please enter an exist HTMLElement!');
    }
  }


  /**
   * 初始化 主类 辅助函数
   */
  function _aidedInitJC() {
    const { ele } = yyg_settings as any;

    ele.addEventListener('click', (e: MouseEvent) => {
      mousePoint.x = e.clientX;
      mousePoint.y = e.clientY;
    }, false);
  }


  namespace IProps {
    export interface IRenderProps {
      ele: string,
      cvsWidth?: number,
      cvsHeight?: number,
      cvsBgColor?: string,
      text?: string[] | string,
      textColor?: string[] | string,
      textSize?: number,
      safeDistance?: number,
      initialOpacity?: number,
    }
  }


  namespace Utils {
    export function getEle(
      el: string,
    ): HTMLElement | null {
      return document.querySelector(el);
    }
  }


  class JC {
    private opacity: number;
    private textSize: number;
    private textColor: string | string[];
    private text: string | string[];
    private safeDistance: number;

    public constructor() {
      const {
        initialOpacity,
        textSize,
        textColor,
        safeDistance,
        text,
      } = yyg_settings as any;

      this.opacity = initialOpacity;
      this.textSize = textSize;
      this.text = text;
      this.textColor = textColor;
      this.safeDistance = safeDistance;
    }
  }

}

const a = JumpingCharacters.render({
  ele: '#jumping-characters',
});

// console.log(a);
