const { Shop, Item } = require("../src/gilded_rose");

// Initialisation des articles
const items = [
  new Item("+5 Gilet de Dextérité", 10, 20),
  new Item("Brie Vieilli", 2, 0),
  new Item("Elixir de Mangouste", 5, 7),
  new Item("Sulfuras, Main de Ragnaros", 0, 80),
  new Item("Passes pour le concert TAFKAL80ETC", 15, 20),
  new Item("Gâteau Conjuré", 3, 6),
];

// Nombre de jours à simuler (5 par défaut)
const days = Number(process.argv[2]) || 5;
const gildedRose = new Shop(items);

console.log("Bienvenue dans la boutique Gilded Rose !");

// Boucle de simulation par jour
for (let day = 0; day < days; day++) {
  console.log(`\n-------- Jour ${day + 1} --------`);
  console.log("Nom, Jours Restants (sellIn), Qualité (quality)");

  // Affichage des articles avant la mise à jour
  items.forEach(item =>
    console.log(`${item.name}, ${item.sellIn}, ${item.quality}`)
  );

  // Mise à jour des articles
  gildedRose.updateQuality();

  console.log("\n--- Après mise à jour ---");
  items.forEach(item =>
    console.log(`${item.name}, ${item.sellIn}, ${item.quality}`)
  );
}
