
function recupereOrderId() {
/* recuperer l'id de la commande et l'affiche dans la page de confirmation */
const url = window.location.search
const searchParams = new URLSearchParams(url)
const orderId = searchParams.get("orderId")
return orderId

}
/* afficher l'id de la commande dans la page de confirmation */
const orderId = recupereOrderId()
afficherOrderId(orderId)
/* appel a la fonction pour supprimer le contenu du localstorage */
supprimerLeContenuDuLocalStorage()

/* ajouter orderId dans le html */
function afficherOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.innerHTML = orderId
}
/* supprimer le contenu du localstorage apres la validation de la commande */
function supprimerLeContenuDuLocalStorage() {
    const localStorage = window.localStorage
    localStorage.clear()
}