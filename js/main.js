
window.onload = function(e) {

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.scrollTo(0,0);
if ($(".tokenomics_digits").length) {
	
	setTimeout(function(){
		$("#logo img").removeClass("flow");
		$(".welcome_bot_r_bg, .welcome_top_left_bg").addClass("reveal");
	}, 100);
	setTimeout(function(){
		$("#logo img").removeClass("big");
	}, 1000);
	setTimeout(function(){
		$("#topmenu, #top_btn, #burger").addClass("reveal");
	}, 1600);
	setTimeout(function(){
		$(".welcomepics span,#welcome h1,body").addClass("reveal");
		$(".welcome_bot_r_bg, .welcome_top_left_bg").addClass("move");
	}, 2200);
	
	setTimeout(function(){
		$(".welcomepics img,.welcomepics a,.welcomepics .circle,#welcome .afttl, #welcome .btn_wrap, #scrolldown, #welcome  .smallsocial").addClass("reveal");
		
		 $("#typing").typer({
            strings: [
				"Governance OSHI Token",
                "Entertainment Platform",
                "Blockchain game studio",
                "Comics"
            ]
        });
	}, 2800);
	
	setTimeout(function(){
		$("body").removeClass("start");
		$(".section:not(#welcome), .productslist_wrap").css("visibility","visible");
	}, 3200);
	
	setTimeout(function(){
		if (location.href.indexOf("#") != -1) {
			$('html, body').stop().animate({ scrollTop: $(location.hash).offset().top - 0 }, 700);
		}
	}, 3700);
	

}
	
	
	if ($(".mintwrap").length) {
		$(".progress").each(function(){
		var $bar = $(this).find(".bar");
		var $bar1 = $(this).find(".bar1");
		var $val = $(this).find("span.cur");
		var $valtotal = $(this).find("span.total").text().replace(/\D/g,'');
		var perc = Math.ceil($val.text()*100/$valtotal);
		var val11 = parseInt( $val.text(), 10);
		$({p:0}).animate({p:perc}, {
		duration: 1500,
		step: function(p) {
		  $bar1.css({
		    transform: "rotate("+ ((p*1.8*2)) +"deg)", // 100%=180Â° so: Â° = % * 1.8
		  });
		}
		})
		$({n:0}).animate({n:val11}, {
		duration: 1000,
		step: function(n) {
		  $val.text(n|0);
		}
	
		
		})
		/*
		$bar1.css({
		    transform: "rotate("+ ((perc*1.8*2)) +"deg)", // 100%=180Â° so: Â° = % * 1.8
		});
		*/
		});
	}
	
	
}
$(document).ready(function() {

	$(".openvideo").click(function(){
	    $('#videopopup').fadeIn('fast');
	    $("body").addClass("noscroll");
	});
	
	$(document).on('click', '.lang_toggle a', function (e) {
		if ($(this).attr("data-open")) {
			$(".litem").removeClass("active");
			$("."+ $(this).attr("data-open")).addClass("active");
			$(this).closest(".lang_toggle").find("a").removeClass("active");
			$(this).addClass("active");

		}
	});
	if ($(".gamefi_slider").length) {
	$('.gamefi_slider').slick({ 
		  slidesToShow: 1, slidesToScroll: 1,infinite: false,dots: true,arrows:false
	});
	}
	
	if ($(".media_slider").length) {
	$('.media_slider').slick({ 
		  slidesToShow: 3, slidesToScroll: 1,infinite: false,dots: true,arrows:false,variableWidth: true,
		  responsive: [
		  {breakpoint: 1100,settings: { slidesToShow: 2}},
		  {breakpoint: 767,settings: { slidesToShow: 1,variableWidth: false}}
		  ]
	});
	}
	
	$(".popup_close,.close").click(function(){
	    $('.popup_wrapper').fadeOut('fast');
	    $("body").removeClass("noscroll");
	});
	
	$(".popup_wrapper").click(function(e){
		var div = $(".popup");
		if (!div.is(e.target) && div.has(e.target).length === 0) {
	    $('.popup_wrapper').fadeOut('fast');
	    $("body").removeClass("noscroll");
		}
	});
	

	$("#logo > img").click(function(e){e.preventDefault();
		$('html, body').stop().animate({ scrollTop: 0 }, 500);
	});
	$("#scrolldown").click(function(e){e.preventDefault();
		$('html, body').stop().animate({ scrollTop: $(window).height() }, 500);
	});
	
	$(".mintwrap .info .toggle").click(function(){
	    $(this).closest(".info").find(".hidden").toggle();
	    $(this).toggleClass('active');
	});
	

	if ($(window).width() < 899) {
		$("#topmenu ul  li.parent > a").click(function(){
		    $(this).closest("li").find("ul").slideToggle();
		    $(this).toggleClass('active');
		});
	}


	$(".accordeon .ttl").click(function(){
	    $(this).closest(".item").find(".item_in").slideToggle();
	    $(this).toggleClass('active');
	});

	 $(".scrollto").click(function(e){
		e.preventDefault();
		let goTo = $(this).attr("data-id");
		$('html, body').stop().animate({ scrollTop: $("#"+goTo).offset().top - 0 }, 700);
	});
	
	$("body.mainpage #topmenu li:not(.parent) a,body.mainpage .botmenu li a").click(function(e){
		if ($(this).hasClass("link")) {return;} else { 
		e.preventDefault();
		let goTo = $(this).parent().attr("data-id");
		$('html, body').stop().animate({ scrollTop: $("#"+goTo).offset().top - 0 }, 700);
		$('#topmenu,#burger').removeClass("opened");
		$('body').removeClass("noscroll");
		}
	});

	
	$("#burger").click(function(){
	    $('body').toggleClass("noscroll");
	    $('#topmenu,#burger').toggleClass("opened");
	});
	
	
	if ($(window).width() < 599) {
		$("#top_btn .btn").detach().insertAfter(".topmenuscroll > ul");
	}
	
})




