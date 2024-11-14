La Gilded Rose - L'art de gérer du bazar en stock
Bienvenue à La Gilded Rose, où le désordre règne, mais où le code est bien testé ! Ce projet est une aventure dans l'univers du commerce médiéval, où vous gérez un inventaire rempli de produits magiques (et parfois douteux).

📜 Mission
Votre tâche, si vous l'acceptez, est de maintenir la qualité (ou l'illusion de qualité) de nos produits magiques tout en respectant les règles strictes de l'inventaire. Ne touchez surtout pas à la classe Item ! Elle est protégée par un gobelin maléfique qui pourrait devenir TRÈS mécontent.

🛠️ Comment ça marche ?
Chaque nuit, le système :

Réduit le nombre de jours restants pour vendre chaque article (sellIn).
Ajuste la quality des articles, en appliquant des règles très logiques* :
Normal : Qualité -1 (ou -2 après péremption).
Aged Brie : Plus vieux, plus délicieux ! +1 de qualité (maximum 50).
Backstage passes : Une hype qui monte (+2 ou +3), mais chute libre après l'événement (qualité = 0).
Sulfuras : La classe. Toujours 80 de qualité, quoi qu'il arrive.
Conjured : "Double dégradation", parce que la magie, ça s'use vite.
* Si vous trouvez ça logique, contactez-nous. On vous embauche.
🚀 Comment lancer ce joyau ?
Pré-requis
Node.js et pnpm, parce que le code médiéval mérite des outils modernes.
Étapes
Clonez le repo :
git clone https://github.com/your-username/gilded-rose.git
cd gilded-rose
Installez les dépendances :
pnpm install
Exécutez les tests :
pnpm test
Regardez le chaos se dérouler :
node texttest_fixture.js 10
💻 Le code
Le code est structuré comme suit :

Fichiers principaux
src/gilded_rose.js : Où toute la "magie" opère.
spec/gilded_rose_spec.js : La vérité absolue, où chaque règle est testée.
texttest_fixture.js : Pour les nostalgiques des logs console. C'est comme lire un journal intime.
😱 Ce qu'il NE faut PAS faire
Modifier la classe Item. Sérieusement, le gobelin ne plaisante pas.
Ignorer les règles métier :
Pas de qualité au-dessus de 50 (sauf "Sulfuras").
Pas de qualité en-dessous de 0 (même pour les "Conjured").
Essayer de comprendre pourquoi "Backstage passes" est si compliqué. Ce n'est pas censé avoir du sens.
🏆 Les tests passent
Oui, tout fonctionne ! Nos 18 tests couvrent :

Les articles normaux (basiques mais nécessaires).
"Aged Brie" et son vieillissement comme un bon vin.
"Backstage passes" et leur chute spectaculaire.
"Sulfuras", fidèle à lui-même.
Les articles "Conjured", qui partent en poussière plus vite que la normale.
🐛 Bugs ?
Si vous trouvez un bug :

Blâmez Leeroy. C'est lui qui a écrit la première version.
Ouvrez un ticket ou corrigez-le vous-même. On ne mord pas (promis).
🎉 Merci !
Un grand merci à vous, aventurier du code, pour avoir accepté cette mission. Vous avez maintenant une maîtrise avancée de l'art de la gestion d'inventaire magique. Et rappelez-vous : le code peut toujours être plus horrible !

Avec amour (et beaucoup de expect),
La Gilded Rose Dev Team