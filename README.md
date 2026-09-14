# 🚀 Portfolio de Noah BERTRAND

Portfolio professionnel, moderne et réactif conçu pour présenter mes projets, compétences et mon parcours aux recruteurs et futurs employeurs.

---

## 📁 Architecture du Projet

```
Portfolio/
├── index.html                   # Page web principale (SEO & OpenGraph intégrés)
├── CNAME                        # Configuration pour www.noahbertrand.fr
├── README.md                    # Ce guide
└── assets/
    ├── css/
    │   ├── variables.css        # Variables de design (thème sombre & clair, couleurs)
    │   ├── main.css             # Styles de base, navigation, typographie et footer
    │   └── components.css       # Cartes de projets, filtres, modal lightbox, terminal, badges
    ├── js/
    │   ├── projects-data.js     # ⭐ FICHIER CENTRAL : données des projets et compétences
    │   └── main.js              # Logique des filtres, modal, thème et animations
    ├── img/                     # Captures d'écran des projets, photo de profil et logo
    └── docs/
        └── BERTRAND_Noah_CV.pdf # Votre CV au format PDF à télécharger
```

---

## ⭐ Comment ajouter un nouveau projet en 30 secondes ?

Tout est automatisé ! Vous n'avez **pas besoin de toucher au code HTML ni CSS**.

### Étape 1 : Ajoutez vos images
Déposez les captures d'écran de votre projet dans le dossier :
`assets/img/nom_de_votre_image.png`

### Étape 2 : Ajoutez le projet dans `assets/js/projects-data.js`
Ouvrez le fichier `assets/js/projects-data.js` et copiez-collez ce modèle à l'intérieur du tableau `PROJECTS_DATA` :

```javascript
{
  id: "mon-nouveau-projet",
  title: "Titre de mon projet",
  subtitle: "Cadre du projet (ex: IUT de Nantes, Projet Perso...)",
  category: "academique", // Choix possibles : "web", "academique", "reseau", "logiciel"
  categoryLabel: "Projet Académique (SAÉ)",
  badge: "Nouveau", // Ex: "En Production", "En Équipe", "Algorithmique"...
  year: "2025",
  featured: true,
  summary: "Courte phrase résumant le projet affichée sur la carte principale.",
  description: "Explication détaillée du projet affichée lorsque le recruteur clique sur 'Détails & Captures'.",
  features: [
    "Première fonctionnalité majeure",
    "Deuxième fonctionnalité majeure",
    "Troisième fonctionnalité majeure"
  ],
  technicalChallenges: [
    "Défi technique résolu (ex: gestion mémoire, POO, architecture)",
    "Autre défi relevé pendant le développement"
  ],
  tags: ["Langage1", "Framework/Outil", "Méthodologie"],
  github: "https://github.com/Ytixo/mon-depot", // ou null si privé
  demo: "https://lien-vers-le-site.fr",         // ou null si pas de démo en ligne
  images: [
    "assets/img/mon_image_1.png",
    "assets/img/mon_image_2.png"
  ]
},
```

Enregistrez le fichier : **le projet est immédiatement visible avec ses filtres, sa carte et sa modal avec galerie d'images !**

---

## 🎨 Fonctionnalités Clés du Portfolio

1. **Filtres Dynamiques** : Filtrage instantané par catégorie (*Web*, *Académique/SAÉ*, *Réseau/Système*, *Logiciel Métier*) avec compteurs en temps réel.
2. **Modal Détaillée & Lightbox** : Diaporama des captures au clavier (flèches gauche/droite, touche Échap) et présentation des défis techniques résolus.
3. **Bascule Thème Sombre / Clair** : Style tech sombre par défaut ou style clair chaleureux avec mémorisation de la préférence (`localStorage`).
4. **Copie d'Email en 1 Clic** : Copie automatique dans le presse-papier avec notification toast.
5. **Zéro dépendance lourde** : Pas de node_modules, pas de Three.js lourd et fragile, 100% compatible GitHub Pages et chargement instantané.

---

## 💻 Tester en Local

Pour visualiser le site sur votre machine :

```bash
# Dans le dossier Portfolio
python3 -m http.server 8000
```
Puis ouvrez votre navigateur sur : `http://localhost:8000`
