const iconPlays = document.getElementsByClassName('icon-play');
const iconPauses = document.getElementsByClassName('icon-pause');
const iconNext = document.getElementById('icon-next')!;
const iconPrev = document.getElementById('icon-prev')!;
const musicTitle = document.getElementById('music-title')!;
const musicThumb = document.getElementById("music-thumb") as HTMLImageElement;

const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

let player: YT.Player;

window.onYouTubeIframeAPIReady = () => {
    // @ts-ignore
    player = new YT.Player("player", {
        playerVars: {
            autoplay: true,
            listType: "playlist",
            list: "PLNeV1irspkQaFj4NAN3w1zmA9UrlEA-ln",
            shuffle: true
        },
        events: {
            onStateChange: (event) => handleStatePlayer(event),
            onReady: (event) => {
                player.setShuffle(true);
            }
        },
    });
};

const handleStatePlayer = (event: YT.OnStateChangeEvent) => {
    switch (event.data) {
        case YT.PlayerState.CUED:
        case YT.PlayerState.BUFFERING:
            musicTitle.textContent = "Cargando..";
            musicThumb.src = "";
            break;

        case YT.PlayerState.PLAYING:
            for (const el of iconPlays) el.classList.add("hidden");
            for (const el of iconPauses) el.classList.remove("hidden");

            const data = player.getVideoData();
            musicTitle.textContent = data.title || "Sin título";
            musicThumb.src = `https://img.youtube.com/vi/${data.video_id}/default.jpg`;
            break;

        case YT.PlayerState.PAUSED:
            for (const el of iconPlays) el.classList.remove("hidden");
            for (const el of iconPauses) el.classList.add("hidden");
            break;
    }
};

const preparateButtons = () => {
    iconNext.addEventListener("click", () => {
        player.nextVideo();
    });

    iconPrev.addEventListener("click", () => {
        player.previousVideo();
    });

    for (const el of iconPlays) {
        el.addEventListener("click", () => {
            player.playVideo();
        });
    }

    for (const el of iconPauses) {
        el.addEventListener("click", () => {
            player.pauseVideo();
        });
    }
}

preparateButtons();