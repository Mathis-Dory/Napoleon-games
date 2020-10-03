/**
 * @version 1.2.3
 *@author Cody
 *@date 27/06/20
*/

"use strict";

var listeDesParticipants = [
];

var users = JSON.parse(localStorage.getItem("users") || "[]");

/**
 * @return {void}
 */
function genererArmy() {
   let nbreJoueur = gid("formPlayers").nbrPlayers.value;
   let pointCoa = 0;
   let pointImpe = 0;
   let pointTotal = 0;
   let maxDifference = 400;
   let players= [];
   let teamImperial = [];
   let teamCoalition = [];
   let tmp = [];

   for (let i = 0; i < nbreJoueur; i++){
        for (let a =0; a<users.length; a++){
            if (users[a].joueur == (document.getElementById("joueur"+i).value)){
                players.push(users[a]);
            }
        }

   }

    while (teamImperial.length < nbreJoueur/2 ) {
        tmp.push((players).splice(Math.floor(Math.random() * players.length - 1), 1)[0]);
        teamImperial.push(tmp.pop());
    }

    while (teamCoalition.length < nbreJoueur/2 ) {
        tmp.push((players).splice(Math.floor(Math.random() * players.length - 1), 1)[0]);
        teamCoalition.push(tmp.pop());
    }

    for (let i=0; i<teamCoalition.length;i ++){
        pointCoa += Number(teamCoalition[i].competence);
    }

    for (let i=0; i<teamImperial.length;i ++){
        pointImpe += Number(teamImperial[i].competence);
    }

    if (pointCoa >= pointImpe){
       pointTotal = pointCoa - pointImpe;
    }
    else {
       pointTotal = pointImpe - pointCoa;
    }

    if (pointTotal > maxDifference){
        genererArmy();
        return;
    }

    creerTable(teamImperial, teamCoalition);
    genererNombre(nbreJoueur);

}

function loadPage() {
    let listeDesJoueurs = "";
    for (let i = 0; i < users.length; i++){
        listeDesJoueurs += "<li>" + users[i].joueur + "</li>";
    }
    gid("listPlayers").innerHTML = listeDesJoueurs
}

/**
 * @param {array, array} les 2 tableaux d'équipes
 */
function creerTable(teamImperial, teamCoalition) {
    let texte1 = "";
    let texte2 = "";
    gid("tableTeamImpe").innerHTML = "";
    gid("tableTeamCoa").innerHTML = "";
    for (let i=0; i<teamImperial.length; i++){
        texte1 += "<tr><td>"+ teamImperial[i].joueur + "</td></tr>";
    }
    gid("tableTeamImpe").innerHTML += texte1;
    for (let i=0; i<teamCoalition.length; i++){
        texte2 += "<tr><td>"+ teamCoalition[i].joueur + "</td></tr>";
    }
    gid("tableTeamCoa").innerHTML += texte2;

}

/**
 * @param {number} nombre de joueurs total
 *@return {void}
 */

function genererNombre(nbreJoueur) {
    let min=0;
    let max=0;
    let random = 0;
    if (nbreJoueur == 2){
        max = 10;
        min = 6;
        random = Math.floor(Math.random() * (max - min +1)) + min;
    }
    else if (nbreJoueur ==4 ){
        max = 20;
        min = 13;
        random = Math.floor(Math.random() * (max - min +1)) + min;
    }
    else if (nbreJoueur == 6){
        max = 30;
        min = 21;
        random = Math.floor(Math.random() * (max - min +1)) + min;
    }
    else if (nbreJoueur ==8){
        max = 40;
        min = 27;
        random = Math.floor(Math.random() * (max - min +1)) + min;
    }
    else {
        alert("Il faut un nombre pair de joueurs!");
        return
    }

    gid("numberArmy").innerText = random;

}


function genererLesSelectNonRanked(){
    let compteur = 0;
    let lesOptions = "";
    if (users.length < 2){
        alert("Il n'y a pas assez de joueurs inscrits !");
        return 0;
    }
    for (let i of users) {
        lesOptions += "<option>" + i.joueur + "</option>";
    }
    let nbreJoueurs = gid("formPlayers").nbrPlayers.value;
    let remplissage = "";
    for (let i = 0; i < nbreJoueurs; i++) {
        remplissage += "<select id='joueur"+ compteur +"'>" + lesOptions + "</select>";
        compteur ++;

    }
    gid("selectPlayers").innerHTML = remplissage;
    return false;
}

