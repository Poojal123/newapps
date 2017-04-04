// JavaScript Document
bpoApps.directive('rotate', function() {
    return {
        link: function(scope, element, attrs) {
            // watch the degrees attribute, and update the UI when it changes
            scope.$watch(attrs.degrees, function(rotateDegrees) {
                //transform the css to rotate based on the new rotateDegrees
                element.css({
                    '-moz-transform': 'rotate(' + rotateDegrees + 'deg)',
                    '-webkit-transform': 'rotate(' + rotateDegrees + 'deg)',
                    '-o-transform': 'rotate(' + rotateDegrees + 'deg)',
                    '-ms-transform': 'rotate(' + rotateDegrees + 'deg)'
                });
            });
        }
    }
});

bpoApps.controller('casaImageIndexController', function($scope, $http, DocTypes, casafolderscan, Indextype, NriType,MergeImages,toastr,$parse,OptimizeImage,$timeout) {

$scope.selectedindextype = {};
$scope.selectednritype = {};

	$scope.promoreadonly = false;
	$scope.promoCodeLen = 3;
	$scope.promoCodePattern = "(.*?)";
	$scope.appnoLen = -1;
	$scope.appnoPattern = "(.*?)";
	$scope.accnoLen = -1;
	$scope.accnoPattern = "(.*?)";

 $scope.$watch('defaultZoomVal', function() {
			$scope.defaultZoom();
    });

	$scope.validateExpiryDate = function(){
		var dt = $scope.indexObject.expirydate+"";
		// mm/01/yyyy
		var expiryyear = dt.slice(2);
		dt = dt.slice(0, 2) + "/01/" + dt.slice(2);
    	var expirymonth =dt.slice(0, 2);
    //  console.log(expirymonth);
	    var myDateTime = Date.parse(dt);
		if(!isNaN(myDateTime)){
				var currentDate = new Date();
                                 var currenyMonth = currentDate.getMonth()+1;
				var currentYear = currentDate.getFullYear();
				var expiryYear = expiryyear;
				if(expiryYear < currentYear ){
                                    
                                    $timeout(function(){
						$("#expirydate").focus();
					 }, 500);
					toastr.error('Invalid Expiry Date');
                                        $(':input[type="submit"]').prop('disabled', true);
                                        return false;

                                    }else if(expiryYear == currentYear){
                                        if(expirymonth < currenyMonth){
                                            $timeout(function(){
						$("#expirydate").focus();
					 }, 200);
					toastr.error('Invalid Expiry Date');
                                        $(':input[type="submit"]').prop('disabled', true);
                                        return false;
                                        }
                                    }else{
                                         $("#expirydate").keyup(function () {
                                            $timeout(function(){
                                               $(':input[type="submit"]').prop('disabled', false);
                                            if (this.value.length == this.maxLength) {
                                                 
                                                $("#expirydate").focusout();
                                          }
                                            },200);
                                        });
                                    }
                                
                             }else{
                        console.log("hiii");
                        $timeout(function(){
                                $("#expirydate").focus();
                         }, 500);

			toastr.error('Invalid Expiry Date');
                        $(':input[type="submit"]').prop('disabled', true);
                        return false;
                        
		}
                
             $("#expirydate").keyup(function () {
                console.log("kjk");
                   $timeout(function(){
                                               $(':input[type="submit"]').prop('disabled', false);
                                            if (this.value.length == this.maxLength) {
                                                 
                                                $("#expirydate").focusout();
                                          }
                                            },200);
//                if (this.value.length == 0) {
//                     $timeout(function(){
//                    $(':input[type="submit"]').prop('disabled', false);
//                    $("#expirydate").focusout();
//                },300);
//                }
            });
//                 
           

	}

	$scope.applyValidations = function(){
//alert("jiiii");
			$scope.promoreadonly=false;

			if($scope.selectedindextype.selectedItem.indexingId == 7 )
			{
				 $timeout(function(){
					$("#casanrisubtype").focus();
				 }, 500);
			}
			else{
				$scope.selectednritype = {};
			}

			if($scope.selectedindextype.selectedItem.indexingId == 7 && $scope.selectednritype.selectedItem != null)
			{
				if($scope.selectednritype.selectedItem.nriId == 3){ // NRI NFF1
					$scope.indexObject.hasPromo = "AOD";
				}else{
//					$scope.indexObject.hasPromo = "";
				}
			}else{
//				$scope.indexObject.hasPromo = "";
			}

			if($scope.selectedindextype.selectedItem.indexingId == 1){ // REGULAR
				$scope.promoCodeLen = 3;
				$scope.promoCodePattern = "^[0-9]*$";
				$scope.appnoLen = 8;
				$scope.appnoPattern = "^[0-9]*$";
				$scope.accnoLen = 12;
				$scope.accnoPattern = "(.*?)";

				 $timeout(function(){
					$("#promocode").focus();
				 }, 500);

			}

			if($scope.selectedindextype.selectedItem.indexingId == 6){ // CA - CURRENT ACCOUNT
				$scope.promoCodeLen = -1;
				$scope.promoCodePattern = "(.*?)";
				$scope.appnoLen = 11;
				$scope.appnoPattern = "^[0-9]*$";
				$scope.accnoLen = -1;
				$scope.accnoPattern = "^[0-9]*$";
				$scope.promoreadonly=true;

				 $timeout(function(){
					$("#applicationno").focus();
				 }, 500);

			}

			if($scope.selectedindextype.selectedItem.indexingId == 8){ // REKYC
				$scope.promoCodeLen = -1;
				$scope.promoCodePattern = "(.*?)";
				$scope.appnoLen = -1;
				$scope.appnoPattern = "(.*?)";
				$scope.accnoLen = 12;
				$scope.accnoPattern = "^[0-9]*$";

				 $timeout(function(){
					$("#accountno").focus();
				 }, 500);

			}

			if($scope.selectedindextype.selectedItem.indexingId == 9){ // SALARY WEEDING
				$scope.promoCodeLen = -1;
				$scope.promoCodePattern = "(.*?)";
				$scope.appnoLen = -1;
				$scope.appnoPattern = "(.*?)";
				$scope.accnoLen = 12;
				$scope.accnoPattern = "^[0-9]*$";

				 $timeout(function(){
					$("#accountno").focus();
				 }, 500);

			}

			if($scope.selectedindextype.selectedItem.indexingId == 10){ // ECS MANDATE
				$scope.promoCodeLen = -1;
				$scope.promoCodePattern = "(.*?)";
				$scope.appnoLen = -1;
				$scope.appnoPattern = "(.*?)";
				$scope.accnoLen = 12;
				$scope.accnoPattern = "^[0-9]*$";

				 $timeout(function(){
					$("#accountno").focus();
				 }, 500);

			}
			if ($scope.selectednritype.selectedItem != null){
				if($scope.selectedindextype.selectedItem.indexingId == 7 && $scope.selectednritype.selectedItem.nriId == 1){ // NRI FFA

				$scope.promoCodeLen = 3;
				$scope.promoCodePattern = "^[0-9]*$";
				$scope.appnoLen = 9;
				$scope.appnoPattern = "^[0-9]*$";
				$scope.accnoLen = -1;
				$scope.accnoPattern = "(.*?)";

				$timeout(function(){
					$("#promocode").focus();
				 }, 500);
				}
			}

			if($scope.selectednritype.selectedItem != null){

				if($scope.selectedindextype.selectedItem.indexingId == 7 && $scope.selectednritype.selectedItem.nriId == 2){ // NRI NFF
				$scope.promoCodeLen = -1;
				$scope.promoCodePattern = "(.*?)";
				$scope.appnoLen = 5;
				$scope.appnoPattern = "^[0-9]*$";
				$scope.accnoLen = -1;
				$scope.accnoPattern = "(.*?)";
				$scope.promoreadonly=true;
				$timeout(function(){
					$("#applicationno").focus();
				 }, 500);
				}
			}

			if($scope.selectedindextype.selectedItem != null){

				if($scope.selectedindextype.selectedItem.indexingId == 7 && $scope.selectednritype.selectedItem.nriId == 3){ // NRI NFF1

				$scope.promoCodeLen = 3;
				$scope.promoCodePattern = "[a-zA-Z]+(\s[a-zA-Z]+)*$";
				$scope.appnoLen = 6;
				$scope.appnoPattern = "^[0-9]*$";
				$scope.accnoLen = -1;
				$scope.accnoPattern = "(.*?)";
				$timeout(function(){
					$("#applicationno").focus();
				 }, 500);
				}
			}

//alert("TEST");

	}

$("#promocode").keydown(function(e){
		var obj = document.getElementById("promocode");
		var code = e.keyCode || e.which;

		if(obj.validity.valid==false)
		{
			obj.reportValidity();
			if(code == 9 || code == 13){
				e.preventDefault();
			}
		}


});

$("#applicationno").keydown(function(e){
		var obj = document.getElementById("applicationno");
		var code = e.keyCode || e.which;

		if(obj.validity.valid==false)
		{
			obj.reportValidity();
			if(code == 9 || code == 13){
				e.preventDefault();
			}
		}


});
$("#accountno").keydown(function(e){
		var obj = document.getElementById("accountno");
		var code = e.keyCode || e.which;

		if(obj.validity.valid==false)
		{
			obj.reportValidity();
			if(code == 9 || code == 13){
				e.preventDefault();
			}
		}


});

 $scope.optionsThumb = { controls : { toolbar : true}};

$scope.defaultZoomVal = 200;

$scope.defaultZoom = function(){
	$scope.optionsThumb.zoom.value = $scope.defaultZoomVal * 0.01;
//	$scope.optionsThumb.x.value = 0;
//	alert("IN"+$scope.defaultZoomVal * 0.01);
}


	$scope.fileInput = "";

	 $scope.accessor = {};

    $scope.count = 0;

	$scope.showSub = false;

    $scope.optimizeObject = {
        "jobno": ""
    }
	$scope.proval = 0;
	$scope.progressbarstatus = "";
	$scope.currentstatus = "";

/*
$scope.$watch('saveimg', function() {
 			$http.get($scope.weburl + "/" + $scope.arrfiles[index],{responseType: "blob"}).success(function(data) 			 {
						 var file = new File([data], $scope.arrfiles[index], {type: "image/tiff"});
							$scope.fileInput = file;
					});
    });
*/
	$scope.setLog = function(proval, currentstatus, css){
		if (proval!="") $scope.proval = proval;
		if(currentstatus!="") $scope.currentstatus = currentstatus;
		if(css!="") $scope.progressbarstatus = css; //"progress-bar-danger";
	}




    $scope.indexObject = {
        "jobno": "",
        "ddlDocumentTypes": "",
        "destinationPath": "",
        "currentImage": "",
        "imageCount": "0",
        "currentImageIndex": 1,
        "accountNo": "",
        "docType": "1",
        "initials": "XX",
        "img": "",
        "goto": "0",
		"hasPromo":"",
		"apnnumber":"",
		"expirydate":""

    }

	$scope.selectedindextype = {};
	$scope.selectednritype = {};
	$scope.selectedddlDocumentTypes = {};
    $scope.ddlDocumentTypes = DocTypes.get();
    $scope.Indextypes = Indextype.get();

	$scope.getAllItems = function(data, datalist, accessor, scopevar){



	}



	$scope.nriType = NriType.get();

    var heading = 0;

    $scope.rotate_right = function() {
        heading = heading + 90;
        $scope.heading = heading;
    }

    $scope.rotate_left = function() {
        heading = heading - 90;
        $scope.heading = heading;
    }

	$scope.docType=[];
	$scope.navigate = function(isSave,index){
	  //alert(JSON.stringify($scope.selectedddlDocumentTypes));
          
			if (index < $scope.arrfiles.length && index > -1) {
                         
					$scope.count = index;
					$scope.indexObject.img = $scope.weburl + "/" + $scope.arrfiles[index];
					$scope.indexObject.currentImageIndex = index+1;
					$scope.indexObject.currentimage = $scope.arrfiles[index];
					console.log("+++++"+$scope.weburl + "/" + $scope.arrfiles[index]);
					$arrFileName = $scope.arrfiles[index].split(".");
					console.log("CURRENT FILE TYPE1:"+JSON.stringify($arrFileName));
					$http.get($scope.weburl + "/" + $scope.arrfiles[index],{responseType: "blob"}).success(function(data) 			 {
						var filetype = "image/tiff";
						if($arrFileName[1] == "png" || $arrFileName[1] == "PNG"){
							filetype = "image/png";
						}else if($arrFileName[1] == "jpg" || $arrFileName[1] == "JPG"){
							filetype = "image/jpg";
						}
						else if($arrFileName[1] == "jpeg" || $arrFileName[1] == "JPEG"){
								filetype = "image/jpeg";
						}

						 var file = new File([data], $scope.arrfiles[index], {type: filetype});  //"image/tiff"
							$scope.fileInput = file;

							$timeout(function(){
								$scope.defaultZoom();
							}, 1200);
							$scope.applyValidations();
					});
//					console.log("CURRENT FILE TYPE:"+filetype+"::"+JSON.stringify($arrFileName));

//					$scope.fileInput = $scope.weburl+"/"+$scope.indexObject.currentimage;



			}

			if(isSave && index <= $scope.arrfiles.length ){
                            
                                if($scope.validate())
                                {
                                  if($scope.arrfiles[index-1] != null){
//                                          toastr.success('Image added');
                                          $scope.saveimg = [];
                                          $scope.saveimg.push({"obj":"thumb_"+index,"img":$scope.fileInput,"filename":$scope.arrfiles[index-1]});	 //$scope.arrfiles[index-1]
                                          $scope.docType.push($scope.indexObject.ddlDocumentTypes);
                                          $timeout(function(){
                                              $("select").focus();
                                           }, 1000);
                                          $scope.merge();
                                  }
                                }
			}

			if(index <= 0)
			{
				// SHOW TOAST FOR THIS IS FIRST IMAGE MESSAGE
					toastr.success('First Image');
			}

//			alert(index+":"+$scope.arrfiles.length);
			if(index == $scope.arrfiles.length)
			{
				// SHOW TOAST FOR THIS IS LAST IMAGE MESSAGE
				toastr.success('NO IMAGES FOR INDEXING');
				$scope.fileInput = null;
				$scope.arrfiles = [];
				index= -1;
			}

	}

$scope.validate=function()
	{
			if($scope.selectedddlDocumentTypes.selectedItem == null)
			{
				alert("Please select Document Type");
				return false;
			}

			if($scope.selectedindextype.selectedItem.indexingId == 1 || $scope.selectedindextype.selectedItem.indexingId == 6)
			{
				if($scope.indexObject.hasPromo.trim()=="" && $scope.selectedindextype.selectedItem.indexingId != 6)
				{
					alert("Please enter promo code");
					return false;
				}
				if($scope.indexObject.apnnumber.trim()=="")
				{
					alert("Please enter application no");
					return false;
				}
			}


			if($scope.selectedindextype.selectedItem.indexingId == 8 || $scope.selectedindextype.selectedItem.indexingId == 9 || $scope.selectedindextype.selectedItem.indexingId == 10)
			{
				if($scope.indexObject.accountNo.trim()=="")
				{
					alert("Please enter account no");
					return false;
				}
			}
                       
						return true;

	}

    $scope.import = function() {
            /*if ($scope.indexObject.jobno == "") {
                alert("Please enter respective job no. to search!!!!!");
            } else {*/
				$scope.setLog(30,"Please wait while reading images",""); // = function(proval, currentstatus, css, newlog)
                $scope.arrfiles = casafolderscan.get({
                    "job": $scope.indexObject.jobno
                })
                $scope.arrfiles.$promise.then(function(result) {
                    $scope.arrfiles = result.result;
					console.log("--files"+JSON.stringify($scope.arrfiles));
					$scope.weburl = result.rootURL;


					$scope.indexObject.img=$scope.weburl+"//" +$scope.arrfiles[0];
                    $scope.indexObject.imageCount = $scope.arrfiles.length;
					$scope.indexObject.currentimage=$scope.arrfiles[0];
					$scope.fileInput = $scope.weburl+"/"+$scope.indexObject.currentimage;

					console.log("CURR:"+$scope.weburl+"//" +$scope.arrfiles[0]);

					$http.get($scope.weburl + "/" + $scope.arrfiles[0],{responseType: "blob"}).success(function(data) 			 {
						 var file = new File([data], $scope.arrfiles[0], {type: "image/tiff"});
							$scope.fileInput = file;
							$scope.setLog(100,"Almost done!",""); // = function(proval, currentstatus, css, newlog)
							$timeout(function(){
								$scope.proval = 0;
							}, 1000);
                                                      
							toastr.success(' Images fetched');

					});


                });

            //}



        }

    $scope.saveimg = [];

    $scope.merge = function() {
//		$scope.merfiles = MergeImages.get({"image":JSON.stringify($scope.saveimg),"job": $scope.indexObject.jobno,"docType":JSON.stringify($scope.docType)})
		var filename = "";
		var hasPromo = false;
		if($scope.selectedindextype.selectedItem.indexingId == 1 || $scope.selectedindextype.selectedItem.indexingId == 6 || $scope.selectedindextype.selectedItem.indexingId == 7){
			hasPromo = true;
		}
		else{
			hasPromo = false;
		}


		//if($scope.selectedindextype.selectedItem.indexingId == 1 || $scope.selectedindextype.selectedItem.indexingId == 6 || $scope.selectedindextype.selectedItem.indexingId == 7 || $scope.selectednritype.selectedItem.nriId == 1 || $scope.selectednritype.selectedItem.nriId == 2 || $scope.selectednritype.selectedItem.nriId == 3)
		if(hasPromo)
		{
				if($scope.selectedindextype.selectedItem.indexingId != 6 ){ // IF ITS NOT CA
					if($scope.selectedindextype.selectedItem.indexingId == 7 && $scope.selectednritype.selectedItem.nriId == 2){
					filename += $scope.indexObject.apnnumber;
					}else
					{
						filename += $scope.indexObject.hasPromo+"_"+$scope.indexObject.apnnumber;
					}
				}
				else{ // IF ITS CA, EXCLUDE PROMO CODE
					filename += $scope.indexObject.apnnumber;
				}

		}else{
				filename += $scope.indexObject.accountNo;
		}
		filename += "_"+$scope.indexObject.initials;
		filename += "_"+$scope.selectedddlDocumentTypes.selectedItem.documentName.replace('-','_').replace(' ','_');
		//if($scope.indexObject.expirydate != null){
			if($scope.selectedddlDocumentTypes.selectedItem.documentId == 60 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 70 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 29 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 44 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 30 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 24 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 5 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 20 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 39 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 51 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 54 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 77)
			{
				filename += "_"+$scope.indexObject.expirydate;
			}
		//alert(filename);
		var tmpSaveImg = [];
		for(var i=0;i<$scope.saveimg.length;i++){
			tmpSaveImg.push($scope.saveimg[i].filename);
		}
		console.log("<<"+JSON.stringify($scope.saveimg));
		console.log(">>>"+tmpSaveImg.toString());
//		alert("IN");
		$scope.merfiles = MergeImages.get({"image":tmpSaveImg.toString(),"job": $scope.indexObject.jobno,"filename":filename})

		$scope.merfiles.$promise.then(function(result) {
                      $timeout(function(){
//                                                         alert("select focus");
					  $("select").focus();
                                        
				 }, 1000);
//                                         $("#ToastMsg_Success").show();//.fadeOut(1000);                
                                         $("#ToastMsg_Success").html('Image generated as '+filename+".TIFF").fadeIn(300);  
                                         $timeout(function(){
                                             $("#ToastMsg_Success").fadeOut();  
                                         },3000)
                                         
//			toastr.success('Image generated as '+filename+".TIFF");
                       
		});



    	//console.log("------images"+JSON.stringify($scope.merfiles));
    }
$scope.$watch(function(){
  		  return $scope.indexObject.accountNo;
 		 }, function(newvalue, oldvalue){
//			alert("new value :"+newvalue);
//			alert("oldvalue :"+oldvalue);
                        if(newvalue != oldvalue){
                            $scope.indexObject.expirydate = "";
                        }

	  },true);
          $scope.$watch(function(){
  		  return $scope.indexObject.apnnumber;
 		 }, function(newvalue, oldvalue){
//			alert(" apnnumber new value :"+newvalue);
//			alert(" apnnumber oldvalue :"+oldvalue);
			 if(newvalue != oldvalue){
                            $scope.indexObject.expirydate = "";
                        }

	  },true);
$scope.$watch(function(){
  		  return $scope.indexObject.hasPromo;
 		 }, function(newvalue, oldvalue){
//			alert("new value :"+newvalue);
//			alert("oldvalue :"+oldvalue);
                         if(newvalue != oldvalue){
                            $scope.indexObject.expirydate = "";
                        }
			
	  },true);


$scope.Update_expiry = function(){
            //alert("change called ");
            $scope.datepattern = "^[0-9]*$";
            if($scope.selectedddlDocumentTypes.selectedItem.documentId == 60 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 70 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 29 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 44 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 30 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 24 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 5 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 20 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 39 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 51 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 54 ||
			$scope.selectedddlDocumentTypes.selectedItem.documentId == 77)
			{
                            $scope.indexObject.expirydate ="";
                            
                        }
        }
    //Delete Image funtion
    $scope.Delete = function(img) {
             var index=$scope.saveimg.indexOf(img)
    			  $scope.saveimg.splice(index,1);
				   $scope.docType.splice(index,1);
                console.log("full array after deletion--==--==--" + $scope.docType);


    }


    //zoomIn function
    $scope.zoomin = function() {
            var imageId = document.getElementById('image');
            if (imageId.style.width == "20%") {
                imageId.style.width = "50%";
                imageId.style.height = "50%";
            } else if (imageId.style.width == "50%") {
                imageId.style.width = "100%";
                imageId.style.height = "100%";
            } else if (imageId.style.width == "100%") {
                imageId.style.width = "150%";
                imageId.style.height = "150%";
            }
        }

        //zoomOut function
    $scope.zoomout = function() {
        var imageId = document.getElementById('image');
        if (imageId.style.width == "150%") {
            imageId.style.width = "100%";
            imageId.style.height = "100%";
        } else if (imageId.style.width == "100%") {
            imageId.style.width = "50%";
            imageId.style.height = "50%";
        } else if (imageId.style.width == "50%") {
            imageId.style.width = "20%";
            imageId.style.height = "20%";
        }
    }

	$scope.optimize = function(){
			$scope.setLog(10,"Please wait while we optimizing images",""); // = function(proval, currentstatus, css, newlog)
		    $scope.optimize = OptimizeImage.get({"job":$scope.optimizeObject.jobno});
			$scope.optimize.$promise.then(function(result) {
					$scope.setLog(100,"Images are optimized and converted to TIFF",""); // = function(proval, currentstatus, css, newlog)
					$timeout(function(){
						$scope.proval = 0;
					}, 1000);
				toastr.success(result.result+' Images Optimized');
			});
	}

});


