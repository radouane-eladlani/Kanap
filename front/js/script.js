/* recuperer les données des canapés*/
fetch("http://localhost:3000/api/products")
.then((res) => res.json())
/* Ajouter la fonction "ajoutProducts" */
.then((donnees) => ajoutProducts(donnees))
 
/* Il va recuperer les donnees du premier element ensuite il va creer un id, article,img,h3,p  */
function ajoutProducts(donnees) {
    donnees.forEach((canape) => {
        /* Rattacher les fonctions  */
        const { _id, imageUrl, altTxt, nom, description } = canape
        const lienId = creerlienId(_id)
        const article = document.createElement("article")
        const image = creerImage(imageUrl, altTxt)
        const h3 = creerH3(nom)
        const p = creerParagraphe(description)
        /* Refactoring, ratacher les elements "img,h3,p" a l'article ensuite ratacher l'article a id */
        appendElementsDeArticle(article,[image,h3,p])
        appendArticleDelienId(lienId, article)  
})
}
/* Inserer l'ensemble array est rattaché article a items */
function appendElementsDeArticle(article, array) {
    array.forEach((items) => { article.appendChild(items)
    
})
}
/*renvoie vers la page produit d'un canapé */
function creerlienId(_id){
    const lienId = document.createElement("a")
    lienId.href = "./product.html?id=" + _id 
    return lienId
}
/*Recuperer le id de "items" avec queryselector ensuite rattacher items avec id et id avec article */
function appendArticleDelienId(lienId, article) {
const items = document.querySelector("#items")
if (items != null) {
    items.appendChild(lienId)
    lienId.appendChild(article)
}
}
/* créer le document "img" avec source url et alt  */ 
 function creerImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    image.removeAttribute("title")
    image.removeAttribute("style")
    return image
 }
 /* créer le document "h3" ensuite ajouter un textcontent et la classe "productName" grace a classlist */ 
 function creerH3(nom) {
    const h3 = document.createElement("h3")
    h3,textContent = nom
    h3.classList.add("productName")
    return h3
 }
  /* créer le document "p" ensuite ajouter un textcontent et la classe "productdescription" grace a classlist */ 
 function creerParagraphe(description){
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("procuctdescription")
    return p 
 }
