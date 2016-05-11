$(document).ready(function(){
	var webData ={};
	webData.wrp=$('.wrapper');

	//textarea value 換行
	//text = text.replace(/\n\r?/g, '<br />');

	//init
	if(webData.wrp.hasClass('index')) indexfunction();
	if(webData.wrp.hasClass('contact')) contactfunction();
	

	//AddListener
	$('.learnicon').click(function(){photopop(true,$(this).parent().find('img').attr('src'),'paperpic',$(this).parent().index());});
	$('.learn_box .photo .pic').click(function(){photopop(true,$(this).find('img').attr('src'),'photo',$(this).index());});
	$('.photo_pop .rightbtn').click(function(){photopop_change('next');});
	$('.photo_pop .leftbtn').click(function(){photopop_change('prev');});
	$('.photo_pop .closebtn').click(function(){photopop(false);});
	$('.photo_pop .cover').click(function(){photopop(false);});
	$('.photo_video .photo a').click(function(){photopop(true,$(this).find('img').attr('src'),'photo_video',$(this).parent().index());});
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
	$(window).resize(function(){wresize();});

	function wload(){
		showloading(false);
	}

	//Event
	function contactfunction(){
		if(getUrlVars()['page']==2) $('body,html').animate({scrollTop:$('.pg2').offset().top - 50},0);
	}
	function photopop(_t,_src,_parent,_n){
		if(_t){
			webData.nowphotopop = $('.'+_parent);
			webData.nowphotopopnum = _n;
			if(webData.nowphotopop.find('.photoimg').length<2) $('.photo_pop .ctrl').hide();
			else $('.photo_pop .ctrl').show();
			$('.photo_pop').fadeIn(300,function(){$('.photo_pop .photo').addClass('on');});
			$('.photo_pop .photo img').attr('src',_src);
		}else{
			$('.photo_pop').fadeOut(300,function(){$('.photo_pop .photo').removeClass('on');});
		}		
	}
	function photopop_change(_txt){		
		if(_txt == 'next')webData.nowphotopopnum +=1;
		else if(_txt == 'prev')webData.nowphotopopnum -=1;		
		if(webData.nowphotopopnum > webData.nowphotopop.find('.photoimg').length-1)webData.nowphotopopnum=0;
		else if(webData.nowphotopopnum < 0) webData.nowphotopop.find('.photoimg').length-1;
		var _src = webData.nowphotopop.find('.photoimg').eq(webData.nowphotopopnum).find('img').attr('src');			
		$('.photo_pop .photo img').attr('src',_src);
	}
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
		indexbannerresize();
	}
	function indexbannerresize(){
		for(var i =0;i<$('.banner .swiper-slide').length;i++){
			var _margleft = ($(window).width() - $('.banner .swiper-slide').eq(i).find('img').width()) / 2;
			if(_margleft<0) $('.banner .swiper-slide').eq(i).find('img').css('margin-left',_margleft);
		}
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
	function wresize(){
		if(webData.wrp.hasClass('index')) indexbannerresize();
	}


})//ready end  
function getUrlVars(){
  var vars=[],hash;var hashes=window.location.href.slice(window.location.href.indexOf('?')+1).split('&');
  for(var i=0;i<hashes.length;i++){hash=hashes[i].split('=');vars.push(hash[0]);vars[hash[0]]=hash[1]}
  return vars
}

































































































