
$(document).ready(function() {
	
	if ($(window).width() > 525) {
var currentPage = 0;

$('.book')
.on('click', '.ppactive', nextPage)
.on('click', '.ppflipped', prevPage);

$("#bprev").click(function(){ prevPage();});
$("#bnext").click(function(){nextPage()});

function prevPage() {
  
  if ( $('.ppflipped').last().hasClass("ppfirst")) {} else {
  $('.ppflipped')
    .last()
    .removeClass('ppflipped')
    .addClass('ppactive')
    .siblings('.ppage')
    .removeClass('ppactive');
  }
}
function nextPage() {
  if ( $('.ppactive').hasClass("pplast")) {} else {
	  $('.ppactive')
    .removeClass('ppactive')
    .addClass('ppflipped')
    .next('.ppage')
    .addClass('ppactive')
    .siblings();
  }
  
    
    
} 
} else {
	$('.ppage').replaceWith(function() {
 return $('.slide', this);
});

	$('.book').slick({ 
		  slidesToShow: 1, slidesToScroll: 1,infinite: false,dots: true,arrows:true
	});
} 
})