/*
 *  Class Main
 */

export
    default class Main {

    constructor() {
        this.transparent = true;
        this.subNavPosTmp = 0;
    }

    checkForTransparentNavbar() {
        return {
            debounce: this.debounce(function () {
                if ($(document).scrollTop() > 300) {
                    if (this.transparent) {
                        this.transparent = false;
                        $('nav[role="navigation"]').removeClass('navbar-transparent');
                    }
                } else {
                    if (!this.transparent) {
                        this.transparent = true;
                        $('nav[role="navigation"]').addClass('navbar-transparent');
                    }
                }
            }, 17).bind(this)
        }
    }

    debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
	};
	
	// ...
	unloadProgressBar(time) {
		$(".loader-layover").addClass('gone-'+time);
		setTimeout(function(){
			$(".loader-layover").css({"display":"none"})
		}, time+200);
	}

    // not in use currently
    checkForSubNavAsidePosition(callTransitionType) {

        if ($('#sub-nav-aside').length > 0) {
            
            var scrollDocumentPos = $(document).scrollTop();

            var subNavPos = $('#sub-nav-aside').offset();
            var subNavWidth = $('#sub-nav-aside').css('width');

            if (callTransitionType === 'init') {
                navBarHeight = '80px';
            } else {
                var navBarHeight = $('.navbar').css('height');
            }

            var topScrollLimit = Math.round(subNavPos.top) - parseInt(navBarHeight);
            var columnWidth = (parseInt($('#sub-nav-aside').parent().css('width')) - 25) + "px";

            if ($('#sub-nav-aside').css('borderBottomStyle') === 'solid') {

                // Fix the position of the sub nav if it passes a certain position to remain in the viewport
                if (Math.round(scrollDocumentPos) > topScrollLimit) {

                    // Remember the original sub nav position
                    if (this.subNavPosTmp <= 0) {
                        this.subNavPosTmp = topScrollLimit;
                    }

                    var staticPosition = parseInt(navBarHeight) + 'px';
                    $('#sub-nav-aside').css({ "position": "fixed", "top": staticPosition, "width": columnWidth });

                    // Release the fixed position to switch back to the document position
                } else if (this.subNavPosTmp >= topScrollLimit) {

                    this.subNavPosTmp = 0;
                    $('#sub-nav-aside').css({ "position": "relative", "top": "0px", "width": "auto" });

                }

            } else {
                $('#sub-nav-aside').css({ "position": "relative", "top": "0px", "width": "auto" })
            }

        }

    }

}