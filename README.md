# effective-project-skeleton

This project is an app skeleton, designed to be reusable. The whole project is written in Javascript. For scalability, backend and Frontend apps are splitted and can be run independently. Also, they are written with node js and express. Client side is written with vue js. Database used is mongodb.

This project run fine with now : https://zeit.co/now.

You can test this app with a free mongodb here : https://mlab.com/welcome/.


Init the project :

    git clone https://github.com/mignonat/effective-project-skeleton


For production environment, install global dependencies () :

    sudo npm install --global forever //https://www.npmjs.com/package/forever
    sudo npm install --global forever-monitor //https://www.npmjs.com/package/forever-monitor


Download and install app dependencies :

    npm install


Build app :

    npm run build     //prod build. webpack + creation of translation files from .properties to js
    npm run build-dev //same that build but for dev environment
    npm run assets    //run development webpack script

Start app :

    npm run start            //run front & back apps in prod env

    npm run start-front-dev  //build and run front app in dev env (using nodemon)
    npm run start-front-prod //build and run front app in prod env (using forever)

    npm run start-back-dev   //build and run back app in dev env (using nodemon)
    npm run start-back-prod  //build and run back app in prod env (using forever)


Environment :

    Set your differents environments in the properties files in env/ directories


Update node version :

    sudo npm cache clean -f //(force) clear you npm cache
    sudo npm install -g n //install "n" this might take a while
    sudo n stable //upgrade to lastest version
