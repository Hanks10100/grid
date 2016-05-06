
// 根据属性值计算布局样式
function getGridStyle(props, origins) {
    const { unit = 'px', column, width, layout, gap = 0 } = props;
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

        return {
            position: 'absolute',
            top   : coord.y * ratio + unit,
            left  : coord.x * ratio + unit,
            width : size[0] * ratio - gap + unit,
            height: size[1] * ratio - gap + unit,
        };
    });

    return { wrapperStyle, layoutStyle };
}

module.exports = {
    getGridStyle,
}
