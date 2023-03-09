
function recupereOrderId() {
    /*window.location.search permet de recuperer l'url de la page courante */
    const url = window.location.search
    /* URLSearchParams permet de recuperer les parametres de l'url */
    const searchParams = new URLSearchParams(url)
    /* recuperer orderId dans l'url */
    const orderId = searchParams.get("orderId")
    return orderId

}
/* afficher l'id de la commande dans la page de confirmation */
const orderId = recupereOrderId()
afficherOrderId(orderId)
/* appel a la fonction pour supprimer le contenu du localstorage */
supprimerLeContenuDuLocalStorage()

function afficherOrderId(orderId) {
    /* recuperer l'element html qui va contenir l'id de la commande */
    const orderIdElement = document.getElementById("orderId")
    /*afficher l'id de la commande dans le html */
    orderIdElement.innerHTML = orderId
}
/* supprimer le contenu du localstorage apres la validation de la commande */
function supprimerLeContenuDuLocalStorage() {
    /* recuperer le contenu du localstorage */
    const localStorage = window.localStorage
    localStorage.clear()
}