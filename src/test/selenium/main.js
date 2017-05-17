const webdriver = require('selenium-webdriver')
const config = require(__dirname+'/../../server/shared/config.js')
const path = require('path')
config.setAbsRootPath(path.resolve("."))
const Const = require(__dirname+'/../../server/shared/const.js')
const port = config.get(Const.APP_PORT) || 8080

const By = webdriver.By
const until = webdriver.until
const expect = webdriver.expect

console.log("Opening browser")
const driver = new webdriver.Builder().forBrowser('chrome').build();

const url = 'http://localhost:'+port+'/home?locale=fr'
console.log("Opening url "+url)
driver.get(url);

driver.findElement(By.id("top_bar_user_login_btn_label")).getText()
.then(text => {
    console.log("Checking if language is French")
    if (text != 'Connection') throw 'First time connection button text should be "Connection" but "'+text+'"'
    console.log("Switching language from French to English")
    return driver.findElement(By.id("top_bar_locale")).findElement(By.css("option[value='en']")).click()
})
.then(() => driver.findElement(By.id("top_bar_user_login_btn_label")).getText())
.then(text => {
    console.log("Checking if language is English")
    if (text != 'Log in') throw 'Connection button text is not "Log in" but "'+text+'"'
    console.log("Switching language from English to French")
    return driver.findElement(By.id("top_bar_locale")).findElement(By.css("option[value='fr']")).click()
})
.then(() => driver.findElement(By.id("top_bar_user_login_btn_label")).getText())
.then(text => {
    console.log("Checking if language is French")
    if (text != 'Connection') throw 'Second time connection button text should be "Connection" but "'+text+'"'
})
.then(() => {
    console.log("All tests OK")
    console.log("Closing the browser")
    driver.quit()
})

//driver.wait(until.elementLocated(By.id('top_bar_user_login_btn_label')), 10000);

//driver.wait(until.titleIs('webdriver - Google Search'), 1000);

