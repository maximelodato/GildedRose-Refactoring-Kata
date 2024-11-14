const { Shop, Item } = require('../src/gilded_rose.js');

describe("Gilded Rose", function () {

  // Test global pour visualiser les changements au fil des jours
  it("Test complet (Full Test) avec affichage des résultats", function () {
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

    const days = 2;
    const gildedRose = new Shop(items);

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- Jour ${day + 1} --------`);
      console.log("Nom, sellIn, qualité");
      items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.updateQuality();
    }
  });

  // Test 1 : Articles normaux
  it("Les articles normaux voient leur qualité et leur sellIn diminuer de 1", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(19);
    expect(gildedRose.items[0].sellIn).toBe(9);
  });

  // Test 2 : Articles normaux après péremption
  it("La qualité des articles normaux baisse de 2 après péremption", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(8);
  });

  // Test 3 : Aged Brie augmente en qualité
  it("La qualité augmente de 1 pour 'Aged Brie'", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(1);
  });

  // Test 4 : La qualité ne dépasse jamais 50
  it("La qualité ne dépasse jamais 50", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 50)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(50);
  });

  // Test 5 : Backstage passes (sellIn > 10)
  it("La qualité des 'Backstage passes' augmente de 1 quand sellIn > 10", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(21);
  });

  // Test 6 : Backstage passes (sellIn <= 10)
  it("La qualité des 'Backstage passes' augmente de 2 quand sellIn <= 10", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(22);
  });

  // Test 7 : Backstage passes (sellIn <= 5)
  it("La qualité des 'Backstage passes' augmente de 3 quand sellIn <= 5", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(23);
  });

  // Test 8 : Backstage passes après l'événement
  it("La qualité des 'Backstage passes' tombe à 0 après l'événement", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  // Test 9 : Sulfuras reste inchangé
  it("La qualité et le sellIn de 'Sulfuras' ne changent jamais", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    gildedRose.updateQuality();
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
    expect(gildedRose.items[0].quality).toBe(4); // sellIn > 0 : baisse de 2
    expect(gildedRose.items[1].quality).toBe(2); // sellIn <= 0 : baisse de 4
  });

});
