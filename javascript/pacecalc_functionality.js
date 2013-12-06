/*-------------------------------------------------------------------------------------------------
Number constants for calculator
-------------------------------------------------------------------------------------------------*/
// constants
var TIME = 0;
var DISTANCE = 1;
var PACE = 2;
var MILES = 0;
var PER_MILE = 0;


// number constants
var YARDS_IN_MILE = 1760;
var METERS_IN_MILE = 1609.344;

/*-------------------------------------------------------------------------------------------------
Page load functionality
-------------------------------------------------------------------------------------------------*/
$(document).ready(function () {
    $('input[type!="button"][type!="submit"], select, textarea')
        .val('')
        .blur();
    var zero = 0;
    $('.timeValue').val("0" + 0);
    disableTime();
});

/*-------------------------------------------------------------------------------------------------
Clear and Disable functionality
-------------------------------------------------------------------------------------------------*/

//Clear the fields.
function clearNums() {
    $('.timeValue').val("");
    $('.raceDetails').val("");
    clearCalcErrorHandling();

}

//Clear the error handling.
function clearCalcErrorHandling() {
    $('#calcErrorHandling').html("");
}

//Disable editing of pace/time values based on dropdown selection
function disableTime() {
    $('#timeH').attr('disabled', 'disabled');
    $('#timeM').attr('disabled', 'disabled');
    $('#timeS').attr('disabled', 'disabled');

    $('#paceH').removeAttr('disabled');
    $('#paceM').removeAttr('disabled');
    $('#paceS').removeAttr('disabled');
}

function disablePace() {
    $('#paceH').attr('disabled', 'disabled');
    $('#paceM').attr('disabled', 'disabled');
    $('#paceS').attr('disabled', 'disabled');

    $('#timeH').removeAttr('disabled');
    $('#timeM').removeAttr('disabled');
    $('#timeS').removeAttr('disabled');

}


//Add '00' as default for time values
$('.timeValue').on('click', function () {
    if ($(this).val() == "0" + 0) {
        $(this).val("");
    }
});

//clear time/pace values and race details on change of "Calculate for:" dropdown
$('#calcWhat').on('change', function () {
    $('#calcWhat').val();
    if ($('#calcWhat').val() == 2) {
        disablePace();
    } else if ($('#calcWhat').val() == 0) {
        disableTime();
    }
    clearNums();
});

//clear time/pace values ad race details on change of "Distance" dropdown
$('.distance').on('change', function () {
    clearNums();
});

//Clear functionality for PR values
function clear5kPR() {
    $('#5kRace').html("");
    $('#5kPRH').html("");
    $('#5kPRH').val("");
    $('#5kPRM').html("");
    $('#5kPRM').val("");
    $('#5kPRS').html("");
    $('#5kPRS').val("");
}

function clear10kPR() {
    $('#10kRace').html("");
    $('#10kPRH').html("");
    $('#10kPRH').val("");
    $('#10kPRM').html("");
    $('#10kPRM').val("");
    $('#10kPRS').html("");
    $('#10kPRS').val("");
}

function clearHalfMarathonPR() {
    $('#halfMarathonRace').html("");
    $('#halfMarathonPRH').html("");
    $('#halfMarathonPRH').val("");
    $('#halfMarathonPRM').html("");
    $('#halfMarathonPRM').val("");
    $('#halfMarathonPRS').html("");
    $('#halfMarathonPRS').val("");
}

function clearMarathonPR() {
    $('#marathonRace').html("");
    $('#marathonPRH').html("");
    $('#marathonPRH').val("");
    $('#marathonPRM').html("");
    $('#marathonPRM').val("");
    $('#marathonPRS').html("");
    $('#marathonPRS').val("");
}

/*-------------------------------------------------------------------------------------------------
Validation for Time/Pace time input/output values
-------------------------------------------------------------------------------------------------*/

//only allow user to enter numeric values
$('.numbersOnly').keypress(function (e) {
    var charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
});

//only numbers 0-59 for minutes and seconds values
$('.minSec').on('change', function () {
    if ($(this).val() < 0) $(this).val(0);
    if ($(this).val() > 59) $(this).val(59);

});

//ensure that the default display for any time input is "00"
$('.timeValue').on('change', function () {
    if ($(this).val() < 10) {
        if ($(this).val().length < 2) {
            $(this).val(0 + $(this).val());
        }
    }
});

//only allow 1-12 for month value
$('.month').on('change', function () {
    if ($(this).val() < 1) $(this).val(1);
    if ($(this).val() > 12) $(this).val(12);

});

//only allow 1-31 for day values
$('.day').on('change', function () {
    if ($(this).val() < 1) $(this).val(1);
    if ($(this).val() > 31) $(this).val(31);

});

//only allow 1900-2020 for year values
$('.year').on('change', function () {
    if ($(this).val() < 1900) $(this).val(1900);
    if ($(this).val() > 2020) $(this).val(2020);

});


/*-------------------------------------------------------------------------------------------------
Set unit and pace values
-------------------------------------------------------------------------------------------------*/

function getDistanceUnit() {
    return METERS_IN_MILE;
}


function getPaceUnit() {
    return METERS_IN_MILE;
}



/*-------------------------------------------------------------------------------------------------
Calculate and Save Functionality
-------------------------------------------------------------------------------------------------*/