$(window).resize(function () { 
	if ($(window).width() < 699) { //headlogos
		
	}else {
		
	}
		
	
})

var prevScrollTop = 0;
var wheight = $(window).height();
$(window).scroll(function() {
var pheight = $(".page").height();
    var curScrollTop = $(window).scrollTop();

    $(".road .item").each(function() {
        var thisPosTop = $(this).offset().top;
        if ((wheight + curScrollTop - (wheight * 0.45)) > thisPosTop) {
            $(this).addClass("onView");
        } else {
            $(this).removeClass("onView");
        }
    });
    
	$(".stats").each(function(){
		
		var thisPosTop = $(this).offset().top;
		if ((wheight + curScrollTop - (wheight * 0.35)) > thisPosTop) {
			if ($(this).hasClass("started")) {return;} else {
		$(".stats").addClass("started");
		
		$(".progress").each(function(){
		var $bar = $(this).find(".bar");
		var $bar1 = $(this).find(".bar1");
		var $val = $(this).find("span");
		var perc = parseFloat( $val.text());
		$({p:0}).animate({p:perc}, {
		duration: 1500,
		step: function(p) {
		  $bar1.css({
		    transform: "rotate("+ ((p*1.8*2)) +"deg)", // 100%=180Â° so: Â° = % * 1.8
		  });
		  $val.text(p|0);
		},
		complete: function() {$val.text(perc);}
		
		})
		
		/*
		$bar1.css({
		    transform: "rotate("+ ((perc*1.8*2)) +"deg)", // 100%=180Â° so: Â° = % * 1.8
		});
		*/
		});
		}
		}

}); 


    
    if (curScrollTop > 10) {
	    $("#fixed_header").addClass("shadow");
    } else {
	    $("#fixed_header").removeClass("shadow");
    }
    
    /*
	if ($(window).width() > 899) { //не мобильная шапка
	    // липучая шапка
		var headerH0 = $("#header").outerHeight()+$("#header").position().top+80;
			if (curScrollTop>headerH0) {
				$("#fixed_header").addClass("fixed");
				$("#fixed_header").removeClass("outside");
			} else {
				$("#fixed_header").removeClass("fixed");
			};
	} */

if ($(".roadmap_in").length) {//fixed table of content glog page
		let fixed_header_h = 0;
		if ($(window).width() > 899) { fixed_header_h = 80} else { fixed_header_h = 100}
				
		let h_lead_wrap_pos = $(".roadmap_in").offset().top - fixed_header_h, h_lead_wrap_h = $(".roadmap_in").outerHeight(), h_lead_h = $(".panda_roadmap").outerHeight();
		

		if (curScrollTop > h_lead_wrap_pos ) {
			if ((curScrollTop + h_lead_h) < (h_lead_wrap_pos + h_lead_wrap_h )) {
				$(".panda_roadmap").css("transform","translate(0, " + (curScrollTop - h_lead_wrap_pos) + "px)");
			}			
		} else {
			 $(".panda_roadmap").css("transform","translate(0, 0)");	
		}

	}


	
	var botscroll = curScrollTop + (wheight/2);
	$("div.section").each(function(){
		var tPos = $(this).offset().top;
		var height = $(this).outerHeight();
		var curSCR = $(this).attr("id");
		
		//если блок в поле видимости
		if ((botscroll > tPos) && (botscroll < (tPos+height))) {
			$("#topmenu li").removeClass("active");
			$("#topmenu li[data-id="+curSCR+"]").addClass("active");
			
		} else {
			$("#topmenu li[data-id="+curSCR+"]").removeClass("active");
		}
		
	});
	
	
	
	
	    prevScrollTop = curScrollTop;


})

