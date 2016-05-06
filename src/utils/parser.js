
// 根据属性值计算布局样式
function getGridStyle(props, origins) {
    const { unit = 'px', column, width, layout } = props;
    const ratio = width / column;

    // 计算 Grid 的高度
    const height = origins.pop().y * ratio;

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
            width : size[0] * ratio + unit,
            height: size[1] * ratio + unit,
        };
    });

    return { wrapperStyle, layoutStyle };
}

module.exports = {
    getGridStyle,
}
