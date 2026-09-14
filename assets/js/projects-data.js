/**
 * ==============================================================================
 * DONNÉES DU PORTFOLIO — NOAH BERTRAND
 * ==============================================================================
 * Ce fichier contient toutes les données affichées dynamiquement sur le portfolio.
 * 
 * 👉 POUR AJOUTER UN NOUVEAU PROJET :
 * 1. Déposez vos images dans le dossier : assets/img/
 * 2. Copiez-collez le modèle de projet ci-dessous à la fin de la liste PROJECTS_DATA.
 * 3. Remplissez les champs. Le projet apparaîtra automatiquement sur le site avec
 *    ses filtres, sa carte et sa modal interactive !
 * ==============================================================================
 */

const PROFILE_DATA = {
  name: "Noah Bertrand",
  title: "Étudiant en BUT Informatique",
  specialty: "Développement Logiciel, Web & Systèmes",
  status: "À la recherche d'une alternance / stage en développement",
  location: "Nantes, France (44000)",
  email: "luzrobertrand@gmail.com",
  github: "https://github.com/Ytixo",
  linkedin: "https://www.linkedin.com/in/noah-bertrand-42a3a7375/",
  cvPath: "assets/docs/BERTRAND_Noah_CV.pdf",
  bioShort: "Étudiant en 2ème année de BUT Informatique à l'IUT de Nantes (concours Geipi). Développeur logiciel et systèmes, avec une solide expérience en entreprise sur des applications desktop (Compose KMP), des pipelines de traitement de données et l'administration système.",
  stats: [
    { label: "Projets concrets", value: "6" },
    { label: "Expérience pro", value: "Idia Tech" },
    { label: "Technologies clés", value: "8+" }
  ]
};

