const { Shop, Item } = require('../src/gilded_rose.js');

describe("Gilded Rose", function () {

  // Test global avec affichage détaillé
  it("Test complet avec affichage des résultats en français", function () {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const days = 3; // Nombre de jours à simuler
    const gildedRose = new Shop(items);

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- JOUR ${day + 1} --------`);
      console.log("Nom de l'article | Nombre de jours restants (sellIn) | Qualité");
      items.forEach(item => console.log(`${item.name} | ${item.sellIn} | ${item.quality}`));
      gildedRose.updateQuality();
      console.log("=== Après mise à jour ===");
      items.forEach(item => console.log(`${item.name} | ${item.sellIn} | ${item.quality}`));
    }
  });

  // Test 1 : Articles normaux
  it("Les articles normaux voient leur qualité et leur sellIn diminuer de 1", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 20)]);
    gildedRose.updateQuality();
    console.log("Avant mise à jour : +5 Dexterity Vest | sellIn = 10, qualité = 20");
    console.log("Après mise à jour :", gildedRose.items[0]);
    expect(gildedRose.items[0].quality).toBe(19);
    expect(gildedRose.items[0].sellIn).toBe(9);
  });

  // Test 2 : Articles normaux après péremption
  it("La qualité des articles normaux baisse de 2 après péremption", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 10)]);
    gildedRose.updateQuality();
    console.log("Avant mise à jour : +5 Dexterity Vest | sellIn = 0, qualité = 10");
    console.log("Après mise à jour :", gildedRose.items[0]);
    expect(gildedRose.items[0].quality).toBe(8);
  });

  // Test 3 : Aged Brie augmente en qualité
  it("La qualité augmente de 1 pour 'Aged Brie'", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
    gildedRose.updateQuality();
    console.log("Avant mise à jour : Aged Brie | sellIn = 2, qualité = 0");
    console.log("Après mise à jour :", gildedRose.items[0]);
    expect(gildedRose.items[0].quality).toBe(1);
  });

  // Test 4 : La qualité ne dépasse jamais 50
  it("La qualité ne dépasse jamais 50", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 50)]);
    gildedRose.updateQuality();
    console.log("Avant mise à jour : Aged Brie | sellIn = 2, qualité = 50");
    console.log("Après mise à jour :", gildedRose.items[0]);
    expect(gildedRose.items[0].quality).toBe(50);
  });

  // Test 5 : Backstage passes (sellIn > 10)
  it("La qualité des 'Backstage passes' augmente de 1 quand sellIn > 10", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)]);
    gildedRose.updateQuality();
    console.log("Avant mise à jour : Backstage passes | sellIn = 15, qualité = 20");
    console.log("Après mise à jour :", gildedRose.items[0]);
    expect(gildedRose.items[0].quality).toBe(21);
  });

  // Test 6 : Backstage passes (sellIn <= 10)
  it("La qualité des 'Backstage passes' augmente de 2 quand sellIn <= 10", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
    gildedRose.updateQuality();
    console.log("Avant mise à jour : Backstage passes | sellIn = 10, qualité = 20");
    console.log("Après mise à jour :", gildedRose.items[0]);
    expect(gildedRose.items[0].quality).toBe(22);
  });

  // Test 7 : Backstage passes (sellIn <= 5)
  it("La qualité des 'Backstage passes' augmente de 3 quand sellIn <= 5", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
    gildedRose.updateQuality();
    console.log("Avant mise à jour : Backstage passes | sellIn = 5, qualité = 20");
    console.log("Après mise à jour :", gildedRose.items[0]);
    expect(gildedRose.items[0].quality).toBe(23);
  });

  // Test 8 : Backstage passes après l'événement
  it("La qualité des 'Backstage passes' tombe à 0 après l'événement", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
    gildedRose.updateQuality();
    console.log("Avant mise à jour : Backstage passes | sellIn = 0, qualité = 20");
    console.log("Après mise à jour :", gildedRose.items[0]);
    expect(gildedRose.items[0].quality).toBe(0);
  });

  // Test 9 : Sulfuras reste inchangé
  it("La qualité et le sellIn de 'Sulfuras' ne changent jamais", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    gildedRose.updateQuality();
    console.log("Avant mise à jour : Sulfuras | sellIn = 0, qualité = 80");
    console.log("Après mise à jour :", gildedRose.items[0]);
    expect(gildedRose.items[0].quality).toBe(80);
    expect(gildedRose.items[0].sellIn).toBe(0);
  });

  // Test 10 : Conjured diminue de 2 ou 4 selon sellIn
  it("La qualité des articles 'Conjured' diminue deux fois plus vite", function () {
    const gildedRose = new Shop([
      new Item("Conjured Mana Cake", 3, 6),
      new Item("Conjured Mana Cake", 0, 6),
    ]);
    gildedRose.updateQuality();
    console.log("Avant mise à jour : Conjured | sellIn = 3, qualité = 6");
    console.log("Après mise à jour :", gildedRose.items[0]);
    console.log("Avant mise à jour : Conjured | sellIn = 0, qualité = 6");
    console.log("Après mise à jour :", gildedRose.items[1]);
    expect(gildedRose.items[0].quality).toBe(4); // sellIn > 0 : baisse de 2
    expect(gildedRose.items[1].quality).toBe(2); // sellIn <= 0 : baisse de 4
  });

});
