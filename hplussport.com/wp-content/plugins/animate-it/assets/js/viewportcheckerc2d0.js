(function($){
    $.fn.edsViewportChecker = function(useroptions){
       
        var options = {
        	classToRemove: 'eds-scroll-hidden',
            classToAdd: 'eds-scroll-visible',
            offset: 75,
            callbackFunction: function(elem){}
        };
        $.extend(options, useroptions);
       
        var $elem = this;            

        this.checkElements = function(){
            
            var	windowHeight = $(window).height(),
                viewportTop = $(document).scrollTop(),
                viewportBottom = (viewportTop + windowHeight);

            $elem.each(function(){
                var $obj = $(this);
                var scroll_offset = $obj.attr('eds_scroll_offset');
                
                if ($obj.hasClass(options.classToAdd)){
                    return;
                }

                var elemTop = '';
                if(scroll_offset != null && scroll_offset != ''){
                	elemTop = Math.round( $obj.offset().top ) + Math.round(Number(scroll_offset) * $obj.height() * 0.01),
                    	elemBottom = elemTop + ($obj.height());
                }else{
                	elemTop = Math.round( $obj.offset().top ) + Math.round(options.offset * $obj.height() * 0.01),
                	elemBottom = elemTop + ($obj.height());
                }

                // Add class if in viewport
                if ((elemTop < viewportBottom) && (elemBottom > viewportTop)){                	
                    $obj.addClass(options.classToAdd);
                    $obj.removeClass(options.classToRemove);                    
                    options.callbackFunction($obj);
                }
            });
        };
        
        $( window ).on( "scroll", $.throttle( 250, this.checkElements ) );
        //For applying the onscroll part only after the user scroll atleast ones event after the item is in view port, just comment this out        
        this.checkElements();
        
    };
})(jQuery);
