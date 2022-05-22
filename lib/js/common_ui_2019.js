var common_ui_new = function() {
    //TextField 설정
	var _setTextField = (function() {
        var timer = null;   

        $('.u-2019').on({
            'focus change keyup': function() {
                var that = $(this);

                that.addClass('focus-on');

                if(that.val() == '' || that.is('[readonly]') || that.is('[disabled]')) {                    
                    that.next('.btn-clear').hide();
                } else {
                    that.next('.btn-clear').show();
                }                
            },
            'paste': function() {
                var that = $(this);

                that.addClass('focus-on');
                
                timer = setTimeout(function() {
                    if(that.val() == '' || that.is('[readonly]') || that.is('[disabled]')) {
                        that.next('.btn-clear').hide();
                    } else {
                        that.next('.btn-clear').show();
                    }                
                }, 100);                
            },
            'focusout': function() {                
                var that = $(this);

                that.removeClass('focus-on');

                timer = setTimeout(function() {
                    that.next('.btn-clear').hide();
                }, 100);
            }
        }, '.ipt');

        $('.u-2019').on({
            'click': function() {
                clearTimeout(timer);
                var that = $(this);

                that.prev('.ipt').val('').focus();
                that.hide();
            },
            'focus': function() {
                clearTimeout(timer);
            },
            'focusout': function() {
                $(this).hide();
            }
        }, '.btn-clear');
    }());

    //아코디언
    var _setAccordion = (function() {
        $('.u-2019 .accordion .acc-btn').each(function() {
            var btn = $(this);
            
            if(typeof btn.attr('type') == 'undefined' && btn[0].tagName.toUpperCase() == 'BUTTON') {      
                btn.prop('type', 'button');
            }
        }); 

        $('.u-2019').on('click', '.accordion .acc-btn', function(e) {
            var that = $(this);
            var status = ($(this).find('.status').index() > -1) ? $(this).find('.status') : $(this);
            var parent = that.closest('.accordion');

            e.preventDefault();

            if(parent.hasClass('active')) {                
                parent.removeClass('active').children('.acc-contents').slideUp(150, function() {                    
                    that.attr('aria-expanded', false);
                    status.text('펼치기');
                });
                
            } else {                
                parent.addClass('active').children('.acc-contents').slideDown(150, function() {
                    that.attr('aria-expanded', true);
                    status.text('닫기');
                }); 
            }            
        });   
    }());

    //내용 토글
    var _setToggle = (function() {
        $('.u-2019').on('click', '[data-toggle-btn^=toggle]', function(e) {
            var that = $(this),
                toggleId = that.data('toggle-btn'),
                len = $('.u-2019 [data-toggle-btn^=toggle]').length;

            if(that[0].tagName.toUpperCase() == 'A') {
                e.preventDefault();
            }

            if(len > 1) {
                $('[data-toggle-btn^=toggle]').attr({'aria-selected':'false', 'title':''}).removeClass('on');;
                $('[data-toggle-contents^=toggle]').hide();
                that.attr({'aria-selected':'true', 'title':'선택됨'}).addClass('on');
                $('[data-toggle-contents=' + toggleId +']').show();
            } else {    //1개일 경우 자기 자신 toggle                
                if($(this).is(':radio')) {
                    if($(this).is(':checked') && $('[data-toggle-contents=' + toggleId +']').is(':hidden')) {
                        $('[data-toggle-contents=' + toggleId +']').show();    
                    }
                } else {
                    $('[data-toggle-contents=' + toggleId +']').toggle();
                }
            }  
        });   
    }());

    //bottom sheet
    var _setBottomSheet = (function(id) {
        id = (typeof id == 'undefined') ? null : id;

        if(id == null) {
            $('.u-2019').on('click', '.bspop', function(e) {			
                var that = $(this),
                    target = (that[0].tagName.toUpperCase() == 'A') ? that.attr('href') : that.attr('rel');
                
                if(typeof target == 'undefined' || target == '') return false;
                if(that[0].tagName.toUpperCase() == 'A') e.preventDefault();

                target = $(target);			
                
                target.show(100, function() {
                    target.siblings().attr('aria-hidden', 'true');
                    target.addClass('on').find('.bs-inner > :eq(0)').attr('tabindex', -1).focus();
                });

                if(typeof $._data(target.find('.close')[0], 'events') == 'undefined') {
                    target.find('.close').on('click', function(e) {
                        target.removeClass('on').delay(300).queue(function() {
                            target.siblings().attr('aria-hidden', 'false');
                            $(this).hide().dequeue();                            
                            that.focus();
                        });				
                    });	
                }				
            }); 

        } else {            
            target = $(id);			
            
            target.show(100, function() {
                target.addClass('on').attr('tabindex', -1).focus();
            });
        }            
    });

    //tooltip
    var setTooltip = (function() {
        $('.u-2019').on('click', '.bt-tooltip', function(e) {	            
            var that = $(this),
                target = (that[0].tagName == 'a') ? that.attr('href') : that.attr('rel'),
                y = that.offset().top;
            
            if(typeof target == 'undefined' || target == '') return false;
            if(that[0].tagName.toUpperCase() == 'A') e.preventDefault();

            target = $(target);
            
            /* dimmed */
			$('body').append('<div id="layermask"></div>');
			$('#layermask').css({
				'width' : $(window).width(),
                'height' : $(document).height(),
                'background': 'rgba(0,0,0,0.1)'
			});
			$('#layermask').show();
            
            target.css({                
                'top': y + 'px',
                'marginLeft': '-' + (target.outerWidth() / 2) + 'px'
            })
            .addClass('on').find('> :eq(0)').attr('tabindex', -1).focus();  
            target.siblings().attr('aria-hidden', 'true');          

            if(typeof $._data(target.find('.close')[0], 'events') == 'undefined') {
                target.find('.close').on('click', function(e) {
                    $('#layermask').remove();
                    target.siblings().attr('aria-hidden', 'false');          
                    target.removeClass('on');
                    that.focus();	
                });	
            }	
                   
            
        });              
    }());

    //tab (3개 반)
    var _setTab = (function(num) {
        var win_w = $(window).width(),
			total_w = 0,
			cal_w = 0,
            ratio = 0,
            x = 0,
			parent = $('.tab-wrap');
			
		parent.find('li:visible').each(function(idx, arr) {
			if(idx < 3) {
				cal_w += parent.find('li:eq(' + idx + ')').width();	
			} else if(idx == 3) {
				cal_w += parent.find('li:eq(' + idx + ')').width() / 2;
			}

			total_w += parent.find('li:eq(' + idx + ')').width();            
        });
		

		if(win_w < total_w) {
			ratio = win_w / cal_w;            
            
			parent.find('li').each(function(idx, arr) {
				$(this).width($(this).width() * ratio);
            });

            parent.addClass('resize');
            
            if(num > 0) {
                x = $('.tab-wrap li:eq(' + num + ')').offset().left;
                $('.tab-wrap').scrollLeft(x);
            }
		}
    });

    //AS-IS 접근성 수정
    var _setModify = (function() {
        //popup
        $('.layerpop').click(function(e) {
            var that = $(this),
                layerpopup = $((typeof that.attr('rel') == 'undefined') ? that.attr('href') : that.attr('rel')),
                parent = layerpopup.parent(),
                sibling = null,
                depth = $(layerpopup, '.u-2019').parents('div').length - 2;
            
            for(var i=0; i<depth; i++) {                
                sibling = (sibling == null) ? parent : sibling.add(parent);
                parent = parent.parent();
            }
            
            layerpopup.add(sibling).siblings().add('#layermask').attr('aria-hidden', 'true');            
            layerpopup.data('target', that).find('.pop-inner > :eq(0)').attr('tabindex', 0).focus();
        });

        $('.layerwrap .close, .layerwrap .btn_close').click(function(e) {
            var layerpopup = $(this).closest('.layerwrap'),                
                parent = layerpopup.parent(),
                sibling = null,
                depth = $(layerpopup, '.u-2019').parents('div').length - 2;

            for(var i=0; i<depth; i++) {                
                sibling = (sibling == null) ? parent : sibling.add(parent);
                parent = parent.parent();
            }

            layerpopup.add(sibling).siblings().add('#layermask').attr('aria-hidden', 'false');            
            $(layerpopup.data('target')).focus();
        });

        //tab
        if($('[role=tablist]').index() > -1) {
            var tablist = $('[role=tablist]');

            if(typeof tablist.find('li:eq(0)').attr('role') == 'undefined') {                
                tablist.find('li').each(function(idx, arr) {
                    $(this).attr('role', 'none presentation');
                }).find('a').removeAttr('title');
            }
        }
    }());
        
    _setBottomSheet();    

    return {
        setBottomSheet : function(id) {
			_setBottomSheet(id);
        },
        setTab : function(num) {
            num = (typeof num == 'undefined') ? 0 : num;
			_setTab(num);
		}
    }
};

var CommonUiNew;

$(function() {
    //임시 추가 -----------------------------------------
    //if(document.location.href.indexOf('test_2019') != -1) {
        common_ui.init(); 
    //}
	//---------------------------------------------------
    CommonUiNew = common_ui_new();

    if($('.tab-wrap.ty2').index() > -1) {
        CommonUiNew.setTab();
    }    
});
