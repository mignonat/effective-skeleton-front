const webdriver = require('selenium-webdriver')
const config = require(__dirname+'/../../server/shared/config.js')
const path = require('path')
config.setAbsRootPath(path.resolve("."))
const Const = require(__dirname+'/../../server/shared/const.js')
const port = config.get(Const.APP_PORT) || 8080

const By = webdriver.By
const until = webdriver.until
const driver = new webdriver.Builder().forBrowser('chrome').build();


driver.get('http://localhost:'+port);

//todo test a label somewhere before locale change

const localeSelect = driver.findElement(By.id("top-bar-locale")).findElement(By.css("option[value='en']")).click()

//todo test a label somewhere after locale change

//driver.wait(until.titleIs('webdriver - Google Search'), 1000);

//driver.quit();