const { Shop, Item } = require('../src/gilded_rose.js');

describe("Gilded Rose", function () {

  it("Test complet avec assertions et logs détaillés", function () {
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

    expectedResults.forEach((expectedDay, index) => {
      console.log(`\n🎯 === JOUR ${index + 1} ===`);
      console.log("📜 Avant la mise à jour :");
      items.forEach(item => {
        console.log(`- ${item.name.padEnd(40)} | sellIn=${item.sellIn.toString().padStart(2)} | quality=${item.quality}`);
      });

      gildedRose.updateQuality(); // Mise à jour quotidienne

      console.log("\n🔄 Après la mise à jour :");
      items.forEach((item, i) => {
        const expectedItem = expectedDay[i];
        console.log(`- ${item.name.padEnd(40)} | sellIn=${item.sellIn.toString().padStart(2)} | quality=${item.quality}`);
        expect(item.sellIn).toBe(expectedItem.sellIn);
        expect(item.quality).toBe(expectedItem.quality);
      });
    });
  });

  // Tests spécifiques
  it("Les articles normaux voient leur qualité diminuer de 1 chaque jour", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 20)]);
    console.log("🔍 Avant mise à jour:", gildedRose.items[0]);
    gildedRose.updateQuality();
    console.log("✅ Après mise à jour:", gildedRose.items[0]);
    expect(gildedRose.items[0].quality).toBe(19);
  });

  it("Les articles 'Conjured' se dégradent deux fois plus vite", function () {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 6)]);
    console.log("🔍 Avant mise à jour:", gildedRose.items[0]);
    gildedRose.updateQuality();
    console.log("✅ Après mise à jour:", gildedRose.items[0]);
    expect(gildedRose.items[0].quality).toBe(4);
  });

  it("Les articles 'Sulfuras' ne changent jamais", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    console.log("🔍 Avant mise à jour:", gildedRose.items[0]);
    gildedRose.updateQuality();
    console.log("✅ Après mise à jour:", gildedRose.items[0]);
    expect(gildedRose.items[0].quality).toBe(80);
    expect(gildedRose.items[0].sellIn).toBe(0);
  });

  it("La qualité diminue de 2 après péremption pour les articles normaux", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 10)]);
    console.log("🔍 Avant mise à jour:", gildedRose.items[0]);
    gildedRose.updateQuality();
    console.log("✅ Après mise à jour:", gildedRose.items[0]);
    expect(gildedRose.items[0].quality).toBe(8);
  });

  it("'Backstage passes' augmentent correctement de 3 lorsqu'il reste 5 jours ou moins", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 47)]);
    console.log("🔍 Avant mise à jour:", gildedRose.items[0]);
    gildedRose.updateQuality();
    console.log("✅ Après mise à jour:", gildedRose.items[0]);
    expect(gildedRose.items[0].quality).toBe(50);
  });

});
