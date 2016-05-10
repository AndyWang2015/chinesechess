$(document).ready(function(){
	var webData ={};
	webData.wrp=$('.wrapper');

	//textarea value 換行
	//text = text.replace(/\n\r?/g, '<br />');

	//init
	if(webData.wrp.hasClass('index')) indexfunction();
	

	//AddListener

	$('.newsbar li').click(function(){newsbaraclick($(this).index());});
	$('.menua').click(function(){menuaclick($(this).index());});
	$('.gotopbtn').click(function(){$('html,body').animate({scrollTop:0},500);});
	$('.banner .leftbtn').click(function(){webData.banner_swiper.slidePrev();});
	$('.banner .rightbtn').click(function(){webData.banner_swiper.slideNext();});
	$('.photo .leftbtn').click(function(){webData.photo_swiper.slidePrev();});
	$('.photo .rightbtn').click(function(){webData.photo_swiper.slideNext();});
	$('.top .logo').click(function(){wg("index.html");});
	window.onscroll = windowOnscroll;
	$(window).load(function(){wload();});

	function wload(){
		showloading(false);
	}

	//Event
	function newsbaraclick(_n){
		$('.newsbar li').removeClass('on').eq(_n).addClass('on');
		$('.news .boxall .box').removeClass('on').eq(_n).addClass('on');
	}
	function menuaclick(_n){
		if(_n==0){
			wg("about.html?page=1");
		}
		else if(_n==1){
			wg("news.html?page=1");
		}
		else if(_n==2){
			wg("learn.html?page=1");
		}
		else if(_n==3){
			wg("award.html");
		}
		else if(_n==4){
			wg("link.html");
		}
		else if(_n==5){
			wg("contact.html?page=1");
		}
		else if(_n==6){
			wg("contact.html?page=2");
		}
	}
	function indexfunction(){
		newsbaraclick(0);
		webData.banner_swiper = new Swiper('.banner_container', {  
		  		speed:1000,	  
			  	wrapperClass: 'swiper-wrapper',
			  	slideClass: 'swiper-slide',
			    slidesPerView: 1,
			    pagination: '.banner-pagination',        
			    paginationClickable: true,
			    spaceBetween: 0,
			    loop: true,
			    autoplay:6000,
			    autoplayDisableOnInteraction:false
		});
		webData.photo_swiper = new Swiper('.photo_container', {  
		  		speed:500,	  
			  	wrapperClass: 'swiper-wrapper',
			  	slideClass: 'swiper-slide',
			    slidesPerView: 1,
			    spaceBetween: 0,
			    loop: true,
			    autoplay:4000,
			    autoplayDisableOnInteraction:false
		});
	}
	function wg(_txt){
		window.location.href = _txt;
	}
	function windowOnscroll(){
		if(window.pageYOffset > 0) $('.gotopbtn').fadeIn();
		else $('.gotopbtn').fadeOut();
	}
	function showloading(_t){
		if(_t) $('.loading').fadeIn();
		else $('.loading').fadeOut();
	}


})//ready end  
































































































