"use strict";
/**
 * @name: canvas-stars-line 星空特效插件
 * @author: yyg
 * @version 1.0.0
 */
var StarsLine;
(function (StarsLine) {
    StarsLine.yyg_el = null;
    var yyg_cvsWidth = 500;
    var yyg_cvsHeight = 500;
    var yyg_cvsBgColor = '#000';
    var yyg_ballNum = 100;
    var yyg_allowMouse = false;
    var yyg_lineColor = '#1890ff';
    var yyg_lineWidth = 1;
    var yyg_ballSpeed = 1;
    var yyg_ballColor = 'rgba(255, 255, 255, .5)';
    var yyg_isResize = false;
    var yyg_pen = null;
    var yyg_ballArr = [];
    var yyg_flag = false;
    var yyg_MOUSE_POINT = {
        centerPoint: { x: 0, y: 0 },
    };
    /**
      * 自定义配置
      * @param  config  {
      *   cvsWidth: 画布宽
      *   cvsHeight: 画布高
      *   cvsBgColor: 画布背景颜色
      *   ballNum: 星空点数量
      *   allowMouse: 是否允许鼠标交互
      *   lineColor: 连线颜色
      *   lineWidth: 连线宽度
      *   ballSpeed: 星空点移动速度 default: 1
      *   ballColor: 星空点颜色
      *   isResize: 是否自适应
      * }
    */
    function config(options) {
        yyg_cvsWidth = options
            .cvsWidth || 500;
        yyg_cvsHeight = options
            .cvsHeight || 500;
        yyg_cvsBgColor = options.cvsBgColor || '#000';
        yyg_ballNum = options.ballNum || 50;
        yyg_allowMouse = options.allowMouse || false;
        yyg_lineColor = options.lineColor || '#d50';
        yyg_lineWidth = options.lineWidth || 1;
        yyg_ballSpeed = options.ballSpeed || 1;
        yyg_ballColor = options.ballColor || '#fff';
        yyg_isResize = options.isResize || false;
        return StarsLine;
    }
    StarsLine.config = config;
    /**
     * 主渲染函数
     * @param el canvas元素
     */
    function render(el) {
        Init.initCanvas(el);
        yyg_isResize && Init.reseizeCanvas();
        Render.create(yyg_ballNum);
        Render.move();
        return StarsLine;
    }
    StarsLine.render = render;
    var Init;
    (function (Init) {
        function initCanvas(el) {
            StarsLine.yyg_el = Utils.getEle(el);
            yyg_pen = StarsLine.yyg_el.getContext('2d');
            var oBody = Utils.getEle('body');
            Utils.setAttr(StarsLine.yyg_el, {
                width: yyg_cvsWidth,
                height: yyg_cvsHeight,
            });
            Utils.setCss(StarsLine.yyg_el, {
                display: 'block',
                overflow: 'hidden',
                'background-color': yyg_cvsBgColor,
            });
            Utils.setCss(oBody, {
                margin: 0,
                overflow: 'hidden',
            });
        }
        Init.initCanvas = initCanvas;
        function reseizeCanvas() {
            window.addEventListener('resize', function () {
                var _a = Utils.getWinRange(), winWidth = _a.winWidth, winHeight = _a.winHeight;
                yyg_cvsWidth = winWidth;
                yyg_cvsHeight = winHeight;
                Utils.setAttr(StarsLine.yyg_el, {
                    width: winWidth,
                    height: winHeight,
                });
            }, false);
        }
        Init.reseizeCanvas = reseizeCanvas;
    })(Init || (Init = {}));
    var Utils;
    (function (Utils) {
        /**
         * 连线安全距离
         */
        Utils.LINE_MIN_DISTANCE = 90;
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
            return (Math.random() * (max - min) + min);
        }
        Utils.getRandom = getRandom;
        /**
         * 转化弧度
         * @param angle 角度
         */
        function getRadian(angle) {
            return (Math.PI / 180) * angle;
        }
        Utils.getRadian = getRadian;
        /**
         * 获取元素属性值
         * @param ele 元素
         * @param key 属性名
         */
        function getAttr(ele, key) {
            return ele.getAttribute(key);
        }
        Utils.getAttr = getAttr;
    })(Utils || (Utils = {}));
    ;
    var Main;
    (function (Main) {
        /**
         * 星空线
         */
        var Line = /** @class */ (function () {
            function Line(props) {
                this.startPoint = props.startPoint;
                this.endPoint = props.endPoint;
                this.lineColor = props.lineColor || '#1890ff';
                this.lineWidth = props.lineWidth || 1;
                this.opacity = props.opacity || 1;
                this.draw();
            }
            Line.prototype.draw = function () {
                yyg_pen.save();
                yyg_pen.beginPath();
                yyg_pen.moveTo(this.startPoint.x, this.startPoint.y);
                yyg_pen.lineTo(this.endPoint.x, this.endPoint.y);
                yyg_pen.lineCup = 'round';
                yyg_pen.lineWidth = this.lineWidth;
                yyg_pen.strokeStyle = this.lineColor;
                yyg_pen.globalAlpha = Utils.getRandom(this.opacity, 1);
                yyg_pen.stroke();
                yyg_pen.closePath();
                yyg_pen.restore();
            };
            return Line;
        }());
        Main.Line = Line;
        /**
         * 星空点
         */
        var Ball = /** @class */ (function () {
            function Ball(props) {
                this.centerPoint = props.centerPoint || {
                    x: Utils.getRandom(0, yyg_cvsWidth),
                    y: Utils.getRandom(0, yyg_cvsHeight),
                };
                this.radius = props.radius;
                this.color = props.color;
                this.speed = props.speed || 1;
                this.distance = {
                    x: Utils.getRandom(-this.speed, this.speed),
                    y: Utils.getRandom(-this.speed, this.speed),
                };
            }
            Ball.prototype.draw = function () {
                yyg_pen.save();
                yyg_pen.beginPath();
                yyg_pen.fillStyle = this.color;
                yyg_pen.arc(this.centerPoint.x, this.centerPoint.y, this.radius, 0, Utils.getRadian(360));
                yyg_pen.fill();
                yyg_pen.closePath();
                yyg_pen.restore();
            };
            Ball.prototype.move = function () {
                this.centerPoint.x += this.distance.x;
                this.centerPoint.y += this.distance.y;
                // 碰撞检测
                this.distance.x = (this.centerPoint.x > yyg_cvsWidth
                    || this.centerPoint.x < 0)
                    ? -this.distance.x
                    : this.distance.x;
                this.distance.y = (this.centerPoint.y > yyg_cvsHeight
                    || this.centerPoint.y < 0)
                    ? -this.distance.y
                    : this.distance.y;
            };
            // 连线
            Ball.prototype.drawLine = function (outerItem) {
                for (var _i = 0, yyg_ballArr_1 = yyg_ballArr; _i < yyg_ballArr_1.length; _i++) {
                    var innerItem = yyg_ballArr_1[_i];
                    if (outerItem !== innerItem && Math.sqrt(Math.pow((outerItem.centerPoint.x - innerItem.centerPoint.x), 2) + Math.pow((outerItem.centerPoint.y - innerItem.centerPoint.y), 2)) < Utils.LINE_MIN_DISTANCE) {
                        new Line({
                            lineColor: yyg_lineColor,
                            lineWidth: yyg_lineWidth,
                            startPoint: {
                                x: outerItem.centerPoint.x,
                                y: outerItem.centerPoint.y,
                            },
                            endPoint: {
                                x: innerItem.centerPoint.x,
                                y: innerItem.centerPoint.y,
                            },
                            opacity: .5,
                        });
                    }
                }
            };
            return Ball;
        }());
        Main.Ball = Ball;
    })(Main || (Main = {}));
    var Render;
    (function (Render) {
        /**
         * 创建点工厂
         */
        function createBallFactory() {
            var ball = new Main.Ball({
                color: yyg_ballColor,
                radius: Utils.getRandom(1, 3),
                speed: yyg_ballSpeed
            });
            yyg_ballArr.push(ball);
            ball.draw();
        }
        /**
         * 星空点
         * @param num 点数量
         */
        function create(num) {
            for (var i = 0; i < num; i++) {
                createBallFactory();
            }
        }
        Render.create = create;
        /**
         * 星空点移动
         */
        function move() {
            yyg_pen.clearRect(0, 0, yyg_cvsWidth, yyg_cvsHeight);
            // 是否鼠标交互
            yyg_allowMouse && StarsLine.yyg_el
                .addEventListener('mousemove', function (e) {
                yyg_flag = true;
                yyg_MOUSE_POINT.centerPoint.x = e.clientX;
                yyg_MOUSE_POINT.centerPoint.y = e.clientY;
            }, false);
            for (var _i = 0, yyg_ballArr_2 = yyg_ballArr; _i < yyg_ballArr_2.length; _i++) {
                var item = yyg_ballArr_2[_i];
                item.move();
                item.draw();
                item.drawLine(!yyg_flag ? item : yyg_MOUSE_POINT);
            }
            yyg_flag = false;
            window.requestAnimationFrame(move);
        }
        Render.move = move;
    })(Render || (Render = {}));
})(StarsLine || (StarsLine = {}));
StarsLine
    .render('#stars-line')
    .config({
    allowMouse: true,
});
