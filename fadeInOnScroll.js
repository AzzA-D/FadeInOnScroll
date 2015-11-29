(function () {
	
	var fadeInOnScroll = function(element) {
		this.element = element;
		this.$element = $(element);
		this.options = {
			duration: this.$element.data("duration"),
			delay: this.$element.data("delay"),
			fromBottom: this.$element.data("from-bottom")
		};
	};

	FadeInOnScroll.prototype = {

		defaults: {
			duration: 250,
			delay: 0,
			fromBottom: 100
		},

		_init: function() {
            this.config = $.extend({}, this.defaults, this.options, this.metadata);

            var that = this;

            $(window).scroll(function(e) { e.prevent(); that._onScroll(that); });
		},

		_onScroll: function(that) {
			var fromBottom = that._distanceFromBottom(that.$element);
			if (fromBottom >= that.config.fromBottom) {
				$el.css({opacity: "1"});
			}
		},

		_distanceFromBottom: function($el) {
			var windowHeight = $(window).height();
			var scrollTop = $(window).scrollTop();
			var bottomOfWindowPos = windowHeight + scrollTop;

			var posFromTop = $el.offset().top;

			var posFromBottom = bottomOfWindowPos - posFromTop;
			return posFromBottom;
		}

	};

	FadeInOnScroll.defaults = FadeInOnScroll.prototype.defaults;
	
	$.fn.fadeInOnScroll = function() {
    	return this.each(function() {
    		new FadeInOnScroll(this)._init();
    	});
    };
}());