!function(a){"use strict";a.fn.typer=function(b){function c(a,b){k<b.length?(g=b[k].split(""),h=g.length,setTimeout(function(){a.append(g[j]),j++,j<h?c(a,b):(j=0,k++,setTimeout(function(){e(a,function(){c(a,b)})},i.backspaceDelay))},i.typeSpeed)):i.repeat&&d(a,b)}function d(a,b){k=0,setTimeout(function(){c(a,b)},i.repeatDelay)}function e(a,b){setTimeout(function(){a.text(a.text().slice(0,-1)),0<a.text().length?e(a,b):"function"==typeof b&&b()},i.backspaceSpeed)}function f(a){setInterval(function(){a.fadeOut(400).fadeIn(400)},900)}var g,h,i=a.extend({typeSpeed:120,backspaceSpeed:60,backspaceDelay:800,repeatDelay:1e3,repeat:!0,autoStart:!0,startDelay:100,useCursor:!0,strings:["Typer.js plugin"]},b),j=0,k=0;return this.each(function(){var b,d,e=a(this);i.autoStart&&(e.append('<span class="typed"></span>'),i.useCursor&&(e.append('<span class="typed_cursor">&#x7c;</span>'),d=e.children(".typed_cursor"),f(d)),b=e.children(".typed"),setTimeout(function(){c(b,i.strings)},i.startDelay))})}}(jQuery);




//hoverIntent задержка при наведении
!function(factory){"use strict";"function"==typeof define&&define.amd?define(["jquery"],factory):"object"==typeof module&&module.exports?module.exports=factory(require("jquery")):jQuery&&!jQuery.fn.hoverIntent&&factory(jQuery)}(function($){"use strict";function track(ev){cX=ev.pageX,cY=ev.pageY}var cX,cY,_cfg={interval:180,sensitivity:6,timeout:0},INSTANCE_COUNT=0,compare=function(ev,$el,s,cfg){if(Math.sqrt((s.pX-cX)*(s.pX-cX)+(s.pY-cY)*(s.pY-cY))<cfg.sensitivity)return $el.off(s.event,track),delete s.timeoutId,s.isActive=!0,ev.pageX=cX,ev.pageY=cY,delete s.pX,delete s.pY,cfg.over.apply($el[0],[ev]);s.pX=cX,s.pY=cY,s.timeoutId=setTimeout(function(){compare(ev,$el,s,cfg)},cfg.interval)};$.fn.hoverIntent=function(handlerIn,handlerOut,selector){var instanceId=INSTANCE_COUNT++,cfg=$.extend({},_cfg);$.isPlainObject(handlerIn)?(cfg=$.extend(cfg,handlerIn),$.isFunction(cfg.out)||(cfg.out=cfg.over)):cfg=$.isFunction(handlerOut)?$.extend(cfg,{over:handlerIn,out:handlerOut,selector:selector}):$.extend(cfg,{over:handlerIn,out:handlerIn,selector:handlerOut});function handleHover(e){var ev=$.extend({},e),$el=$(this),hoverIntentData=$el.data("hoverIntent");hoverIntentData||$el.data("hoverIntent",hoverIntentData={});var state=hoverIntentData[instanceId];state||(hoverIntentData[instanceId]=state={id:instanceId}),state.timeoutId&&(state.timeoutId=clearTimeout(state.timeoutId));var mousemove=state.event="mousemove.hoverIntent.hoverIntent"+instanceId;if("mouseenter"===e.type){if(state.isActive)return;state.pX=ev.pageX,state.pY=ev.pageY,$el.off(mousemove,track).on(mousemove,track),state.timeoutId=setTimeout(function(){compare(ev,$el,state,cfg)},cfg.interval)}else{if(!state.isActive)return;$el.off(mousemove,track),state.timeoutId=setTimeout(function(){!function(ev,$el,s,out){var data=$el.data("hoverIntent");data&&delete data[s.id],out.apply($el[0],[ev])}(ev,$el,state,cfg.out)},cfg.timeout)}}return this.on({"mouseenter.hoverIntent":handleHover,"mouseleave.hoverIntent":handleHover},cfg.selector)}});




function labnolIframe(div) {
	var iframe = document.createElement('iframe');
	iframe.setAttribute('src', 'https://www.youtube.com/embed/' + div.dataset.id + '?autoplay=1&rel=0');
	iframe.setAttribute('frameborder', '0');
	iframe.setAttribute('allowfullscreen', '1');
	iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
	div.parentNode.replaceChild(iframe, div);
  }

  function initYouTubeVideos() {
	var playerElements = document.getElementsByClassName('youtube-player');
	for (var n = 0; n < playerElements.length; n++) {
	  var videoId = playerElements[n].dataset.id;
	  var div = document.createElement('div');
	  div.setAttribute('data-id', videoId);
	  var thumbNode = document.createElement('img');
	  thumbNode.src = '//i.ytimg.com/vi/ID/hqdefault.jpg'.replace('ID', videoId);
	  div.appendChild(thumbNode);
	  var playButton = document.createElement('div');
	  playButton.setAttribute('class', 'play');
	  div.appendChild(playButton);
	  div.onclick = function () {
		labnolIframe(this);
	  };
	  playerElements[n].appendChild(div);
	}
  }

  document.addEventListener('DOMContentLoaded', initYouTubeVideos);
