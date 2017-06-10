# effective-project-skeleton

Init the project using git source repo :

    git clone https://github.com/mignonat/effective-project-skeleton


Install global dependencies :

    sudo npm install --global forever //https://www.npmjs.com/package/forever
    sudo npm install --global forever-monitor //https://www.npmjs.com/package/forever-monitor


Download and install all app dependencies in package.json :

    npm install


Run :

    npm run start            //run both front and back apps in prod env
    npm run start-front-dev  //run front app in dev env (using nodemon)
    npm run start-front-prod //run front app in prod env (using forever)
    npm run start-back-dev   //run back app in dev env (using nodemon)
    npm run start-back-prod  //run back app in prod env (using forever)

    npm run assets  //build resources assets using webpack


Environement :

    Set your differents environments in the properties files in env/ directories


Update node version :

    sudo npm cache clean -f //(force) clear you npm cache
    sudo npm install -g n //install "n" this might take a while
    sudo n stable //upgrade to lastest version
