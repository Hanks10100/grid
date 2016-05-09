
// 判断参数是否为数字
function isNumber(n) {
    return Object.prototype.toString.call(n) === '[object Number]';
}

// 根据属性值计算布局样式
function getGridStyle(props, origins) {
    const { unit = 'px', column, width, layout, gap = 0, border } = props;
    const ratio = (width + gap) / column;

    // 计算 Grid 的高度
    const height = origins.pop().y * ratio - gap;

    // 计算外框样式
    const wrapperStyle = {
        position: 'relative',
        width  : `${width}${unit}`,
        height : `${height}${unit}`,
    };

    // 计算布局样式
    const layoutStyle = layout.map((size, index) => {
        const coord = origins[index];

        const boxStyle = {
            position: 'absolute',
            boxSizing: 'border-box',
            top   : coord.y * ratio + unit,
            left  : coord.x * ratio + unit,
            width : size[0] * ratio - gap + unit,
            height: size[1] * ratio - gap + unit,
        }

        // 给网格添加边框
        if (border) {
            const { width, style = 'solid', color = '#000', radius } = border;
            const borderStyle = `${width}${isNumber(width) ? unit : ''} ${style} ${color}`;
            if (width && coord.x > 0) boxStyle.borderLeft = borderStyle;
            if (width && coord.y > 0) boxStyle.borderTop  = borderStyle;
            if (radius) boxStyle.borderRadius = radius;
        }

        return boxStyle;
    });

    return { wrapperStyle, layoutStyle };
}

module.exports = {
    getGridStyle,
}