const PROJECTS_DATA = [
  {
    id: "mocapia-idia-tech",
    title: "Mocapia — Suite de Post-Production Vidéo",
    subtitle: "Idia Tech • Stage Développeur Logiciel & Traitement Média",
    category: "logiciel",
    categoryLabel: "Logiciel Métier & Desktop",
    badge: "Stage en Entreprise",
    year: "2026",
    featured: true,
    summary: "Logiciel desktop professionnel de post-production vidéo assistée par IA générative (Wan VACE 2.2, SAM 2, LipSync), agent conversationnel intelligent OpenAI (Function Calling / BD), dashboard de statistiques avancées et orchestration GPU Cloud.",
    description: "Stage de développement logiciel chez Idia Tech sur la suite Mocapia. Conception et réalisation de briques complètes d'un logiciel desktop destiné aux équipes de post-production cinématographique. Intégration de modèles génératifs vidéo (Wan 2.2 VACE Replace, Wan 2.7, LipSync), développement d'un éditeur Canvas interactif de pinceau temporel avec extraction d'images ultra-rapide FFmpeg, tracking temporel par SAM 2 (Segment Anything Model 2), agent conversationnel en Node.js connecté à l'API OpenAI avec Function Calling pour interroger la base de données PostgreSQL en langage naturel, dashboard complet de statistiques métiers avec requêtes d'agrégation SQL et graphiques vectoriels Canvas sur-mesure (courbes multi-séries, histogrammes, RBAC), système comptable automatique de facturation des crédits ComfyUI et administration de clusters GPU RunPod dédiés.",
    features: [
      "Application desktop réactive développée en Kotlin Multiplatform (Compose Desktop KMP / Material 3)",
      "Dashboard de statistiques & métriques métier (Canvas Compose) : graphiques personnalisés multi-courbes (SimpleLineChart) et histogrammes (SimpleBarChart) avec sélection temporelle dynamique (7j, 30j, tout)",
      "Moteur d'agrégation SQL et API REST dédiées en Node.js : requêtes analytiques sur l'avancement des scènes (5 statuts), volume de rushs et correctifs par collaborateur avec contrôle d'accès granulaire RBAC",
      "Agent conversationnel interactif relié à l'API OpenAI (Function Calling en Node.js) : requêtage dynamique en langage naturel de la base de données PostgreSQL pour lister les productions et consulter leurs détails",
      "Pinceau temporel interactif (Replace Temporal Brush) : rotoscopie vectorielle sur keyframes avec coordonnées normalisées et export MKV FFV1",
      "Pipeline d'extraction vidéo FFmpeg haute performance avec seek rapide (-ss) et cache mémoire sans freeze sur 80+ frames",
      "Module de Détourage Vidéo IA avec SAM 2 : sélection par Bounding Box et points d'intérêt avec propagation temporelle multi-frame",
      "Module LipSync IA : synchronisation labiale automatique multi-mode (Audio sync.so & Texte Kling AI) avec suivi du coût en crédits",
      "Backend Node.js & PostgreSQL : API REST, passerelle ComfyUI et enregistrement comptable automatique des coûts de génération (crédits ➔ USD ➔ EUR)",
      "Infrastructure GPU Cloud : benchmarks, migration RunPod Serverless vers Pods GPU dédiés (RTX 4090 / A100) et gestion de volumes réseau S3"
    ],
    technicalChallenges: [
      "Développement de composants de visualisation de données personnalisés sur Canvas Compose (dessin des courbes lissées, grille, axes X/Y, labels) sans dépendance lourde externe",
      "Optimisation de requêtes SQL d'agrégation temporelle complexes et multi-tables pour calculer instantanément les métriques de rushs et de scènes",
      "Mise en place et fiabilisation des appels d'outils (Tool / Function Calling) OpenAI en Node.js pour traduire des requêtes utilisateurs conversationnelles en requêtes SQL précises et sécurisées",
      "Optimisation du flux de streaming et décodage FFmpeg pour manipuler des vidéos volumineuses en temps réel sans latence UI",
      "Génération dynamique et exécution asynchrone de graphes de nœuds ComfyUI complexes via API REST et WebSockets",
      "Conception d'outils ergonomiques de rotoscopie manuelle intégrés aux boucles de rendu graphique Compose Desktop",
      "Gestion des contraintes de mémoire VRAM (modèles de 50+ Go) et orchestration cloud pour éliminer les temps de file d'attente"
    ],
    tags: ["Kotlin Multiplatform", "Compose Desktop", "Dashboard & Data Viz", "Requêtes SQL / Agrégations", "OpenAI API (Function Calling)", "Agent Conversationnel", "ComfyUI", "SAM 2", "Node.js / Express", "PostgreSQL", "FFmpeg", "RunPod / GPU Cloud"],
    github: null,
    confidentialNote: "Projet propriétaire développé chez Idia Tech (code sous accord de confidentialité)",
    demo: null,
    images: [
      "assets/img/Mocapia1.png",
      "assets/img/Mocapia2.png",
      "assets/img/Mocapia3.png",
      "assets/img/Mocapia4.png",
      "assets/img/Mocapia5.png",
      "assets/img/idia_tech.webp"
    ]
  },
  {
    id: "homelab-system",
    title: "Infrastructure & Serveur Auto-Hébergé",
    subtitle: "Raspberry Pi 5 8Go • astroytixo.info • Caddy • WoWLAN",
    category: "systeme",
    categoryLabel: "Système & Réseau",
    badge: "En Production",
    year: "2025 — 2026",
    featured: true,
    summary: "Serveur personnel sous Raspberry Pi 5 (8 Go) orchestré avec Caddy Server, Dashboard FastAPI avec Forward Auth, Docker/Portainer, contrôle à distance noVNC et réveil WoWLAN de PC Linux.",
    description: "Conception et administration d'une infrastructure serveur personnelle complète auto-hébergée sur Raspberry Pi 5 (8 Go de RAM, Debian Bookworm). Gestion de la zone DNS publique astroytixo.info et noahbertrand.fr, reverse proxying moderne avec Caddy Server (HTTP/3, certificats SSL automatiques), architecture de sécurité Forward Auth reliée à un dashboard FastAPI, gestion de conteneurs Docker via Portainer CE, et système de réveil à distance WoWLAN (Wake-on-Wireless-LAN) déclenchant le réveil du PC de travail (Arch Linux) puis son contrôle distant par noVNC.",
    features: [
      "Serveur Raspberry Pi 5 8 Go 24/7 sous Debian Bookworm (SoC Broadcom BCM2712 Quad-Core)",
      "Reverse Proxy Caddy Server haute performance avec HTTP/3 et SSL/TLS automatique",
      "Sécurité Forward Auth : vérification centralisée des sessions via API FastAPI pour tous les sous-domaines",
      "Dashboard Web FastAPI maison avec déclencheur de Magic Packets WoWLAN",
      "Accès distant noVNC (pc.noahbertrand.fr) pour piloter le PC Linux depuis n'importe quel navigateur",
      "Supervision de conteneurs Docker via Portainer CE et terminal SSH web intégré (ttyd)",
      "Routage réseau Box SFR : baux DHCP, redirection de flux NAT/PAT (80, 443, 22) et sous-réseau 192.168.0.0/24"
    ],
    technicalChallenges: [
      "Implémentation d'une brique de Forward Authentication (auth_gate) sécurisant ssh, portainer et codejelly",
      "Réveil par Wake-on-Wireless-LAN (WoWLAN) sous Linux Arch / Wi-Fi avec gestion de l'état suspend",
      "Intégration d'un tunnel noVNC WebSockets avec authentification BasicAuth et redirection fluide"
    ],
    tags: ["Raspberry Pi 5", "Caddy Server", "FastAPI", "Docker / Portainer", "WoWLAN", "noVNC", "Linux Arch / Debian", "Réseau Box SFR"],
    github: null,
    demo: "systeme.html",
    dedicatedPage: "systeme.html",
    images: [
      "assets/img/homelab.webp",
      "assets/img/infra_schema.svg"
    ]
  },
  {
    id: "particles",
    title: "Go-Particles",
    subtitle: "IUT de Nantes — SAÉ Algorithmique",
    category: "academique",
    categoryLabel: "Projet Académique (SAÉ)",
    badge: "Simulation Temps Réel",
    year: "2025",
    featured: true,
    summary: "Moteur graphique de simulation de particules interactives développé en Go avec gestion des forces physiques et collisions.",
    description: "Projet universitaire réalisé en Go (Golang) dans le cadre des Situations d'Apprentissage et d'Évaluation (SAÉ). Développement d'un moteur de simulation physique 2D en temps réel capable de générer et d'animer des milliers de particules avec calculs de forces (gravité, rebonds, turbulences, amortissements).",
    features: [
      "Génération et simulation dynamique de flux de particules en temps réel",
      "Modélisation physique : vecteurs de vélocité, gravité, frictions, rebonds sur parois",
      "Gestion interactive : spawn de particules à la souris et modification des paramètres à la volée",
      "Architecture logicielle propre exploitant la rapidité d'exécution du langage Go"
    ],
    technicalChallenges: [
      "Optimisation des boucles de rendu et d'actualisation de position pour un framerate stable",
      "Gestion efficace de la mémoire et structuration modulaire du code en packages Go",
      "Respect strict des consignes algorithmiques et des bonnes pratiques de typage Go"
    ],
    tags: ["Go (Golang)", "Simulation 2D", "Algorithmique", "Graphique", "Physique"],
    github: "https://github.com/Ytixo/Go-Particles",
    demo: null,
    images: [
      "assets/img/particule_1.png",
      "assets/img/particule_2.png",
      "assets/img/particule_3.png"
    ]
  },
  {
    id: "f7",
    title: "Jeu Flip7 (F7)",
    subtitle: "IUT de Nantes — Projet en Équipe",
    category: "academique",
    categoryLabel: "Projet Académique (SAÉ)",
    badge: "Travail en Équipe",
    year: "2026",
    featured: true,
    summary: "Implémentation complète du jeu de cartes Flip7 en Kotlin avec interface graphique, intelligence artificielle et tests unitaires.",
    description: "Développement en équipe du jeu de cartes Flip7 dans le cadre de notre formation en BUT Informatique. Le projet implémente l'ensemble des règles du jeu, une intelligence artificielle contre laquelle jouer, une interface graphique interactive et une suite rigoureuse de tests unitaires pour garantir la robustesse du moteur.",
    features: [
      "Moteur de jeu complet respectant fidèlement toutes les mécaniques du Flip7",
      "Interface utilisateur graphique claire et intuitive pour les joueurs",
      "Développement d'une IA avec prise de décision selon l'état de la partie",
      "Couverture de tests unitaires automatisés validant la logique métier"
    ],
    technicalChallenges: [
      "Application stricte des principes de Programmation Orientée Objet (POO)",
      "Gestion collaborative avec Git (branches de fonctionnalités, code reviews, résolutions de conflits)",
      "Structuration du modèle de données séparant logique métier et couche graphique"
    ],
    tags: ["Kotlin", "POO", "Tests Unitaires", "Git en Équipe", "Algorithmique"],
    github: "https://github.com/Ytixo/f7",
    demo: null,
    images: [
      "assets/img/f7_1.png",
      "assets/img/f7_2.png",
      "assets/img/f7_3.png",
      "assets/img/f7_4.png"
    ]
  },
  {
    id: "chess",
    title: "Jeu d'échecs en Réseau",
    subtitle: "Polytech Nantes — Projet en Équipe",
    category: "reseau",
    categoryLabel: "Projet Réseau & Système",
    badge: "Architecture Client/Serveur",
    year: "2026",
    featured: false,
    summary: "Jeu d'échecs multijoueur en ligne avec architecture client-serveur en Python et communication par sockets TCP/IP.",
    description: "Projet en équipe de conception d'un jeu d'échecs multijoueur permettant à deux joueurs distants de s'affronter en réseau local ou Internet. Utilisation des sockets TCP/IP pour la communication bidirectionnelle synchrone entre le serveur d'arbitrage et les clients.",
    features: [
      "Serveur centralisé gérant l'état de la partie, les tours de jeu et les déconnexions",
      "Validation stricte des déplacements conformes aux règles officielles des échecs",
      "Interface graphique interactive côté client pour le placement et déplacement des pièces",
      "Protocole de messages réseau optimisé pour minimiser la latence"
    ],
    technicalChallenges: [
      "Gestion des threads concurrents pour écouter simultanément les entrées réseau et l'interface utilisateur",
      "Détection précise des situations d'échec, échec et mat, et promotions de pions",
      "Robustesse face aux coupures de connexion réseau"
    ],
    tags: ["Python", "Sockets TCP/IP", "Client / Serveur", "Pygame", "Réseau"],
    github: "https://github.com/Ytixo/network-chess",
    demo: null,
    images: [
      "assets/img/chess_1.png",
      "assets/img/chess_2.png"
    ]
  },
  {
    id: "facturation",
    title: "Logiciel de Facturation",
    subtitle: "Projet Métier — Boulangerie",
    category: "logiciel",
    categoryLabel: "Application Logicielle",
    badge: "Outil Métier Sur-Mesure",
    year: "2025",
    featured: false,
    summary: "Application logicielle sur mesure en Python pour gérer les commandes, les clients professionnels et générer des factures PDF.",
    description: "Développement d'un utilitaire de gestion commerciale et de facturation adapté aux besoins réels d'une boulangerie artisanale. L'application permet d'enregistrer les commandes quotidiennes, de suivre les encours clients et de générer instantanément des factures au format PDF. (Projet archivé à la suite de l'évolution réglementaire nationale relative à la généralisation de la facturation électronique obligatoire et l'obligation de transition vers des plateformes partenaires agréées PDP / Portail Public de Facturation).",
    features: [
      "Gestion centralisée des clients professionnels et de leur historique de facturation",
      "Saisie rapide et intuitive des commandes avec calcul automatique des totaux et TVA",
      "Moteur de génération automatique de factures PDF conformes aux exigences légales",
      "Stockage sécurisé des données et export de rapports"
    ],
    technicalChallenges: [
      "Conception d'une interface graphique simple et ergonomique pour les utilisateurs finaux",
      "Automatisation de la mise en page PDF dynamique avec alignement des montants",
      "Persistance fiable des données locales"
    ],
    tags: ["Python", "Interface Graphique (GUI)", "Génération PDF", "Gestion Données"],
    github: "https://github.com/Ytixo/facturation-boulangerie",
    demo: null,
    images: [
      "assets/img/facturation_1.png"
    ]
  }
];

