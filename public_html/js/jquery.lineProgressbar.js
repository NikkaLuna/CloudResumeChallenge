/**
 * jQuery Line Progressbar
 * Author: KingRayhan<rayhan095@gmail.com>
 * Author URL: https://electronthemes.com
 * Version: 1.1.2
 */
;(function($) {
    'use strict';

    $.fn.LineProgressbar = function(options) {
        options = $.extend({
            percentage: 100,
            ShowProgressCount: true,
            duration: 1000,
            unit: '%',
            animation: true,
            // Styling Options
            fillBackgroundColor: '#3498db',
            backgroundColor: '#EEEEEE',
            radius: '0px',
            height: '10px',
            width: '100%'
        }, options);

        // Modify the default text color to white
        if (options.ShowProgressCount) {
            options.percentColor = 'white';
        }

        return this.each(function(index, el) {
            // Markup
            $(el).html('<div class="progressbar"><div class="proggress"></div><div class="percentCount"></div></div>');

            var progressFill = $(el).find('.proggress');
            var progressBar = $(el).find('.progressbar');

            progressFill.css({
                backgroundColor: options.fillBackgroundColor,
                height: options.height,
                borderRadius: options.radius
            });
            progressBar.css({
                width: options.width,
                backgroundColor: options.backgroundColor,
                borderRadius: options.radius
            });

            // Progress with animation
            if (options.animation) {
                progressFill.animate({
                    width: options.percentage + '%'
                }, {
                    step: function(x) {
                        if (options.ShowProgressCount) {
                            $(el).find('.percentCount').text(Math.round(x) + options.unit).css('color', 'white');
                        }
                    },
                    duration: options.duration
                });
            } else {
                // Without animation
                progressFill.css('width', options.percentage + '%');
                if (options.ShowProgressCount) {
                    $(el).find('.percentCount').text(Math.round(options.percentage) + '%').css('color', 'white');
                }
            }
        });
    };
})(jQuery);

$('[line-progressbar]').each(function() {
    var $this = $(this);

    function LineProgressing() {
        $this.LineProgressbar({
            percentage: $this.data('percentage'),
            unit: $this.data('unit'),
            animation: $this.data('animation'),
            ShowProgressCount: $this.data('showcount'),
            duration: $this.data('duration'),
            fillBackgroundColor: $this.data('progress-color'),
            backgroundColor: $this.data('bg-color'),
            radius: $this.data('radius'),
            height: $this.data('height'),
            width: $this.data('width')
        });
    }

    var loadOnce = 0;
    $this.waypoint(function() {
        loadOnce += 1;
        if (loadOnce < 2) {
            LineProgressing();
        }
    }, {
        offset: '80%',
        triggerOnce: true // Changed to 80% from 100% for Waypoints
    });
});
