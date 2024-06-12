function vorschlagGeben() {
  var uhrzeitInput = document.getElementById("uhrzeit");
  var vorschlagParagraph = document.getElementById("vorschlag");

  if (uhrzeitInput.value === "") {
    alert("Bitte geben Sie eine Uhrzeit ein.");
    return;
  }

  if (uhrzeitInput.value == "12:30") {
    vorschlagParagraph.textContent = "Alles klar Luca, wir gehen um 12:30 Uhr!";
  } else {
    vorschlagParagraph.textContent = "Nein Luca, wir gehen um 12:30 Uhr!";
  }
  uhrzeitInput.value = ""; // Uhrzeit löschen
}

function generateGericht() {
  var herkunftSuffixes = {
    "Curry": "es",
    "Gulasch": "er",
    "Braten": "er",
    "Suppe": "e",
    "Eintopf": "er",
    "Bowl verschieden garniert": "e",
    "Teller": "er",
    "Nuggets": "e",
    "Schnitzel": "es",
    "Cordon Bleu": "es",
    'Ragout "Indische Art"': "es",
    "Gyros": "es",
    "Puffer": "e",
    "Currywurst vegan": "e",
    "Käse gebacken": "er",
    'Pfanne "Gärtnerin"': "e"
  };

  var herkunft = ["Indisch", "Ungarisch", "Fränkisch", "Asiatisch", "Bremer"];
  var art = ["Hähnchen", "Rinder", "Schweine", "Hütten", "MSC Alaska Seelachsfilet", "Kraut", "Kartoffel", "Gemüse", "Blumekohl", "Auberginen", "Rote Beete", "Hirten"];
  var hauptbestandteil = ["Curry", "Gulasch", "Braten", "Suppe", "Eintopf", "Bowl verschieden garniert", "Teller", "Nuggets", "Schnitzel", "Cordon Bleu", 'Ragout "Indische Art"', "Gyros", "Puffer", "Currywurst vegan", "Käse gebacken", 'Pfanne "Gärtnerin"'];
  var beilage = ["Tomatenreis", "Kartoffeln", "Reisnudeln", "Wintergemüse", "Pommes frites", "Baguettebrötchen", "Mango, Chili, Avocado und Chiasamen", "Sauerkraut", "Käse und Ei", "Barbecue Dip und Coleslaw", "Kräuter-Dip", "Pinienkernen", "Kichererbsen und Reis", "Basmatireis", "Tzatziki", "Honig-Senf-Dip", "Limettendip", "Kräuter-Dip", "Soße", "Rote Beete-Gemüse, Meerrettichsoße und Schnittlauchfarfalle"];

  var randomHauptbestandteilIndex = Math.floor(Math.random() * hauptbestandteil.length);
  var randomHauptbestandteil = hauptbestandteil[randomHauptbestandteilIndex];
  var randomHerkunftSuffix = herkunftSuffixes[randomHauptbestandteil];

  var randomHerkunftIndex = Math.floor(Math.random() * herkunft.length);
  var randomArtIndex = Math.floor(Math.random() * art.length);
  var randomBeilageIndex = Math.floor(Math.random() * beilage.length);

  var gericht = "";

  var gerichtElement = document.getElementById("gericht");
  var loadingElement = document.getElementById("loading");

  loadingElement.style.display = "block";
  gerichtElement.classList.add("rotate");

  var randomPlainHerkunft = herkunft[randomHerkunftIndex];
  var randomHerkunft;
  if (randomPlainHerkunft === "Bremer") {
    randomHerkunft = randomPlainHerkunft;
  } else {
    randomHerkunft = randomPlainHerkunft + randomHerkunftSuffix;
  }
  var randomArt = art[randomArtIndex];
  var randomBeilage = beilage[randomBeilageIndex];

  gericht = randomHerkunft + " " + randomArt + "-" + randomHauptbestandteil + " mit " + randomBeilage;
  gerichtElement.innerText = gericht;

  setTimeout(function () {
    gerichtElement.classList.remove("rotate");
    loadingElement.style.display = "none";
  }, 2000);
}