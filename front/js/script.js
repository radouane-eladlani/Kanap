fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((canapes) => ajoutProducts(canapes))

function ajoutProducts(canapes) {
    canapes.forEach((canape) => {
        console.log("canape: ",canape)
        
        const { _id, imageUrl, altTxt, name, description } = canape
        const ancre = makeAncre(_id)
        const article = document.createElement("article")
        const image = makeImage(imageUrl, altTxt)
        const h3 = makeH3(name)
        const p = makeParagraphe(description)

        appendElementsDeArticle(article,[image,h3,p])
        appendArticleDeAncre(ancre, article)  
})
}

function appendElementsDeArticle(article, array) {
    array.forEach((items) => { article.appendChild(items)
    
})
}
function makeAncre(id){
    const ancre = document.createElement("a")
    ancre.href = "./product.html?id=42" + id 
    return ancre
}
function appendArticleDeAncre(ancre, article) {
const items = document.querySelector("#items")
if (items != null) {
    items.appendChild(ancre)
    ancre.appendChild(article)
    console.log("elements ajoute a items",items)
}
}
 function makeImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    image.removeAttribute("titre")
    image.removeAttribute("style")
    return image
 }
 function makeH3(name) {
    const h3 = document.createElement("h3")
    h3,textContent = name
    h3.classList.add("productName")
    return h3
 }
 function makeParagraphe(description){
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("procuctdescription")
    return p 
 }