function addPlayer() {
    let newPlayer = prompt("Introduisez le pseudo du joueur à ajouter: ");
	if (newPlayer == ""){
			alert("Veuillez introduire un pseudo existant dans la liste !");
	}
	else if (newPlayer == null){
		alert("Action annulée !");
	}
	else {
	
		users.push({joueur: newPlayer, victoire: 0,defaite: 0,egalite: 0,ratio: 0,competence: 1000});
		localStorage.setItem("users", JSON.stringify(users));
		loadPage();
	}	
    return false;
}

function removePlayer() {
    let deletePlayer = prompt("Introduisez le pseudo du joueur à supprimer: ");
    if (confirm('Es tu sûr de vouloir faire ça ?')) {
        for (let a =0; a<users.length; a++){
            if (users[a].joueur == deletePlayer){
                users.splice(a, 1);
                alert("Le joueur " + deletePlayer + " a bien été supprimé !");
				localStorage.setItem("users", JSON.stringify(users));
                loadPage();
            }
		}	

    } 
	else {
        alert("Action annulée !")
    }
}

function genererLesSelect() {
    let lesOptions = "";
    let compteurCoa = 0;
    let compteurImpe = 0;
    if (users.length < 2){
        alert("Il n'y a pas assez de joueurs inscrits !");
        return 0;
    }
    for (let i of users) {
        lesOptions += "<option>" + i.joueur + "</option>";
    }
    let nbreJoueurs = gid("formRanked").nbrOfPlayers.value;
    let remplissageCoa = "";
    let remplissageImpe = "";
    for (let i = 0; i < nbreJoueurs / 2; i++) {
        remplissageCoa += "<select id='joueurRankedCoa"+ compteurCoa +"'>" + lesOptions + "</select>";
        compteurCoa ++;
    }
    gid("rankedTeamCoa").innerHTML = "<legend>Coalition</legend>" +remplissageCoa;
    for (let i = 0; i < nbreJoueurs / 2; i++) {
        remplissageImpe += "<select id='joueurRankedImpe"+ compteurImpe +"'>" + lesOptions + "</select>";
        compteurImpe ++;
    }
    gid("rankedTeamEmpire").innerHTML = "<legend>Empire</legend>" +remplissageImpe;
    return false;
}

