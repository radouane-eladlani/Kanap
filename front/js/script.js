/* recuperer les donnees de l'api des canapes*/
fetch("http://localhost:3000/api/products")
/* recuperer les donnees de la reponse de l'API des canape*/
.then((res) => {
    return res.json()
})
/*ensuite fait appel a la fonction ajoutProduct avec les donnee pour creer 
les article qui va contenir id,img,h3,p */
.then((donnees) => ajoutProducts(donnees))
 /* il va parcourir les donnees ensuite il va creer un id, article,img,h3,p*/
function ajoutProducts(donnees) {
    donnees.forEach((canape) => {
        /* Pour chaque canape on va creer un article pour afficher
         le id du produit avec ,img,h3,p */
        const { _id, imageUrl, altTxt, name, description } = canape
        const lienId = creerlienId(_id)
        const article = document.createElement("article")
        const image = creerImage(imageUrl, altTxt)
        const h3 = creerH3(name)
        const p = creerParagraphe(description)
        /* recuperer les balises (image,h3,p) qui vont s'ajouter une par une dans la balise article*/
        article.appendChild(image)
        article.appendChild(h3)
        article.appendChild(p) 
        appendArticleDelienId(lienId, article)
})
}    
function creerlienId(_id){
    /* creer une balise a pour aller dans la page produit au click*/
    const lienId = document.createElement("a")
    lienId.href = "./product.html?id=" + _id 
    return lienId
}
/* fait appel a la fonction aADI ensuite recuperer l'id "items" 
et les rattacher items avec lienId et lienId a article*/
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
    /* ajouter le lien vers l'image dans la balise "img"*/
    image.src = imageUrl
    /* ajouter texte alternatif dans la balise "img"*/
    image.alt = altTxt
    return image
 }
 /* creer un nom de canape avec un "h3" 
 ensuite ajouter un innerHTML pour le contenu du name dans le paragraphe 
 et ajouter la classe "productName" grace a la methode classlist.add*/
 function creerH3(name) {
    const h3 = document.createElement("h3")
    h3.innerHTML = name
    h3.classList.add("productName")
    return h3
 }
 /* creer une description de l'article avec la balise "p" 
 ensuite ajouter un innerHTML pour le contenu du description dans le paragraphe 
 et ajouter la classe "productdescription" grace a la methode classlist.add*/
 function creerParagraphe(description){
    const p = document.createElement("p")
    p.innerHTML = description
    p.classList.add("procuctdescription")
    return p 
 }
