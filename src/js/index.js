
// Webpack imports
// Global var to use it across components
import 'materialize-css/dist/js/materialize.min.js';
import Masonry from 'masonry-layout';
import 'materialize-css/dist/css/materialize.min.css';
import '../scss/styles.scss';

// Class and Function Imports
import Main from './template.main';

// Class intialisation
let main = new Main();
let loaded = false;

// JQuery $(document).ready function 
$(function() {

    //$('.tabs').tabs();
    // var elem = document.querySelector('.tabs');
    // var options = {};
    // var instance = M.Tabs.init(elem, options);

    main.checkForTransparentNavbar().debounce();

    $(document).ready(function () {

        $('.parallax').parallax();
		$('.scrollspy').scrollSpy();
		$(".modal").modal();
		
		//$(".materialboxed").materialbox();
		var elems = document.querySelectorAll(".materialboxed");
		var options = {
			onOpenStart: function(){
				$(".article-section").css({ position: "inherit" });
			},
			onOpenEnd: function(){
				$(".grid-item img").css({ marginTop: "0px", marginLeft: "0px" });
				$(".grid-item--width2 img").css({ marginTop: "0px", marginLeft: "0px" });
				$(".grid-item--width4 img").css({ marginTop: "0px" });
			},
			onCloseEnd: function(){
				$(".article-section").css({ position: "relative" });
			}
		};
    	var instances = M.Materialbox.init(elems, options);

        var sideNav = $('.sidenav').sidenav({"edge": "right"});
        $('#sidenav-close').click(function(){
            $('.sidenav').sidenav('close')
        })
        //$('#sub-nav-aside').css({"opacity":"1.0"});
		//main.checkForSubNavAsidePosition('init');;

		const grid = document.querySelector('.grid');
		if (grid !== null){
			const msnry = new Masonry(grid, {
				// options
				//columnWidth: 192,
				itemSelector: '.grid-item',

				columnWidth: '.grid-sizer',
				//percentPosition: true
			});

			msnry.once('layoutComplete', () => {
				grid.classList.add('load');
				grid.style.visibility = "visible";
			})

			msnry.layout();
		}

		let urlRegExp = new RegExp(/^\/$/);
		let isRootPath = urlRegExp.test(window.location.pathname);
		if(!isRootPath){
			//main.unloadProgressBar(100);
		}else{
			
			if ($(".progress") !== null) {
				$(".progress").css({ "marginTop": (parseInt($(window).height()) / 2 - 20) + "px", "display": "inline-block" });
			}
			
			// Fallback in case load event did not fire, remove progress screen
			// setTimeout(function(){
			// 	if (!loaded) {
			// 		console.log('loaded event noch nicht eingetroffen. Beende progress bar');
			// 		main.unloadProgressBar(1000);
			// 	}
			// },2000);
		}

	});

    $(window).on('scroll', function () {
        main.checkForTransparentNavbar().debounce();
        //main.checkForSubNavAsidePosition('scroll');
    });

    $(window).on('resize', function () {
        //main.checkForSubNavAsidePosition('resize');
	});

	// console.log('jquery is ready');

});

$(window).on('load', function () {
	console.log('loaded');
	loaded = true;
	//main.unloadProgressBar(1000);
});