const SKILLS_DATA = {
  languages: [
    { name: "Kotlin / Java", level: "Avancé", desc: "Compose Desktop (KMP), Coroutines, FFmpeg, Architecture desktop", icon: "fa-solid fa-code" },
    { name: "Python", level: "Avancé", desc: "FastAPI, sockets réseau, scripts, GUI, automatisation", icon: "fa-brands fa-python" },
    { name: "JavaScript / Node.js", level: "Intermédiaire", desc: "Express, API REST, DOM, ES6+, WebSockets", icon: "fa-brands fa-node-js" },
    { name: "Go (Golang)", level: "Intermédiaire", desc: "Simulation physique, typage statique, concurrence", icon: "fa-brands fa-golang" },
    { name: "SQL", level: "Avancé", desc: "PostgreSQL, MySQL, agrégations complexes, métriques temporelles", icon: "fa-solid fa-database" },
    { name: "HTML5 / CSS3", level: "Avancé", desc: "Flexbox, Grid, animations, responsive design", icon: "fa-brands fa-html5" }
  ],
  tools: [
    { name: "ComfyUI & IA Générative", desc: "Workflows Wan 2.2/2.7, SAM 2, API prompts, custom nodes", icon: "fa-solid fa-wand-magic-sparkles" },
    { name: "OpenAI API & LLM Agents", desc: "Function Calling, agents conversationnels, requêtage BDD", icon: "fa-solid fa-robot" },
    { name: "RunPod & GPU Cloud", desc: "Pods dédiés RTX 4090 / A100, Serverless, volumes réseau S3", icon: "fa-solid fa-cloud" },
    { name: "Git & GitHub", desc: "Gestion de version, branches, PR, CI/CD de base", icon: "fa-brands fa-github" },
    { name: "Linux / Bash", desc: "Administration système, scripts shell, environnement UNIX", icon: "fa-brands fa-linux" },
    { name: "Docker", desc: "Conteneurisation, environnements reproductibles, Portainer", icon: "fa-brands fa-docker" },
    { name: "VS Code & JetBrains", desc: "IntelliJ IDEA, PyCharm, extensions de productivité", icon: "fa-solid fa-laptop-code" },
    { name: "Figma & Design", desc: "Prototypage d'interfaces et maquettage UX", icon: "fa-brands fa-figma" }
  ],
  methodologies: [
    { title: "Génie Logiciel & Architecture Desktop", desc: "Kotlin Multiplatform (KMP), Compose Desktop, architecture réactive, séparation des couches" },
    { title: "Visualisation de Données & Dashboards", desc: "Composants graphiques Canvas sur-mesure (lissage, multi-séries, barres), contrôle d'accès RBAC" },
    { title: "Agents IA & LLM Function Calling", desc: "Interfaçage API OpenAI, tool calling en Node.js, requêtage dynamique PostgreSQL en langage naturel" },
    { title: "Pipelines IA & Traitement Vidéo", desc: "Rotoscopie vectorielle, propagation SAM 2, décodage FFmpeg seek (-ss), Wan VACE Replace" },
    { title: "Architecture Réseau & Client-Serveur", desc: "Modèle Client-Serveur, sockets TCP/IP, API REST, tunnels sécurisés" },
    { title: "Méthodologie Agile & Travail d'Équipe", desc: "Sprints, revues de code Git, répartition des tâches, intégration d'équipe" }
  ]
};

