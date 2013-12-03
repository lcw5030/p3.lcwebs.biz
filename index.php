<!DOCTYPE html>
<html>
<head>

        <title>Pace Calculator</title>
        
        <link rel="stylesheet" href="main.css" type="text/css">
        <link rel="stylesheet" href="features.css" type="text/css">

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
        
</head>
<body>
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
                <select name="CalcWhat" id="calcWhat">
                <option value="0">Time
                <option value="2">Pace
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
                <td bgcolor="white" id="timeInput">
                <input type="text" name="timeH" id="timeH" size="3">:
                <input type="text" name="timeM" id="timeM" size="3">:
                <input type="text" name="timeS" id="timeS" size="3">
                </td>
        
                <td bgcolor="white">
                <select name="distance" id="distance">
                <option value="3.1" selected>5k
                <option value="6.2">10k
                <option value="13.1">Half Marathon
                <option value="26.2">Marathon
                </select>
                </td>
        
                <td bgcolor="white">
                <input type="text" name="paceH" id="paceH" size="3">:
                <input type="text" name="paceM" id="paceM" size="3">:
                <input type="text" name="paceS" id="paceS"size="3">
                </td>
        </tr>
        
        <tr>
                <td bgcolor="white">
                &nbsp;
                </td>
        
                <td bgcolor="white">
                
                </td>
        
                <td bgcolor="white">
                
                </td>
        </tr>
        
        <tr>
                <td bgcolor="white" colspan="3" align="center">
                <input type="button" value="Calculate" onClick="calcIT()">
                <input type="button" value="Clear" onClick="clearNums()">
                
                </td>
        </tr>
        <tr>
                <td bgcolor="white" colspan="3" align="center">
                        <input type="button" value="Save My Time for" onClick="saveMyTime()">
                        <input type="text" name="race name" id="raceName" size="20">: on
                        <input type="text" name="dateMonth" id="raceMonth" size="2">/
                        <input type="text" name="dateDay" id="raceDay" size="2">/
                        <input type="text" name="dateYear" id="raceYear" size="4">
                </td>
                        </tr>
        </table>
         
        <!-- End embedded table -->

</td>
<td>
<table cellpadding="0" cellspacing="0" id="certificate">
        <tr>
        <td colspan="10" align="center">Congratulations to Runner on the following PRs!</td>
        </tr>
        <tr>
                <td width="60" padding-right="100px">5k: </td>
                <td size ="2"id="5kPRH"/td>
                <td>:</td>
                <td size="2" id="5kPRM"/td>
                <td>:</td>
                <td size="2" id="5kPRS"/td>
                <td size="2" style="padding:10px" id="5kRace"td></td>
        </tr>
        <tr>
                <td width="60">10k: </td>
                <td size ="2"id="10kPRH"/td>
                <td>:</td>
                <td size="2" id="10kPRM"/td>
                <td>:</td>
                <td size="2" id="10kPRS"/td>
                <td style="padding:10px" id="10kRace"/td></td>
        </tr>
        <tr>
                <td width="60">Half Marathon: </td>
                <td size ="2"id="halfMarathonPRH"/td>
                <td>:</td>
                <td size="2" id="halfMarathonPRM"/td>
                <td>:</td>
                <td size="2" id="halfMarathonPRS"/td>
                <td id="halfMarathonRace" style="padding:10px"/td></td>
        </tr>
        <tr>
                <td width="60">Marathon: </td>
                <td size ="2"id="marathonPRH"/td>
                <td>:</td>
                <td size="2" id="marathonPRM"/td>
                <td>:</td>
                <td size="2" id="marathonPRS"/td>
                <td id="marathonRace" style="padding:10px"/td></td>
        </tr>         
</table>
</td>
</tr>

<tr>
<td align="center" id="calcErrorHandling">

</td>
</tr>
<td>
        <table>
        </table>
</td>
</table>



</form>
<script language="JavaScript" src="pacecalc.js"></script>
<script language="JavaScript" src="pacecalc_example.js"></script>
</body>
</html>


