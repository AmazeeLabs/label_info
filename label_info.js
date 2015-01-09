(function($) {

  /**
   * Custom QTip configuration for label info (info eyes).
   * The tooltip information is stored in Drupal.settings.
   */
  Drupal.behaviors.labelInfoQtip = {
    attach: function(context, settings) {
      $('.label-info', context).once(function(){
        $this = $(this);
        // todo (alex): this condition is a quick-fix for FC-492. Probably, this
        // needs more deep investigation.
        if ($this.data('label-info') && typeof(Drupal.settings.label_info[$this.data('label-info')]) == 'string') {
          $this.qtip({
            content: Drupal.settings.label_info[$this.data('label-info')],
            position: {
              my: 'bottom center',
              at: 'top center'
            },
            style: {
              classes: 'ui-tooltip-dark'
            },
            hide: {
              delay: 1000,
              fixed: true
            },
            show: {
              solo: true
            },
            events: {
              show: function(event, api) {
                if ($('html').hasClass('lt-ie9')) {
                  var tooltip = api.elements.tooltip;
                  setTimeout(function(){
                    $(tooltip).css('top', (parseInt($(tooltip).css('top').replace('px', '')) + $('html').scrollTop() + 'px'));
                  }, 0);
                }
              }
            }
          });
        }

        // Prevent scroll on click
        $this.click(function(){ return false; });
      });
    }
  };

})(jQuery);
