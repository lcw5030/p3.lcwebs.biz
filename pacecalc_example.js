<!--

// constants
var TIME = 0;
var DISTANCE = 1;
var PACE = 2;
var MILES = 0;
var METERS = 1;
var YARDS = 2;
var KILOMETERS = 3;
var PER_MILE = 0;
var PER_400 = 1;
var PER_KM = 2;

// number constants
var YARDS_IN_MILE = 1760;
var METERS_IN_METER = 1;
var METERS_IN_400 = 400;
var METERS_IN_MILE = 1609.344;
var METERS_IN_KM = 1000;
var METERS_IN_YARD = METERS_IN_MILE / YARDS_IN_MILE;

/*
 * Clear the fields.
 */
function clearNums()
{
	$('.timeValue').val("");
	clearCalcErrorHandling();

}

/*
 * defaultStuff sets the defaults. It is called by the onLoad event.
 */
function defaultStuff()
{
	// set list box default to PACE
	document.Calc.CalcWhat.selectedIndex=2;
	
	// set option buttons to defaults
	document.Calc.optDist[0].checked=true;
	document.Calc.optPace[0].checked=true;
}

/*
 * This function is called to perform the calculation.
 */
function calcIT()
{
	clearCalcErrorHandling();
	// Time (converted to seconds)
	var hour = document.Calc.timeH.value;
	var min = document.Calc.timeM.value;
	var sec = document.Calc.timeS.value;
	var timeObj = new TimeObject(hour, min, sec);

	// Distance
	var distVal = document.Calc.distance.value;
	var distUnit = METERS_IN_MILE;
	var distObj = new DistanceObject(distVal, distUnit);

	// Pace (converted to seconds per)
	var hourP =document.Calc.paceH.value;
	var minP=document.Calc.paceM.value;
	var secP=document.Calc.paceS.value;
	var paceUnit = METERS_IN_MILE;
	var paceObj = new PaceObject(hourP, minP, secP, paceUnit);
	
	// Which result
	var resultValue=document.Calc.CalcWhat.options[document.Calc.CalcWhat.selectedIndex].value;

	if (resultValue==TIME)
	{				
		timeObj.calculate(distObj, paceObj);

		document.Calc.timeH.value = timeObj.getHours();
		document.Calc.timeM.value = timeObj.getMinutes();
		document.Calc.timeS.value = timeObj.getSeconds();

		$('#timeH').attr('disabled','disabled');
		$('#timeM').attr('disabled','disabled');
		$('#timeS').attr('disabled','disabled');

		calculateErrorHandling();
	}
	else if (resultValue==DISTANCE)
	{
		distObj.calculate(timeObj, paceObj);

		// rounding
		document.Calc.distance.value = distObj.decimalPlaces(2);
	}
	else if (resultValue==PACE)
	{
		paceObj.calculate(timeObj, distObj);

		document.Calc.paceH.value = paceObj.getHours();
		document.Calc.paceM.value = paceObj.getMinutes();
		document.Calc.paceS.value = paceObj.getSeconds();

		$('#paceH').attr('disabled','disabled');
		$('#paceM').attr('disabled','disabled');
		$('#paceS').attr('disabled','disabled');
	}

	
}//end CalcIt

function saveMyTime(){
	clearCalcErrorHandling();
	console.log("pace hours", document.Calc.paceH.value + ":" + document.Calc.paceM.value + ":" + document.Calc.paceS.value );
	var hours = $('#timeH').val();
	var minutes = $('#timeM').val();
	var seconds = $('#timeS').val();
	var raceTime = hours+":"+minutes+":"+seconds;
	var raceName = $('#raceName').val();
	var raceDate = $('#raceMonth').val() +"/"+$('#raceDay').val() +"/"+$('#raceYear').val();
	
	var raceInfo = "  in the " + raceName + " on " + raceDate;

	console.warn("minutes" + minutes);
	console.warn("PRminutes" + $('#5kPRM').val());
	var newPR;

	var PRtimeH;
	var PRtimeM;
	var PRtimeS;

	newPR = false;

	if($('#distance').val() == 3.1){
	
	PRTimeH = $('#5kPRH');
	PRTimeM = $('#5kPRM');
	PRTimeS = $('#5kPRS');
	PRRaceInfo = $('#5kRace');
	}
	if($('#distance').val() == 6.2){
	
	PRTimeH = $('#10kPRH');
	PRTimeM = $('#10kPRM');
	PRTimeS = $('#10kPRS');
	PRRaceInfo = $('#10kRace');
	}
	if($('#distance').val() == 13.1){
	
	PRTimeH = $('#halfMarathonPRH');
	PRTimeM = $('#halfMarathonPRM');
	PRTimeS = $('#halfMarathonPRS');
	PRRaceInfo = $('#halfMarathonRace');
	}
	if($('#distance').val() == 26.2){
	
	PRTimeH = $('#marathonPRH');
	PRTimeM = $('#marathonPRM');
	PRTimeS = $('#marathonPRS');
	PRRaceInfo = $('#marathonRace');
	}
	
	if(hours> PRTimeH.val()){
		console.warn("in first if");
		newPR = true;	
	}

	
	if(hours == PRTimeH.val() && minutes< PRTimeM.val()){
			newPR = true;
			console.warn("in second if");
	}	

	if(hours == PRTimeH.val() && minutes == PRTimeM.val() && seconds < PRTimeS.val()){
			newPR = true;
			console.warn("in third if");
	}	

	if(PRTimeH.val() == '' && PRTimeM.val() == '' && PRTimeS.val() == ''){
	newPR = true;
}
console.warn()
if($('#raceName').val() != "" && $('#raceMonth').val() != "" && $('#raceDay').val() != "" && $('#raceYear').val() != ""){
	if(newPR == true){
	PRRaceInfo.html(raceInfo);
	PRTimeH.html(hours);
	PRTimeH.val(hours);
	PRTimeM.html(minutes);
	PRTimeM.val(minutes);
	PRTimeS.html(seconds);
	PRTimeS.val(seconds);

	$('#calcErrorHandling').css('color','blue');
	$('#calcErrorHandling').html("Congratulations on a great 5k Personal Record!");

}
else{
	alert("This is not a new PR. It will not be added");
}
}
else{
	$('#calcErrorHandling').css('color','red');
	$('#calcErrorHandling').html("Please add Race Name and Date");
}
}
/*
 * Get the unit of measure for distance.
 */
