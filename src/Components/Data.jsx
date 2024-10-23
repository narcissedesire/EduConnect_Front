import {
  FaGraduationCap,
  FaChartLine,
  FaCertificate,
  FaChalkboardTeacher,
  FaMobileAlt,
} from "react-icons/fa";

export const LienNav = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À Propos" },
  { href: "/contact", label: "Contact" },
  { href: "/cours", label: "Cours" },
];

export const fonctionnalites = [
  {
    titre: "Accès Illimité aux Cours",
    description:
      "Accédez à une bibliothèque variée de cours, à tout moment et où que vous soyez.",
    icone: (
      <span className="text-4xl text-primary">
        <FaGraduationCap />
      </span>
    ),
  },
  {
    titre: "Suivi de la Progression",
    description:
      "Suivez votre avancement avec des statistiques détaillées et des tableaux de bord personnalisés.",
    icone: (
      <span className="text-4xl text-primary">
        <FaChartLine />
      </span>
    ),
  },
  {
    titre: "Certification à la Fin des Cours",
    description:
      "Recevez une certification reconnue après avoir complété vos cours avec succès.",
    icone: (
      <span className="text-4xl text-primary">
        <FaCertificate />
      </span>
    ),
  },
  {
    titre: "Enseignants Qualifiés",
    description:
      "Apprenez avec des experts passionnés et engagés dans votre réussite.",
    icone: (
      <span className="text-4xl text-primary">
        <FaChalkboardTeacher />
      </span>
    ),
  },
  {
    titre: "Accès Mobile et Tablette",
    description:
      "Profitez d'une expérience d'apprentissage fluide sur tous vos appareils.",
    icone: (
      <span className="text-4xl text-primary">
        <FaMobileAlt />
      </span>
    ),
  },
];

export const enseignants = [
  {
    nom: "Alice Randriamalala",
    specialite: "Développement Web",
    bio: "Passionnée par la création d'applications modernes et performantes.",
    image: "/images/fond_hero.jpg",
    socials: {
      linkedin: "#",
      twitter: "#",
      facebook: "#",
    },
  },
  {
    nom: "Jean Rakotonirina",
    specialite: "Science des données",
    bio: "Expert en intelligence artificielle et modélisation statistique.",
    image: "/images/fond_hero.jpg",
    socials: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
    },
  },
  {
    nom: "Marie Rasoamanana",
    specialite: "UX/UI Design",
    bio: "Fait de chaque interface utilisateur une expérience unique et agréable.",
    image: "/images/fond_hero.jpg",
    socials: {
      linkedin: "#",
      instagram: "#",
      facebook: "#",
    },
  },
];

export const temoignages = [
  {
    nom: "Sarah Andrianarisoa",
    texte:
      "Cette plateforme m'a permis d’apprendre à mon rythme avec des cours de qualité. Je recommande vivement !",
    avatar: "/images/fond_hero.jpg",
    note: 5,
  },
  {
    nom: "Patrick Rakoto",
    texte:
      "Grâce à des enseignants passionnés et une interface intuitive, j’ai pu développer mes compétences rapidement.",
    avatar: "/images/fond_hero.jpg",
    note: 4,
  },
  {
    nom: "Nathalie Raharison",
    texte:
      "Les statistiques de progression m'ont motivée à continuer et atteindre mes objectifs. Excellente plateforme !",
    avatar: "/images/fond_hero.jpg",
    note: 5,
  },
  {
    nom: "Hery Andriamisa",
    texte:
      "Super expérience avec des cours interactifs et un excellent suivi des performances.",
    avatar: "/images/fond_hero.jpg",
    note: 4,
  },
  {
    nom: "Aina Rakoto",
    texte:
      "J’ai adoré l'expérience, surtout la flexibilité offerte par les cours en ligne.",
    avatar: "/images/fond_hero.jpg",
    note: 5,
  },
];

// A propos
export const AvantageData = [
  {
    id: 1,
    icon: "🌐",
    titre: "Accessibilité 24/7",
    description:
      "Étudiez quand vous le souhaitez, sans contraintes de temps ou de lieu.",
  },
  {
    id: 2,
    icon: "🤝",
    titre: "Communauté Collaborative",
    description:
      "Participez à des discussions et partagez vos idées avec des pairs.",
  },
  {
    id: 3,
    icon: "⏱️",
    titre: "Optimisation du Temps",
    description:
      "Profitez de l’automatisation des tâches courantes pour vous concentrer sur l’essentiel.",
  },
  {
    id: 4,
    icon: "📈",
    titre: "Évolution Continue",
    description: "Suivez vos performances avec des rapports détaillés.",
  },
  {
    id: 5,
    icon: "🔒",
    titre: "Sécurité et Fiabilité",
    description:
      " Bénéficiez d'une protection des données à la pointe de la technologie.",
  },
];

