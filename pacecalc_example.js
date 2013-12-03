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
	clearCalcErrorHandling();
	document.Calc.timeH.value=0;
	document.Calc.timeM.value=0;
	document.Calc.timeS.value=0;
	document.Calc.distance.value=0;
	document.Calc.paceH.value=0;
	document.Calc.paceM.value=0;
	document.Calc.paceS.value=0;
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

	console.warn($('#5kPRH').val());

	newPR = false;

	if($('#distance').val() == 3.1){
	if(hours> $('#5kPRH')){
		console.warn("in first if");
		newPR = true;	
	}

	
	if(hours == $('#5kPRH').val() && minutes< $('#5kPRM').val()){
			newPR = true;
			console.warn("in second if");
	}	

	if(hours == $('#5kPRH').val() && minutes == $('#5kPRM').val() && seconds < $('#5kPRS').val()){
			newPR = true;
			console.warn("in third if");
	}	

	if($('#5kPRH').val() == '' && $('#5kPRM').val() == '' && $('#5kPRS').val() == ''){
	newPR = true;
}

	if(newPR == true){
	console.warn("there is a new pr")
	$('#5kRace').html(raceInfo);
	$('#5kPRH').html(hours);
	$('#5kPRH').val(hours);
	$('#5kPRM').html(minutes);
	$('#5kPRM').val(minutes);
	$('#5kPRS').html(seconds);
	$('#5kPRS').val(seconds);

	$('#calcErrorHandling').html("Congratulations on a great 5k Personal Record!");
}
else{
	alert("This is not a new PR. It will not be added");
}

}
else if($('#distance').val() == 6.2){
	if(hours> $('#10kPRH')){
		newPR = true;	
	}
	
	if(hours == $('#10kPRH').val() && minutes< $('#10kPRM').val()){
			newPR = true;
	}	

	if(hours == $('#10kPRH').val() && minutes == $('#10kPRM').val() && seconds < $('#10kPRS').val()){
			newPR = true;
	}	

	if($('#10kPRH').val() == '' && $('#10kPRM').val() == '' && $('#10kPRS').val() == ''){
	newPR = true;
}

	if(newPR == true){
	$('#10kRace').html(raceInfo);
	$('#10kPRH').html(hours);
	$('#10kPRH').val(hours);
	$('#10kPRM').html(minutes);
	$('#10kPRM').val(minutes);
	$('#10kPRS').html(seconds);
	$('#10kPRS').val(seconds);

	$('#calcErrorHandling').html("Congratulations on a great 10k Personal Record!");
}
else{
	alert("This is not a new PR. It will not be added");
}

}
else if($('#distance').val() == 13.1){
	if(hours> $('#halfMarathonPRH')){
		newPR = true;	
	}
	
	if(hours == $('#halfMarathonPRH').val() && minutes< $('#halfMarathonPRM').val()){
			newPR = true;
	}	

	if(hours == $('#halfMarathonPRH').val() && minutes == $('#halfMarathonPRM').val() && seconds < $('#halfMarathonPRS').val()){
			newPR = true;
	}	

	if($('#halfMarathonPRH').val() == '' && $('#halfMarathonPRM').val() == '' && $('#halfMarathonPRS').val() == ''){
	newPR = true;
}

	if(newPR == true){
	$('#halfMarathonRace').html(raceInfo);
	$('#halfMarathonPRH').html(hours);
	$('#halfMarathonPRH').val(hours);
	$('#halfMarathonPRM').html(minutes);
	$('#halfMarathonPRM').val(minutes);
	$('#halfMarathonPRS').html(seconds);
	$('#halfMarathonPRS').val(seconds);

	$('#calcErrorHandling').html("Congratulations on a great Half Marathon Personal Record!");
}
else{
	//$('#calcErrorHandling').alert("This is not a new PR. It will not be added");
	alert("This is not a new PR. It will not be added");
}


}
else if($('#distance').val() == 26.2){
	if(hours> $('#marathonPRH')){
		newPR = true;	
	}
	
	if(hours == $('#marathonPRH').val() && minutes< $('#marathonPRM').val()){
			newPR = true;
	}	

	if(hours == $('#marathonPRH').val() && minutes == $('#marathonPRM').val() && seconds < $('#marathonPRS').val()){
			newPR = true;
	}	

	if($('#marathonPRH').val() == '' && $('#marathonPRM').val() == '' && $('#marathonPRS').val() == ''){
	newPR = true;
}

	if(newPR == true){
	$('#marathonRace').html(raceInfo);
	$('#marathonPRH').html(hours);
	$('#marathonPRH').val(hours);
	$('#marathonPRM').html(minutes);
	$('#marathonPRM').val(minutes);
	$('#marathonPRS').html(seconds);
	$('#marathonPRS').val(seconds);

	$('#calcErrorHandling').html("Congratulations on a great Marathon Personal Record!");
}
else{
	//$('#calcErrorHandling').alert("This is not a new PR. It will not be added");
	alert("This is not a new PR. It will not be added");
}

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
});

//-->