bpoApps.controller('casaImageRenameController', function($scope, $http, toastr, Upload, CORE_CONFIG, WEB_API,RenameBatch) {

		$scope.job = "20161024";

		$scope.selectedindextype = {};
		$scope.selectednritype = {};

		$scope.currentFileName = "";
		$scope.formdata = {
				file: ""
			};
		$scope.file = Upload;
               // alert($scope.selectedindextype.selectedItem.indexingId +" yujy "+nriId);
		$scope.subForm = function(file){

				$scope.formatId = 0;

				if($scope.selectedindextype.selectedItem.indexingId == 7){

				}

				$scope.formdata = {
						 "file":file,
						 "folder":"IMAGE_INDEXING_JOB_ROOT",
						 "extPath":$scope.job+"\\output\\"
					};
					console.log(JSON.stringify($scope.formdata));
				$scope.file.upload = Upload.upload({
				  url: CORE_CONFIG.WEB_SERVICE+WEB_API.UPLOAD,
				  data: $scope.formdata,
				});

				$scope.file.upload.then(function (response) {

					if(response.data.status == "success"){
						$scope.logs += "CSV Uploaded successfully.";
						$scope.currentFileName = response.data.result.upload_data.file_name;
						var arrFile = $scope.currentFileName.split(".");
						$scope.currentFileName = arrFile[0];

						var nriId = 0;
						if($scope.selectednritype.selectedItem != null){
							nriId = $scope.selectednritype.selectedItem.nriId;
						}


						$scope.renameBatch = RenameBatch.get({"job":$scope.job,"csv":$scope.currentFileName,"indexingtype":$scope.selectedindextype.selectedItem.indexingId,"nritype":nriId});

						$scope.renameBatch.$promise.then(function(result){
								//alert(JSON.stringify(result));
                                                                $("#ToastMsg_Success").append(result.result+' processed files renamed from CSV.').fadeOut(300);

								//toastr.success(result.result+' processed files renamed from CSV.', 'Done')
						});



					}else{
						console.log("ERROR");
					}

					$scope.file = Upload;

				}, function (response) {

				  if (response.status > 0){
					//$scope.errorMsg = response.status + ': ' + response.data;
				  	//$timeout($scope.progressbar.complete(), 1000);

				  }
				}, function (evt) {

				  	//$timeout($scope.progressbar.complete(), 1000);
                    //file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));

				});


	}



})

