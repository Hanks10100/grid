const { computePosition } = require('./utils/layouter');
const { getGridStyle } = require('./utils/parser');

// 扩展 jQuery / Zepto 插件
$.fn.extend({
    wrapGrid: function(options = {}) {
        const origins = computePosition(options);
        const { wrapperStyle, layoutStyle } = getGridStyle(options, origins);

        this.each((x, wrapper) => {
            $(wrapper).addClass('grid-wrapper')
                .css(wrapperStyle)
                .children()
                .each((index, cell) => {
                    $(cell).wrap(
                        $('<div class="grid-cell"></div>')
                            .attr('data-index', index)
                            .css(layoutStyle[index])
                    );
                });
        });
    }
});
