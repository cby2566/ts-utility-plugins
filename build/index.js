"use strict";
/**
 * create_time: 18-9-30
 * author: yyg
 */
var Utils;
(function (Utils) {
    /**
     * 获取元素
     * @param id 元素id
     */
    function getEle(sign) {
        return document.querySelector(sign) || null;
    }
    Utils.getEle = getEle;
    /**
     * 获取窗口宽高
     */
    function getWinRange() {
        return {
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
        };
    }
    Utils.getWinRange = getWinRange;
    /**
     * 设置元素属性
     * @param ele 元素
     * @param options 属性配置
     */
    function setAttr(ele, options) {
        for (var key in options) {
            ele.setAttribute(key, options[key]);
        }
        return ele;
    }
    Utils.setAttr = setAttr;
    /**
     * 设置元素样式
     * @param el 元素
     * @param options 属性配置
     */
    function setCss(ele, options) {
        for (var item in options) {
            if (options.hasOwnProperty(item)) {
                ele.style.cssText += item + ": " + options[item] + ";";
            }
        }
        return ele;
    }
    Utils.setCss = setCss;
    /**
     * 取随机值
     * @param min 最小值
     * @param max 最大值
     */
    function getRandom(min, max) {
        return ~~(Math.random() * (max - min) + min);
    }
    Utils.getRandom = getRandom;
})(Utils || (Utils = {}));
;
var InitCanvas;
(function (InitCanvas) {
    function initCanvas() {
        var oBody = Utils.getEle('body');
        var oCanvas = Utils.getEle('#stars-line');
        var _a = Utils.getWinRange(), winHeight = _a.winHeight, winWidth = _a.winWidth;
        var pen = oCanvas && oCanvas.getContext('2d');
        Utils.setAttr(oCanvas, {
            width: winWidth,
            height: winHeight,
        });
        Utils.setCss(oCanvas, {
            display: 'block',
            'background-color': '#000',
        });
        Utils.setCss(oBody, {
            margin: 0,
            overflow: 'hidden',
        });
        return pen;
    }
    InitCanvas.initCanvas = initCanvas;
})(InitCanvas || (InitCanvas = {}));
var pen = InitCanvas.initCanvas();
var StarsLine;
(function (StarsLine) {
    /**
     * 星空线
     */
    var Line = /** @class */ (function () {
        function Line() {
            this.startPoint = {
                x: 0,
                y: 0,
            };
        }
        return Line;
    }());
    StarsLine.Line = Line;
    /**
     * 星空点
     */
    var Ball = /** @class */ (function () {
        function Ball(props) {
            this.centerPoint = props.centerPoint;
            this.radius = props.radius;
            this.color = props.color;
        }
        Ball.prototype.draw = function () {
            pen.save();
            pen.beginPath();
            pen.arc();
            pen.closePath();
            pen.restore();
        };
        return Ball;
    }());
    StarsLine.Ball = Ball;
})(StarsLine || (StarsLine = {}));