function validerRanked() {
    let nbreJoueur = gid("formRanked").nbrOfPlayers.value;
    let teamRankedCoa = [];
    let teamRankedImpe = [];
    let pointsTeamImpe = 0;
    let pointsTeamCoa = 0;
    let pointsGagnesEmpire = 0;
    let pointsGagnesCoalition = 0;

    for (let i = 0; teamRankedCoa.length < nbreJoueur/2; i++){
        for (let a =0; a<users.length; a++){
            if (users[a].joueur == (document.getElementById("joueurRankedCoa"+i).value)){
                teamRankedCoa.push(users[a]);
            }
        }

    }

    for (let i = 0; teamRankedImpe.length < nbreJoueur/2; i++){
        for (let a =0; a<users.length; a++){
            if (users[a].joueur == (document.getElementById("joueurRankedImpe"+i).value)){
                teamRankedImpe.push(users[a]);
            }
        }

    }
    for (let i=0; i<teamRankedImpe.length; i++){
        pointsTeamImpe += teamRankedImpe[i].competence;
    }
    for (let i=0; i<teamRankedCoa.length; i++){
        pointsTeamCoa += teamRankedCoa[i].competence;
    }

    if (gid("whoWins").value == "Empire"){
        pointsGagnesEmpire = (pointsTeamCoa/pointsTeamImpe)*150;
        pointsGagnesCoalition = (1/(pointsTeamImpe/pointsTeamCoa))*(-110);

        for (let i = 0; i < teamRankedImpe.length; i++){
            for (let a =0; a<users.length; a++){
                if (users[a].joueur == (document.getElementById("joueurRankedImpe"+i).value)){
                   users[a].competence += Math.round(pointsGagnesEmpire);
                    users[a].victoire ++;
                }
            }

        }
        for (let i = 0; i<teamRankedCoa.length; i++){
            for (let a =0; a<users.length; a++){
                if (users[a].joueur == (document.getElementById("joueurRankedCoa"+i).value)){
                    users[a].competence += Math.round(pointsGagnesCoalition);
                    users[a].defaite ++;
                }
            }

        }

    }
    else if (gid("whoWins").value == "Coalition"){
        pointsGagnesCoalition = (pointsTeamImpe/pointsTeamCoa)*150;
        pointsGagnesEmpire = (1/(pointsTeamCoa/pointsTeamImpe))*(-110);
        for (let i = 0; i < teamRankedImpe.length; i++){
            for (let a =0; a<users.length; a++){
                if (users[a].joueur == (document.getElementById("joueurRankedImpe"+i).value)){
                    users[a].competence += Math.round(pointsGagnesEmpire);
                    users[a].defaite ++;
                }
            }

        }
        for (let i = 0; i<teamRankedCoa.length; i++){
            for (let a =0; a<users.length; a++){
                if (users[a].joueur == (document.getElementById("joueurRankedCoa"+i).value)){
                    users[a].competence += Math.round(pointsGagnesCoalition);
                    users[a].victoire ++;
                }
            }

        }

    }
    else if (gid("whoWins").value == "Egalité"){
        pointsGagnesCoalition = (pointsTeamImpe/pointsTeamCoa)*50;
        pointsGagnesEmpire = (pointsTeamCoa/pointsTeamImpe)*50;
        for (let i = 0; i < teamRankedImpe.length; i++){
            for (let a =0; a<users.length; a++){
                if (users[a].joueur == (document.getElementById("joueurRankedImpe"+i).value)){
                    users[a].competence += Math.round(pointsGagnesEmpire);
                    users[a].egalite ++;
                }
            }

        }
        for (let i = 0; i<teamRankedCoa.length; i++){
            for (let a =0; a<users.length; a++){
                if (users[a].joueur == (document.getElementById("joueurRankedCoa"+i).value)){
                    users[a].competence += Math.round(pointsGagnesCoalition);
                    users[a].egalite ++;
                }
            }

        }

    }
	localStorage.setItem("users", JSON.stringify(users));
    creerClassement();
    alert("Les scores ont bien été enregistrés !");
    return false;

}

function creerClassement() {
    let remplissageClassement = "";
    let compteur = 1;
    for (let i = 0; i < users.length; i++){
        if (users[i].defaite == 0 && users[i].victoire > 0){
            users[i].ratio = (users[i].victoire).toFixed(2);
        }
        else if (users[i].victoire == 0 && users[i].defaite == 0){
            users[i].ratio = 0;
        }
        else {
            users[i].ratio = (users[i].victoire/users[i].defaite).toFixed(2);
        }
    }
    let classementParticipants = users.sort(competencesTriée);
    for (let i = 0; i < users.length; i++){
        remplissageClassement += "<tr><td>"+ compteur +"</td><td>" + classementParticipants[i].joueur + "</td><td>"+ classementParticipants[i].victoire +"</td><td>" + classementParticipants[i].defaite +
        "</td><td>" + classementParticipants[i].egalite + "</td><td>" + classementParticipants[i].ratio + "</td><td>" + classementParticipants[i].competence + "</td></tr>";
        compteur ++;
    }
    gid("rankedPlayers").innerHTML = remplissageClassement;
}

function competencesTriée(a , b){
    let joueurA = a.competence
    let joueurB = b.competence
    let position = 0;

    if (joueurA > joueurB){
        position = -1;
    }
    else if (joueurA < joueurB){
        position = 1;
    }
    else {
        if (a.ratio > b.ratio){
            position = -1;
        }
        else if (a.ratio < b.ratio){
            position = 1;
        }
        else {
            if (a.joueur > b.joueur){
                position = -1;
            }
            else if (a.joueur < b.joueur){
                position = 1;
            }
        }
    }
    return position;
}
