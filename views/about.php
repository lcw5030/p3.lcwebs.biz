
<!DOCTYPE html>
<html>
   <div>
      <head>
         <header>Pace Calculator - About</header>
         <title>Pace Calculator - About</title>
         <link rel="stylesheet" href="/style/main.css" type="text/css">
         <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
         <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
      </head>
      <body>
         <div id="photo">
            <img src="/images/my_bio_photo.jpg" alt="Picture of Lisa Weber">
         </div>
         </br>
         <div class='about'>
            <h2>About This Pace Calculator</h2>
            Running has always been a passion of mine and I have always enjoyed working on improving race times.</br>
            This application allows you to calculate both pace and time for various race distances. 
            A Personal Record also known as "PR" is the fastest pace/time a runner has for a particular distance.
            The distances I have included in this application are in miles. A 5k is 3.1 miles. A 10k is 6.2 miles. 
            A half marathon is 13.1 miles and a full marathon is 26.2 miles.</br></br>
            I would also like to give credit to http://www.mredkj.com/javascript/pacecalc.asp since I used this api for my application.</br>
            I have only included functionality for calculating pace/time in miles. This api did not utilize jQuery and did not have error handling.
         </div>
         </br>
         <div class="aboutErrorHandling">
            <h2>Application Features</h2>
            -User can only type numeric values in time and date</br>
            -User can only input values 0-59 for minutes/seconds</br>
            -User can only input 1-12 for month, 1-31 for day, 1900-2020 for year</br>
            -Pace/time and race details clear when changing drop downs</br>
            -I also added a PR certificate on the right hand side of the screen</br>
         </div>
         </br>
      </body>
      <div>
         <a href='/index.php'>Return to Pace Calculator</a>
      </div>
   </div>
</html>

