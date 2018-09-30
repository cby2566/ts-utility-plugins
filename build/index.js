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
    function getEle(id) {
        return document.getElementById(id) || null;
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
})(Utils || (Utils = {}));
