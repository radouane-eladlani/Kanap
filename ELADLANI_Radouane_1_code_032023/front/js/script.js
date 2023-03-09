/* la route pour aller chercher les donnees de l'API des canapes*/
fetch("http://localhost:3000/api/products")
    /* permet de convertir les donnees de l'API en objet */
    .then((res) => {
        return res.json()
    })
    /*appel a la fonction ajoutProduct avec les données pour creer 
    les articles qui vont contenir id,img,h3,p */
    .then((donnees) => ajoutProducts(donnees))

function ajoutProducts(donnees) {
    /* parcourir les donnees des canapes */
    donnees.forEach((canape) => {
        /* Pour chaque canape on va creer un article pour afficher
         le id du produit avec ,img,altTxt,name,description */
        const { _id, imageUrl, altTxt, name, description } = canape
        const lienId = creerLienId(_id)
        const article = document.createElement("article")
        const image = creerImage(imageUrl, altTxt)
        const h3 = creerH3(name)
        const p = creerParagraphe(description)
        /* recuperer (image,h3,p) qui vont se rattacher une par une dans la balise article*/
        article.appendChild(image)
        article.appendChild(h3)
        article.appendChild(p)
        /* appel a la fonction appendArticleDelienId */
        appendArticleDeLienid(lienId, article)
    })
}
function creerLienId(_id) {
    /* creer une balise "a" pour aller dans la page produit au click*/
    const lienId = document.createElement("a")
    /* ajouter un lien vers la page produit au click*/
    lienId.href = "./product.html?id=" + _id
    return lienId
}
function appendArticleDeLienid(lienId, article) {
    /*recuperer l'id "#items" dans la balise section dans le html*/
    const items = document.querySelector("#items")
    /*si items est different de null alors on va rattacher la variable items a lienId et lienId a article*/
    if (items != null) {
        items.appendChild(lienId)
        lienId.appendChild(article)
    }
}
/* creer une image avec un url et un alt*/
function creerImage(imageUrl, altTxt) {
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
function creerParagraphe(description) {
    const p = document.createElement("p")
    p.innerHTML = description
    p.classList.add("procuctdescription")
    return p
}
