(function () {
	
	var FadeInOnScroll = function(element, options) {
		this.element = element;
		this.$element = $(element);
		this.options = options;
		this.metadata = {
			duration: this.$element.data("duration"),
			delay: this.$element.data("delay"),
			fromBottom: this.$element.data("from-bottom")
		};
	};

	FadeInOnScroll.prototype = {

		defaults: {
			duration: 500,
			delay: 0,
			fromBottom: 100,
			breakpoints: [{
				screenWidth: 1000,
				delay: 0,
				duration: 500,
				fromBottom: 100
			}]
		},

		_init: function() {
            this.config = $.extend({}, this.defaults, this.options, this.metadata);

			this.$element.css({opacity: "0"});
            var that = this;

            that._onScroll(that);
            $(window).scroll(function(e) { e.preventDefault(); that._onScroll(that); });
		},

		_onScroll: function(that) {

			var settings = _getCurrentSettings(that);

			var fromBottom = that._distanceFromBottom(that.$element);
			if (fromBottom >= settings.fromBottom) {
				setTimeout(function(){
					that.$element.animate({opacity: "1"}, settings.duration);
				}, settings.delay);
			}
		},

		_distanceFromBottom: function($el) {
			var windowHeight = $(window).height();
			var scrollTop = $(window).scrollTop();
			var bottomOfWindowPos = windowHeight + scrollTop;

			var posFromTop = $el.offset().top;

			var posFromBottom = bottomOfWindowPos - posFromTop;
			return posFromBottom;
		},

		_getCurrentSettings: function(that) {
			var settings = that.config;
			var screenWidth = $(window).width();
			var maxWidthSoFar = 0;

			for(var i = 0; i < that.config.breakpoints.length; i++) {
				if (that.config.breakpoints[i].screenWidth > maxWidthSoFar) {
					maxWidthSoFar = that.config.breakpoints[i].screenWidth;
				}

				if (that.config.breakpoints[i].screenWidth > maxWidthSoFar 
					&& that.config.breakpoints[i].screenWidth <= screenWidth) {
					settings = that.config.breakpoints[i];
				}
			}

			return delay;
		}

	};

	FadeInOnScroll.defaults = FadeInOnScroll.prototype.defaults;
	
	$.fn.fadeInOnScroll = function(options) {
    	return this.each(function() {
    		new FadeInOnScroll(this, options)._init();
    	});
    };
}());
