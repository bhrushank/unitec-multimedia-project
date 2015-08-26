// JavaScript Document
lectureList = [];
localStorageRow = "";

$(document).ready(function(){
        var nm;
       $.ajax({
        type: "GET" ,
        url: "resources/bcs.xml" ,
        dataType: "text" ,
        success: function(xml) {
			localStorageRow = xml;
        }
    });
});

function Lecture(Code,Title,Semester){
	this.code = Code;
	this.title = Title;
	this.semester = Semester;
};

function readXml(type)
{ 
	if (typeof(localStorageRow) == "undefined" || localStorageRow === "" || localStorageRow === null )
	{
	}
	else
	{ 
		if (window.DOMParser)
		{
			parser=new DOMParser();
			xmlDoc=parser.parseFromString(localStorageRow,"text/xml");
		}
		else // Internet Explorer
		{
			xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async=false;
			xmlDoc.loadXML(localStorageRow);
		} 
		var items = "";	
		switch(type)
		{
			case 'one':
				items =	xmlDoc.querySelectorAll('network > lecture');
				break;
			case 'two':
				items =	xmlDoc.querySelectorAll('security > lecture');
				break;
			case 'three':
				items =	xmlDoc.querySelectorAll('software > lecture');
				break;
			case 'four':
				items =	xmlDoc.querySelectorAll('games > lecture');
				break;
			case 'five':
				items =	xmlDoc.querySelectorAll('business > lecture');
				break;
			case 'zero':
				items =	xmlDoc.querySelectorAll('semesterSix > lecture');
				break;
			case 'semOne':
				items =	xmlDoc.querySelectorAll('semesterOne > lecture');
				break;
			case 'semTwo':
				items =	xmlDoc.querySelectorAll('semesterTwo > lecture');
				break;							
		}
		
		if(lectureList.length > 0)
			lectureList = [];
			
		Array.prototype.slice.call(items).map(function(x){
			lectureList.push(new Lecture($(x).children('code').text(),
									  $(x).children('title').text(),
									  $(x).attr('semester')));										
		});
	}
}