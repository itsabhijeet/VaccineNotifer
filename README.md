# VaccineNotifier
A Node.js application for notifying user when a vaccine slot is available for 18+ Years. It utilises the public API exposed by CoWin which
returns the available vaccine slots for a particular pin code and for a particular date.

#Using this project on your local:
  1. Clone this repo.
  2. Do npm install to install all the dependencies. 
  3. Add MailConfig.js file. And then add and export a constant MAIL like this:  
        `export const MAIL = {
          ID: "youremail@someemail.com",
          PASS: "aboveEmailPassword"
        }`
     This is required beacuse this will was not committed. This mail will be required to send email to users. See mailContoller.js file for this.
  4. Install MongoDb also, So that you can add users to the database with their pin codes and email. For adding users make a POST call to /add with body containing
     pinCode, email and mobile. 
  5. There is cron job that will run on each user added by you using the above POST call after every 1 minute. See dbController.js file.
  6. You can keep the server running on your local so that the job keeps running on the background.  
