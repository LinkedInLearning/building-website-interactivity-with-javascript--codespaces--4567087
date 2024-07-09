(function($) {
	$(document).ready(function(){
		var animationStyleClasses = ["animated","infinite", "bounce", "flash", "pulse", "rubberBand", "shake", "swing", "tada", "wobble", "bounceIn", "bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp", "bounceOut", "bounceOutDown", "bounceOutLeft", "bounceOutRight", "bounceOutUp", "fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig", "fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig", "fadeOut", "fadeOutDown", "fadeOutDownBig", "fadeOutLeft", "fadeOutLeftBig", "fadeOutRight", "fadeOutRightBig", "fadeOutUp", "fadeOutUpBig", "flip", "flipInX", "flipInY", "flipOutX", "flipOutY", "lightSpeedIn", "lightSpeedOut", "rotateIn", "rotateInDownLeft", "rotateInDownRight", "rotateInUpLeft", "rotateInUpRight", "rotateOut", "rotateOutDownLeft", "rotateOutDownRight", "rotateOutUpLeft", "rotateOutUpRight", "slideInUp", "slideInDown", "slideInLeft", "slideInRight", "slideOutUp", "slideOutDown", "slideOutLeft", "slideOutRight", "hinge", "rollIn", "rollOut", "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp", "zoomOut", "zoomOutDown", "zoomOutLeft", "zoomOutRight", "zoomOutUp", "wiggle", "fade", "appear", "spinner", "twirlIn", "twirlOut", "grow", "shrink", "pulseGrow", "pulseShrink", "push", "pop", "rotate", "growRotate", "float", "sink", "skew", "skewForward", "skewBackward", "wobbleHorizontal", "wobbleVertical", "wobbleToBottomRight", "wobbleToTopRight", "wobbleTop", "wobbleBottom", "wobbleSkew", "buzz", "buzzOut", "forward", "backward"];
		var delayClasses  = ["delay1", "delay2", "delay3", "delay4", "delay5", "delay6", "delay7", "delay8", "delay9", "delay10", "delay11", "delay12"];
		var durationClasses  = ["duration1", "duration2", "duration3", "duration4", "duration5", "duration6", "duration7", "duration8", "duration9", "duration10", "duration11", "duration12", "duration13", "duration14", "duration15", "duration16", "duration17", "duration18", "duration19", "duration20"];
		var scrollOffset = edsanimate_options.offset;				
	
		$('.eds-animation-paused').removeClass('eds-animation-paused');				
		
		$('.eds-on-scroll').each(function(){
			var $module = $(this);		
			
			var classesToAdd = " eds-scroll-visible ";
					
			$module.removeClass(function(index, className){
				var removeClassList = "";
				var classList = className.trim().split(/\s+/);
				$.each(classList, function(index, value){
					if(($.inArray(value, animationStyleClasses)!==-1) 
						|| ($.inArray(value, delayClasses)!==-1)
						|| ($.inArray(value, durationClasses)!==-1))
						removeClassList += " " + value;							
				});
				
				classesToAdd += removeClassList;			
				return removeClassList;					
			});
			
			$module.addClass("eds-scroll-hidden");
			
			$module.edsViewportChecker({
		        classToAdd: classesToAdd,
				offset: scrollOffset 
		       });					
	
		});
		
		$('.eds-on-click').each(function(){
			var $module = $(this);		
			
			var classesToAdd = " ";
					
			$module.removeClass(function(index, className){
				var removeClassList = "";
				var classList = className.trim().split(/\s+/);
				$.each(classList, function(index, value){
					if(($.inArray(value, animationStyleClasses)!==-1) 
						|| ($.inArray(value, delayClasses)!==-1)
						|| ($.inArray(value, durationClasses)!==-1))
						removeClassList += " " + value;							
				});
				
				classesToAdd += removeClassList;			
				return removeClassList;					
			});		
			
			$module.click(function (){
				 $(this).removeClass(classesToAdd).addClass(classesToAdd).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				      $(this).removeClass(classesToAdd);
				 });				
			});					
	
		});	
		
		$('.eds-on-hover').each(function(){
			var $module = $(this);		
			
			var classesToAdd = " ";
					
			$module.removeClass(function(index, className){
				var removeClassList = "";
				var classList = className.trim().split(/\s+/);
				$.each(classList, function(index, value){
					if(($.inArray(value, animationStyleClasses)!==-1) 
						|| ($.inArray(value, delayClasses)!==-1)
						|| ($.inArray(value, durationClasses)!==-1))
						removeClassList += " " + value;							
				});
				
				classesToAdd += removeClassList;			
				return removeClassList;					
			});		
			
			var hovered = false;
			$module.hover(
				function (){
					hovered = true;
					 $(this).removeClass(classesToAdd).addClass(classesToAdd).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					      $(this).removeClass(classesToAdd);
					 });	
				},
				function (){		
					hovered = false;
					 $(this).on('webkitAnimationIteration oanimationiteration msAnimationiteration animationiteration', function(e){
						if(!hovered){ 
							$(this).removeClass(classesToAdd);
						}
					 });
				}
			);					
	
		});		
		
		
	});	
})(jQuery);