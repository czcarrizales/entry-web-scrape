const puppeteer = require("puppeteer");
const fs = require("fs/promises");

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let clickedData;
  await Promise.all([
    page.goto(
        "https://www.simplyhired.com/search?q=entry+level+web+developer&l=Remote&job=yS0ibJzXSOblAaMRDoAoD7SEFXYmInDCdMXzBpQ4QPHDn0a1qUut4Q", {waitUntil: "load"}
      ),
      console.log('page loaded'),
      console.log('attempting wait for select'),
      page
    .waitForSelector(".jobposting-title", {timeout: 5000})
    .then(async () => {
        console.log("found job title!")
        console.log('clicking job title')
        await page.click(".jobposting-title")
        console.log('job title clicked')
        console.log('waiting for viewjob')
        await page.waitForSelector('.viewjob-jobDescription')
        console.log('view job found')
        clickedData = await page.$eval(".viewjob-jobDescription", (el) => el.textContent);
        console.log(clickedData);
    }),
    ,
    
  ])

//   await page
//     .waitForSelector(".jobposting-title")
//     .then(() => console.log("found job title!"));
//   await page.click(".jobposting-title");
//   let clickedData;
//   page.waitForSelector(".viewjob-section").then(async () => {
    // clickedData = await page.$eval(".viewjob-section", (el) => el.textContent);
    // console.log(clickedData);
//     console.log("found it!");
//   });

  // const jobLinks = await page.$$eval('.jobposting-title a', (titles) => {
  //     return titles.map(title => title.textContent)
  // })
  // console.log(jobLinks)
  // const paragraphs = []
  // for (let link of jobLinks) {
  //     console.log(link)
  //     // await link.click()
  //     // paragraphs.push(await page.$eval(".p", el => el.textContent))
  // }

  // const jobTitles = await page.evaluate(() => {
  //     return Array.from(document.querySelectorAll(".jobposting-title a")).map(title => title.textContent)
  // })
  // const jobs = {
  //     jobTitles
  // }
  // await fs.writeFile("jobTitles.txt", jobs.jobTitles.join('\r\n'))
  await browser.close();
}

start();
