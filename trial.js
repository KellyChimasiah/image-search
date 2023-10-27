const accessKey = "eGrtP1iL1_n6aZvsYfoww_kgVvQVgTpZzgfF4a_7uNA"
const form = document.querySelector("form")
const searchInput = document.getElementById("search")
const searchResults = document.querySelector(".search-result") 
const showMore = document.getElementById("Show-more")

let keyword = ""
let page = 1

async function searchImages() {
  keyword = searchInput.value
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`

  const response = await fetch(url);
  const data = await response.json();

  const result = data.results

  if(page===1){
  searchResults.innerHTML=""
  }
  result.map((result)=>{
  const imageWraper = document.createElement("div")
  imageWraper.classList.add("result")
  const image = document.createElement("img")
  image.src = result.urls.small
  image.alt = result.alt_description
  const link = document.createElement("a")
  link.href = result.urls.html
  link.target = "_blank"
  link.textContent = result.alt_description

  imageWraper.appendChild(image)
  imageWraper.appendChild(link)
  searchResults.appendChild(imageWraper)
});
   page++
if(page>1){
showMore.style.display="block"
}
}

showMore.addEventListener("click",function(){
    searchImages();
});

 form.addEventListener("submit", function(x){
    x.preventDefault()
    searchImages()
    page = 1
 });