"use strict";
/**
 * @name: canvas-jumping-characters
 * @description 字节跳动, 可用作博客背景
 * @author: yyg
 * @version 1.0.3
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
var JumpingCharacters;
(function (JumpingCharacters) {
    JumpingCharacters.yyg_settings = {
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
    };
    JumpingCharacters.yyg_pen = null;
    function render(_props) {
        _aidedInitSettings(_props);
        return JumpingCharacters;
    }
    JumpingCharacters.render = render;
    /**
     * 初始化自定义配置辅助函数
     * @param options 配置项
     */
    function _aidedInitSettings(options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                var element = options[key];
                key === 'ele'
                    ? _aidedInitCvs(element)
                    : Reflect.set(JumpingCharacters.yyg_settings, key, element);
            }
        }
    }
    /**
     * 初始化canvas
     * @param ele canvas元素
     */
    function _aidedInitCvs(ele) {
        var el = Utils.getEle(ele);
        if (el) {
            if (el.localName === 'canvas') {
                var e = el;
                Reflect.set(JumpingCharacters.yyg_settings, 'ele', e);
                JumpingCharacters.yyg_pen = e.getContext('2d');
            }
            else {
                throw new Error('Please enter the HTMLCanvasElement!');
            }
        }
        else {
            throw new Error('Please enter an exist HTMLElement!');
        }
    }
    var Utils;
    (function (Utils) {
        function getEle(el) {
            return document.querySelector(el);
        }
        Utils.getEle = getEle;
    })(Utils || (Utils = {}));
})(JumpingCharacters || (JumpingCharacters = {}));
var a = JumpingCharacters.render({
    ele: '#jumping-characters',
});
