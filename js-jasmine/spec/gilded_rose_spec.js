const { Shop, Item } = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {

  it("Test complet avec assertions", function() {
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
  
    const gildedRose = new Shop(items);
  
    const expectedResults = [
      // Jour 1
      [
        { name: "+5 Dexterity Vest", sellIn: 9, quality: 19 },
        { name: "Aged Brie", sellIn: 1, quality: 1 },
        { name: "Elixir of the Mongoose", sellIn: 4, quality: 6 },
        { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
        { name: "Sulfuras, Hand of Ragnaros", sellIn: -1, quality: 80 },
        { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 14, quality: 21 },
        { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 9, quality: 50 },
        { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 4, quality: 42 },
        { name: "Conjured Mana Cake", sellIn: 2, quality: 4 },
      ],
      // Jour 2
      [
        { name: "+5 Dexterity Vest", sellIn: 8, quality: 18 },
        { name: "Aged Brie", sellIn: 0, quality: 2 },
        { name: "Elixir of the Mongoose", sellIn: 3, quality: 5 },
        { name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80 },
        { name: "Sulfuras, Hand of Ragnaros", sellIn: -1, quality: 80 },
        { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 13, quality: 22 },
        { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 8, quality: 50 },
        { name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 3, quality: 45 },
        { name: "Conjured Mana Cake", sellIn: 1, quality: 2 },
      ],
    ];
  
    // Vérification des résultats
    expectedResults.forEach((expectedDay, index) => {
      gildedRose.updateQuality(); // Mise à jour quotidienne
  
      items.forEach((item, i) => {
        const expectedItem = expectedDay[i];
        expect(item.name).toBe(expectedItem.name); // Vérifie le nom
        expect(item.sellIn).toBe(expectedItem.sellIn); // Vérifie sellIn
        expect(item.quality).toBe(expectedItem.quality); // Vérifie quality
      });
    });
  });

  // Règles générales
  it("Les articles normaux voient leur qualité diminuer de 1 chaque jour", function() {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(19);
  });

  it("La qualité des articles normaux ne tombe pas en dessous de 0", function() {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 0)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it("La qualité des articles augmente de 1 pour 'Aged Brie'", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(1);
  });

  it("La qualité des 'Backstage passes' augmente de 2 lorsque le sellIn <= 10", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(22);
  });

  it("La qualité des 'Backstage passes' tombe à 0 après l'événement", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  it("Les articles 'Conjured' se dégradent deux fois plus vite", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 6)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(4);
  });

  it("Les articles 'Sulfuras' ne changent jamais", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(80);
    expect(gildedRose.items[0].sellIn).toBe(0);
  });

  // Tests supplémentaires
  it("La qualité diminue de 2 après péremption pour les articles normaux", function() {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 10)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(8);
  });

  it("La qualité des articles normaux ne dépasse jamais 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 5, 50)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(50);
  });

  it("La qualité des articles 'Conjured' diminue de 4 après péremption", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 0, 6)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(2);
  });

  it("'Sulfuras' conserve une qualité de 80 même après plusieurs jours", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(80);
  });

  it("'Backstage passes' ne dépasse jamais une qualité de 50", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(50);
  });

  it("Les 'Backstage passes' augmentent correctement de 3 lorsqu'il reste 5 jours ou moins", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 47)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(50);
  });

});
