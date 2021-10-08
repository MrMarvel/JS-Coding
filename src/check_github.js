//Скрипт для поиска сделанных работ по Github JavaFirstMirea Java Семестр 3
async function findAmountOfComponentsOnGithubRepository(url) {
    let f = null;
    try{
        f = await fetch(url, {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "cache-control": "max-age=0",
                "if-none-match": "W/\"3787cd6e9fb9452c95251b096e079fb8\"",
                "sec-ch-ua": "\"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1"
            },
            "referrer": "https://github.com/sermakov/JavaFirstMirea/network/members",
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });
    } catch (e) {}

    if (!f || !f.ok) return -1;
    let body = await f.text();
    let c = 0;
    for (let p = -1; c < 1000; c++) {
        p = body.indexOf("js-navigation-open Link--primary", p+1);
        if (p < 0) break;
    }
    return c;
}

function findGoodReposWithWork(workNumber) {
    if (workNumber < 1) return;
    //You must be on FORKS PAGE of repsitory JavaFirstMirea: https://github.com/sermakov/JavaFirstMirea/network/members
    let repos = document.getElementsByClassName("repo")
    for (let i = 0; i < repos.length; i++) {
        console.log(i);
        let repo = repos[i];
        let href = repo.getElementsByTagName("a")[2].href;
        let url = href + "/tree/master/src/ru/mirea/task" + workNumber;
        let find = findAmountOfComponentsOnGithubRepository(url);
        find.then(value => {
            if (value) {
                if (value > 1) {
                    console.log(url);
                    console.log(value);
                }
            }
        })
    }
}