bpoApps.controller('casaImageOptimization', function($scope, $http, toastr, Upload, CORE_CONFIG, WEB_API,RenameBatch,folderscan,ngTableParams,$filter)
{
	$scope.arrfilesnew = {
	};
	$scope.arrfiles1 = Array();
	$scope.import1 = function() {
            if ($scope.indexObject.jobno == "") {
                alert("Please enter respective job no. to search!!!!!");
            } else {
                $scope.arrfilesnew = folderscan.get({
                    "job": $scope.indexObject.jobno
                })
                $scope.arrfilesnew.$promise.then(function(result) {
                    $scope.arrfilesnew= result.result;
					$scope.arrfiles1 = []
					for(i=0;i<$scope.arrfilesnew.length;i++)
					{
						$scope.arrfiles1.push($scope.arrfilesnew[i])
					}
					$scope.weburl = result.rootURL;
					$scope.indexObject.img=$scope.weburl+"/" +$scope.arrfilesnew[0];
					 $scope.tableParams.reload();

                });
            }
	}

	$scope.tableParams = new ngTableParams({

				debugMode: true,
				page: 1,
				count: 10,
				sorting: {
  						fileName: 'desc'
						 },
				filter: {
						fileName: ''
				}

				}, {
				total: $scope.arrfiles1.length,

				getData: function ($defer, params) {

				var filteredData = params.filter() ? $filter('filter')($scope.arrfiles1, params.filter()) : $scope.arrfiles1;
				var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
				console.log("--files 3---"+JSON.stringify($scope.arrfiles1));
				params.total(orderedData.length);
				$defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count()));
				}
				});
				$scope.selectAll = function() {
		$scope.checkAll=!$scope.checkAll;
		for(var i=0;i<$scope.arrfiles1.length;i++)
		{
			$scope.arrfiles1[i].isSelected = $scope.checkAll;

		}


	  };

});