const TIMELINE_DATA = [
  {
    period: "2025 — 2027 (En cours)",
    title: "BUT Informatique — 2ème année",
    institution: "IUT de Nantes • Université de Nantes",
    subtitle: "Parcours PeiP D (Concours Geipi Polytech)",
    badge: "Études Supérieures",
    desc: "Formation universitaire d'excellence axée sur le génie logiciel, l'algorithmique, les bases de données relationnelles, l'administration système Linux et le travail en équipe par le biais de SAÉ (Situations d'Apprentissage et d'Évaluation).",
    skillsLearned: ["Algorithmique & Structures de données", "Génie Logiciel (POO)", "Bases de Données (SQL)", "Réseaux & Système Linux"]
  },
  {
    period: "2024 — 2025",
    title: "Baccalauréat STI2D (Spécialité SIN)",
    institution: "Lycée Val de Garonne • Marmande",
    subtitle: "Mention : Très Bien",
    badge: "Mention Très Bien",
    desc: "Spécialité Systèmes d'Information et Numérique. Apprentissage fondamental de l'électronique, des objets connectés, des réseaux informatiques et de la programmation appliquée aux systèmes techniques.",
    skillsLearned: ["Programmation embarquée", "Logique séquentielle & combinatoire", "Conception de projet technique"]
  }
];

