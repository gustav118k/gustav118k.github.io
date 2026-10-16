// Zeigt "| text" mit drehendem Strich (| / - \) im Element an.
// Gibt eine Funktion zurück, die die Animation stoppt.
function startSpinner(element, text) {
  var frames = ["|", "/", "-", "\\"];
  var i = 0;
  var spinner = document.createElement("span");
  spinner.className = "spinner";
  spinner.textContent = frames[0];
  element.textContent = "";
  element.append(spinner, " " + text);

  var intervalId = setInterval(function () {
    i = (i + 1) % frames.length;
    spinner.textContent = frames[i];
  }, 150);

  return function () {
    clearInterval(intervalId);
  };
}

const vorschlagGeben = async () => {
  var uhrzeitInput = document.getElementById("uhrzeit");
  var vorschlagParagraph = document.getElementById("vorschlag");

  if (uhrzeitInput.value === "") {
    alert("Bitte geben Sie eine Uhrzeit ein.");
    return;
  }

  const text = uhrzeitInput.value;
  const stopSpinner = startSpinner(vorschlagParagraph, "Frage den Techfak-Panda");

  try {
    const res = await fetch("https://mensa-llm-backend.vercel.app/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
          
    const data = await res.json();
    stopSpinner();
    vorschlagParagraph.textContent = data.answer || data.error || "No response";
  } catch (err) {
    console.error(err);
    stopSpinner();
    vorschlagParagraph.textContent = "Failed to reach API";
  }

  uhrzeitInput.value = ""; // Uhrzeit löschen
};

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
  var stopSpinner = startSpinner(gerichtElement, "Frage Mensa-API");

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

  setTimeout(function () {
    stopSpinner();
    gerichtElement.innerText = gericht;
  }, 2000);
}
