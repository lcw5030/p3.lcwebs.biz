<!--
// * * * * * * * * * * * * *
// Pace Calculator JavaScript Base
// created by: Keith Jenci
// modified 01/02/2001
// http://www.mredkj.com
// * * * * * * * * * * * * *

/* * * * 
 * TimeObject
 * @param hour is the hour value.
 * @param min is the minutes value.
 * @param sec is the seconds value.
 */
function TimeObject(hour, min, sec)
{
	// variables
	this.timeInSeconds = (hour*3600) + (min*60) + (sec*1);
	this.h;
	this.m;
	this.s;

	// method setup
	this.getHours = getHoursTObj;
	this.getMinutes = getMinutesTObj;
	this.getSeconds = getSecondsTObj;
	this.calculate = calculateTObj;
	this.adjust = adjustTObj;
	
}

/*
 * Calculate and save into the variable "timeInSeconds".
 * @param dist is the Distance Object.
 * @param pace is the Pace Object.
 */
function calculateTObj(distObj, paceObj)
{
	// convert distance to pace units
	var d = distObj.convert(paceObj.unit);
	var p = paceObj.timeInSeconds;
	
	// the result will be in seconds, given paceObj is in seconds.
	this.timeInSeconds = d * p;
	
	this.adjust();
}

function adjustTObj()
{
	var h,m,s;

	h = Math.floor(this.timeInSeconds/3600);
	m = Math.floor((this.timeInSeconds - (3600*h))/60);
	s = Math.round((this.timeInSeconds - (3600*h) - (60*m)));

	// adjustment (to account for rounding up to 60 seconds or 60 minutes)
	if (s==60)
	{
		s = 0;
		m++;
	}
	if (m==60)
	{
		m = 0;
		h++;
	}
	
	// adjustment for single digit numbers
	if (s<10)
	{
		s = '0' + s;
	}
	if (m<10)
	{
		m = '0' + m;
	}
	if (h<10)
	{
		h = '0' + h;
	}

	this.h = h;
	this.m = m;
	this.s = s;
}

function getHoursTObj()
{
	return this.h;
}

function getMinutesTObj()
{
	return this.m;
}

function getSecondsTObj()
{
	return this.s;
}

//end TimeObject methods
// * * * *


/* * * * *
 * Distance Object
 */
function DistanceObject(val, unit)
{
	// variables
	this.val = val;
	this.unit = unit;

	// method setup
	this.calculate = calculateDistObj;
	this.convert = convertDistObj;
	this.decimalPlaces = decimalPlacesDistObj;
}

/*
 * @param timeObj is the Time Object.
 * @param paceObj is the Pace Object.
 */
function calculateDistObj(timeObj, paceObj)
{
	// convert from pace unit to distance unit.
	var p = paceObj.convert(this.unit);
	var t = timeObj.timeInSeconds;
	this.val = t / p;
}

/*
 * Distance Conversion
 * this.val is the distance quantity.
 * this.unit is the "from" distance unit in meters (or another common measurement).
 * @param distTo is the "to" distance unit in meters (or another common measurement).
 * @return the new value for distance.
 */
function convertDistObj(distTo)
{
	return ((this.val * this.unit) / distTo);
}

/*
 * This function returns the value
 * with the number of decimal places requested.
 * @param places is the number of decimal places.
 * @return the new value.
 */
function decimalPlacesDistObj(places)
{
	var newVal = this.val;

	factor = 1;
	for (i=0; i<places; i++)
	{	factor *= 10; }
	newVal *= factor;
	newVal = Math.round(newVal);
	newVal /= factor;
	
	return newVal;
}
// end Distance Object
// * * * *

/* * * *
 * Pace Object
 * @param hour is the hour value.
 * @param min is the minutes value.
 * @param sec is the seconds value.
 * @param unit is the unit of distance for the pace.
 */
function PaceObject(hour, min, sec, unit)
{
	// variables
	this.timeInSeconds = (hour*3600) + (min*60) + (sec*1);
	this.h;
	this.m;
	this.s;
	this.unit = unit;
	
	// method setup
	this.calculate = calculatePaceObj;
	this.convert = convertPaceObj;
	this.adjust = adjustTObj; // also used by TimeObject
	this.getHours = getHoursPaceObj;
	this.getMinutes = getMinutesPaceObj;
	this.getSeconds = getSecondsPaceObj;
}

/*
 * timeObj is the Time Object.
 * distObj is the Distance Object.
 */
function calculatePaceObj(timeObj, distObj)
{
	// conversion from distance unit to pace unit.
	var d = distObj.convert(this.unit);
	var t = timeObj.timeInSeconds;

	var p = t / d;

	this.timeInSeconds = p;
	this.adjust();
}

/*
 * Pace Conversion
 * this.timeInSeconds is the pace quantity (time per distance)
 * this.unit is the "from" distance unit in meters (or another common measurement).
 * @param paceTo is the "to" distance unit in meters (or another common measurement).
 */
function convertPaceObj(paceTo)
{
	return ((this.timeInSeconds / this.unit) * paceTo);
}

function getHoursPaceObj()
{
	return this.h;
}

function getMinutesPaceObj()
{
	return this.m;
}

function getSecondsPaceObj()
{
	return this.s;
}
// end Pace Object
// * * * *

// -->
