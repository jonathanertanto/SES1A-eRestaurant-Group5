## First time downloading the project:
1. Copy this link: https://github.com/jonathanertanto/SES1A-eRestaurant-Group5.git <br />
2. Open command line app (e.g. terminal) <br />
3. Direct to the directory where you want to save the project on your computer (cd directory) <br />
4. Type git clone https://github.com/jonathanertanto/SES1A-eRestaurant-Group5.git and hit enter <br />
5. Set up your database <br />

## Database Set Up
1. Install mongodb on your computer <br />
   Possible sources for mac user: https://shashank6341.medium.com/installing-mongodb-on-macos-catalina-big-sur-or-older-d47c18b0c57d, https://blog.londonappbrewery.com/how-to-download-install-mongodb-on-mac-2895ccd2b5c1, https://medium.com/nerd-for-tech/how-to-install-mongodb-on-macos-big-sur-d6df6ac69618 <br />

## Already have the project on the computer:
1. Open command line app (e.g. terminal) <br />
2. Direct to the project's folder directory <br />
3. Type git pull <br />

## How to run the project:
### Preparation:
1. Optional: install yarn on your computer system (search on google since there are various way to do it)<br />
2. Optional: install nodemon <br />
### How to run:
1. Open one tab of the chosen command line app (e.g. terminal)<br />
2. Start the mongodb server. Example using brew: brew services run mongodb-community (requred an installation of brew) <br />
3. Open two more tabs of the chosen command line app (e.g. terminal) and do not close it until the project stop running<br />
4. Direct both tabs to the project's folder directory<br />
5. Direct one tab to the frontend directory (cd frontend)<br />
6. If you just clone the project: if you have yarn installed, type: yarn install<br />
7. if you have yarn installed, type: yarn start<br />
    Otherwise, type: npm start (it might take few seconds to start the server, be patient)<br />
8. Direct the other tab to the backend directory (cd backend)<br />
9. If you already install the nodemon, type: nodemon app.js<br />
    Otherwise, type: node app.js<br />

## How to stop the project:
1. On both tabs of the command line app, click control C on your keyboard<br />
2. Open a new tab of the chosen command line app (e.g. terminal) <br />
3. End the mongodb server. Example using brew: brew services stop mongodb-community (requred an installation of brew) <br />

## Important Notes:
- Remember to always git pull the project to keep it up to date!<br />
- Open "localhost:3000/" on your web browser to open the website<br />
    