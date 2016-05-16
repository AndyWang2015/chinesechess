$(document).ready(function(){
	var webData ={};
	webData.wrp=$('.wrapper');
	webData.mlabApikey = "n6FXodWWCdM14KrePZHrRPPovbzboRn6";	

	//init
	webData.nowpage = getUrlVars()['page'];
	if(!webData.nowpage) webData.nowpage=1;	
	if(webData.wrp.hasClass('index')) indexfunction();	
	if(webData.wrp.hasClass('news')) getDataCollection('news_page',newsfunction);
	if(webData.wrp.hasClass('news_content')) getDataCollection('news_page',news_contentfunction);
	if(webData.wrp.hasClass('learn')){
		getDataCollection('learning_page',learnfunction);
		getDataCollection('learning_photo_page',learn_photofunction);
	}
	if(webData.wrp.hasClass('award')) getDataCollection('awards',awardfunction);
	if(webData.wrp.hasClass('link')) getDataCollection('otherlink',linkfunction);
	if(webData.wrp.hasClass('about')) getDataCollection('aboutus_page',aboutfunction);
	if(webData.wrp.hasClass('contact')){webData.nowpage=1;getDataCollection('contactus',contactfunction);}	
	if($('.banner_inside').length>0) banner_insidefc();

	//AddListener
	$('.contact_box .user_btn').click(function(){if(!$(this).hasClass('on')) sendmail($(this));});
	$('.photo_pop .rightbtn').click(function(){photopop_change('next');});
	$('.photo_pop .leftbtn').click(function(){photopop_change('prev');});
	$('.photo_pop .closebtn').click(function(){photopop(false);});
	$('.photo_pop .cover').click(function(){photopop(false);});	
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
		if(webData.wrp.hasClass('contact')){initmap();}
	}

	//Event
	function sendmail(_o){
		_o.addClass('on');				
		webData.userdata={
			postdate:new Date().getFullYear()+"/"+ (new Date().getMonth()*1+1) + "/"+new Date().getDate() + "星期"+changeDay(new Date().getDay()),
			userword:$('.user_word').val(),
			username:$('.user_name').val(),
			userphone:$('.user_phone').val(),
			useremail:$('.user_email').val()
		};		
		if(!webData.userdata.userword || !webData.userdata.username || !webData.userdata.userphone || !webData.userdata.useremail){
			alert("請填寫完整資料");
			_o.removeClass('on');
			return
		}		
		showloading(true);
		$.ajax({
			url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/emailbox1?apiKey='+ webData.mlabApikey,
			type: 'POST',
			contentType: 'application/json',
			data:JSON.stringify(webData.userdata),
			success: function(data) {				
				clearForm();
				alert("我們已收到您的意見，將由專人盡快回覆處理，謝謝你。")
				_o.removeClass('on');
				showloading(false);
			},error: function(xhr, textStatus, errorThrown) {           
				_o.removeClass('on');
				showloading(false);
				console.log("error:", xhr, textStatus, errorThrown);
			}
		});
	}
	function clearForm(){
		$('.user_word').val('');
		$('.user_name').val('');
		$('.user_phone').val('');
		$('.user_email').val('');
	}
	function contactfunction(data){
		$('.contact_boxin .addr').html(data[0].addr);
		webData.mapaddr = data[0].addr;		
		initmap();
		if(getUrlVars()['page']==2) $('body,html').animate({scrollTop:$('.pg2').offset().top - 50},0);		
	}
	function initmap(){
		if(webData.mapgo) webData.mapgo=2;
		else webData.mapgo = 1;
		if(webData.mapgo!=2) return;
		webData.getgeocoder = new google.maps.Geocoder();
		webData.mapimage = 'http://benefique-event.shiseido.com.tw/images/e_map_icon.png';
		textTocoord(webData.mapaddr);
	}
	function changemap(_lat,_lon){
		webData.mapOptions = {zoom: 18,center: new google.maps.LatLng(_lat, _lon)}
		webData.map = new google.maps.Map(document.getElementById('mapCanvas'),webData.mapOptions);	
		var beachMarker = new google.maps.Marker({position: new google.maps.LatLng(_lat, _lon),map: webData.map,icon: webData.mapimage});
	    webData.map.setCenter(new google.maps.LatLng(_lat, _lon));
	    showloading(false);
	}
	function aboutfunction(data){
		$('.about_boxin').html('<div class="title">'+data[0].title+'</div><div class="cover"><img src="'+data[0].cover+'" alt=""></div><div class="info">'+data[0].info+'</div><div class="teacher"><div class="t">專業師資</div><div class="box"></div></div>');
		for(i in data[0].list){
			$('.teacher .box').append('<div class="per"><div class="pic"><img src="'+data[0].list[i].pic+'"></div><div class="name">'+data[0].list[i].name+'</div><div class="w">'+data[0].list[i].des+'</div></div>');
		}
		$('.sec_menu a').eq(webData.nowpage-1).addClass('on');
		showloading(false);
	}
	function linkfunction(data){
		data = data.reverse();
		$('.link_boxin').html('');
		for(i in data) $('.link_boxin').append('<a href="'+data[i].link+'" class="n" target="_blank"><img src="'+data[i].pic+'"></a>');
		showloading(false);
	}
	function awardfunction(data){		
		data = data.reverse();		
		$('.award_boxin').html('');
		for(i in data){
			$('.award_boxin').append('<div class="award_list"><div class="title">'+data[i].title+'</div><ul><li class="t"><div class="lt">姓名</div><div class="rt">獎項</div></li></ul></div>');
			for(j in data[i].list) $('.award_boxin .award_list').eq(i).find('ul').append('<li><div class="lt">'+data[i].list[j].name+'</div><div class="rt">'+data[i].list[j].word+'</div></li>');				
		}
		showloading(false);
	}
	function learnfunction(data){		
		$('.learn_boxin .title').eq(0).html(data[0].title);		
		$('.learn_boxin .main').html('<div class="lt paperpic"><div class="pic photoimg"><div class="icon learnicon"></div><img src="'+data[0].photo+'"></div></div><div class="rt"><div class="t">【課程資訊】</div><div class="w">'+data[0].classinfo+'</div><div class="t">【課表說明】</div><div class="w">'+data[0].classdes+'</div></div>');
		$('.sec_menu a').eq(webData.nowpage-1).addClass('on');
		//AddListener
		$('.learnicon').click(function(){photopop(true,$(this).parent().find('img').attr('src'),'paperpic',$(this).parent().index());});
		showloading(false);
	}
	function learn_photofunction(data){		
		$('.learn_boxin .photo').html('');
		for(i in data) $('.learn_boxin .photo').prepend('<div class="pic photoimg"><img src="'+data[i].pic+'" alt=""></div>');
		//AddListener
		$('.learn_box .photo .pic').click(function(){photopop(true,$(this).find('img').attr('src'),'photo',$(this).index());});
		showloading(false);
	}
	function news_contentfunction(data){		
		$('.news_content_boxin').html('');
		var _id = getUrlVars()['id'];		
		if(!_id){alert("沒有該則消息");wg("news.html?page=1");}
		var _nothaspaper = true;
		for(i in data){
			if(data[i]._id.$oid == _id){
				_nothaspaper = false;
				$('.news_content_boxin').html('<div class="title">'+data[i].title+'</div><div class="date">'+data[i].date+'</div><div class="pic"><img src="'+data[i].bpic+'"></div><div class="w">'+data[i].bword+'</div>');
			}
		}
		if(_nothaspaper){alert("沒有該則消息");wg("news.html?page=1");}
		if(webData.nowpage==4) $('.sec_menu .back').attr('href','index.html?newspage=1');
		else $('.sec_menu .back').attr('href','news.html?page='+webData.nowpage);		
		showloading(false);
	}
	function newsfunction(data){		
		data = data.reverse();
		$('.news_boxin').html('');
		for(i in data){
			$('.news_boxin').append('<a href="news_content.html?id='+data[i]._id.$oid+'&page='+webData.nowpage+'" class="n"><div class="pic"><div class="picin"><img src="'+data[i].spic+'"></div></div><div class="t">'+data[i].title+'</div><div class="w">'+data[i].sword+'</div><div class="date">'+data[i].date+'</div><div class="more">觀看更多</div></a>');
		}
		$('.sec_menu a').eq(webData.nowpage-1).addClass('on');
		showloading(false);
	}	
	function indexcallback(data,_collectname){		
		if(data){
			data.collectname = _collectname;
			webData.indexphoto.push(data);
		}
		webData.indexcomplete +=1;
		if(webData.indexcomplete==7){
			for(i in webData.indexphoto){
				if(webData.indexphoto[i].collectname=="index_banner"){
					$('.banner .swiper-wrapper').html('');
					for(var j=0;j<webData.indexphoto[i].length;j++){
						$('.banner .swiper-wrapper').append('<div class="swiper-slide"><a href="javascript:;"><img src="'+webData.indexphoto[i][j].pic+'"></a></div>');
					}
				}
				else if(webData.indexphoto[i].collectname=="index_photo"){
					$('.photo_video .swiper-wrapper').html('');
					for(var j=0;j<webData.indexphoto[i].length;j++){						
						$('.photo_video .swiper-wrapper').append('<div class="swiper-slide photoimg"><a href="javascript:;"><img src="'+webData.indexphoto[i][j].pic+'" alt=""></a></div>');
					}
				}
				else if(webData.indexphoto[i].collectname=="index_video"){
					var _url = webData.indexphoto[i][0].video.split('v=')[1];
					$('.photo_video .video').html('<dvi class="t">相關影音</dvi><iframe width="100" height="100" src="https://www.youtube.com/embed/'+_url+'" frameborder="0" allowfullscreen></iframe>');
				}
			}
			$('.news .boxall .box').html('');
			$('.paper .paperin').html('');
			for(i in webData.indexNews){
				if(webData.indexNews[i].collections != 4){
					for(var j=0;j<webData.indexNews[i].length;j++){
						$('.news .boxall .box').eq(webData.indexNews[i].collections*1-1).append('<a href="news_content.html?id='+webData.indexNews[i][j]._id.$oid+'&page='+webData.indexNews[i].collections+'" class="n"><div class="pic"><div class="picin"><img src="'+webData.indexNews[i][j].spic+'" alt=""></div></div><div class="t">'+webData.indexNews[i][j].title+'</div><div class="w">'+webData.indexNews[i][j].sword+'</div><div class="date">'+webData.indexNews[i][j].date+'</div><div class="more">觀看更多</div></a>');
					}					
				}else{
					for(var j=0;j<webData.indexNews[i].length;j++){
						$('.paper .paperin').append('<a href="news_content.html?id='+webData.indexNews[i][j]._id.$oid+'&page='+webData.indexNews[i].collections+'" class="n"><div class="t">'+webData.indexNews[i][j].title+'</div><div class="w">'+webData.indexNews[i][j].sword+'</div><div class="date">'+webData.indexNews[i][j].date+'</div></a>');
					}	
				}
			}			
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
			newsbaraclick(0);
			if(getUrlVars()['newspage']) $('html,body').animate({scrollTop:$('.paper').offset().top - 50},0);
			showloading(false);
			//AddListener
			$('.photo_video .photo a').click(function(){photopop(true,$(this).find('img').attr('src'),'photo_video',$(this).parent().index());});
		}
	}
	function indexfunction(){		
		webData.indexcomplete = 0;
		webData.indexphoto = [];
		webData.indexNews = [];
		for(var i=1;i<5;i++) indexgetnews(i);
		getDataCollectionIndex('index_banner',indexcallback);
		getDataCollectionIndex('index_photo',indexcallback);
		getDataCollectionIndex('index_video',indexcallback);		
	}
	function indexgetnews(_n){
		$.ajax({
			url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/news_page'+_n+'?s={"_id":-1}&l=3&apiKey='+webData.mlabApikey,
			type: 'GET',
			contentType: 'application/json',
			success: function(data) {
				data.collections = _n;
				webData.indexNews.push(data);
				indexcallback();
			},error: function(xhr, textStatus, errorThrown) {             
				console.log("error:", xhr, textStatus, errorThrown);
			}
		});
	}
	function indexbannerresize(){
		for(var i =0;i<$('.banner .swiper-slide').length;i++){
			var _margleft = ($(window).width() - $('.banner .swiper-slide').eq(i).find('img').width()) / 2;
			if(_margleft<0) $('.banner .swiper-slide').eq(i).find('img').css('margin-left',_margleft);
		}
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
	function wg(_txt){
		window.location.href = _txt;
	}
	function windowOnscroll(){
		if(window.pageYOffset > 0) $('.gotopbtn').fadeIn();
		else $('.gotopbtn').fadeOut();
	}
	function showloading(_t){
		if(_t) $('.loading').fadeIn(1000);
		else $('.loading').fadeOut(1000);
	}
	function wresize(){
		if(webData.wrp.hasClass('index')) indexbannerresize();
		if($('.banner_inside').length>0) banner_insidefc();
	}
	function getDataCollectionIndex(_collectname,_callback){
		$.ajax({
			url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/'+_collectname+webData.nowpage+'?s={"_id":-1}&apiKey='+ webData.mlabApikey,
			type: 'GET',
			contentType: 'application/json',
			success: function(data) {				
				_callback(data,_collectname);
			},error: function(xhr, textStatus, errorThrown) {             
				console.log("error:", xhr, textStatus, errorThrown);
			}
		});
	}
	function getDataCollection(_collectname,_callback){
		$.ajax({
			url: 'https://api.mlab.com/api/1/databases/chinesechess2016/collections/'+_collectname+webData.nowpage+'?apiKey='+ webData.mlabApikey,
			type: 'GET',
			contentType: 'application/json',
			success: function(data) {
				_callback(data);				
			},error: function(xhr, textStatus, errorThrown) {             
				console.log("error:", xhr, textStatus, errorThrown);
			}
		});
	}
	function banner_insidefc(){
		var _margleft = ($(window).width() - $('.banner_inside').find('img').width()) / 2;
		if(_margleft<0) $('.banner_inside').find('img').css('margin-left',_margleft);
	}
	function changeDay(_d){		
		if(_d==0) _d="日";
		else if(_d==1) _d="一";
		else if(_d==2) _d="二";
		else if(_d==3) _d="三";
		else if(_d==4) _d="四";
		else if(_d==5) _d="五";
		else if(_d==6) _d="六";
		return _d;
	}	
	function textTocoord(STR){	
		webData.getgeocoder.geocode({'address':STR}, function (results, status) {
			if (results != null && status === google.maps.GeocoderStatus.OK) {				
				coord = results[0].geometry.location.toString().replace('(','').replace(')','').split(',');
				changemap(coord[0],coord[1]);				
			} else {
				alert("輸入間隔太快，請隔1~2秒再輸入");				
			};
		});
	}

})//ready end  
function getUrlVars(){
  var vars=[],hash;var hashes=window.location.href.slice(window.location.href.indexOf('?')+1).split('&');
  for(var i=0;i<hashes.length;i++){hash=hashes[i].split('=');vars.push(hash[0]);vars[hash[0]]=hash[1]}
  return vars
}
