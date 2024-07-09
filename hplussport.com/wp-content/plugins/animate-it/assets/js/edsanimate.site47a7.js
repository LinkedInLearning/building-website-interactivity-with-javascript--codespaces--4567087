( function( $, document, window){
	
	var edsWObj = $(window);
	$.fn.initEDSAnimateBlock = function() {
		
		var obj = this.length > 1 ? this.eq(0) : this;
				
		this.edsTotalRepeatCount = 1;
		this.edsAnimateInfinite = false;
		this.edsAnimations = [];		
		this.edsKeepValue = false;
		this.edsScrollOffset = 0;		
		this.edsElemAnimating = false;
		
		this.checkPosition = function() {
						
			var windowHeight = edsWObj.height(),
            viewportTop = $(document).scrollTop(),
            viewportBottom = (viewportTop + windowHeight),			
			elemTop = '';
			
            if( obj.edsScrollOffset != null && obj.edsScrollOffset != ''){
             	elemTop = Math.round( obj.offset().top ) + Math.round(Number(obj.edsScrollOffset) * obj.height() * 0.01),
                 	elemBottom = elemTop + (obj.height());
             }else{
             	elemTop = Math.round( obj.offset().top ) + Math.round(options.offset * obj.height() * 0.01),
             	elemBottom = elemTop + (obj.height());
             }

             // Add class if in viewport
             if ((elemTop < viewportBottom) && (elemBottom > viewportTop)){
            	 obj.edsInit();
             }		
		}
		
		this.edsAnimate = function(counter, iteration) {			
			obj.removeClass('edsanimate-sis-hidden' );			
			obj.animo( obj.edsAnimations[ counter ].animoSettings, function() {
				counter++ 
				if( counter < obj.edsAnimations.length ) {																												
					setTimeout( function(){obj.edsAnimate( counter, iteration )}, Number(obj.edsAnimations[counter].delay) * 1000);
				} else {							
					iteration++;
					if( true == obj.edsAnimateInfinite || iteration < obj.edsTotalRepeatCount) {
						if(obj.edsAnimations.length == 1) {
							obj.animo("cleanse");
						}													
						setTimeout( function(){obj.edsAnimate( 0, iteration )}, Number(obj.edsAnimations[0].delay) * 1000);	
					}else{
						obj.edsElemAnimating = false;
					}			
				}
				
			});
		};		
		
		this.edsInit = function() {			
			if( obj.edsAnimations.length >= 1 ) {				
				setTimeout( function(){obj.edsAnimate( 0, 0 )}, Number( obj.edsAnimations[0].delay ) * 1000);			
			}	
		}
		
		if("yes" == this.data('edsKeep') ) {
			this.edsKeepValue = true;
		}
		
		if( '' != this.data('edsEntryAnimation') ) {	
			
			this.edsAnimations.push({
				animoSettings: {
					animation:  this.data('edsEntryAnimation'),
					duration: this.data('edsEntryDuration'),
					iterate: 1,
					timing: this.data('edsEntryTiming'),
					keep: this.edsKeepValue
				},				
				delay: this.data('edsEntryDelay')
				
			});
			
		}	
		
		if( '' != this.data('edsExitAnimation') ) {
			
			this.edsAnimations.push({
				animoSettings: {
					animation:  this.data('edsExitAnimation'),
					duration: this.data('edsExitDuration'),					
					iterate: 1,
					timing: this.data('edsExitTiming'),
					keep: this.edsKeepValue
				},				
				delay: this.data('edsExitDelay'),
				
			});
			
		}
		
		if( "infinite" ==  this.data('edsRepeatCount') ) {																		
			this.edsAnimateInfinite = true;												
		} else {						
			this.edsAnimateInfinite = false;	
			this.edsTotalRepeatCount =  this.data('edsRepeatCount');
		}			
		
		if( "load" == this.data('edsAnimateOn') ) {			
			this.edsInit();			
		} else if( "scroll" == this.data('edsAnimateOn') ) {			
			this.edsScrollOffset = this.data('edsScrollOffset');			
			edsWObj.on("scroll", $.throttle( 250, this.checkPosition ) );
			this.checkPosition();
			
		} else if( "hover" == this.data('edsAnimateOn') ) {			
			this.on("mouseenter", function (){
				if( !obj.edsElemAnimating ){
					obj.animo("cleanse");
					obj.edsElemAnimating = true;
					obj.edsInit();				
				}
			} );			
			
		} else if( "click" == this.data('edsAnimateOn') ) {
			this.on("click", function () {
				if( !obj.edsElemAnimating ){
					obj.animo("cleanse");
					obj.edsElemAnimating = true;
					obj.edsInit();
				}
			} );
		}
		
	};
	
	$(document).ready( function() {
		
		if( typeof edsanimate_options  !== 'undefined' ) {
			if( $('.eds-animate').length >= 1 ){				
				( '1' == edsanimate_options.hide_hz_scrollbar ) ? $('body').css('overflow-x', 'hidden'): '';			
				( '1' == edsanimate_options.hide_vl_scrollbar ) ? $('body').css('overflow-y', 'hidden'): '';				
			}
		}		
		
		$('.eds-animation-paused').removeClass('eds-animation-paused');
		
		$('.eds-animate').each( function(){			
			$(this).initEDSAnimateBlock();			
		});
		
	} );
	
} )(jQuery, document, window );