export const FonctionnaliteData = [
  {
    id: 1,
    titre: "📚 Gestion complète des cours",
    description:
      "Organisez vos leçons et modules avec des ressources accessibles à tout moment.",
  },
  {
    id: 2,
    titre: "👥 Gestion des utilisateurs",
    description:
      "Créez des rôles personnalisés et gérez facilement les inscriptions et les profils.",
  },
  {
    id: 3,
    titre: "📊 Suivi des performances",
    description:
      "Consultez les statistiques détaillées sur la progression et la participation.",
  },
  {
    id: 4,
    titre: "📝 Évaluations en ligne",
    description:
      "Créez des tests interactifs et fournissez un feedback instantané ou personnalisé.",
  },
  {
    id: 5,
    titre: "💬 Communication intégrée",
    description:
      "Utilisez notre messagerie interne et recevez des notifications instantanées.",
  },
  {
    id: 6,
    titre: "🔒 Sécurité et confidentialité",
    description:
      "Assurez-vous que toutes les données sont protégées et conformes aux normes.",
  },
];

export const SecuriteData = [
  {
    id: 1,
    icon: "🔒",
    titre: "Chiffrement End-to-End",
    description:
      "Toutes les communications sont protégées par un chiffrement avancé pour garantir la confidentialité.",
  },
  {
    id: 2,
    icon: "🔑",
    titre: "Authentification Multi-facteurs",
    description:
      "Une couche supplémentaire de sécurité protège chaque compte via la vérification par SMS ou e-mail.",
  },
  {
    id: 3,
    icon: "💾",
    titre: "Sauvegardes Automatiques",
    description:
      "Nos systèmes sauvegardent vos données quotidiennement afin de prévenir toute perte accidentelle.",
  },
  {
    id: 4,
    icon: "📜",
    titre: "Conformité RGPD et ISO",
    description:
      "Nous respectons les normes internationales de protection des données pour garantir votre tranquillité.",
  },
];

export const lessonsData = [
  {
    id: 1,
    title: "Introduction à React",
    level: "Débutant",
    duration: "5 heures",
    free: true,
    certification: true,
    description:
      "Apprenez les bases de React, une bibliothèque JavaScript pour construire des interfaces utilisateur.",
    modules: [
      {
        title: "Module 1: Introduction",
        description: "Introduction à React et ses fonctionnalités.",
      },
      {
        title: "Module 2: Composants",
        description: "Comprendre les composants et leur utilisation.",
      },
      {
        title: "Module 3: État et Propriétés",
        description: "Gérer l'état et les propriétés dans les composants.",
      },
      {
        title: "Module 4: Cycle de vie",
        description: "Comprendre le cycle de vie des composants.",
      },
    ],
    completedModules: 2,
    reviews: [
      {
        userImage: "/images/user1.png",
        userName: "Alice Dupont",
        rating: 4,
        comment: "Un excellent cours pour débuter avec React !",
        date: "2024-10-15",
      },
      {
        userImage: "/images/user2.png",
        userName: "Jean Martin",
        rating: 5,
        comment: "Très bien expliqué, je recommande.",
        date: "2024-10-16",
      },
    ],
    pdfFiles: ["/pdfs/intro_react.pdf", "/pdfs/composants_react.pdf"],
    videos: ["/videos/react_intro.mp4", "/videos/react_components.mp4"],
    instructor: "Prof. Marie Curie",
    studentsEnrolled: 50,
    comments: [
      {
        userImage: "/images/user1.png",
        userName: "Alice Dupont",
        comment: "C'est une excellente vidéo !",
        date: "2024-10-22",
        replies: [],
      },
    ],
  },
  // Ajoutez d'autres cours ici selon le même modèle que ci-dessus.
  // Exemple :
  {
    id: 2,
    title: "Flexbox CSS",
    level: "Débutant",
    duration: "3 heures",
    free: true,
    certification: false,
    description: "Maîtrisez le modèle de mise en page Flexbox.",
    modules: [
      {
        title: "Module 1: Introduction à Flexbox",
        description: "Comprendre les bases de Flexbox.",
      },
      {
        title: "Module 2: Propriétés Flexbox",
        description: "Explorer les différentes propriétés de Flexbox.",
      },
      {
        title: "Module 3: Mise en page avec Flexbox",
        description: "Créer des mises en page réactives avec Flexbox.",
      },
    ],
    completedModules: 1,
    reviews: [
      {
        userImage: "/images/user3.png",
        userName: "Lucie Bernard",
        rating: 4,
        comment: "Cours très clair et instructif.",
        date: "2024-10-17",
      },
      {
        userImage: "/images/user4.png",
        userName: "Marc Lefevre",
        rating: 5,
        comment: "Flexbox n'a plus de secret pour moi !",
        date: "2024-10-18",
      },
    ],
    pdfFiles: ["/pdfs/flexbox.pdf"],
    videos: ["/videos/flexbox.mp4"],
    instructor: "Prof. Sophie Martin",
    studentsEnrolled: 40,
    comments: [],
  },
  // Ajoutez d'autres cours ici...
];
