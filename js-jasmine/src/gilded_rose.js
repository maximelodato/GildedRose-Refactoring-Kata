class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      if (item.name === 'Sulfuras, Hand of Ragnaros') {
        // "Sulfuras" ne change pas
        return;
      }

      // Déterminer la dégradation ou l'amélioration
      let qualityChange = this.getQualityChange(item);

      // Appliquer les changements de qualité
      item.quality = Math.max(0, Math.min(50, item.quality + qualityChange));

      // Réduire sellIn sauf pour "Sulfuras"
      item.sellIn -= 1;

      // Après péremption, appliquer des règles supplémentaires
      if (item.sellIn < 0) {
        this.applyPostExpirationRules(item);
      }
    });

    return this.items;
  }

  getQualityChange(item) {
    if (item.name === 'Aged Brie') {
      return 1; // "Aged Brie" augmente toujours en qualité
    }

    if (item.name.startsWith('Backstage passes')) {
      if (item.sellIn <= 5) return 3; // Augmente de 3 si <= 5 jours
      if (item.sellIn <= 10) return 2; // Augmente de 2 si <= 10 jours
      return 1; // Sinon augmente de 1
    }

    if (item.name.startsWith('Conjured')) {
      return -2; // Les articles "Conjured" se dégradent deux fois plus vite
    }

    return -1; // Dégradation normale
  }

  applyPostExpirationRules(item) {
    if (item.name === 'Aged Brie') {
      // "Aged Brie" continue d'augmenter après péremption
      item.quality = Math.min(50, item.quality + 1);
    } else if (item.name.startsWith('Backstage passes')) {
      // "Backstage passes" tombent à 0 après péremption
      item.quality = 0;
    } else {
      // Dégradation supplémentaire après péremption
      item.quality = Math.max(0, item.quality - (item.name.startsWith('Conjured') ? 2 : 1));
    }
  }
}

module.exports = {
  Item,
  Shop
};
