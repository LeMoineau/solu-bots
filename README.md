# Petits bot pour jeu web

Florilèges de petits programmes qui vont permetteront de gagner aisément à plusieurs petits jeux rigolos sur internet.

Les jeux piratables par communication NASA-le (une blaque avec l'expression "finger in the nose" + NASA, oue c'est recherché) sont les suivants :

- [Snake](https://www.google.com/search?q=snake+google&rlz=1C1GCEU_frFR1044FR1044&oq=snake+google&aqs=chrome.0.69i59i433i512j0i433i512j0i512l5j69i60.1063j0j7&sourceid=chrome&ie=UTF-8) de Google
- [Fastfinger](https://10fastfingers.com/typing-test/french) de ... fastfinger
- [Sutom](https://sutom.nocle.fr/#) de Nocle

Bon jeu, ou plutôt, bon visionnage hehehehehehe !

## Installation des robots de desctruction massive

L'installation des bots est très facile puisqu'elle ne se résume qu'en ces quelques étapes :

- d'abord ouvrez votre navigation préféré (pur avis perso mais toutes les personnes qui utilisent Edge sont des nuisibles :) )
- surfer (cette expression m'a toujours fumé xD) ensuite jusqu'au site du jeu ciblé
- ouvrez maintenant l'inspecteur / DevTools de votre navigateur (clique droit "Inspecter" ou touche F12)
- naviguer jusqu'à l'onglet "console" de l'inspecteur nouvellement ouvert (tout en haut au centre de l'inspecteur)
- enfin, déverser l'entièreté du contenu du robot dans le jeu en copiant-collant le contenu du bot choisi dans l'onglet "console" de l'inspecteur !
- pour lancer le robot, il suffit de lui souffler des mots doux à l'oreille en tapant les commandes décrites plus bas

## Lancement des différents bots (et pas bottes ahah)

### Google Snake

Après avoir installé le bot pour Google Snake (copier-coller le code du fichier `bot-snake.js` dans la console de votre inspecteur), vous pouvez le lancer à l'aide des étapes suivantes :

- appuyer sur le bouton "Jouer" (vous pouvez paramétrer la partie comme ça vous chante en amont si vous voulez)
- puis taper dans la console de l'inspecteur la commande `infiniteSnake()` !

En fonction du nombre d'application ouvertes / des performances de votre ordi, il peut arriver que le serpent se cogne contre un mur mais c'est normalement très très rare si vous rester bien sur la page du jeu :thumbsup:

![Une image d'illustration du snake-bot](image-1.png)

### Fastfinger (Xav' aura jamais réussi à me battre hehehe)

Après avoir installer le robot pour Fastfinger à l'aide du fichier `faster-finger.js` vous pouvez le lancer en tapant :

```js
fasterfinger(); // et vroom ça part à toute vitesse !
```

Vous pouvez aussi préciser le temps que doit mettre le bot à écrire chaque mot en tapant la commande de la manière suivante :

```js
fasterfinger(2000); // chaque mot mettre 2s à s'écrire
```

![Une image d'illustration du bot fasterfinger](image-2.png)

### Sutom

Le dernier bot en date créé pour Sutom peut se lancer après installation simplement en tapant la commande suivante :

```js
resolveSutom(); // BRAVOO ! Vous avez gagné !! 🎉🎉
```

![Une image d'illustration pour le robot sutom cette fois !](image-3.png)

## Crédits

- à la batterie : Picou le PO !
- au pipo : Kevin le lapin !
- aux maracasses : Emma la footballeuse goat !
- au triangle : Thomas le DJ (mais au triangle du coup) !
- au pied du mur : le grand Xav' bien obligé de reconnaitre que, malgré tous ses efforts, son voisin de droite le surpassera toujours (il joue du bâton de pluie) !
- et à l'ordinator200**1** Pierrot le moineau !
