const { computePosition } = require('./utils/layouter');
const { parseElementParam, getGridStyle } = require('./utils/parser');

// 扩展 jQuery / Zepto 插件
$.fn.extend({
    applyGrid: function(options) {
        // TODO: 添加校验
        options = options || parseElementParam();
        const { wrapperStyle, layoutStyle } = getGridStyle(options);

        this.each((x, wrapper) => {
            $(wrapper)
                .addClass('grid-wrapper')
                .css(wrapperStyle)
                .children().each((index, cell) => {
                    $(cell).wrap(
                        $('<div></div>')
                            .addClass('grid-cell')
                            .attr('cell-index', index)
                            .css(layoutStyle[index])
                    );
                });
        });
    }
});
