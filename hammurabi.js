var jahr = 0;
var korn = 6000;
var buerger = 100;
var land = 400;
var ende = false;

var landPreis;
var ernteProAcker;

bestimmeLandPreis();
console.log(korn);

function spieleEineRunde(){

  if(ende == false){

    jahr += 1;
    bestimmeErnteErfolg();
    verarbeiteBefehle();
    bestimmeLandPreis();
    erstelleBericht();
    pruefeEnde();

  }

}

function verarbeiteBefehle(){

  var eingabe = prompt("Erteilt Eure Befehle, hoher Herrscher", "Nahrung, Aussaat, Landkauf");
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

}

function bestimmeErnteErfolg(){

  ernteProAcker = Math.round(Math.random() * 5 + Math.random() * 5 + 0.5);

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

    korn = korn - nahrung;

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

      alert("Nicht genügend Land!");
      return;

    }

    land = land - verkauf;
    korn = korn + verkauf * landPreis;

  }

  if(kauf > 0){

    if(kauf * landPreis > korn){

      alert("Nicht genügend Korn für Landkauf!");

    }

    land = land + kauf;
    korn = korn - kauf * landPreis;

  }

}


function erstelleBericht(){

  var ernte;
  switch (ernteProAcker) {
    case 1:
      ernte = "Unwetter vernichten Teiler der Ernte";
      break;
    case 2:
    case 3:
      ernte = "Das Wetter war schlecht";
      break;
    case 6:
    case 7:
      ernte = "Das Wetter war gut. Die Ernte war reichlich";
      break;
    case 8:
    case 9:
    case 10:
      ernte = "Das Wetter war sehr gut, Die Ernte war hervorrahgend.";
      break;
    case 4:
    case 5:
    default:
      ernte = "Das Wetter war normal.";
      break;
  }

  var info = "Weiser Herrscher Hammurabi!<br>";
  info += "Wir schreiben das Jahr " + jahr + " Ihrer Herrschaft.<br><br>";
  info += buerger + " treue Bürger zählt euer Reich.<br>";
  info += ernte + "<br>" + korn + " Scheffel Korn lagern in den Kornkammern.<br>";
  info += land + " Acker Land besitzt Ihr.<br>";
  info += landPreis + " Scheffel Korn kostet ein Acker Land.";

  monitor.innerHTML = info;
  return;

}

function pruefeEnde(){

  var abbruchGrund = "<br>";
  if(buerger < 1){

    ende = true;
    abbruchGrund += "Ihr habt zu wenige Untertanen. ";

  }

  if(korn < 1){

    ende = true;
    abbruchGrund += "Eure Kornkammern sind leer. ";

  }

  if(land < 1){

    ende = true;
    abbruchGrund += "Ihr habt zu wenig Land. ";

  }

  if(jahr > 20){

    ende = true;
    abbruchGrund += "Nach 20 Jahren ist das Ende Eurer Zeit als Herrscher gekommen.<br>Euer Name soll auf ewig gepriesen werden! Ihr habt weise und gerecht regiert.";

  }

  if(ende){

    abbruchGrund = "<br><br>Eure Herrschaft ist beendet. " + abbruchGrund;
    monitor.innerHTML = monitor.innerHTML + abbruchGrund;

  }

}