//This function is called to perform the calculation for pace/time.
function calcIT() {
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
    var hourP = document.Calc.paceH.value;
    var minP = document.Calc.paceM.value;
    var secP = document.Calc.paceS.value;
    var paceUnit = METERS_IN_MILE;
    var paceObj = new PaceObject(hourP, minP, secP, paceUnit);

    // Which result
    var resultValue = document.Calc.CalcWhat.options[document.Calc.CalcWhat.selectedIndex].value;

    if (resultValue == TIME) {
        timeObj.calculate(distObj, paceObj);

        document.Calc.timeH.value = timeObj.getHours();
        document.Calc.timeM.value = timeObj.getMinutes();
        document.Calc.timeS.value = timeObj.getSeconds();

        $('#timeH').attr('disabled', 'disabled');
        $('#timeM').attr('disabled', 'disabled');
        $('#timeS').attr('disabled', 'disabled');

    } else if (resultValue == DISTANCE) {
        distObj.calculate(timeObj, paceObj);

        // rounding
        document.Calc.distance.value = distObj.decimalPlaces(2);
    } else if (resultValue == PACE) {
        paceObj.calculate(timeObj, distObj);

        document.Calc.paceH.value = paceObj.getHours();
        document.Calc.paceM.value = paceObj.getMinutes();
        document.Calc.paceS.value = paceObj.getSeconds();

        $('#paceH').attr('disabled', 'disabled');
        $('#paceM').attr('disabled', 'disabled');
        $('#paceS').attr('disabled', 'disabled');
    }

    $(".timeValue").each(function (index) {
        console.warn("this is the value", index)
        if ($(this).val() == "") {
            $(this).val("0" + 0);
        }
    });

    $(".raceDetails").val("");
} //end CalcIt

//performs the functionality to add to PR certificate
function saveMyTime() {
    clearCalcErrorHandling();
    console.log("pace hours", document.Calc.paceH.value + ":" + document.Calc.paceM.value + ":" + document.Calc.paceS.value);
    var hours = $('#timeH').val();
    var minutes = $('#timeM').val();
    var seconds = $('#timeS').val();
    var raceTime = hours + ":" + minutes + ":" + seconds;
    var raceName = $('#raceName').val();
    var raceDate = $('#raceMonth').val() + "/" + $('#raceDay').val() + "/" + $('#raceYear').val();

    var raceInfo = "  in the " + raceName + " on " + raceDate;

    console.warn("minutes" + minutes);
    console.warn("PRminutes" + $('#5kPRM').val());
    var newPR;

    var PRtimeH;
    var PRtimeM;
    var PRtimeS;
    var distance;

    newPR = false;

    //5k
    if ($('#distance').val() == 3.1) {

        PRTimeH = $('#5kPRH');
        PRTimeM = $('#5kPRM');
        PRTimeS = $('#5kPRS');
        PRRaceInfo = $('#5kRace');
        distance = "5k";
    }
    //10k
    if ($('#distance').val() == 6.2) {

        PRTimeH = $('#10kPRH');
        PRTimeM = $('#10kPRM');
        PRTimeS = $('#10kPRS');
        PRRaceInfo = $('#10kRace');
        distance = "10k";
    }
    //half marathon
    if ($('#distance').val() == 13.1) {

        PRTimeH = $('#halfMarathonPRH');
        PRTimeM = $('#halfMarathonPRM');
        PRTimeS = $('#halfMarathonPRS');
        PRRaceInfo = $('#halfMarathonRace');
        distance = "half marathon";
    }
    //marathon
    if ($('#distance').val() == 26.2) {

        PRTimeH = $('#marathonPRH');
        PRTimeM = $('#marathonPRM');
        PRTimeS = $('#marathonPRS');
        PRRaceInfo = $('#marathonRace');
        distance = "marathon";
    }

    if (hours > PRTimeH.val()) {
        console.warn("in first if");
        newPR = true;
    }


    if (hours == PRTimeH.val() && minutes < PRTimeM.val()) {
        newPR = true;
        console.warn("in second if");
    }

    if (hours == PRTimeH.val() && minutes == PRTimeM.val() && seconds < PRTimeS.val()) {
        newPR = true;
        console.warn("in third if");
    }

    if (PRTimeH.val() == '' && PRTimeM.val() == '' && PRTimeS.val() == '') {
        newPR = true;
    }

    if (PRTimeH.val() == hours && PRTimeM.val() == minutes && PRTimeS.val() == seconds) {
        newPR = "equal";
    }
    console.warn()
    if ($('#raceName').val() != "" && $('#raceMonth').val() != "" && $('#raceDay').val() != "" && $('#raceYear').val() != "") {
        if (newPR == true) {
            PRRaceInfo.html(raceInfo);
            PRTimeH.html(hours);
            PRTimeH.val(hours);
            PRTimeM.html(minutes);
            PRTimeM.val(minutes);
            PRTimeS.html(seconds);
            PRTimeS.val(seconds);

            $('#calcErrorHandling').css('color', 'blue');
            $('#calcErrorHandling').html("Congratulations on a great " + distance + " Personal Record!");

        } else if(newPR == "equal") {
            if($('.timeValue').val("")){
                $('#calcErrorHandling').html("Please calculate a new pace or time before saving");
            }
            else{
            alert("You have already added this PR. Please clear the PR and re-add if you would like to change the race name and date");
                }
        } else {
            alert("This is not a new PR. It will not be added");
        }

    } else {
        $('#calcErrorHandling').css('color', 'red');
        $('#calcErrorHandling').html("Error adding new PR. PR must include race name and date");
    }
}

