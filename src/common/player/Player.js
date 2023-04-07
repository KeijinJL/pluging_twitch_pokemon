class Player {
    constructor(name = "unknown", message = "", avatar) {
        this.name = name;
        this.message = message;
        this.avatar = avatar || this.getRandomImageUrl();
    }

    getRandomImageUrl() {
        const urls = [
            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3d8211da-5332-472f-8236-77760a37b5d2/d74eqjd-c375362d-e8ec-4e49-a89c-42b9f5368fd6.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNkODIxMWRhLTUzMzItNDcyZi04MjM2LTc3NzYwYTM3YjVkMlwvZDc0ZXFqZC1jMzc1MzYyZC1lOGVjLTRlNDktYTg5Yy00MmI5ZjUzNjhmZDYuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Nz9wOG1ZlMoastpBrsF6D72p3QrRO5VfBA2JOw6c-hw",
            "https://fc06.deviantart.net/fs71/f/2014/031/d/a/jinx_lol_pixel_by_kajinman-d732j63.gif"
        ];
        const randomIndex = Math.floor(Math.random() * urls.length);
        return urls[randomIndex];
    }

}

export default Player;