function getDistanceUnit()
{
	var unit;

		unit = METERS_IN_MILE;

	return unit;
}

/*
 * Get the unit of measure for pace.
 */
function getPaceUnit()
{
	var unit;

		unit = METERS_IN_MILE;


	return unit;
}

function calculateErrorHandling()
{
	

	if($('#paceM').val()== ""){
		$('#calcErrorHandling').css('color','red');
		$('#calcErrorHandling').html("Invalid pace value. You must enter a value between 00:00:59 and 00:59:59");
	}
}

function clearCalcErrorHandling(){
	$('#calcErrorHandling').html("");
}

function disableTime(){
		$('#timeH').attr('disabled','disabled');
		$('#timeM').attr('disabled','disabled');
		$('#timeS').attr('disabled','disabled');

		$('#paceH').removeAttr('disabled');
		$('#paceM').removeAttr('disabled');
		$('#paceS').removeAttr('disabled');
}
function disablePace(){
		$('#paceH').attr('disabled','disabled');
		$('#paceM').attr('disabled','disabled');
		$('#paceS').attr('disabled','disabled');

		$('#timeH').removeAttr('disabled');
		$('#timeM').removeAttr('disabled');
		$('#timeS').removeAttr('disabled');

}
$('#5kRace').click(function(){
	
		if($('#timeM').val()<30){
		console.log("hover less than 30!");
		}
});


$('#calcWhat').on('change', function() {
	$('#calcWhat').val();
  if ($('#calcWhat').val()==2){
  	disablePace();
  }
  else if($('#calcWhat').val()==0){
  	disableTime();
  }
  clearNums();
});

$('.numbersOnly').keypress(function (e){
  var charCode = (e.which) ? e.which : e.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
});

$('.minSec').on('change', function(){
      if ($(this).val() < 0) $(this).val(0);
      if ($(this).val() > 59) $(this).val(59);
      
});

$('.timeValue').on('change', function(){
      if($(this).val()<10){ 
      	$(this).val(0+$(this).val());
      }
});

$('.month').on('change', function(){
      if ($(this).val() < 1) $(this).val(1);
      if ($(this).val() > 12) $(this).val(12);
      
});

$('.day').on('change', function(){
      if ($(this).val() < 1) $(this).val(1);
      if ($(this).val() > 31) $(this).val(31);
      
});

$('.year').on('change', function(){
      if ($(this).val() < 1900) $(this).val(1900);
      if ($(this).val() > 2020) $(this).val(2020);
      
});

$('.distance').on('change', function(){
      clearNums();
      
});

 $(document).ready(function() {
    $('input[type!="button"][type!="submit"], select, textarea')
         .val('')
         .blur();

    disableTime();
});

function clear5kPR(){
	$('#5kRace').html("");
	$('#5kPRH').html("");
	$('#5kPRH').val("");
	$('#5kPRM').html("");
	$('#5kPRM').val("");
	$('#5kPRS').html("");
	$('#5kPRS').val("");
}

function clear10kPR(){
	$('#10kRace').html("");
	$('#10kPRH').html("");
	$('#10kPRH').val("");
	$('#10kPRM').html("");
	$('#10kPRM').val("");
	$('#10kPRS').html("");
	$('#10kPRS').val("");
}

function clearHalfMarathonPR(){
	$('#halfMarathonRace').html("");
	$('#halfMarathonPRH').html("");
	$('#halfMarathonPRH').val("");
	$('#halfMarathonPRM').html("");
	$('#halfMarathonPRM').val("");
	$('#halfMarathonPRS').html("");
	$('#halfMarathonPRS').val("");
}

function clearMarathonPR(){
	$('#marathonRace').html("");
	$('#marathonPRH').html("");
	$('#marathonPRH').val("");
	$('#marathonPRM').html("");
	$('#marathonPRM').val("");
	$('#marathonPRS').html("");
	$('#marathonPRS').val("");
}

//-->
