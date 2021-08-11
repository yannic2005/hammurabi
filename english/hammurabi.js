var jahr = 0;
var korn = 6000;
var buerger = 100;
var land = 400;
var ende = false;

var landPreis;
var ernteProAcker;

bestimmeLandPreis();

function spieleEineRunde(){

  if(ende == false){

    jahr += 1;
    bestimmeErnteErfolg();
    verarbeiteBefehle();
    bestimmeLandPreis();
    erstelleBericht();
    pruefeEnde();

    console.log(jahr);

  }

}

function verarbeiteBefehle(){

  var eingabe = prompt("Issue your commands, your Highness", "Food, Sowing, Landtrade");
  var befehle = eingabe.split(",");

  var verteileKorn = parseInt(befehle[0]);
  var saeheKorn = parseInt(befehle[1]);
  var landKauf = parseInt(befehle[2]);

  if(isNaN(verteileKorn) || verteileKorn < 0) {

    verteileKorn = 0;

  }

  if(isNaN(saeheKorn) || saeheKorn < 0) {

    saeheKorn = 0;

  }

  if(isNaN(landKauf)) {

    landKauf = 0;

  }

  bevoelkerung(verteileKorn);
  aussaat(saeheKorn);
  handel(landKauf);

  console.log(verteileKorn);
  console.log(saeheKorn);
  console.log(landKauf);

}

function bestimmeErnteErfolg(){

  ernteProAcker = Math.round(Math.random() * 5 + Math.random() * 5 + 0.5);

  console.log("Wie war die Ernte?");

}

function bestimmeLandPreis(){

  landPreis = Math.round(Math.random() * 10 + 0.5);
  if(Math.random()>0.9){

    landPreis = Math.round(Math.random() * 15 + 0.5);

  }

}

function bevoelkerung(nahrung){

  if(nahrung > korn){

    nahrung = korn;

    korn -= nahrung;

  }

    korn = korn - nahrung;

  var ausreichendNahrung = Math.round(nahrung / 20) - buerger;

  var neueBuerger = 0;
  if(ausreichendNahrung > 0){

    neueBuerger = ausreichendNahrung / 2;

  }

  verstorbeneBuerger = 0;
  if(ausreichendNahrung < 0) {

    verstorbeneBuerger = -ausreichendNahrung;

  }

  buerger = Math.round(buerger + neueBuerger - verstorbeneBuerger);


}

function aussaat(saat){

  if(saat > korn){

    saat = korn;

  }

  korn = korn - saat;

  var moeglicheSaat = parseInt(saat / 2);

  if(moeglicheSaat > buerger * 10){

    moeglicheSaat = buerger * 10;

  }

    if(moeglicheSaat > land){

      moeglicheSaat = land;

    }

    geerntetesKorn = ernteProAcker * moeglicheSaat;
    korn = korn + geerntetesKorn;


}

function handel(kauf){

  if(kauf < 0){

    var verkauf = Math.abs(kauf);

    if(kauf > land){

      alert("Not enough land!");
      return;

    }

    land = land - verkauf;
    korn = korn + verkauf * landPreis;

  }

  if(kauf > 0){

    if(kauf * landPreis > korn){

      alert("Not enough corn for a land purchase!");

    }

    land = land + kauf;
    korn = korn - kauf * landPreis;

  }

}


function erstelleBericht(){

  var ernte;
  switch (ernteProAcker) {
    case 1:
      ernte = "Thunderstorms destroyed a part of the harvest";
      break;
    case 2:
    case 3:
      ernte = "The weather was bad";
      break;
    case 6:
    case 7:
      ernte = "The weather was good. The harvest was plentiful.";
      break;
    case 8:
    case 9:
    case 10:
      ernte = "The weather was very good. The harvest was excellent!";
      break;
    case 4:
    case 5:
    default:
      ernte = "The weather was normal.";
      break;
  }

  var info = "Wise ruler Hammurabi!<br>";
  info += "It's the year " + jahr + " of your rule.<br><br>";
  info += buerger + " loyal citizens.<br>";
  info += ernte + "<br>" + korn + " corn is stored in your cornaries.<br>";
  info += "You own " + land + " acres of land.<br>";
  info += landPreis + " corn is the price of an acre of land.";

  monitor.innerHTML = info;
  return;

}

function pruefeEnde(){

  var abbruchGrund = "<br>";
  if(buerger < 1){

    ende = true;
    abbruchGrund += "You don't have enough subordinates. ";

  }

  if(korn < 1){

    ende = true;
    abbruchGrund += "Your cornaries are empty. ";

  }

  if(land < 1){

    ende = true;
    abbruchGrund += "You don't have enough land. ";

  }

  if(jahr > 20){

    ende = true;
    abbruchGrund += "After 20 years your time as a rules is over.<br>Your name shall be praised forever! You reigned wisely and just.";
  }

  if(ende){

    abbruchGrund = "<br><br>Your reign has ended. " + abbruchGrund;
    monitor.innerHTML = monitor.innerHTML + abbruchGrund;

  }

}
