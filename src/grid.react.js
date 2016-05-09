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

const { arrayOf, element, number, oneOfType, shape, string } = React.PropTypes;
GridLayout.propTypes = {
    width: number.isRequired,
    unit: string,
    column: number.isRequired,
    layout: arrayOf(arrayOf(number)).isRequired,
    gap: number,
    border: shape({
        width: oneOfType[string, number],
        style: string,
        color: string,
        radius: string,
    }),
    children: arrayOf(element).isRequired
}

window.GridLayout = GridLayout;
module.exports = GridLayout;
