function getUrlVars(){for(var e,i=[],n=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),o=0;o<n.length;o++)e=n[o].split("="),i.push(e[0]),i[e[0]]=e[1];return i}$(document).ready(function(){function e(){V.wrp.hasClass("contact")&&t()}function n(e){return e.addClass("on"),V.userdata={postdate:(new Date).getFullYear()+"/"+(1*(new Date).getMonth()+1)+"/"+(new Date).getDate()+"星期"+D((new Date).getDay()),userword:$(".user_word").val(),username:$(".user_name").val(),userphone:$(".user_phone").val(),useremail:$(".user_email").val()},V.userdata.userword&&V.userdata.username&&V.userdata.userphone&&V.userdata.useremail?(y(!0),void $.ajax({url:"https://mongo-data-api-chinesechess.herokuapp.com/api/1/databases/chinesechess2016/collections/emailbox1?apiKey="+V.mlabApikey,type:"POST",contentType:"application/json",data:JSON.stringify(V.userdata),success:function(i){o(),alert("我們已收到您的意見，將由專人盡快回覆處理，謝謝你。"),e.removeClass("on"),y(!1)},error:function(i,n,o){e.removeClass("on"),y(!1),console.log("error:",i,n,o)}})):(alert("請填寫完整資料"),void e.removeClass("on"))}function o(){$(".user_word").val(""),$(".user_name").val(""),$(".user_phone").val(""),$(".user_email").val("")}function a(e){$(".contact_boxin .addr").html(e[0].addr),V.mapaddr=e[0].addr,t(),2==getUrlVars().page&&$("body,html").animate({scrollTop:$(".pg2").offset().top-50},0)}function t(){V.mapgo?V.mapgo=2:V.mapgo=1,2==V.mapgo&&(V.getgeocoder=new google.maps.Geocoder,V.mapimage="http://ml-andy.github.io/chinesechess/website/images/mapicon.png",y(!1),P(V.mapaddr))}function s(e,i){V.mapOptions={zoom:18,center:new google.maps.LatLng(e,i)},V.map=new google.maps.Map(document.getElementById("mapCanvas"),V.mapOptions);new google.maps.Marker({position:new google.maps.LatLng(e,i),map:V.map,icon:V.mapimage});V.map.setCenter(new google.maps.LatLng(e,i)),y(!1)}function p(e){$(".about_boxin").html('<div class="title">'+e[0].title+'</div><div class="cover"><img src="'+e[0].cover+'" alt=""></div><div class="info">'+e[0].info+'</div><div class="teacher"><div class="t">專業師資</div><div class="box"></div></div>');for(i in e[0].list)$(".teacher .box").append('<div class="per"><div class="pic"><img src="'+e[0].list[i].pic+'"></div><div class="name">'+e[0].list[i].name+'</div><div class="w">'+e[0].list[i].des+"</div></div>");$(".sec_menu a").eq(V.nowpage-1).addClass("on"),y(!1)}function l(e){e=e.reverse(),$(".link_boxin").html("");for(i in e)$(".link_boxin").append('<a href="'+e[i].link+'" class="n" target="_blank"><img class="linkimg" src="'+e[i].pic+'"></a>');$(".linkimg").load(function(){var e=(124-$(this).height())/2;$(this).css("margin-top",e)}).each(function(){this.complete&&$(this).trigger("load")}),y(!1)}function c(e){e=e.reverse(),$(".award_boxin").html("");for(i in e){$(".award_boxin").append('<div class="award_list"><div class="title">'+e[i].title+'</div><ul><li class="t"><div class="lt">姓名</div><div class="rt">獎項</div></li></ul></div>');for(j in e[i].list)$(".award_boxin .award_list").eq(i).find("ul").append('<li><div class="lt">'+e[i].list[j].name+'</div><div class="rt">'+e[i].list[j].word+"</div></li>")}y(!1)}function r(e){$(".learn_boxin .title").eq(0).html(e[0].title),$(".learn_boxin .main").html('<div class="lt paperpic"><div class="pic photoimg"><div class="icon learnicon"></div><img src="'+e[0].photo+'"></div></div><div class="rt"><div class="t">【課程資訊】</div><div class="w">'+e[0].classinfo+'</div><div class="t">【課表說明】</div><div class="w">'+e[0].classdes+"</div></div>"),$(".sec_menu a").eq(V.nowpage-1).addClass("on"),$(".learnicon").click(function(){f(!0,$(this).parent().find("img").attr("src"),"paperpic",$(this).parent().index())}),y(!1)}function d(e){$(".learn_boxin .photo").html("");for(i in e)$(".learn_boxin .photo").prepend('<div class="pic photoimg"><img src="'+e[i].pic+'" alt=""></div>');$(".learn_box .photo .pic").click(function(){f(!0,$(this).find("img").attr("src"),"photo",$(this).index())}),y(!1)}function h(e){$(".news_content_boxin").html("");var n=getUrlVars().id;n||(alert("沒有該則消息"),k("news.html?page=1"));var o=!0;for(i in e)e[i]._id.$oid==n&&(o=!1,$(".news_content_boxin").html('<div class="title">'+e[i].title+'</div><div class="date">'+e[i].date+'</div><div class="pic"><img src="'+e[i].bpic+'"></div><div class="w">'+e[i].bword+"</div>"));o&&(alert("沒有該則消息"),k("news.html?page=1")),4==V.nowpage?$(".sec_menu .back").attr("href","index.html?newspage=1"):$(".sec_menu .back").attr("href","news.html?page="+V.nowpage),y(!1)}function w(e){e=e,$(".news_boxin").html("");for(i in e)$(".news_boxin").append('<a href="news_content.html?id='+e[i]._id.$oid+"&page="+V.nowpage+'" class="n"><div class="pic"><div class="picin"><img src="'+e[i].spic+'"></div></div><div class="t">'+e[i].title+'</div><div class="w">'+e[i].sword+'</div><div class="date">'+e[i].date+'</div><div class="more">觀看更多</div></a>');$(".sec_menu a").eq(V.nowpage-1).addClass("on"),y(!1)}function m(e,n){if(e&&(e.collectname=n,V.indexphoto.push(e)),V.indexcomplete+=1,7==V.indexcomplete){for(i in V.indexphoto)if("index_banner"==V.indexphoto[i].collectname){$(".banner .swiper-wrapper").html("");for(var o=0;o<V.indexphoto[i].length;o++)$(".banner .swiper-wrapper").append('<div class="swiper-slide"><a href="javascript:;"><img src="'+V.indexphoto[i][o].pic+'"></a></div>')}else if("index_photo"==V.indexphoto[i].collectname){$(".photo_video .swiper-wrapper").html("");for(var o=0;o<V.indexphoto[i].length;o++)$(".photo_video .swiper-wrapper").append('<div class="swiper-slide photoimg"><a href="javascript:;"><img src="'+V.indexphoto[i][o].pic+'" alt=""></a></div>')}else if("index_video"==V.indexphoto[i].collectname){var a=V.indexphoto[i][0].video.split("v=")[1];$(".photo_video .video").html('<dvi class="t">相關影音</dvi><iframe width="100" height="100" src="https://www.youtube.com/embed/'+a+'" frameborder="0" allowfullscreen></iframe>')}$(".news .boxall .box").html(""),$(".paper .paperin").html("");for(i in V.indexNews)if(4!=V.indexNews[i].collections)for(var o=0;o<V.indexNews[i].length;o++)$(".news .boxall .box").eq(1*V.indexNews[i].collections-1).append('<a href="news_content.html?id='+V.indexNews[i][o]._id.$oid+"&page="+V.indexNews[i].collections+'" class="n"><div class="pic"><div class="picin"><img src="'+V.indexNews[i][o].spic+'" alt=""></div></div><div class="t">'+V.indexNews[i][o].title+'</div><div class="w">'+V.indexNews[i][o].sword+'</div><div class="date">'+V.indexNews[i][o].date+'</div><div class="more">觀看更多</div></a>');else for(var o=0;o<V.indexNews[i].length;o++)$(".paper .paperin").append('<a href="news_content.html?id='+V.indexNews[i][o]._id.$oid+"&page="+V.indexNews[i].collections+'" class="n"><div class="t">'+V.indexNews[i][o].title+'</div><div class="w">'+V.indexNews[i][o].sword+'</div><div class="date">'+V.indexNews[i][o].date+"</div></a>");V.banner_swiper=new Swiper(".banner_container",{speed:1e3,wrapperClass:"swiper-wrapper",slideClass:"swiper-slide",slidesPerView:1,pagination:".banner-pagination",paginationClickable:!0,spaceBetween:0,loop:!0,autoplay:6e3,autoplayDisableOnInteraction:!1}),V.photo_swiper=new Swiper(".photo_container",{speed:500,wrapperClass:"swiper-wrapper",slideClass:"swiper-slide",slidesPerView:1,spaceBetween:0,loop:!0,autoplay:4e3,autoplayDisableOnInteraction:!1}),u(),b(0),getUrlVars().newspage&&$("html,body").animate({scrollTop:$(".paper").offset().top-50},0),y(!1),$(".photo_video .photo a").click(function(){f(!0,$(this).find("img").attr("src"),"photo_video",$(this).parent().index())})}}function g(){V.indexcomplete=0,V.indexphoto=[],V.indexNews=[];for(var e=1;e<5;e++)v(e);O("index_banner",m),O("index_photo",m),O("index_video",m)}function v(e){$.ajax({url:"https://mongo-data-api-chinesechess.herokuapp.com/api/1/databases/chinesechess2016/collections/news_page"+e+'?s={"_id":-1}&l=3&apiKey='+V.mlabApikey,type:"GET",contentType:"application/json",success:function(i){i.collections=e,V.indexNews.push(i),m()},error:function(e,i,n){console.log("error:",e,i,n)}})}function u(){for(var e=0;e<$(".banner .swiper-slide").length;e++){var i=($(window).width()-$(".banner .swiper-slide").eq(e).find("img").width())/2;i<0&&$(".banner .swiper-slide").eq(e).find("img").css("margin-left",i)}}function f(e,i,n,o){e?(V.nowphotopop=$("."+n),V.nowphotopopnum=o,V.nowphotopop.find(".photoimg").length<2?$(".photo_pop .ctrl").hide():$(".photo_pop .ctrl").show(),$(".photo_pop").fadeIn(300,function(){$(".photo_pop .photo").addClass("on")}),$(".photo_pop .photo img").attr("src",i)):$(".photo_pop").fadeOut(300,function(){$(".photo_pop .photo").removeClass("on")})}function _(e){"next"==e?V.nowphotopopnum+=1:"prev"==e&&(V.nowphotopopnum-=1),V.nowphotopopnum>V.nowphotopop.find(".photoimg").length-1?V.nowphotopopnum=0:V.nowphotopopnum<0&&V.nowphotopop.find(".photoimg").length-1;var i=V.nowphotopop.find(".photoimg").eq(V.nowphotopopnum).find("img").attr("src");$(".photo_pop .photo img").attr("src",i)}function b(e){$(".newsbar li").removeClass("on").eq(e).addClass("on"),$(".news .boxall .box").removeClass("on").eq(e).addClass("on")}function x(e){0==e?k("about.html?page=1"):1==e?k("news.html?page=1"):2==e?k("learn.html?page=1"):3==e?k("award.html"):4==e?k("link.html"):5==e?k("contact.html?page=1"):6==e&&k("contact.html?page=2")}function k(e){window.location.href=e}function C(){window.pageYOffset>0?$(".gotopbtn").fadeIn():$(".gotopbtn").fadeOut()}function y(e){e?$(".loading").fadeIn(1e3):$(".loading").fadeOut(1e3)}function N(){V.wrp.hasClass("index")&&u(),$(".banner_inside").length>0&&T()}function O(e,i){$.ajax({url:"https://mongo-data-api-chinesechess.herokuapp.com/api/1/databases/chinesechess2016/collections/"+e+V.nowpage+'?s={"_id":-1}&apiKey='+V.mlabApikey,type:"GET",contentType:"application/json",success:function(n){i(n,e)},error:function(e,i,n){console.log("error:",e,i,n)}})}function q(e,i){$.ajax({url:"https://mongo-data-api-chinesechess.herokuapp.com/api/1/databases/chinesechess2016/collections/"+e+V.nowpage+'?s={"_id":-1}&apiKey='+V.mlabApikey,type:"GET",contentType:"application/json",success:function(e){i(e)},error:function(e,i,n){console.log("error:",e,i,n)}})}function T(){var e=($(window).width()-$(".banner_inside").find("img").width())/2;e<0&&$(".banner_inside").find("img").css("margin-left",e)}function D(e){return 0==e?e="日":1==e?e="一":2==e?e="二":3==e?e="三":4==e?e="四":5==e?e="五":6==e&&(e="六"),e}function P(e){V.getgeocoder.geocode({address:e},function(e,i){null!=e&&i===google.maps.GeocoderStatus.OK&&(coord=e[0].geometry.location.toString().replace("(","").replace(")","").split(","),s(coord[0],coord[1]))})}var V={};V.wrp=$(".wrapper"),V.mlabApikey="n6FXodWWCdM14KrePZHrRPPovbzboRn6",V.nowpage=getUrlVars().page,V.nowpage||(V.nowpage=1),V.wrp.hasClass("index")&&g(),V.wrp.hasClass("news")&&q("news_page",w),V.wrp.hasClass("news_content")&&q("news_page",h),V.wrp.hasClass("learn")&&(q("learning_page",r),q("learning_photo_page",d)),V.wrp.hasClass("award")&&q("awards",c),V.wrp.hasClass("link")&&q("otherlink",l),V.wrp.hasClass("about")&&q("aboutus_page",p),V.wrp.hasClass("contact")&&(V.nowpage=1,q("contactus",a)),$(".banner_inside").length>0&&T(),$(".contact_box .user_btn").click(function(){$(this).hasClass("on")||n($(this))}),$(".photo_pop .rightbtn").click(function(){_("next")}),$(".photo_pop .leftbtn").click(function(){_("prev")}),$(".photo_pop .closebtn").click(function(){f(!1)}),$(".photo_pop .cover").click(function(){f(!1)}),$(".newsbar li").click(function(){b($(this).index())}),$(".menua").click(function(){x($(this).index())}),$(".gotopbtn").click(function(){$("html,body").animate({scrollTop:0},500)}),$(".banner .leftbtn").click(function(){V.banner_swiper.slidePrev()}),$(".banner .rightbtn").click(function(){V.banner_swiper.slideNext()}),$(".photo .leftbtn").click(function(){V.photo_swiper.slidePrev()}),$(".photo .rightbtn").click(function(){V.photo_swiper.slideNext()}),$(".top .logo").click(function(){k("index.html")}),window.onscroll=C,$(window).load(function(){e()}),$(window).resize(function(){N()})});