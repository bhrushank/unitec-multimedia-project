// JavaScript Document
maxSelect = 14;
var globalSelectionCounter = 0;
var globalPoints = 0;
var globalTotalPoints = 0;
$('.btns').click(function(e) {
    elem = $(this);
	if(!elem.hasClass('s345') && elem.attr('id') != 'zero')
	{
		removeSpans('.s345');
		readXml(elem.attr('id'));
		currentLec = "";
		if($('.sem12').hasClass('fadeIn'))
			$('.sem12').removeClass('fadeIn');
		elem.addClass('fadeOut');	
		delay(function(){Foward('.sem12','.sem345','.grp1','.grp2');}, 1000 ); // end delay
		addSpans('.s345');
	}
	else
	{
		if(elem.hasClass('fadeOutHalf')){
			elem.removeClass('fadeOutHalf count').addClass('fadeInHalf');
			delay(function(){elem.removeClass('fadeInHalf')}, 2000 );
			calculate(-1);
		}
		else if($('.count').length < maxSelect)
			elem.addClass('fadeOutHalf count');	
			calculate(1);
	
	
		
		/*if(elem[0].children[0].innerText.length > 0)
				addModal(elem[0].children[0].innerText+' - '+elem[0].children[1].innerText);
			else
				addModal(elem[0].children[1].innerText);*/
	}
});

function calculate(sum){
	if(globalTotalPoints < 345)
	{
		globalSelectionCounter += sum;
		globalPoints = globalSelectionCounter * 15;
		globalTotalPoints = 120 + globalPoints;
		txt = "120 +" + globalPoints + " = " + globalTotalPoints + " points";
		document.getElementById("demo3").innerHTML = txt;
	}
	else{
		alert("Invalid selection");
	}
}

function addModal(title){
	
	var appendthis =  ("<div class='modal-overlay js-modal-close'></div>");
	
	 
		//e.preventDefault();
		//$("body").append(appendthis);
		//$(".modal-overlay").fadeTo(500, 0.7);
		//$(".js-modalbox").fadeIn(500);
		//var modalBox = $(this).attr('data-modal-id');
		$('#popup').fadeIn($(this).data());
		$('.titleModal').text(title);
	    
	$(".js-modal-close, .modal-overlay").click(function() {
	  $(".modal-box, .modal-overlay").fadeOut(500, function() {
		$(".modal-overlay").remove();
	  });
	});
	 
	$(window).resize(function() {
	  $(".modal-box").css({
		top: ($(window).height()+100 - $(".modal-box").outerHeight()) ,
		left: ($(window).width() - $(".modal-box").outerWidth())/2.3 
	  });
	});
	 
	$(window).resize();
}



function addSpans(elem){
	var lectrs = [];
	var count = 0;
	
	
	Array.prototype.slice.call(lectureList).map(function(x){
			lectrs.push("<span class='code'>"+x.code+"</span><span class='title'>"+x.title+"</span>");
	});
	
	Array.prototype.slice.call($(elem)).map(function(x){
			$(x).append(lectrs[count]);
			count++;
	});
};


$('.pathElem').click(function(e) {
	elem = $(this);
	if(elem.hasClass('grp1'))
		if($('.sem12').hasClass('targetAfter'))
			Back('.elemActive','.sem12','.grpActive','.grp1');
	if(elem.hasClass('grp2'))
		if($('.sem6').hasClass('elemActive'))
			Back('.elemActive','.sem345','.grpActive','.grp2');
	if(elem.hasClass('grp3'))
		if($('.sem345').hasClass('elemActive'))
		{
			removeSpans('#zero');
			readXml('zero');
			Foward('.elemActive','.sem6','.grpActive','.grp3');
			addSpans('#zero');
		}
});




function removeSpans(elem){
	Array.prototype.slice.call($(elem)).map(function(x){
		$(x).empty();
	});
}

function Foward(current,next,currentGrp,nextGrp)
{
	$(current).removeClass('fadeIn').addClass('fadeOut');
	delay(function(){		
		$('.btns').removeClass('fadeIn').removeClass('fadeOut');
		$(currentGrp).addClass('fadeOutHalf').removeClass('grpActive');
		$(nextGrp).removeClass('fadeOutHalf').addClass('fadeInHalf').addClass('grpActive');
		$(current).addClass('targetAfter').removeClass('fadeOut').removeClass('elemActive');		
		$(next).removeClass('targetAfter').addClass('fadeIn').addClass('elemActive');
	}, 1500 );
}

function Back(current,next,currentGrp,nextGrp)
{
	$(currentGrp).removeClass('fadeInHalf').addClass('fadeOutHalf');
	$(nextGrp).removeClass('fadeOutHalf').addClass('fadeInHalf');
	$(current).removeClass('fadeIn').addClass('fadeOut');
	delay(function(){
		$(current).addClass('targetAfter').removeClass('fadeOut').removeClass('elemActive');
		$(next).removeClass('targetAfter').addClass('fadeIn').addClass('elemActive');
		$(currentGrp).removeClass('fadeOutHalf').removeClass('grpActive');
		$(nextGrp).removeClass('fadeInHalf').addClass('grpActive');
	}, 1500 );
}

$('.print').click(function(e) {
	if($('.sem6').hasClass('elemActive') || $('.sem345').hasClass('elemActive'))
	{
		if(currentLec == "")
			currentLec = lectureList;
		
		allLec = [];
		readXml('semOne');
		Array.prototype.slice.call(lectureList).map(function(x){
			allLec.push(x);
		});
		readXml('semTwo');
		Array.prototype.slice.call(lectureList).map(function(x){
			allLec.push(x);
		});
		Array.prototype.slice.call(currentLec).map(function(x){
			allLec.push(x);
		});
		readXml('zero');
		Array.prototype.slice.call(lectureList).map(function(x){
			allLec.push(x);
		});
	data = {list:allLec,action : "test"   }; 
    //data = allLec + "&" + $.param(data);
    $.ajax({
    type: "POST",
    data: data,
	dataType:"html",
    //contentType: false,
    //processData: false,
    //cache: false,
    url: 'scripts/download.php', //Relative or absolute path to response.php file
    success: function(data,textStatus, jqXHR) {
		alert(data.toString());
		window.location = data;
    },
	error: function(data,textStatus, jqXHR){
		alert(data);
	}
	  });
	  
	  //$.post("Uploadsdownload.php",data, onSuc);
	}
});


function onSuc(results)
		{
			if( results == "00")
			{
				$('#msg').text("That is not a valid code. Please try again.");
				$("#code").addClass("error").removeClass("required");
				return false;
			}
			if( results == "01")
			{
				$('#msg').text("Oops..This code was already claimed. Please try again.");
				$("#code").addClass("error").removeClass("required");
				return false;
			}
			
		}

function action(Value)
{
	this.value = Value;
}

var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();