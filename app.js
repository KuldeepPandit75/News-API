
let cards = document.querySelector(".cards");
let articlesGlobe;
let button = document.querySelector("button");
let search = document.querySelector("input");
let url = "https://newsapi.org/v2/everything?q=india&from=2024-04-30&sortBy=publishedAt&apiKey=79eae53414dd4284ab3e47b23b300ee4";
let categories = document.querySelector(".categ");


function removeExtraLines(str) {
    return str.split('\n').filter(word => word !== '').join(' ');
}



let printCards = () => {
    console.log(url);
    for (let i = 0; i < articlesGlobe.length; i++) {
        let newCard = document.createElement("div");

        let pic = document.createElement("img");
        pic.src = articlesGlobe[i].urlToImage;

        let cardBody = document.createElement("div");
        let cardTitle = document.createElement("div");
        let p1 = document.createElement("p");
        p1.innerText = articlesGlobe[i].title;
        cardTitle.appendChild(p1);
        cardTitle.classList.add("card-title");
        cardBody.appendChild(cardTitle);
        let cardText = document.createElement("div");
        cardText.innerText = articlesGlobe[i].description;
        cardText.classList.add("card-text");
        cardBody.appendChild(cardText);
        let p2 = document.createElement("p");
        p2.innerText = `By on ${articlesGlobe[i].publishedAt.slice(0, 10)} ${articlesGlobe[i].publishedAt.slice(11, 19)} GMT`
        p2.classList.add("card-age");
        cardBody.appendChild(p2);
        let readMore = document.createElement("a");
        readMore.innerText = "Read More..";
        readMore.href = articlesGlobe[i].url;
        cardBody.appendChild(readMore);
        newCard.appendChild(pic);
        cardBody.classList.add("card-body");
        newCard.appendChild(cardBody);
        newCard.classList.add("card");
        cards.appendChild(newCard);
    }

}

let urlSearch = () => {
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            articlesGlobe = data.articles;
            console.log(articlesGlobe);
        })
        .catch((err) => {
            console.log(err);
        });
}

let refresh = (event) => {
    let delArts = document.querySelectorAll(".card");
    let delArr = [...delArts];
    for (art of delArr) {
        art.remove();
    }
    let refSearch;
    if (event.target.tagName == "A") {
        if (event.target.innerText == "Home") {
            refSearch = "India";
        } else {
            refSearch = "india+" + event.target.innerText;
        }
    } else {
        refSearch = "india+" + search.value;
    }
    url = `https://newsapi.org/v2/everything?q=${refSearch}&from=2024-04-30&sortBy=publishedAt&apiKey=79eae53414dd4284ab3e47b23b300ee4`;
    search.value = "";
    urlSearch();
    setTimeout(printCards, 1000);
}

urlSearch();

button.addEventListener("click", refresh);

categories.addEventListener("click", refresh);

setTimeout(printCards, 1000);