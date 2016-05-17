/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _require = __webpack_require__(2);
	
	var computePosition = _require.computePosition;
	
	var _require2 = __webpack_require__(3);
	
	var getGridStyle = _require2.getGridStyle;
	
	// 扩展 jQuery / Zepto 插件
	
	$.fn.extend({
	    wrapGrid: function wrapGrid() {
	        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	        var origins = computePosition(options);
	
	        var _getGridStyle = getGridStyle(options, origins);
	
	        var wrapperStyle = _getGridStyle.wrapperStyle;
	        var layoutStyle = _getGridStyle.layoutStyle;
	
	
	        this.each(function (x, wrapper) {
	            $(wrapper).addClass('grid-wrapper').css(wrapperStyle).children().each(function (index, cell) {
	                $(cell).wrap($('<div class="grid-cell"></div>').attr('data-index', index).css(layoutStyle[index]));
	            });
	        });
	    }
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	// 判断两点是否相等
	function isEqual(pa, pb) {
	    return pa.x === pb.x && pa.y === pb.y;
	}
	
	// 获取由起点和一个向量构成的矩形的顶点坐标
	function getRect(origin, vector) {
	    return [{ x: origin.x, y: origin.y }, { x: origin.x + vector[0], y: origin.y }, { x: origin.x, y: origin.y + vector[1] }, { x: origin.x + vector[0], y: origin.y + vector[1] }];
	}
	
	// 求集合对称差，参考公式：AΔB = (A - B)∪(B - A)
	function xor(A, B) {
	    return [].concat(A.filter(function (a) {
	        return B.every(function (b) {
	            return !isEqual(a, b);
	        });
	    })).concat(B.filter(function (b) {
	        return A.every(function (a) {
	            return !isEqual(a, b);
	        });
	    }));
	}
	
	// 根据边界集合计算下一个起点的坐标
	function getOrigin(boundary) {
	    var x = Number.MAX_VALUE;
	    var y = Number.MAX_VALUE;
	
	    boundary.forEach(function (point) {
	        if (point.y < y) {
	            x = point.x;
	            y = point.y;
	        } else if (point.y === y) {
	            x = point.x < x ? point.x : x;
	        }
	    });
	
	    return { x: x, y: y };
	}
	
	// =========================================================
	//  计算每个图形应该摆放的起始位置
	//  @param column: 网格横向总宽度
	//  @param layout: 由每个图形的宽高构成的数组 [{x:*,y:*},...]
	//  返回值: 每个图形应该摆放的起始位置所构成的数组
	// =========================================================
	function computePosition(_ref) {
	    var column = _ref.column;
	    var layout = _ref.layout;
	
	    // 初始化所有格子的起点记录
	    var record = [{ x: 0, y: 0 }];
	
	    // 初始化起点和底部边界线
	    var origin = { x: 0, y: 0 };
	    var boundary = [origin, { x: column, y: 0 }];
	
	    layout.forEach(function (vector) {
	
	        // 计算新的边界线
	        boundary = xor(boundary, getRect(origin, vector));
	
	        // 计算下一个起点的位置
	        origin = getOrigin(boundary);
	
	        record.push(origin);
	    });
	
	    return record;
	}
	
	module.exports = {
	    computePosition: computePosition
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	// 判断参数是否为数字
	function isNumber(n) {
	    return Object.prototype.toString.call(n) === '[object Number]';
	}
	
	// 根据属性值计算布局样式
	function getGridStyle(props, origins) {
	    var _props$unit = props.unit;
	    var unit = _props$unit === undefined ? 'px' : _props$unit;
	    var column = props.column;
	    var width = props.width;
	    var layout = props.layout;
	    var _props$gap = props.gap;
	    var gap = _props$gap === undefined ? 0 : _props$gap;
	    var border = props.border;
	
	    var ratio = (width + gap) / column;
	
	    // 计算 Grid 的高度
	    var height = origins.pop().y * ratio - gap;
	
	    // 计算外框样式
	    var wrapperStyle = {
	        position: 'relative',
	        width: '' + width + unit,
	        height: '' + height + unit
	    };
	
	    // 计算布局样式
	    var layoutStyle = layout.map(function (size, index) {
	        var coord = origins[index];
	
	        var boxStyle = {
	            position: 'absolute',
	            boxSizing: 'border-box',
	            top: coord.y * ratio + unit,
	            left: coord.x * ratio + unit,
	            width: size[0] * ratio - gap + unit,
	            height: size[1] * ratio - gap + unit
	        };
	
	        // 给网格添加边框
	        if (border) {
	            var _width = border.width;
	            var _border$style = border.style;
	            var style = _border$style === undefined ? 'solid' : _border$style;
	            var _border$color = border.color;
	            var color = _border$color === undefined ? '#000' : _border$color;
	            var radius = border.radius;
	
	            var borderStyle = '' + _width + (isNumber(_width) ? unit : '') + ' ' + style + ' ' + color;
	            if (_width && coord.x > 0) boxStyle.borderLeft = borderStyle;
	            if (_width && coord.y > 0) boxStyle.borderTop = borderStyle;
	            if (radius) boxStyle.borderRadius = radius;
	        }
	
	        return boxStyle;
	    });
	
	    return { wrapperStyle: wrapperStyle, layoutStyle: layoutStyle };
	}
	
	module.exports = {
	    getGridStyle: getGridStyle
	};

/***/ }
/******/ ]);
//# sourceMappingURL=grid.jquery.js.map