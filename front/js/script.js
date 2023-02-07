/* recuperer les donnees de l'api des canapes*/
fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((donnees) => ajoutProducts(donnees))
 /*  Il va recuperer les donnees ensuite il va creer un id, article,img,h3,p */
function ajoutProducts(donnees) {
    donnees.forEach((canape) => {
        /* Pour chaque canape on va creer un article pour afficher le id du produit avec ,img,h3,p */
        const { _id, imageUrl, altTxt, name, description } = canape
        const lienId = creerlienId(_id)
        const article = document.createElement("article")
        const image = creerImage(imageUrl, altTxt)
        const h3 = creerH3(name)
        const p = creerParagraphe(description)
/*  Refactoring.Il va ajouter les elements dans l'article*/
        appendElementsDeArticle(article,[image,h3,p])
        appendArticleDelienId(lienId, article)  
})
}
/* Executer/afficher chaque element du tableau de l'article de la function appendElementsDeArticle
puis append l'article dans items */
function appendElementsDeArticle(article, array) {
    array.forEach((items) => { article.appendChild(items)
    
})
}
/* creer un id qui renvoie vers la page produit ( product.html +id) du canape*/
function creerlienId(_id){
    const lienId = document.createElement("a")
    lienId.href = "./product.html?id=" + _id 
    return lienId
}
/* recuperer l'id et l'article et les rattacher a #items*/
function appendArticleDelienId(lienId, article) {
const items = document.querySelector("#items")
if (items != null) {
    items.appendChild(lienId)
    lienId.appendChild(article)
}
}
/* creer une image avec un url et un alt*/
 function creerImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    image.removeAttribute("title")
    image.removeAttribute("style")
    return image
 }
 /* creer un nom de canape avec un "h3" ensuite ajouter un textContent */
 /*et la classe productName grace a la methode classlist.add*/
 function creerH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")
    return h3
 }
 /* creer une description avec un "p"*/
 function creerParagraphe(description){
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("procuctdescription")
    return p 
 }
