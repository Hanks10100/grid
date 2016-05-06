const { computePosition } = require('./layouter');

function parseElementParam(element) {
}

function getGridStyle(props) {
    const { unit = 'px', column, width, layouts } = props;
    const ratio = width / column;

    const origins = computePosition(column, layouts);

    // 计算 Grid 的高度
    const height = origins.pop().y * ratio;

    // 计算布局样式
    const layoutStyle = layouts.map((size, index) => {
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

    // 计算外框样式
    const wrapperStyle = {
        position: 'relative',
        boxSizing: 'border-box',
        width  : `${width}${unit}`,
        height : `${height}${unit}`,
    };

    return {
        layoutStyle,
        wrapperStyle
    }
}

module.exports = {
    parseElementParam,
    getGridStyle,
}
