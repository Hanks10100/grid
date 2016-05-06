// const React = require('react');
const { computePosition } = require('./utils/layouter');
const { getGridStyle } = require('./utils/parser');

// 简化 createElement 变量名
const h = React.createElement;

function GridLayout(props) {
    const origins = computePosition(props);
    const { wrapperStyle, layoutStyle } = getGridStyle(props, origins);

    return h(
        'div',
        { className: 'grid-wrapper', style: wrapperStyle },
        React.Children.map(props.children, (cell, index) => h(
            'div',
            {
                className: 'grid-cell',
                'data-index': index,
                style: layoutStyle[index]
            },
            cell
        ))
    )
}

// window.GridLayout = GridLayout;
module.exports = GridLayout;
