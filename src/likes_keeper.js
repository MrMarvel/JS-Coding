//Класс для поддержки постоянного количество лайков на иконке
class LikesKeeper {

    static cooldown = 1;
    static timeToDisappear = 10 * 1000;
    keepLikesCount = 0;
    timerToRefresh;
    static #like(n = 1) {
        if (n < 1) return;
        LikesKeeper.#likeRequest();
        setTimeout(LikesKeeper.#like(n-1), LikesKeeper.cooldown);
    }
    static #likeRequest() {
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
        }).then(r => r);
    }
    keepLikes(keepLikesCount) {
        this.keepLikesCount = keepLikesCount;
        if (keepLikesCount === 0) {
            clearTimeout(this.timerToRefresh);
            return;
        }
        this.startKeeping();
    }
    stop() {
        clearTimeout(this.timerToRefresh);
    }
    startKeeping() {
        clearTimeout(this.timerToRefresh);
        LikesKeeper.#like(this.keepLikesCount);
        this.timerToRefresh = setTimeout(LikesKeeper.#refreshLikes, LikesKeeper.timeToDisappear, this);
    }

    static #refreshLikes(keeper = null) {
        if (!keeper) {
            console.error("No \"keeper\" in argument to function refreshLikes!");
            return;
        }
        LikesKeeper.#like(keeper.keepLikesCount);
        keeper.timerToRefresh = setTimeout(LikesKeeper.#refreshLikes, LikesKeeper.timeToDisappear, keeper);
    }
}

let keeper = new LikesKeeper();
keeper.keepLikes(228);