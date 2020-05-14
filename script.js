
$(document).ready(function(){
  
  // global variables

  var count = 0; // selected seats count
  var price = 10;
  var arr = []; // array that will contain non occoupied seats
  arr =  $('.container .row div.seat:not(.occupied)');
  // console.log(arr);
  
  loadLocal(); // load selected seats from local storage
  updatePrice(price);
  updateCount(count);
// manage click event (selection & unselection of seats)

$.each(arr,(index,item) => 
{       
	// console.log(index,item);
	   item.onclick = function(){
       if(!($(item).hasClass('selected')))
       {

       	// include selected class in selected seat div
       	$(item).addClass('selected');
       	// increment selected seats count
       	count++;
       	// add to local storage
        var obj = { seatIndex: index , seatNo: index+1 };
        localStorage.setItem(index,JSON.stringify(obj));
        // update count 
        updateCount(count);
        updatePrice(price);
       
       }
       else
       {

       	// remove selected class
       	$(item).removeClass('selected');

        // update selected seats count
       	count--;
       	// remove that seat(unselected) from local storage
       	localStorage.removeItem(index);
       	updateCount(count);
       	updatePrice(price);
        
       }
	}
});


function loadLocal()
{
	var localCount = 0;
	var arrLocal = [];
	for(var i=0;i<localStorage.length;i++)
	{  
		var seatIndex = localStorage.key([i]);
       arrLocal.push(seatIndex);
	}
	// console.log(arrLocal);
	$.each(arr,(index,item) =>
	{
      for(var i=0;i<arrLocal.length;i++)
      {
      	if(index == arrLocal[i])
      	{
      		$(item).addClass('selected');
      		localCount++;

      	}
      }
	});
	count = localCount; // update selected count (count variable) value
	updateCount(localCount); 
	arrLocal = [];
}

 function updateCount(count)
 {
 	$('#count').html(count);
 }
 
  $('#movie').on('change',function(){
   price = this.value;
   updatePrice(price);
 });

 function updatePrice(priceValue)
 {
   var totalPrice = count * priceValue;
   $('#total').html(totalPrice);
 }
});