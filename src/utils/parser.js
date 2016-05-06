
function getGridStyle(props, origins) {
    const { unit = 'px', column, width, layout } = props;
    const ratio = width / column;

    // 计算 Grid 的高度
    const height = origins.pop().y * ratio;

    // 计算外框样式
    const wrapperStyle = {
        position: 'relative',
        boxSizing: 'border-box',
        width  : `${width}${unit}`,
        height : `${height}${unit}`,
    };

    // 计算布局样式
    const layoutStyle = layout.map((size, index) => {
        const coord = origins[index];

        const style = {
            position: 'absolute',
            boxSizing: 'border-box',
            top   : coord.y * ratio + unit,
            left  : coord.x * ratio + unit,
            width : size[0] * ratio + unit,
            height: size[1] * ratio + unit,
        };

        return style;
    });

    return { wrapperStyle, layoutStyle }
}

module.exports = {
    getGridStyle,
}
