
<form name="Calc">
<!-- Originally written by Keith Jenci -->
<!-- www.mredkj.com -->
<!-- cellpadding on next line = Outer Border -->
<table border="0" cellpadding="1" cellspacing="0">
<tr>
<!-- bgcolor on next line = Border Color -->
<td bgcolor="#000000">
	<!-- Embedded table -->
	<!-- cellspacing on next line = Cell Border -->
	<table border="0" cellpadding="5" cellspacing="1">
	
	<tr>
		<td bgcolor="white" colspan="3" align="center">
		<b>Calculate for: &nbsp;</b>
		<select name="CalcWhat">
		<option value="0">Time
		<option value="1">Distance
		<option value="2" selected>Pace
		</select>
		</td>
	</tr>
	
	<tr>
		<td bgcolor="white">
		<b>Time</b> (h:m:s)
		</td>
	
		<td bgcolor="white">
		<b>Distance</b>
	 	</td>
	
		<td bgcolor="white">
		<b>Pace</b> (h:m:s)
		</td>
	</tr>
	
	<tr>
		<td bgcolor="white">
		<input type="text" name="timeH" size="3">:
		<input type="text" name="timeM" size="3">:
		<input type="text" name="timeS" size="3">
	 	</td>
	
		<td bgcolor="white">
		<input type="text" name="distance" size="9">
	 	</td>
	
		<td bgcolor="white">
		<input type="text" name="paceH" size="3">:
		<input type="text" name="paceM" size="3">:
		<input type="text" name="paceS" size="3">
		</td>
	</tr>
	
	<tr>
		<td bgcolor="white">
		&nbsp;
		</td>
	
		<td bgcolor="white">
		<input type="radio" name="optDist" value="miles" checked>Miles<br>
		<input type="radio" name="optDist" value="meters">Meters<br>
		<input type="radio" name="optDist" value="yards">Yards<br>
		<input type="radio" name="optDist" value="kilometers">Kilometers
		</td>
	
		<td bgcolor="white">
		<input type="radio" name="optPace" value="miles" checked>Mile<br>
		<input type="radio" name="optPace" value="400meters">400m<br>
		<input type="radio" name="optPace" value="kilometers">Kilometer
		</td>
	</tr>
	
	<tr>
		<td bgcolor="white" colspan="3" align="center">
		<input type="button" value="Calculate" onClick="calcIT()">
		<input type="button" value="Clear" onClick="clearNums()">
	 	</td>
	</tr>
	</table>
	<!-- End embedded table -->

</td>
</tr>

<tr>
<td align="center">
<a href="http://www.mredkj.com" target="_blank" style="color: #000000; font-size: 75%">MREDKJ.com</a>
</td>
</tr>

</table>
</form>


