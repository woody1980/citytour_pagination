//plan
//1.add title attribute to each pagination anchor with number assigned
//2. pass the title value to url 
//3. read url and match to determine which markers are shown
//4. 


/* =========================================================
 Initialize
=========================================================== */
var g = {};
var resultNum = [];

/* ==========================================================================
   Paginate Map items 
========================================================================= */	

var getQueryVariable = function (variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
	
g.paginationNum = getQueryVariable("sho");

	
/* =========================================================
  Map
=========================================================== */
//alert(g.paginationNum);

function initialize() {

	//Call JSON 
	$.getJSON("http://imwhit.com/projects/city/js/locat.json",function(results){
	
        //Mustache Implementation
        var template = $('#speakers-template').html();
        var info = Mustache.to_html(template, results);
        $('#talktitles').html(info);
        pagination();
			   
        //reference t as the JSON list
	var t = results.d;
	
	//assign an new value to JSON
	for (i in t){
	t[i].shownum = resultNum[i]; 
	}
			
	//loop through JSON items
	$.each(t, function (index,location){
	console.log(t[index].shownum + " , " + location.first + location.last);
	
		if(t[index].shownum == g.paginationNum ){ 
		
		  	var resultNumValue = resultNum[index];
		  	var latLng = new google.maps.LatLng(location.lat, location.lng); 
		  	
		     	//set the marker if there is a match
			marker = new google.maps.Marker({
			  position: latLng, 
			  map: map, 
			  title:location.Title,
			  icon: location.icon,			 
			});										
			
			//click event for the map marker for address
			google.maps.event.addListener(marker, 'click', function(event){
				alert(location.first );
			});	
			
			if (marker.custominfo == g.paginationNum){
				//alert(location.first + marker.custominfo);
				marker.setMap(map);
			}
		}									
	});		
	
	});
	

		
	var mapProp = {
		  center:new google.maps.LatLng(40.478165,-88.954401),
		  zoom:15,
		  mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	  	
	var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

google.maps.event.addDomListener(window, 'load', initialize);


	
/* ==========================================================================
   Pagination
   ========================================================================= */	

function pagination() { 


	g.ix = 1;
	g.yx=1;
	g.vx=1;
	
	var ex = $('article.map_tour_info').length;
	var recordGoup = 2, bx =5;

	var remainder = ex % recordGoup;


	//alert(remainder);

	$('article.map_tour_info').each(function() {	

	
		$(this).addClass('yes' + g.ix);
		$(this).addClass('no' + g.yx);
		
		//alert(g.yx);
		resultNum.push(g.yx);	
				
		if( g.ix % recordGoup) { 	
			g.ix++;
		}else {
			g.ix= 1;
			
			$('<a href="#" class="in">' +  g.yx  + '</a> ').insertBefore('a.pag-right');
			g.yx++;		
		}
	
	});
		
	   //alert(remainder);
	   if(remainder) {
	   $('<a href="#" class="in">' + g.yx + '</a> ').insertBefore('a.pag-right');
	   g.yx++;
	   }

	$('a.in').each(function(){
		//make an attribute with the value of the pagination number
		g.shoNum = $(this).text();
		$(this).attr("data-shownum", g.shoNum);
		
		//send the pagintation value to url
		$(this).attr("href","tour.html" + "?" + "sho=" + g.shoNum);
		

		
		//create a class to match the paginated row
		$(this).addClass('no'+ vx);
		vx++;
	});


	
	$('article.map_tour_info.hidden.'+ "no" + g.paginationNum).removeClass('hidden');
	$('article.map_tour_info').not("." + "no" + g.paginationNum).addClass('hidden');	
	
	$('.page-left').click(function() {

		if ( g.current_page > 0 ) {
			var yy = $(this).attr('class').substr(10,3)
			alert(yy);			  
			$('.page-left[class*="n"]').removeClass();
			$(this).addClass('page-left');			
			$(this).addClass('no' + g.current_page);   
			g.current_page--
			
			$('article.map_tour_info').each(function(){
				if(g.current_page > 0){
					//make css into a list
					var trClassName  = $(this).attr('class').substr(5,3);//replace with hasClass method
						
					//alert(trClassName + " " + "no" + g.current_page);
					
					if (trClassName   != "no" +  g.current_page ) {
						$(this).addClass('hidden');
					}else{
						$(this).removeClass('hidden');
					}
				}
			});
					
		}else {
			alert("test");
			return
		}
				
	});


	$('.pag-right').click(function() {
		var total = $('a.in').length + 1;
		if ( g.current_page < total  ) {
			var yy = $(this).attr('class').substr(9,3)
			//alert(g.current_page);			  
			$('.pag-right[class*="n"]').removeClass();
			$(this).addClass('pag-right');			
			$(this).addClass('no' + g.current_page);   
			g.current_page++
			
			$('article.map_tour_info').each(function(){
				if(g.current_page < total ){
					//make css into a list
					var trClassName  = $(this).attr('class').substr(5,3);
						
					//alert(trClassName + " " + "no" + g.current_page);
					
					if (trClassName   != "no" +  g.current_page ) {
						$(this).addClass('hidden');
					}else{
						$(this).removeClass('hidden');
					}
				}
			});
					
		}else {
			alert("test");
			return
		}
				
	});	
}




/* ==========================================================================
   Hide 
   ========================================================================= */	
/*
if ($(this).attr('class').substr(5,3) != 'no1'){
//alert()
$(this).addClass('hidden');
}
*/

/*
g.current_page = wx.substr(2,1);
*/

/*
if($(this).hasClass('no1')){
alert()
	$(this).removeClass('hidden');
}else{
	$(this).addClass('hidden');
}
*/