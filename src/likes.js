//Класс для описания действия лайка, реализация лайкания за время с задержкой
class A{
    getNLikes(n){
        // noinspection SpellCheckingInspection
        let cooldown = 1;
        let maxTime = cooldown + 1;
        for (let i = 0; i < n; i++) {
            setTimeout(this.like, cooldown*i);
        }
    }
    static like() {
        fetch("https://events.webinar.ru/api/light/reactions/eventsessions/" + localStorage.getItem("last-event-session-id") + "/likes", {
            "headers": {
                "accept": "*/*",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "authorization": "Bearer " + localStorage.getItem("auth-token"),
                "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin"
            },
            "referrer": "https://events.webinar.ru/3865279/8230151/stream-new/" + localStorage.getItem("last-event-session-id"),
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        }).then(r => r);}
}
let timer2 = setTimeout("clearInterval(timer);",906);
let timer = setInterval(A.like, 1);
if (timer) clearInterval(timer);
if (timer2) clearTimeout(timer2);

