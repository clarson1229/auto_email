# Auto Emailer Web App. 

This React app works with cron-job.org as its sceduler. Which hits the hosted site calling the app as a lambda function. 

The App is built with React and hosted on netlify. It hits an API database pulls down the most recent specified timeframes worth of data. Then takes that data does some calculations and puts the output into a Email template that was written for this project.  The email is then sent to the specified list of recipients. 

The API is for the colorado division of water. 

This project was built for MineWAter. 

