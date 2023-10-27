const accessKey = "eGrtP1iL1_n6aZvsYfoww_kgVvQVgTpZzgfF4a_7uNA";

const form = document.querySelector("form");
const searchInput = document.getElementById("search");
const searchResults = document.querySelector(".search-result");
const showMore = document.getElementById("Show-more");

let inputdata = ""
let page = 1

async function searchImages(){
    inputdata = searchInput.value;
    const url =`https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accessKey}`

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page===1){
        searchResults.innerHTML="";
    }
    results.map((result) =>{
        const imageWraper = document.createElement("div")
        imageWraper.classList.add("result")
        const image = document.createElement("img")
        image.src = result.urls.small
        image.alt = result.alt_description
        const imagelink = document.createElement("a")
        imagelink.href = result.links.html
        imagelink.target = "_blank"
        imagelink.textContent = result.alt_description

        imageWraper.appendChild(image)
        imageWraper.appendChild(imagelink)
        searchResults.appendChild(imageWraper)
    });

    page++
    if(page > 1){
        showMore.style.display="block" 
    }

}

form.addEventListener("submit", function(event){
    event.preventDefault()
    page = 1;
    searchImages()
});

showMore.addEventListener("click", () => {
    searchImages();
});