const EXPERIENCES_DATA = [
  {
    period: "2026",
    role: "Stagiaire Développeur Logiciel & IA Générative",
    company: "Idia Tech (Nantes)",
    desc: "Conception et développement de la suite de post-production cinématographique Mocapia : interfaces Compose Multiplatform (Desktop), agent conversationnel OpenAI avec Function Calling PostgreSQL en Node.js, outils IA de rotoscopie et vidéo (Wan VACE 2.2, SAM 2, LipSync), extraction accélérée FFmpeg et backend GPU Cloud.",
    type: "Stage en Entreprise"
  },
  {
    period: "Depuis 2025",
    role: "Moniteur de CDI",
    company: "IUT de Nantes",
    desc: "Accueil et orientation des étudiants, gestion et mise à disposition des ressources, utilisation du logiciel documentaire professionnel Folio, respect des consignes et autonomie.",
    type: "Emploi Étudiant"
  },
  {
    period: "Depuis 2022",
    role: "Aide Polyvalente & Support Informatique",
    company: "Le Fournil du Bousquet (Targon)",
    desc: "Création du site internet vitrine et d'un outil de facturation sur-mesure en Python. Soutien logistique, gestion des stocks et de la relation client.",
    type: "Mission Pro & Terrain"
  },
  {
    period: "2022",
    role: "Stage d'Immersion Informatique",
    company: "SkillTech (Marmande)",
    desc: "Immersion d'une semaine dans la maintenance informatique, diagnostic matériel, réinstallation de systèmes d'exploitation et assistance aux utilisateurs.",
    type: "Stage Découverte"
  }
];
