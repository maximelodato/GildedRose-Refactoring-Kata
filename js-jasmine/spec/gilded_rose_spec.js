const { Shop, Item } = require('../src/gilded_rose.js');

describe("Gilded Rose - Vérification des critères de correction", function () {

  function afficherResultat(message, condition) {
    console.log(`${message}: ${condition ? "✔️ Succès" : "❌ Échec"}`);
  }

  it("Critère 1 : La quality et le sellIn d'item normaux baissent de 1", function () {
    console.log("\n🔎 Critère 1 : Vérification de la diminution normale de la qualité et de sellIn.");
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 20)]);
    gildedRose.updateQuality();
    const item = gildedRose.items[0];
    afficherResultat("Qualité diminue de 1", item.quality === 19);
    afficherResultat("SellIn diminue de 1", item.sellIn === 9);
  });

  it("Critère 2 : La qualité augmente de 1 pour 'Aged Brie' et 'Backstage passes'", function () {
    console.log("\n🔎 Critère 2 : Vérification de l'augmentation de la qualité pour 'Aged Brie'.");
    const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
    gildedRose.updateQuality();
    const item = gildedRose.items[0];
    afficherResultat("Qualité augmente de 1 pour Aged Brie", item.quality === 1);

    console.log("\n🔎 Critère 2 : Vérification de l'augmentation pour 'Backstage passes'.");
    const gildedRose2 = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)]);
    gildedRose2.updateQuality();
    const item2 = gildedRose2.items[0];
    afficherResultat("Qualité augmente de 1 pour Backstage passes", item2.quality === 21);
  });

  it("Critère 3 : La qualité augmente de 2 pour 'Backstage passes' quand il reste 10 jours ou moins", function () {
    console.log("\n🔎 Critère 3 : Vérification de l'augmentation de qualité pour 'Backstage passes' (10 jours ou moins).");
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
    gildedRose.updateQuality();
    const item = gildedRose.items[0];
    afficherResultat("Qualité augmente de 2 pour Backstage passes", item.quality === 22);
  });

  it("Critère 4 : La qualité augmente de 3 pour 'Backstage passes' quand il reste 5 jours ou moins", function () {
    console.log("\n🔎 Critère 4 : Vérification de l'augmentation de qualité pour 'Backstage passes' (5 jours ou moins).");
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
    gildedRose.updateQuality();
    const item = gildedRose.items[0];
    afficherResultat("Qualité augmente de 3 pour Backstage passes", item.quality === 23);
  });

  it("Critère 5 : Quand un produit est périmé, la qualité baisse 2 fois plus vite", function () {
    console.log("\n🔎 Critère 5 : Vérification de la baisse accélérée après péremption.");
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 10)]);
    gildedRose.updateQuality();
    const item = gildedRose.items[0];
    afficherResultat("Qualité diminue de 2 après péremption", item.quality === 8);
  });

  it("Critère 6 : Quand le concert est terminé, 'Backstage passes' devient périmé avec qualité = 0", function () {
    console.log("\n🔎 Critère 6 : Vérification de l'expiration des 'Backstage passes'.");
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
    gildedRose.updateQuality();
    const item = gildedRose.items[0];
    afficherResultat("Qualité des Backstage passes tombe à 0", item.quality === 0);
  });

  it("Critère 7 : La qualité de 'Sulfuras' n'est pas modifiée", function () {
    console.log("\n🔎 Critère 7 : Vérification que 'Sulfuras' reste inchangé.");
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    gildedRose.updateQuality();
    const item = gildedRose.items[0];
    afficherResultat("Qualité de Sulfuras reste inchangée", item.quality === 80);
    afficherResultat("SellIn de Sulfuras reste inchangé", item.sellIn === 0);
  });

  it("Critère 8 : La qualité n'augmente pas au-dessus de 50", function () {
    console.log("\n🔎 Critère 8 : Vérification de la limite supérieure de qualité.");
    const gildedRose = new Shop([new Item("Aged Brie", 2, 50)]);
    gildedRose.updateQuality();
    const item = gildedRose.items[0];
    afficherResultat("Qualité ne dépasse pas 50", item.quality === 50);
  });

  it("Critère 9 : Les articles 'Conjured' baissent deux fois plus rapidement", function () {
    console.log("\n🔎 Critère 9 : Vérification de la baisse accélérée pour les 'Conjured'.");
    const gildedRose = new Shop([
      new Item("Conjured Mana Cake", 3, 6),
      new Item("Conjured Mana Cake", 0, 6),
    ]);
    gildedRose.updateQuality();
    const item1 = gildedRose.items[0];
    const item2 = gildedRose.items[1];
    afficherResultat("Conjured diminue de 2 (sellIn > 0)", item1.quality === 4);
    afficherResultat("Conjured diminue de 4 (sellIn <= 0)", item2.quality === 2);
  });

});
