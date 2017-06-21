$(document).ready(function() {


var breakpoints = [1024, 640];

var autoPaddingObj = function(container, item, mode) {
	this.container = document.getElementsByClassName(container)[0];
	this.item = document.getElementsByClassName(item)[0];
	this.mode = mode;
	var self = this;
	self.setPadding = function() {
		setTimeout(function() {
			e();
		}, 100);
		function e() {
			var padding = self.item.getBoundingClientRect().height;
			if ( mode == 'bottom') {
				self.container.style.paddingBottom = padding + 'px';
			}
			else {
				self.container.style.paddingTop = padding + 'px';
			}
		}	
	}
	self.removePadding = function() {
		setTimeout(function() {
			x();
		}, 100);
		function x() {
			if ( mode == 'bottom') {
				self.container.style.removeProperty('padding-bottom');
			}
			else {
				self.container.style.removeProperty('padding-top');
			}
		}
	}
}

var AutoscaleObj = {
	items: document.getElementsByClassName('autoscale')
}
var headerAutoPaddingObj = new autoPaddingObj('b-top-container', 'b-header', 'top');
var footerAutoPaddingObj = new autoPaddingObj('b-body', 'b-footer', 'bottom');

function topSlide() {
	var slide = $('.b-top-slide');
	slide.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		arrows: false
	})
}

function Autoscale() {
	setTimeout(function() {
		e();
	},200);
	function e() {
		AutoscaleObj.items.rescaleAll();
	}
	
}

function Animation() {
	$('.animated').on('inview', function(event, isInView) {
		if(isInView) {
			$(this).addClass('in');
		}
	})
}

function HeaderAutoPadding() {
	headerAutoPaddingObj.setPadding();
}

function FooterAutoPadding() {
	footerAutoPaddingObj.setPadding();
}

function ProjectsTabs() {
	var container = document.getElementsByClassName('b-projects')[0];
	var items = document.getElementsByClassName('b-projects-tabs__item');
	var activeClass = 'b-projects-tabs__item--active';
	var activeItem = container.getElementsByClassName(activeClass)[0];
	var dropdownItem = container.getElementsByClassName('b-projects-dropdown__button')[0];
	for (var i = 0 ; i < items.length; i++) {
		items[i].onclick = function() {
			activeItem.classList.remove(activeClass);
			activeItem = this;
			activeItem.classList.add(activeClass);
			dropdownItem.firstChild.innerHTML = this.innerHTML;
			return false;
		}
	}
}

var projectDropdown = {
	menu: $('.b-project-tabs'),
	active: false
}

function ProjectsDropdownInit() {
	var menu = $('.b-projects-tabs');
	projectDropdown.active = true;
	var dropdown = new Foundation.DropdownMenu(menu);
}
function ProjectsDropdownDestroy() {
	var menu = $('.b-projects-tabs');
	if (projectDropdown.active) {
		projectDropdown.active = false;
		menu.foundation('destroy');
		var list = $('.b-projects-dropdown');
		list.removeClass('submenu is-dropdown-submenu');
	}
	
}

function countUp() {
	var options = {
		useEasing: true,
		useGrouping: false,
		separator: ',',
		decimal: '.',
		prefix: '',
		suffix: ''
	};
	var clientsSpan = document.getElementsByClassName('b-count-clients')[0];
	var cupsSpan = document.getElementsByClassName('b-count-cups')[0];
	var postsSpan = document.getElementsByClassName('b-count-posts')[0];
	var likesSpan = document.getElementsByClassName('b-count-likes')[0];
	var projectsSpan = document.getElementsByClassName('b-count-projects')[0];

	var clients = new CountUp(clientsSpan, 0, 3587, 0, 4, options);
	var cups = new CountUp(cupsSpan, 0, 207, 0, 15, options);
	var posts = new CountUp(postsSpan, 0, 2500, 0, 4, options);
	var likes = new CountUp(likesSpan, 0, 873, 0, 12, options);
	var projects = new CountUp(projectsSpan, 0, 900, 0, 3, options);
	$('.b-count-item').on('inview', function(event, isInView) {
		if (isInView) {
			clients.start();
			cups.start();
			posts.start();
			likes.start();
			projects.start();
		}
	});
}

function PostsSlide() {
	var slide = $('.b-posts-content');
	var items = document.getElementsByClassName('b-posts-item');
	slide.slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		infinite: false,
		arrows: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	var prev = slide.parent().find(".b-arrow--prev");
	var next = slide.parent().find(".b-arrow--next");
	prev.click(function() {
		slide.slick('slickPrev');
		return false;
	});
	next.click(function() {
		slide.slick('slickNext');
		return false;
	});
}

function fixedHeader() {
	var header = document.getElementsByClassName('b-header')[0];
	window.onscroll = function() {
		var height = header.getBoundingClientRect().height;
		var scrolled = window.pageYOffset;
		if (scrolled > height) {
			header.classList.add('b-header--fixed');
		}
		else if (scrolled == 0)  {
			header.classList.remove('b-header--fixed');
		}
	}
}


	Adaptive ({
		breakpoints: breakpoints,
		'default': [
			topSlide,
			topMenu,
			HeaderAutoPadding,
			FooterAutoPadding,
			Animation,
			ProjectsTabs,
			Video,
			countUp,
			PostsSlide,
			fixedHeader,
			Autoscale
		],
		'mode0': [
			Autoscale,
			FooterAutoPadding
		],
		'mode0once': [
			HeaderAutoPadding,
			ProjectsDropdownDestroy
		],
		'mode1': [
			Autoscale,
			FooterAutoPadding
		],
		'mode1once': [
			ProjectsDropdownDestroy
		],
		'mode2': [
			Autoscale,
			FooterAutoPadding
		],
		'mode2once': [
			HeaderAutoPadding,
			ProjectsDropdownInit
		]
	});
});

