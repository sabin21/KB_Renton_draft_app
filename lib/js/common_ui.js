var common_ui = {
	init: function(){
		this.common_tab();
		this.layerpop();
		this.toggleCon();
		this.giroDelete();
		this.giroNum_toggle();
		this.transferTooltip();
		this.dataMore();
		this.inqueryMore();
		this.transferMore();
		this.checkTotal();
		this.tootipBtn();
		this.functionTab();
		this.mnList();
		this.menuList();
		this.stickyHead();
		this.rollInfo();
		this.themeSearch();
		//this.initResizeOnce(); //20180405 iPhone x대응 테스트 주석
		// 2018 추가 start
		this.reviewTab();
		this.tooltipNew();
	},
	//레이어팝업
	layerpop:function(){
		$('.layerpop').click(function(e) {
			e.preventDefault();

			var id = $(this).attr('href');
			var ids = $(this).attr('rel');

			var winH = $(window).height();
			var winW = $(window).width();
			if (winH > $(id).height()) {
				$(id).css('top', window.pageYOffset + (winH / 2 - $(id).height() / 2));
			}else if(winH < $(id).height()){
				$(id).css('top','25px');
				$('body').animate({scrollTop:0}, '500');
			}

			$(id).css('left', winW / 2 - $(id).width() / 2);
			$(id).show();
			
			if (winH > $(ids).height()) {
				$(ids).css('top', window.pageYOffset + (winH / 2 - $(ids).height() / 2));
			}else if(winH < $(ids).height()){
				$(ids).css('top','25px');
				$('body').animate({scrollTop:0}, '500');
			}

			$(ids).css('left', winW / 2 - $(ids).width() / 2);
			$(ids).show();

			var maskHeight = $(document).height();
			var maskWidth = $(window).width();

			$('body').append('<div id="layermask"></div>');
			$('#layermask').css({
				'width' : maskWidth,
				'height' : maskHeight
			});
			$('#layermask').show();
		});
		
        //레이어 닫기 버튼
		$('.layerwrap .close,.layerwrap .btn_close').click(function(e) {
			e.preventDefault();
			$('#layermask').hide().remove();
			$('.layerwrap').hide();
		});

		$('.layerwrap01 .close,.layerwrap01 .btn_close').click(function() {
			$('.layerwrap01').hide().fadeOut(500);
			$('.layerbg').hide().fadeOut(500);
		});
		
		//레이어 열기 버튼
		$('.layer_btn').click(function() {
			$('.layerwrap01').show().fadeIn(500);
			$('.layerbg').show().fadeIn(500);
		});

		 $(window).resize(function() {
			var box = $('.layerwrap');
			var maskHeight = $(document).height();
			var maskWidth = $(window).width();
			$('#layermask').css({
				'width' : maskWidth,
				'height' : maskHeight
			});

			var winH = $(window).height();
			var winW = $(window).width();

			if (winH > $(box).height()) {
				$(box).css('top', window.pageYOffset + (winH / 2 - $(box).height() / 2));
			}
			box.css('left', winW / 2 - box.width() / 2);
		});

		//달력 레이어팝업
		$('.cal_layerpop').click(function(e) {
			e.preventDefault();
			
			var id = $(this).attr('href');
			var maskHeight = $(document).height();
			var maskWidth = $(window).width();
			
			$('body').append('<div id="cal_layermask"></div>');
			$('#cal_layermask').css({'width':maskWidth,'height':maskHeight});
			$('#cal_layermask').show();
		
			$(id).show();
		});
		$('.cal_layerwrap .close,.cal_layerwrap .btn_close').click(function (e) {
			e.preventDefault();
			$('.cal_layerwrap').hide();
			$('#cal_layermask').hide().remove();
		});
	},
	//탭
	common_tab:function(){
		var tabWrap = $('.tab_wrap');
		var tabBtn = $('.tab_wrap').find('.tabs li a');
		var _parent = $('.tabs li.on');
		var currentNum = $('.tabs li').filter('.on').index();

		if(_parent.hasClass('on')&&$('.tab_content').length){
			$('.tab_wrap').find('.tab_content').eq(currentNum).show();
		}

		tabWrap.find('.tabs li:first-child').addClass('on');
		tabWrap.find('.tabs li:first-child a').attr('title', '현재메뉴 선택됨');
		tabWrap.find('.tab_content').eq(0).show().attr('title', '현재메뉴 내용');
		
		tabBtn.click(function(e){
			var _this = $(this);
			var _parent = $(this).parent();
			var _parents = $(this).parents('.tab_wrap');
			var currentNum = _parent.index();

			e.preventDefault();
			_parent.addClass('on').siblings().removeClass('on');

			_parents.find('.tab_content').hide().removeAttr('title');
			_parents.find('.tab_content').eq(currentNum).show().attr('title', '현재메뉴 내용');

			tabBtn.removeAttr('title');
			_this.attr('title', '현재메뉴 선택됨');
		});
	},
	//접근성 탭
	functionTab:function(){
		var tabs = $('.tabwrap01, .tabwrap02');
		var tabBtn = $('.litype a');
		
		tabs.find('li.on .tabcont').show();
		tabs.find('li.on').each(function(){
			var _this = $(this);
			var _wrap = $(this).closest('.tabwrap01, .tabwrap02');
			var _height = parseInt($(this).find('.atab').outerHeight(true) + $(this).find('.tabcont:visible').outerHeight(true))


			if(_this.hasClass('on')){
				_wrap.height(_height);
			}
		});

		tabBtn.click(function(e){
			var _this = $(this);
			var _parent = $(this).parent();
			var _wrap = $(this).closest('.tabwrap01, .tabwrap02');
			var _content = $(this).parent().find('.tabcont');

			//2016-08-23 추가
			var _contentHeight = _content.outerHeight(true);
			var tabBtnHeight = _this.outerHeight(true);

			e.preventDefault();
				
			_parent.addClass('on').siblings().removeClass('on');
			_parent.siblings().find('.tabcont').hide();
			_content.show();
			_parent.siblings().find('a .hide').html('메뉴');
			_this.find('.hide').html('현재메뉴 선택됨');
			
			//tabcont 높이
			_wrap.height(_contentHeight + tabBtnHeight); 
		});
	},
	//Toggle
	toggleCon:function(){
		/*2018 접근성 개선 수정*/
		if ($('.btn_period_set').length>=1){
			$('.btn_period_set').attr('title','조회영역 열기');
		}
		/* // 2018 접근성 개선 수정*/
		if($(".button-show-hide").hasClass('close')){
			$(this).parents('.toggle-set').find('.show-hide').show();
		}

		$(".button-show-hide").unbind('click').click(function(e){
			e.preventDefault();
			
			var _this = $(this);
			var _parents = $(this).parent('.toggle-set');
			var _content = $(this).parents('.toggle-set').find('.show-hide');

			if(_this.hasClass('close')){
				/*2018 접근성 개선 수정*/
				if(_this.hasClass('btn_period_set')){
					_this.attr('title','조회영역 열기');
				}
				if(_this.parent().hasClass('list_toggle') || _this.parent().hasClass('inquery_toggle')){
					_this.html('추가정보 더보기');
				}
				/*// 2018 접근성 개선 수정*/

				_this.removeClass('close');
				_content.hide();
			} else {
				/*2018 접근성 개선 수정*/
				if(_this.hasClass('btn_period_set')){
					_this.attr('title','조회영역 닫기');
				}
				if(_this.parent().hasClass('list_toggle') || _this.parent().hasClass('inquery_toggle')){
					_this.html('추가정보 숨기기');
				}
				/*// 2018 접근성 개선 수정*/

				_this.addClass('close');
				_content.show();
				fn_focusMove(_this, 200);
			};
		});
	},
	//선택사항 더보기
	dataMore:function(){
		$('.data_more').click(function(){
			if (!$(this).hasClass('data_open')){
				$(this).addClass('data_open');
				$('.data-show-hide').slideDown(100);
				$(">span",this).html("내역숨기기");
			}else{
				$(this).removeClass('data_open');
				$('.data-show-hide').slideUp(50);
				$(">span",this).html("내역보기");
			}
			return false;
		});
	},
	//조회목록 펼치기
	inqueryMore:function(){
		$('.link_act').unbind('click').click(function(e){
			e.preventDefault();
			if(!$(this).parent().hasClass('link_wrap')){
				if (!$(this).hasClass('on')){
					$(this).find('span.hide').html('메뉴숨기기');
					$(this).addClass('on').next().addClass('active').slideDown(150);
				}else{
					$(this).find('span.hide').html('메뉴펼쳐보기');
					$(this).removeClass('on').next().removeClass('active').slideUp(150);
				}
				return false;
			}else{
				if (!$(this).hasClass('on')){
					$(this).find('span.hide').html('메뉴숨기기');
					$(this).addClass('on').parent().next().addClass('active').slideDown(150);
				}else{
					$(this).find('span.hide').html('메뉴펼쳐보기');
					$(this).removeClass('on').parent().next().removeClass('active').slideUp(150);
				}
				return false;
			}
		});
		
	},
	//아코디언(accordion)
	transferMore:function(){
		$('.acc_title').click(function(){
			if (!$(this).hasClass('acc_open'))
			{
				$(this).find('span').html('메뉴숨기기');
				$(this).addClass('acc_open').next('ul, div').addClass('acc_dep').slideDown(150);

				if($(this).next('ul, div').find('.tabwrap01, .tabwrap02').length){
					var _innerTab = $(this).next('ul, div').find('.tabwrap01, .tabwrap02');
					var _height = parseInt(_innerTab.find('li.on .atab').outerHeight(true) + _innerTab.find('li.on .tabcont').height());

					_innerTab.height(_height);
				}
			}else{
				$(this).find('span').html('메뉴펼쳐보기');
				$(this).removeClass('acc_open').next('ul, div').removeClass('acc_dep').slideUp(150);
			}
			return false;
		});
	},
	//지로번호삭제
	giroDelete:function(){
		var _list = $('.giro_list');
		var btn_delete = _list.find('.btn_list_delete');
		
		btn_delete.click(function(e){
			e.preventDefault();
			$(this).closest('li').remove();

			if(!_list.find('li').not('.no_data').length) {
				_list.find('.no_data').show();
			}
		});
	},
	//지로번호 입력 토글
	giroNum_toggle:function(){
		$('.btn_giro_num').on('click', function(e){
			e.preventDefault();

			var toggleCon = $('.giro_toggle');
			
			toggleCon.addClass('active');
			$(this).parents('.giro_toggle').removeClass('active');
		});
	},
	//즉시이체결과 오류 툴팁
	transferTooltip:function(){
		$('.btn_error').click(function(e){
			var _this = $(this);
			var _parent = $(this).parent();

			e.preventDefault();
			if(!_parent.hasClass('active')){
				_parent.addClass('active');
				_this.attr('title', '오류 툴팁 닫기');
			} else {
				_parent.removeClass('active');
				_this.attr('title', '오류 툴팁 보기');
			} 
		})
	},
	//My환율 체크박스 전체 선택
	checkTotal:function(){

		$('.btn_check_total').click(function(e){
			var _this = $('.btn_check_total');
			var _wrap = $('.check_list_wrap');
			var chk_list = $('.check_list_wrap').find('.check_list input[type="checkbox"]');

			e.preventDefault();
			if(!_this.hasClass('active')){
				_this.addClass('active');
				chk_list.prop('checked', 'checked');
			} else {
				_this.removeClass('active');
				chk_list.removeAttr('checked');
			}
		});
	},
	//아이콘툴팁
	tootipBtn:function(){
		var _wrap = $('.icon_tooltip');
		var _btn = $('.icon_tooltip').find('.btn_tooltip');

		_btn.on('click', function(e){
			var _this = $(this);
			var _parent = $(this).parent();
			var _layer = $(this).parent().find('.tooltip_layer');
			
			e.preventDefault();

			if(_parent.hasClass('active')){
				_parent.removeClass('active');
				_layer.hide();
			} else {				
				_parent.addClass('active');
				_layer.show(function(){
					/*var _width = $(this).outerWidth();
					var _left = $(this).offset().left;
					var _currentVal = Math.round(_width + _left);
					var doc_width = $('#content').outerWidth();
					
					if(_currentVal >= doc_width) {
						_this.css('left'
					}
					console.log(doc_width, _currentVal, _width)*/
				
				});
			}
		});
	},
	//디자인 스크롤바 (iscroll.js 필수)
	scrollBar:function(){
		if($('#scrollbox').length > 0){
			var iscroll = new Array();
			$('.scrollbox').each(function(index){
				$(this).attr('id', 'scrollbox'+index);
				id = $(this).attr('id');
				iscroll.push(new iScroll(id, {
					hScroll: false,
					userTransform: false,
					checkDOMChanges: true,
					onBeforeScrollStart: function (e) {
						var target = e.target;
						while (target.nodeType != 1) target = target.parentNode;

						if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA'){
							e.preventDefault();
						}
					}
				}));
			});
		}
	},
	//약관 설명 아코디언
	agreeView:function(){
		$('.agree_view_ti').click(function(){
			if (!$(this).hasClass('agree_open'))
			{
				$(this).find('span').html('전체보기 닫기');
				$(this).addClass('agree_open').next('div').addClass('agree_view_style').animate({'height':'155'},'fast');
				
			}else{
				$(this).find('span').html('전체보기');
				$(this).removeClass('agree_open').next('div').removeClass('agree_view_style').animate({'height':'0'},'fast');
			}
			return false;
		})
	},
	//리스트 상하이동 - 뱅킹관리
	mnList:function(){
		$('.mn_list .rbtn01 button').click(function(){
			$(".mn_list li").removeClass('selected');
			$(this).parents("li").addClass('selected');
		});

		$('.mn_list .rbtn03 button').click(function(){
			$(".mn_list li").removeClass('selected');
			$(this).parents("li").addClass('selected');
		});
		$('.mn_list .left_btn button').click(function(){
			$(".mn_list li").removeClass('selected');
			$(this).parents("li").addClass('selected');
		});
	},
	
	//메뉴
	menuList:function(){
		$('.menu_list .menu_on > a').click(function(e){
			e.preventDefault();
			if (!$(this).hasClass('menu_open'))
			{
				$(this).find('.menu_txt').html('메뉴숨기기');
				$(this).addClass('menu_open').next('ul').addClass('menu_dep').css('display','block');
			}else{
				$(this).find('.menu_txt').html('메뉴펼쳐보기');
				$(this).removeClass('menu_open').next('ul').removeClass('menu_dep').css('display','none');
			}
			return false;
		})
	},
	//추천상품 상세 sticky 
	stickyHead:function(){
		$(window).scroll(function(){
			var _sticky = $('.stick_head');
			var sticky_h = parseInt(_sticky.outerHeight(true));
			var _tab = $('.tab_st02');
			var tab_h = parseInt(_tab.outerHeight(true));
			var win_t = $(window).scrollTop();

			if(win_t >= tab_h){
				if( _sticky.length){
					_sticky.addClass('active');
					_sticky.parent().css('padding-top', sticky_h);
				}
			} else {
				_sticky.removeClass('active');
				_sticky.parent().css('padding-top', 0);
			}
		});
	},
	// 메인 텍스트 롤링
	rollInfo:function(){
		var $element = $("#rollInfo").find('.info_list');
		var speed = 5000;
		var timer = null;
		var move = $element.children().outerHeight(true);
		var lastChild;

		lastChild = $element.children().eq(-1).clone(true).attr('tabindex','-1');
		lastChild.prependTo($element);
		
		$element.children().eq(-1).remove();

		if($element.children().length==1){
			$element.css('top','0px');
		}else{
			$element.css('top','-'+move+'px');
		};

		timer = setInterval(nextSlide, speed);

		function nextSlide(){
			$element.each(function(idx){
				var firstChild = $element.children().filter(':first-child').clone(true);
				firstChild.appendTo($element.eq(idx));
				$element.children().filter(':first-child').remove();
				$element.css('top','0px');
				$element.eq(idx).animate({'top':'-'+move+'px'}, 'normal');
			});
		}
		// $('#rollInfo .info_list li').on({
		// 	touchstart: function(){
		// 		clearInterval(timer);
		// 	},
		// 	touchend: function(){
		// 		timer = setInterval(nextSlide, speed);
		// 	}
		// });
		$('#rollInfo').on({
			focusin: function(){
				clearInterval(timer);
			},
			focusout: function(){
				timer = setInterval(nextSlide, speed);
			}
		});
	},
	//테마 검색
	themeSearch:function(){
		var theme_menu = $('.theme_menu');
		theme_menu.find('.btn_search_toggle').click(function(){
			theme_menu.find('.serach_keyword').toggle();
			return false;
		});
	 },
	//스크린 크기 변경시
	initResizeOnce:function(){
		var winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		if(!$('body').hasClass('tablet')){
			if(winWidth <= 320){
				viewScale = 1.0;
				$("meta[name='viewport']").attr('content', 'initial-scale=' + viewScale + ', maximum-scale=' + viewScale + ', minimum-scale=' + viewScale + ', user-scalable=no');
			}else if(winWidth > 320){
				viewScale = 1.125;
				$("meta[name='viewport']").attr('content', 'initial-scale=' + viewScale + ', maximum-scale=' + viewScale + ', minimum-scale=' + viewScale + ', user-scalable=no');
			}
		}
	},


	/* ====================================
	* 2018년 고도화 추가
	* =====================================
	*/
	reviewTab : function(){
		var listWrapper = $('.franchisee_review_list');
		var foldLink = listWrapper.find('a.btn_review_toggle');
		var reviewWrapper = $('.review_answer');
		foldLink.click(function(e){
			if(!$(this).hasClass('active')){
				$(this).addClass('active');
				$(this).parent().parent().addClass('current').removeClass('on');
			}else{
				$(this).removeClass('active');
				$(this).parent().parent().removeClass('current on');
			}
			e.preventDefault();
		});
		reviewWrapper.find($('.answer .btn05')).click(function(){
			$(this).parent().nextAll('.review_input').show().find('select').focus();
			$(this).parent().hide();
		});
		reviewWrapper.find($('.review_input .btn05.cancel')).click(function(){
			$(this).parent().parent().hide();
			$(this).parent().parent().prevAll('.tac.answer').removeAttr('style').parent().removeAttr('style').prevAll('.btn_review_toggle').removeClass('active').parent().parent().removeClass('current');
		});
	},
	tooltipNew : function(){
		$('.tooltip_con').find('>a').click(function(e){
			var _parent = $(this).parent();
			e.preventDefault();
			if(!_parent.hasClass('active')){
				_parent.addClass('active');
				$(this).attr('title', '거래 전문 툴팁 닫기');
			} else {
				_parent.removeClass('active');
				$(this).attr('title', '거래 전문 툴팁 보기');
			} 
		});
	}
	
};
/*2018-05-17 추가 [통합은행계좌조회] swipe*/
function swipeTabSet(initialSlide){
	$('.tab-wrapper li.on > a').attr('title','현재메뉴 선택됨');
	var mySwiper1 = new Swiper('.tab-inquery-new .tab-wrapper',{
		resistance: '100%',
		initialSlide: initialSlide,
		spaceBetween : 30,
		onSlideChangeStart : function(swiper) {
			if(swiper.activeLoopIndex == 1) {
				$('.tab-nav.left').show();
				$('.tab-nav.right').hide();
			} else {
				$('.tab-nav.left').hide();
				$('.tab-nav.right').show();
			}
		}
	});
	$('.tab-nav.left').click(function(e){
		mySwiper1.swipePrev();
		e.preventDefault();
	});
	$('.tab-nav.right').click(function(e){
		mySwiper1.swipeNext();
		e.preventDefault();
	});
	if(initialSlide === 0 ){
		$('.tab-nav.left').hide()
	}else{
		$('.tab-nav.right').hide()
	};
};