console.log("loaded.")


function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

let get_result_html = (obj) => {

    console.log(obj.short_screenshots);
    
    return (`

    <div class="result">
        <div class="game-cover-area" style="background-image: url(${obj.background_image})"></div>
        <div class="mid-area">
            <div class="game-title-area">${obj.name}</div>
         
            <div class="game-platform-area"><span>Platform: </span>${obj.platforms.map((e) => e.platform.name).join(", ")}</div>
            <div class="game-date-area"><span>Release date: </span>${obj.released}</div>
            <div class="game-description-area"><span>Genre: </span>${obj.genres.map((e) => e.name).join(", ")}</div>
        </div>

        <div class="game-rating-area">${obj.rating == 0 ? "-" : Number(obj.rating*2).toFixed(1)}</div>
     
        <div class="screenshots"> ${obj.short_screenshots.map((d) => {
            return (
            `<img src=${d.image} />`
            )
        }).slice(166,7).join(" ")}
        </div>

    </div>

`)}


let url = "https://rawg.io/api/games?key=YOUR_API_KEY_HERE&search=" 

let node = document.querySelector("input")
node.addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
        console.log('Fetch results coming for: ' + node.value);
        let fetch_url = url + node.value

        fetch(fetch_url).then((res) => {
            res.json().then((data) => {
                document.querySelector(".results").innerHTML = ""
                data.results.forEach((el, idx) => {
                    console.log(el, idx);
                    document.querySelector(".results").innerHTML += get_result_html(el)

                })
            })
        })
    }
})



