/**
 *@version 1.0.0
 *@author Cody
 *@date 27/08/20
*/

"use strict";

var listeDesRegiments = [
];

function ajouterRegiment() {
    let unRegiment = {};
    unRegiment.nom = prompt("Nom du régiment : ");
    unRegiment.nombre = prompt("Nombre de participants : ");
    if (isNaN(unRegiment.nombre)){
        alert("Introduisez un chiffre !");
        return 0;
    }
    else{
        unRegiment.artillerie = prompt("Artillerie ? écrire yes ou no");
        if (unRegiment.artillerie != "yes" && unRegiment.artillerie != "no"){
            alert("Introduisez yes ou no !");
            return 0;
        }
        unRegiment.skirm = prompt("Skirm ? écrire yes ou no");
        if (unRegiment.skirm != "yes" && unRegiment.skirm != "no"){
            alert("Introduisez yes ou no !");
            return 0;
        }
        unRegiment.cav = prompt("Cavalerie ? écrire yes ou no");
        if (unRegiment.cav != "yes" && unRegiment.cav != "no"){
            alert("Introduisez yes ou no !");
            return 0;
        }
    }
    listeDesRegiments.push(unRegiment);

}

function genererBalance() {
    let copyRegiments = listeDesRegiments.slice();
    let nbreRegiments = copyRegiments.length;
    let maxDifference = 12;
    let team1 = [];
    let team2 = [];
    let regimentSecret = 0;
    let teamSecret = 0;
    let joueurTeam1 = 0;
    let joueurTeam2 = 0;
    while (nbreRegiments != 0){

        regimentSecret = Math.floor(Math.random() * (nbreRegiments));
        teamSecret = Math.floor(Math.random() * 2)+1;
        if (teamSecret == 1){
            team1.push(copyRegiments[regimentSecret]);
            copyRegiments.splice(regimentSecret,1);
            nbreRegiments = copyRegiments.length;
        }
        else{
            team2.push(copyRegiments[regimentSecret]);
            copyRegiments.splice(regimentSecret,1);
            nbreRegiments = copyRegiments.length;
        }

    }

    for (let i =0; i < team1.length; i++){
        joueurTeam1 += Number(team1[i].nombre);
    }
    for (let i =0; i < team2.length; i++){
        joueurTeam2 += Number(team2[i].nombre);
    }
    if (joueurTeam1 > joueurTeam2 || joueurTeam1 == joueurTeam2){
        if ((joueurTeam1 - joueurTeam2) > maxDifference){
            genererBalance();
        }
        else{
            donnerSpec(team1,team2);
            genererTable(team1,team2);
        }
    }
    else if (joueurTeam2 > joueurTeam1){
        if ((joueurTeam2 - joueurTeam1) > maxDifference){
            genererBalance();
        }
        else{
            donnerSpec(team1,team2);
            genererTable(team1,team2);
        }
    }


}

function donnerSpec(team1,team2) {
    let veutArt1 = [];
    let veutSkirm1 = [];
    let veutCav1 = [];
    let veutArt2 = [];
    let veutSkirm2 = [];
    let veutCav2 = [];
    let aleatoire = 0;
    for (let i=0; i<team1.length;i++){
        if (team1[i].artillerie == "yes"){
            veutArt1.push(team1[i]);
        }
        if (team1[i].skirm == "yes"){
            veutSkirm1.push(team1[i]);
        }
        if (team1[i].cav == "yes"){
            veutCav1.push(team1[i]);
        }
    }

    for (let k=0; k<team2.length;k++){
        if (team2[k].artillerie == "yes"){
            veutArt2.push(team2[k]);
        }
        if (team2[k].skirm == "yes"){
            veutSkirm2.push(team2[k]);
        }
        if (team2[k].cav == "yes"){
            veutCav2.push(team2[k]);
        }
    }
    if (veutArt1.length > 1){
         aleatoire = Math.floor(Math.random() * (veutArt1.length));
         for (let i=0; i<team1.length;i++){
             if (team1[i] != veutArt1[aleatoire]){
                 team1[i].artillerie = "no";
             }
         }
    }
    if (veutArt2.length > 1){
        aleatoire = Math.floor(Math.random() * (veutArt2.length));
        for (let i=0; i<team2.length;i++){
            if (team2[i] != veutArt2[aleatoire]){
                team2[i].artillerie = "no";
            }
        }
    }
    if (veutSkirm1.length >1){
        aleatoire = Math.floor(Math.random() * (veutSkirm1.length));
        for (let i=0; i<team1.length;i++){
            if (team1[i] != veutSkirm1[aleatoire]){
                team1[i].skirm = "no";
            }
        }
    }
    if (veutSkirm2.length >1){
        aleatoire = Math.floor(Math.random() * (veutSkirm2.length));
        for (let i=0; i<team2.length;i++){
            if (team2[i] != veutSkirm2[aleatoire]){
                team2[i].skirm = "no";
            }
        }
    }
    if (veutCav1.length >1){
        aleatoire = Math.floor(Math.random() * (veutCav1.length));
        for (let i=0; i<team1.length;i++){
            if (team1[i] != veutCav1[aleatoire]){
                team1[i].cav = "no";
            }
        }
    }
    if (veutCav2.length > 1){
        aleatoire = Math.floor(Math.random() * (veutCav1.length));
        for (let i=0; i<team2.length;i++){
            if (team2[i] != veutCav2[aleatoire]){
                team2[i].cav = "no";
            }
        }
    }
}

function genererTable(team1, team2) {
    let zone1 = "";
    let zone2 = "";
    let totalFirst = 0;
    let totalSecond = 0;
    for (let i=0;i<team1.length;i++){
        totalFirst += Number(team1[i].nombre);
        zone1+= "<tr><td>"+team1[i].nom+"</td><td>"+team1[i].nombre+"</td><td><input type='text' placeholder='"+team1[i].artillerie+"'></td><td><input type='text' placeholder='"+team1[i].skirm+"'></td><td><input type='text' placeholder='"+team1[i].cav+"'></td></tr>";
    }
    gid("total1").innerHTML = "<th id='total1'>Total : " + totalFirst + "</th>";
    gid("tableTeam1").innerHTML =  zone1;
    for (let k = 0;k<team2.length;k++){
        totalSecond += Number(team2[k].nombre);
        zone2+= "<tr><td>"+team2[k].nom+"</td><td>"+team2[k].nombre+"</td><td><input type='text' placeholder='"+team2[k].artillerie+"'></td><td><input type='text' placeholder='"+team2[k].skirm+"'></td><td><input type='text' placeholder='"+team2[k].cav+"'></td></tr>";
    }
    gid("total2").innerHTML = "<th id='total2'>Total : " + totalSecond + "</th>";
    gid("tableTeam2").innerHTML =  zone2;
    console.log("Donnez la médaille de la couronne de fer à CODY !!!");
}

function changeColor() {
    gid("team1").style.backgroundColor = gid("couleur1").value;
}

function changeCouleur() {
    gid("team2").style.backgroundColor = gid("couleur2").value;
}