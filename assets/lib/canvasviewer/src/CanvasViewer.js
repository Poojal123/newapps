angular.module('CanvasViewer',[]).directive('canvasViewer', ['$window', '$http', '$timeout', '$q', function($window, $http, $timeout, $q){
	var formatReader = new FormatReader();

	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			imageSource : '=src',
			overlays : '=overlays',
			title : '@title',
			options : '=options'
		}, // {} = isolate, true = child, false/undefined = no change
		// controller: ['scope', '$element', '$attrs', '$transclude' ,function(scope, $element, $attrs, $transclude) {
		// 	console.log('la',scope.options);
		// 	console.log(scope.options);

		// }],
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		template: '<div class="viewer-container"><canvas class="viewer" '+
				'ng-mouseleave="canMove=false"'+
				'ng-mousedown="mousedown($event)"'+
				'ng-mouseup="mouseup($event)"'+
				'ng-init="canMove=false"'+
				'ng-mousemove="mousedrag($event,canMove)">'+
				'</canvas>'+
				'<div class="title" ng-if="title!=null">{{title}}</div>'+
				'<div class="command" ng-if="options.controls.image">'+
				'<div class="btn btn-info"  accesskey="q" ng-click="options.controls.numPage=options.controls.numPage-1" ng-hide="options.controls.totalPage==1"><i class="glyphicon glyphicon-minus"></i></div>'+
				'<div class="btn btn-info" ng-hide="options.controls.totalPage==1">{{options.controls.numPage}}/{{options.controls.totalPage}}</div>'+
				'<div class="btn btn-info" accesskey="w" ng-click="options.controls.numPage=options.controls.numPage+1" ng-hide="options.controls.totalPage==1"><i class="glyphicon glyphicon-plus"></i></div>'+				
				'<div class="btn btn-info" ng-click="resizeTo(\'page\')"><i class="glyphicon glyphicon-resize-full"></i></div>'+
				'<div class="btn btn-info" accesskey="r" ng-click="rotate(-1)" ng-hide="options.controls.disableRotate"><i class="glyphicon glyphicon-repeat"></i></div>'+
				'<div class="btn btn-info" accesskey="l" ng-click="rotate(1)" ng-hide="options.controls.disableRotate"><i class="glyphicon glyphicon-repeat icon-flipped"></i></div>'+
				'<div class="btn btn-info" accesskey="o" ng-click="zoom(-1)" ng-hide="options.controls.disableZoom"><i class="glyphicon glyphicon-zoom-out"></i></div>'+
				'<div class="btn btn-info" accesskey="i" ng-click="zoom(1)" ng-hide="options.controls.disableZoom"><i class="glyphicon glyphicon-zoom-in"></i></div></div>'+
				'<div class="command" ng-if="options.controls.sound">'+
				'<div class="btn btn-info" ng-click="stop()"><i class="fa fa-stop"></i></div>'+
				'<div class="btn btn-info" ng-click="play()"><i class="fa fa-play"></i></div></div>'+
		'</div>',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function(scope, iElm, iAttrs, controller) {
			
			if(scope.options.position == null){
					scope.options.position = {
							x:0, y:0
						}
			}
			
			
			var	canvasEl = iElm.find('canvas')[0];
			var ctx = canvasEl.getContext('2d');
			// look for
			var inNode = angular.element(iElm.find('div')[0])[0];
			directiveParentNode = inNode.parentNode.parentNode;
			// orce correct canvas size
			var canvasSize = canvasEl.parentNode;
			ctx.canvas.width  = canvasSize.clientWidth;
			ctx.canvas.height = canvasSize.clientHeight;
			var resize = { height : canvasSize.clientHeight, width : canvasSize.clientWidth};			
			// initialize variable
			var img = null;
			scope.curPos = { x : 0, y : 0};
			scope.options.picPos = { x : scope.options.position.x, y : scope.options.position.y};
			var mousePos = { x : 0, y : 0};
			var overlays = [];
			var reader = null;

			// Merge scope with default values
			scope.options = angular.extend ({}, {
				ctx : null,
				adsrc : null,
				zoom : {
					value : 1.0,
					step : 0.1,
					min : 0.05,
					max : 6
				},
				position:{
					x: 0,
					y: 0	
				},
				picPos:{
					x: 0,
					y: 0	
				},
				rotate : {
					value : 0,
					step : 90
				},
				size:{
					w: 0,
					h: 0	
				},
				controls : {
					toolbar : true,
					image : true,
					sound : false,
					fit : 'page',
					disableZoom : false,
					disableMove : false,
					disableRotate : false,
					numPage : 1,
					totalPage : 1,
					filmStrip : false
				},
				info : {}
			}, scope.options );

			scope.options.ctx = ctx;

			function onload() {
				if (reader == null) {
					return;
				}

				if (reader.rendered) {
					applyTransform();
				} else {
					scope.resizeTo(scope.options.controls.fit);
				}
			}



			scope.$watch('imageSource', function(value) {
				if (value === undefined || value === null)
					return;
				// initialize values on load
				scope.options.zoom.value = 1.0;
				scope.options.rotate.value = 0;
				scope.curPos = { x : 0, y : 0};
				//scope.options.picPos = { x : 0, y : 0};
				scope.options.picPos = { x : scope.options.position.x, y : scope.options.position.y};

				// test if object or string is input of directive
				if (typeof(value) === 'object') {
					// Object type file
					if (formatReader.IsSupported(value.type)) {
						// get object
					// Object type file
						var decoder = formatReader.CreateReader(value.type, value);
						// Create image
						reader = decoder.create(value, scope.options, onload, $q, $timeout, ctx);
					} else {
						console.log(value.type,' not supported !');
					}
				} else if(typeof(value) === 'string') {
					reader = formatReader.CreateReader("image/jpeg").create(value, scope.options, onload, $q, $timeout);
				}
			});

			scope.$watch('overlays', function(newarr, oldarr) {
 
				// initialize new overlay
				if (newarr === null || oldarr === null)
					return;

				// new added
				overlays = [];
				angular.forEach(newarr, function(item) {
					overlays.push(item);
				});

				applyTransform();
			}, true);

/*
			scope.$watch('options.position.x', function() {
						scope.options.picPos.x = scope.options.position.x;
						scope.options.picPos.y = scope.options.position.y;
						applyTransform();
						scope.curPos.x = scope.options.position.x;
						scope.curPos.y = scope.options.position.y;
			});
			scope.$watch('options.position.y', function() {
						scope.options.picPos.x = scope.options.position.x;
						scope.options.picPos.y = scope.options.position.y;
						applyTransform();
						scope.curPos.x = scope.options.position.x;
						scope.curPos.y = scope.options.position.y;
			});
*/
			scope.$watch('options.picPos.x', function() {
					applyTransform();
			});
			scope.$watch('options.picPos.y', function() {
					applyTransform();
			});
			scope.$watch('options.zoom.value', function() {
 
				if (!scope.options.controls.disableZoom) {
					applyTransform();
				}
			});

			scope.$watch('options.rotate.value', function() {
				if (!scope.options.controls.disableRotate) {
					applyTransform();
				}
			});

			scope.$watch('options.controls.fit', function(value) {
				scope.resizeTo(value);
			});

			scope.$watch('options.controls.filmStrip', function(position) {
				
				if (position) {
					scope.options.controls.disableMove = true;
					scope.options.controls.disableRotate = true;
				} else {
					scope.options.controls.disableMove = false;
					scope.options.controls.disableRotate = false;
				}
				if (reader.refresh != null) {
					reader.refresh();
				}
			});

			scope.$watch('options.controls.numPage', function(value) {
				// Limit page navigation
				if (scope.options.controls.numPage < 1) scope.options.controls.numPage = 1;
				if (scope.options.controls.numPage > scope.options.controls.totalPage) scope.options.controls.numPage = scope.options.controls.totalPage;
				if (reader != null) {
					if (scope.options.controls.filmStrip) {
						// All pages are already rendered so go to correct page
						scope.options.picPos.y = (scope.options.controls.numPage - 1)  * -(reader.height+15);
						applyTransform();
					} else {
						if (reader.refresh != null) {
							reader.refresh();
						}
					}
				}
			});

			// Bind mousewheel
			angular.element(canvasEl).bind("DOMMouseScroll mousewheel onmousewheel", function($event) {

                // cross-browser wheel delta
                var event = $window.event || $event; // old IE support
                var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
                if (scope.options.controls.filmStrip) {
					scope.options.picPos.y += 50 * delta;
					// Limit range
					if (scope.options.picPos.y > 15) {
						scope.options.picPos.y = 15;
					}
					if (reader.images) {
						if (scope.options.picPos.y - reader.height * scope.options.zoom.value < -(reader.height + 15) * reader.images.length  * scope.options.zoom.value ) {
							scope.options.picPos.y = -(reader.height + 15) * reader.images.length + reader.height;
						}
					} else {
						if (scope.options.picPos.y - reader.height  * scope.options.zoom.value < -reader.height * scope.options.zoom.value ) {
							scope.options.picPos.y = -reader.height * scope.options.zoom.value;
						}
					}
	                //
	                scope.$applyAsync( function() {
	                	applyTransform();
	                });
                } else {
	                if(delta > 0) {
						scope.zoom(1);
	                } else {
						scope.zoom(-1);
	                }
            	}
                // for IE
                event.returnValue = false;
                // for Chrome and Firefox
                if(event.preventDefault) {
                    event.preventDefault();
                }

            });

			function applyTransform() {
				if(reader != null){
				scope.options.size.w = reader.width;
				scope.options.size.h = reader.height;
				}
				if (reader == null) {
					return;
				}
				if (!reader.rendered) {
					return;
				}
				var options = scope.options;
				var canvas = ctx.canvas ;
				var centerX = reader.width * options.zoom.value/2;
				var centerY = reader.height * options.zoom.value/2;
				// Clean before draw
				ctx.clearRect(0,0,canvas.width, canvas.height);
				// Save context
				ctx.save();
				// move to mouse position
				ctx.translate((scope.options.picPos.x + centerX), (scope.options.picPos.y + centerY) );
				// Rotate canvas
				ctx.rotate( options.rotate.value * Math.PI/180);
				// Go back
				ctx.translate( - centerX, - centerY);
				// Change scale
				if (reader.isZoom)
					ctx.scale( options.zoom.value , options.zoom.value);
				if ((!options.controls.filmStrip) || (options.controls.totalPage == 1)) {
					if (reader.img != null) {
						ctx.drawImage(reader.img, 0 , 0 , reader.width , reader.height);
						ctx.beginPath();
						ctx.rect(0, 0, reader.width , reader.height );
						ctx.lineWidth = 0.2;
						ctx.strokeStyle = "#000000";
						ctx.stroke();
					}
					// Draw image at correct position with correct scale
					if (reader.data != null) {
	    				ctx.putImageData(reader.data, scope.options.picPos.x, scope.options.picPos.y);					
						ctx.beginPath();
						ctx.rect( 0, 0, reader.width , reader.height );
						ctx.lineWidth = 0.2;
						ctx.strokeStyle = "#000000";
						ctx.stroke();
					} 
				} else {
					if (reader.images != null) {
						angular.forEach(reader.images, function(image) { 
							ctx.drawImage(image, 0 , 0 , image.width , image.height);
							ctx.beginPath();
							ctx.rect(0, 0, image.width , image.height );
							ctx.lineWidth = 0.2;
							ctx.strokeStyle = "#000000";
							ctx.stroke();
							ctx.translate(0, image.height + 15);
						});
					}
					// Draw image at correct position with correct scale
					if (reader.data != null) {
						var offsetY = 0;
						angular.forEach(reader.data, function(data) { 
		    				ctx.putImageData(data, scope.options.picPos.x, scope.options.picPos.y + offsetY);					
							ctx.beginPath();
							ctx.rect( 0, 0, reader.width , reader.height );
							ctx.lineWidth = 0.2;
							ctx.strokeStyle = "#000000";
							ctx.stroke();
							offsetY += reader.height + 15;
							ctx.translate(0, offsetY);
						});
					} 
				}
				// Restore
				ctx.restore();

				// Draw overlays
				if (overlays.length >0) {
					angular.forEach(overlays, function(item) {
					    ctx.save();
						// move to mouse position
						ctx.translate((scope.options.picPos.x + centerX) , (scope.options.picPos.y + centerY));
						// Rotate canvas
						ctx.rotate( options.rotate.value * Math.PI/180);
						// Go back
						ctx.translate(- centerX, - centerY);
						// Change scale
						ctx.scale( options.zoom.value , options.zoom.value);
						// Start rect draw
						ctx.beginPath();
						ctx.rect((item.x ), (item.y ), item.w , item.h );
						ctx.fillStyle = item.color;
						ctx.globalAlpha = item.alpha; //0.1; //0.4;
						ctx.fill();
						ctx.lineWidth = 1;
						ctx.strokeStyle = item.color;
						ctx.stroke();
					    ctx.restore();
					});
				}
				
				
				//alert(JSON.stringify(scope.options.picPos));
			}

			angular.element(canvasEl).bind('mousedown' , function($event) {
				if (scope.options.controls.disableMove) {
					return;
				}

				scope.canMove = true;
				scope.curPos.x = $event.offsetX;
				scope.curPos.y = $event.offsetY;
			});

			angular.element(canvasEl).bind('mouseup', function($event) {
				if (scope.options.controls.disableMove) {
					return;
				}

				scope.canMove = false;
			});

			angular.element(canvasEl).bind('mousemove', function($event) {
				mousePos.x = $event.offsetX;
				mousePos.y = $event.offsetY;
				scope.options.position.x = scope.curPos.x;
				scope.options.position.y = scope.curPos.y;

				if (scope.options.controls.disableMove) {
					return;
				}

				if ((reader !== null) && (scope.canMove)) {
						var coordX = $event.offsetX;
						var coordY = $event.offsetY;
						var translateX = coordX - scope.curPos.x;
						var translateY = coordY - scope.curPos.y;
						scope.options.picPos.x += translateX;
						scope.options.picPos.y += translateY;
						applyTransform();
						scope.curPos.x = coordX;
						scope.curPos.y = coordY;
				}
			});

			scope.zoom = function(direction) {
				scope.$applyAsync(function() {
					var oldWidth, newWidth = 0;
					var oldHeight, newHeight = 0;
					// Does reader support zoom ?
					// Compute correct width
					if (!reader.isZoom) {
						oldWidth = reader.oldwidth;
						oldHeight = reader.height;
					} else {
						oldWidth = reader.width * scope.options.zoom.value;
						oldHeight = reader.height * scope.options.zoom.value;
					}

					// Compute new zoom
					scope.options.zoom.value += scope.options.zoom.step * direction;
					// Round
					scope.options.zoom.value = Math.round(scope.options.zoom.value*100)/100;
					if (scope.options.zoom.value >= scope.options.zoom.max) {
						scope.options.zoom.value = scope.options.zoom.max;
					}
					if (scope.options.zoom.value <= scope.options.zoom.min) {
						scope.options.zoom.value = scope.options.zoom.min;
					}
					// Refresh picture
					if (reader.refresh != null) {
						reader.refresh();
					}

					
					// Compute new image size
					if (!reader.isZoom) {
						newWidth = reader.width;
						newHeight = reader.height;
					} else {
						newWidth = reader.width * scope.options.zoom.value;
						newHeight = reader.height * scope.options.zoom.value;
					}
					// new image position after zoom
					scope.options.picPos.x = scope.options.picPos.x - (newWidth - oldWidth)/2;
					scope.options.picPos.y = scope.options.picPos.y - (newHeight - oldHeight)/2;
				});				
			}

			scope.rotate = function(direction) {
				scope.$applyAsync(function() {
					scope.options.rotate.value += scope.options.rotate.step * direction;
					if ((scope.options.rotate.value <= -360) || (scope.options.rotate.value >= 360)) {
						scope.options.rotate.value = 0;
					}
					applyTransform();
				});
			};

			var centerPics = function() {
				// Position to canvas center
				var centerX = ctx.canvas.width / 2;
				var picPosX = 0;
				picPosX =  centerX - (reader.width * scope.options.zoom.value) / 2;
				scope.curPos = { x : picPosX, y : 0};
				scope.options.picPos = { x : picPosX, y : 0};
			}

			scope.resizeTo = function(value) {
				if ((ctx.canvas == null) || (reader == null))  {
					return;
				}
				// Compute page ratio
				var options = scope.options;
				var ratioH = ctx.canvas.height / reader.height;
				var ratioW = ctx.canvas.width / reader.width;
				// If reader render zoom itself
				// Precompute from its ratio
				if (!reader.isZoom) {
					ratioH *= scope.options.zoom.value;				
					ratioW *= scope.options.zoom.value;
				}
				// Adjust value
				switch(value) {
					case 'width' : scope.options.zoom.value = ratioW; break;
					case 'height' : scope.options.zoom.value = ratioH; break;
					case 'page' :
					default : scope.options.zoom.value = Math.min(ratioH,ratioW); 
				}
				scope.$applyAsync(function() {
					// Round zoom value
					scope.options.zoom.value = Math.round(scope.options.zoom.value*100)/100;
					// Update options state
					scope.options.controls.fit = value;
					if (!reader.isZoom) {
						if (reader.refresh != null) {
							reader.refresh();
						}

						// Re center image
						centerPics();
					} else {
						// Re center image
						centerPics();
						applyTransform();
					}
				});
			}

			scope.play = function() {
				if (scope.options.adsrc!=null) {
					scope.options.adsrc.start(0);
				}
			}

			scope.stop = function() {
				if (scope.options.adsrc!=null) {
					scope.options.adsrc.stop(0);
				}
			}
			
			function resizeCanvas() {
				scope.$applyAsync(function() {
					var canvasSize = canvasEl.parentNode;
					ctx.canvas.width  = canvasSize.clientWidth;
					ctx.canvas.height = canvasSize.clientHeight;
					applyTransform();
				});
			}
			// Keep object
			function parentChange() {
				if (resize.width != canvasEl.parentNode.clientWidth) {
					resize.width = canvasEl.parentNode.clientWidth;
				}

				if (resize.height != canvasEl.parentNode.clientHeight) {
					resize.height = canvasEl.parentNode.clientHeight;
				}
				return resize;
			}
			//
			scope.$watch(parentChange, function() {
					resizeCanvas();	
			}, true);





			
			
			
   //      	// resize canvas on window resize to keep aspect ratio
			// angular.element($window).bind('resize', function() {
			//  	resizeCanvas();
			// });
      	}
	};
}]);
