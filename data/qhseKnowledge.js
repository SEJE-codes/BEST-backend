module.exports = {

  BAT01: {

    operation:
      "Administration et circulation du personnel",

    product:
      "Électricité et matériels bureautiques",

    hazards: [

      {
        central_event:
          "Incendie électrique",

        possible_causes: [
          "Court-circuit",
          "Surcharge électrique",
          "Installation défectueuse",
        ],

        dangerous_phenomenon: [
          "Incendie",
          "Fumée",
        ],

        consequences: [
          "Brûlures",
          "Asphyxie",
          "Perte matérielle",
        ],

        risks: [
          "Danger humain",
          "Incendie bâtiment",
        ],
      },

      {
        central_event:
          "Chute du personnel",

        possible_causes: [
          "Obstacle",
          "Sol glissant",
        ],

        dangerous_phenomenon: [
          "Glissade",
        ],

        consequences: [
          "Fracture",
          "Blessure",
        ],

        risks: [
          "Accident de travail",
        ],
      },
    ],
  },

  
   BAT02: {
  operation:
    "Stationnement des véhicules",

  product:
    "Gasoil",

  hazards: [
    {
      central_event:
        "Fuite de carburant",

      possible_causes: [
        "Réservoir vétuste",
      ],

      dangerous_phenomenon: [
        "Déversement",
      ],

      consequences: [
        "Pollution du sol",
      ],

      risks: [
        "Pollution environnementale",
      ],
    },
  ],
},

  BAT03: {

    operation:
      "Circulation véhicules",

    product:
      "Carburant et véhicules",

    hazards: [

      {
        central_event:
          "Collision véhicule",

        possible_causes: [
          "Excès vitesse",
          "Erreur conducteur",
        ],

        dangerous_phenomenon: [
          "Collision",
        ],

        consequences: [
          "Blessure grave",
          "Décès",
        ],

        risks: [
          "Accident circulation",
        ],
      },
    ],
  },

  BAT04: {

    operation:
      "Préparation des repas",

    product:
      "Gaz et équipements cuisine",

    hazards: [

      {
        central_event:
          "Explosion gaz",

        possible_causes: [
          "Fuite gaz",
          "Absence contrôle",
        ],

        dangerous_phenomenon: [
          "Explosion",
          "Incendie",
        ],

        consequences: [
          "Brûlure",
          "Décès",
        ],

        risks: [
          "Explosion cuisine",
        ],
      },
    ],
  },

  MAC01: {

    operation:
      "Production vapeur",

    product:
      "Chaudière industrielle",

    hazards: [

      {
        central_event:
          "Explosion chaudière",

        possible_causes: [
          "Surpression",
          "Défaut maintenance",
        ],

        dangerous_phenomenon: [
          "Explosion",
          "Projection vapeur",
        ],

        consequences: [
          "Brûlure grave",
          "Décès",
        ],

        risks: [
          "Explosion industrielle",
        ],
      },
    ],
  },

  MAC02: {
  operation:
    "Production de la chaleur",

  product:
    "Chaudière",

  hazards: [
    {
      central_event:
        "Présence d’atmosphère explosive dans le corps de chauffe",

      possible_causes: [
        "Dysfonctionnement de l’analyse d’air dans la chambre de combustion",
        "Mauvaise manipulation de l’opérateur",
      ],

      dangerous_phenomenon: [
        "Explosion",
      ],

      consequences: [
        "Dégagement des fumées toxiques",
        "Blessures graves",
        "Mort des personnes",
        "Dégâts matériels importants",
      ],

      risks: [
        "Explosion industrielle",
      ],
    },
  ],
},

MAC03: {
  operation:
    "Production de la chaleur",

  product:
    "Chaudière",

  hazards: [
    {
      central_event:
        "Présence du gaz CO",

      possible_causes: [
        "Mauvais entretien de la chaudière et des conduits",
        "Mauvais réglage de la combustion",
      ],

      dangerous_phenomenon: [
        "Intoxication au CO",
      ],

      consequences: [
        "Maux de tête",
        "Nausées",
        "Vomissements",
        "Douleurs abdominales",
        "Confusion mentale",
        "Fatigue",
        "Vertiges",
        "Coma",
        "Mort",
      ],

      risks: [
        "Intoxication au monoxyde de carbone",
      ],
    },
  ],
},

MAC04: {
  operation:
    "Compression des fluides (air, CO2)",

  product:
    "Compresseurs (air, CO2)",

  hazards: [
    {
      central_event:
        "Auto-inflammation du mélange / Fuite de mélange",

      possible_causes: [
        "Rupture de canalisation",
        "Surchauffe des compresseurs",
      ],

      dangerous_phenomenon: [
        "Explosion",
      ],

      consequences: [
        "Projection de fragments",
        "Blessures",
        "Dégâts matériels",
      ],

      risks: [
        "Explosion des compresseurs",
      ],
    },
  ],
},

MAC05: {
  operation:
    "Compression des fluides (air, CO2)",

  product:
    "Compresseurs (air, CO2)",

  hazards: [
    {
      central_event:
        "Libération du fluide",

      possible_causes: [
        "Faible résistance du matériau",
        "Excès de pression",
      ],

      dangerous_phenomenon: [
        "Intoxication",
      ],

      consequences: [
        "Asphyxie",
        "Mort",
      ],

      risks: [
        "Intoxication par gaz",
      ],
    },
  ],
},

MAC06: {
  operation:
    "Compression des fluides (air, CO2)",

  product:
    "Réservoir d’air comprimé",

  hazards: [
    {
      central_event:
        "Dégradation du réservoir",

      possible_causes: [
        "Exposition à l’humidité",
      ],

      dangerous_phenomenon: [
        "Corrosion",
      ],

      consequences: [
        "Fuite du fluide",
        "Intoxication",
      ],

      risks: [
        "Corrosion des équipements",
      ],
    },
  ],
},

MAC07: {
  operation:
    "Compression des fluides (air, CO2)",

  product:
    "Réservoir d’air comprimé",

  hazards: [
    {
      central_event:
        "Rupture du réservoir d’air comprimé",

      possible_causes: [
        "Surpression d’air dans le réservoir",
        "Défaillance de l’équipement",
      ],

      dangerous_phenomenon: [
        "Explosion",
      ],

      consequences: [
        "Projection de fragments",
        "Blessures",
        "Dégâts matériels",
      ],

      risks: [
        "Explosion du réservoir",
      ],
    },
  ],
},

MAC08: {
  operation:
    "Stockage CO2",

  product:
    "CO2",

  hazards: [
    {
      central_event:
        "Perte de confinement",

      possible_causes: [
        "Réservoir inadapté",
        "Surpression",
        "Matériel vétuste",
      ],

      dangerous_phenomenon: [
        "Fuite de gaz",
      ],

      consequences: [
        "Intoxication",
        "Mort par asphyxie",
      ],

      risks: [
        "Fuite de CO2",
      ],
    },
  ],
},

MAC09: {
  operation:
    "Stockage CO2",

  product:
    "CO2",

  hazards: [
    {
      central_event:
        "Surpression",

      possible_causes: [
        "Dysfonctionnement",
        "Mauvais réglage",
      ],

      dangerous_phenomenon: [
        "Explosion",
      ],

      consequences: [
        "Projection des particules",
      ],

      risks: [
        "Explosion du stockage CO2",
      ],
    },
  ],
},

MAC10: {
  operation:
    "Fonctionnement des équipements",

  product:
    "Equipement industriel",

  hazards: [
    {
      central_event:
        "Augmentation de l’intensité sonore",

      possible_causes: [
        "Mise en marche des équipements",
        "Absence de maintenance des équipements",
      ],

      dangerous_phenomenon: [
        "Atteinte auditive",
      ],

      consequences: [
        "Stress",
        "Fatigue",
        "Surdité",
      ],

      risks: [
        "Pollution sonore",
      ],
    },
  ],
},

MAC11: {
  operation:
    "Production du froid",

  product:
    "Groupe frigorifique",

  hazards: [
    {
      central_event:
        "Fuite de fluide frigorigène (NH3)",

      possible_causes: [
        "Usure",
        "Erreur humaine lors des opérations d’entretien",
        "Mauvais entretien",
      ],

      dangerous_phenomenon: [
        "Intoxication",
      ],

      consequences: [
        "Vertige",
        "Asphyxie",
        "Mort",
      ],

      risks: [
        "Fuite d’ammoniac",
      ],
    },
  ],
},

  // =====================================================
  // ELT01
  // =====================================================

  ELT01: {
  operation:
    "Distribution de l’énergie",

  product:
    "Energie électrique",

  hazards: [
    {
      central_event:
        "Contact direct avec une pièce nue sous tension ou contact indirect avec une pièce mise accidentellement sous tension",

      possible_causes: [
        "Lors d’une intervention",
        "Inattention",
      ],

      dangerous_phenomenon: [
        "Electrisation",
        "Electrocution",
      ],

      consequences: [
        "Brûlure interne",
        "Brûlure externe",
        "Mort",
      ],

      risks: [
        "Accident électrique",
      ],
    },
  ],
},

ELT02: {
  operation:
    "Distribution de l’énergie",

  product:
    "Energie électrique",

  hazards: [
    {
      central_event:
        "Court-circuit",

      possible_causes: [
        "Câble vétuste",
        "Mauvaise fixation",
        "Foudre",
        "Surtension",
      ],

      dangerous_phenomenon: [
        "Incendie",
      ],

      consequences: [
        "Dégâts matériels",
        "Dégâts humains",
      ],

      risks: [
        "Incendie électrique",
      ],
    },
  ],
},

ELT03: {
  operation:
    "Distribution d’énergie",

  product:
    "Energie électrique",

  hazards: [
    {
      central_event:
        "Arc électrique",

      possible_causes: [
        "Diminution de la qualité d’isolation entre deux récepteurs",
        "Court-circuit",
      ],

      dangerous_phenomenon: [
        "Incendie",
        "Explosion",
      ],

      consequences: [
        "Dégâts humains",
        "Dégâts matériels",
        "Brûlure",
        "Projection",
      ],

      risks: [
        "Explosion électrique",
      ],
    },
  ],
},

ELT04: {
  operation:
    "Distribution d’énergie",

  product:
    "Energie électrique",

  hazards: [
    {
      central_event:
        "Surchauffe d’origine électrique",

      possible_causes: [
        "Défaut d’isolement",
        "Connexion mal serrée",
      ],

      dangerous_phenomenon: [
        "Explosion",
      ],

      consequences: [
        "Blessures graves",
        "Dégâts matériels",
      ],

      risks: [
        "Explosion électrique",
      ],
    },
  ],
},

ELT05: {
  operation:
    "Production d’énergie électrique",

  product:
    "Groupe électrogène",

  hazards: [
    {
      central_event:
        "Ignition",

      possible_causes: [
        "Surchauffement du moteur",
        "Formation d’un arc électrique",
        "Court-circuit",
      ],

      dangerous_phenomenon: [
        "Incendie",
      ],

      consequences: [
        "Dégâts matériels",
        "Pollution environnementale",
      ],

      risks: [
        "Incendie industriel",
      ],
    },
  ],
},

ELT06: {
  operation:
    "Production d’énergie électrique",

  product:
    "Groupe électrogène",

  hazards: [
    {
      central_event:
        "Rejet gazeux",

      possible_causes: [
        "Fonctionnement du groupe",
      ],

      dangerous_phenomenon: [
        "Pollution atmosphérique",
        "Asphyxie",
      ],

      consequences: [
        "Réchauffement climatique",
      ],

      risks: [
        "Pollution atmosphérique",
      ],
    },
  ],
},

ELT07: {
  operation:
    "Production d’énergie électrique",

  product:
    "Groupe électrogène",

  hazards: [
    {
      central_event:
        "Augmentation de l’intensité sonore",

      possible_causes: [
        "Fonctionnement du groupe",
      ],

      dangerous_phenomenon: [
        "Pollution sonore",
      ],

      consequences: [
        "Trouble auditif",
      ],

      risks: [
        "Nuisance sonore",
      ],
    },
  ],
},

STE01: {
  operation:
    "Contrôle/intervention",

  product:
    "Bâches d’eau",

  hazards: [
    {
      central_event:
        "Perte d’équilibre",

      possible_causes: [
        "Etat du personnel (ivre, malade)",
        "Matériel vétuste",
      ],

      dangerous_phenomenon: [
        "Chute de hauteur",
      ],

      consequences: [
        "Noyade",
        "Mort",
      ],

      risks: [
        "Chute en bassin",
      ],
    },
  ],
},

STE02: {
  operation:
    "Contrôle/intervention",

  product:
    "Voies de circulation",

  hazards: [
    {
      central_event:
        "Présence d’obstacle sur les voies de circulation",

      possible_causes: [
        "Chemin encombré",
        "Câble qui traine",
      ],

      dangerous_phenomenon: [
        "Chute de plein pied",
      ],

      consequences: [
        "Blessure",
        "Fracture",
      ],

      risks: [
        "Accident de circulation piétonne",
      ],
    },
  ],
},

STE03: {
  operation:
    "Stockage des réserves en eau",

  product:
    "Réserves en eau",

  hazards: [
    {
      central_event:
        "Perte de confinement",

      possible_causes: [
        "Equipement vétuste",
        "Choc physique",
      ],

      dangerous_phenomenon: [
        "Fuite d’eau",
      ],

      consequences: [
        "Inondation du site",
        "Destruction du matériel électrique",
      ],

      risks: [
        "Inondation industrielle",
      ],
    },
  ],
},

STE04: {
  operation:
    "Intervention",

  product:
    "Milieu confiné",

  hazards: [
    {
      central_event:
        "Absence d’air",

      possible_causes: [
        "Milieu confiné",
      ],

      dangerous_phenomenon: [
        "Asphyxie",
      ],

      consequences: [
        "Etouffement",
        "Mort",
      ],

      risks: [
        "Asphyxie en espace confiné",
      ],
    },
  ],
},

MAG01: {
  operation:
    "Réception",

  product:
    "Consommables et matières premières, produits finis",

  hazards: [
    {
      central_event:
        "Perte de stabilité",

      possible_causes: [
        "Mauvais enfourchement",
      ],

      dangerous_phenomenon: [
        "Renversement",
        "Effondrement",
      ],

      consequences: [
        "Blessure",
        "Brûlure corporelle",
        "Intoxication",
        "Perte du produit",
      ],

      risks: [
        "Accident de manutention",
      ],
    },
  ],
},

MAG02: {
  operation:
    "Stockage",

  product:
    "Matières combustibles",

  hazards: [
    {
      central_event:
        "Ignition",

      possible_causes: [
        "Court-circuit",
        "Mégot de cigarette",
      ],

      dangerous_phenomenon: [
        "Incendie",
      ],

      consequences: [
        "Pollution de l’air",
        "Dégâts matériels importants",
        "Perte en vie humaine",
      ],

      risks: [
        "Incendie industriel",
      ],
    },
  ],
},

MAG03: {
  operation:
    "Stockage",

  product:
    "Pièces de rechange et autres équipements",

  hazards: [
    {
      central_event:
        "Perte de stabilité",

      possible_causes: [
        "Mauvais empilement",
        "Stockage prolongé",
        "Absence d’étagères",
      ],

      dangerous_phenomenon: [
        "Effondrement des palettes",
      ],

      consequences: [
        "Blessures",
        "Déversement des produits",
        "Intoxication",
      ],

      risks: [
        "Effondrement de stockage",
      ],
    },
  ],
},

MAG04: {
  operation:
    "Stockage",

  product:
    "Hydrocarbures (fuel, gasoil, butane)",

  hazards: [
    {
      central_event:
        "Perte de confinement",

      possible_causes: [
        "Choc mécanique",
        "Matériel vétuste",
      ],

      dangerous_phenomenon: [
        "Ecoulement du produit",
        "Fuite du produit",
      ],

      consequences: [
        "Pollution du sol",
        "Intoxication",
      ],

      risks: [
        "Pollution par hydrocarbures",
      ],
    },
  ],
},

MAG05: {
  operation:
    "Déplacement du personnel",

  product:
    "Personnes",

  hazards: [
    {
      central_event:
        "Présence d’objet sur les voies de circulation",

      possible_causes: [
        "Inattention de l’opérateur",
        "Passage piéton encombré",
        "Objets qui trainent",
        "Sol dénivelé",
      ],

      dangerous_phenomenon: [
        "Chute de plein pied",
      ],

      consequences: [
        "Blessure",
        "Fracture",
        "Entorse",
      ],

      risks: [
        "Accident piéton",
      ],
    },
  ],
},

MAG06: {
  operation:
    "Stockage",

  product:
    "Fuel, gasoil, butane",

  hazards: [
    {
      central_event:
        "Perte d’étanchéité",

      possible_causes: [
        "Réservoir vétuste",
      ],

      dangerous_phenomenon: [
        "Déversement d’hydrocarbure",
        "Fuite d’hydrocarbure",
      ],

      consequences: [
        "Pollution de l’environnement",
      ],

      risks: [
        "Pollution environnementale",
      ],
    },
  ],
},

MAG07: {
  operation:
    "Dépotage",

  product:
    "Fuel, gasoil",

  hazards: [
    {
      central_event:
        "Débordement",

      possible_causes: [
        "Mauvaise fixation du flexible",
        "Suremplissage",
        "Organes de sécurité dysfonctionnants ou absents",
      ],

      dangerous_phenomenon: [
        "Déversement",
      ],

      consequences: [
        "Pollution",
        "Incendie",
      ],

      risks: [
        "Déversement d’hydrocarbures",
      ],
    },
  ],
},

MAG08: {
  operation:
    "Dépotage",

  product:
    "Fuel, gasoil",

  hazards: [
    {
      central_event:
        "Organes de sécurité dysfonctionnants ou absents",

      possible_causes: [
        "Dysfonctionnement",
        "Absence des organes d’indication et de contrôle du niveau",
        "Erreur de lecture sur la jauge de niveau",
      ],

      dangerous_phenomenon: [
        "Sur-remplissage de la citerne",
      ],

      consequences: [
        "Pollution du sol",
        "Pollution de l’eau",
      ],

      risks: [
        "Débordement de citerne",
      ],
    },
  ],
},

MAG09: {
  operation:
    "Dépotage",

  product:
    "Hydrocarbures",

  hazards: [
    {
      central_event:
        "Point chaud",

      possible_causes: [
        "Présence d’une source d’énergie",
        "Mégot de cigarette",
        "Incendie voisin",
      ],

      dangerous_phenomenon: [
        "Incendie",
        "Explosion",
      ],

      consequences: [
        "Dégâts matériels",
        "Dégâts humains",
        "Pollution de l’environnement",
      ],

      risks: [
        "Explosion industrielle",
      ],
    },
  ],
},

MAG10: {
  operation:
    "Rétention en cas de fuite",

  product:
    "Bac de rétention",

  hazards: [
    {
      central_event:
        "Départ de feu dans le bac de rétention",

      possible_causes: [
        "Explosion de la cuve à gasoil",
      ],

      dangerous_phenomenon: [
        "Incendie",
      ],

      consequences: [
        "Explosion",
        "Dégâts matériels",
      ],

      risks: [
        "Explosion de cuve",
      ],
    },
  ],
},

MAG11: {
  operation:
    "Alimentation des équipements",

  product:
    "Gaz",

  hazards: [
    {
      central_event:
        "Fuite",

      possible_causes: [
        "Cuve ou canalisation vétuste",
        "Défaillance matérielle",
        "Mauvaise fixation des flexibles lors du dépotage",
      ],

      dangerous_phenomenon: [
        "Intoxication",
      ],

      consequences: [
        "Incendie en présence d’une source de chaleur",
        "Asphyxie",
        "Pollution de l’air",
      ],

      risks: [
        "Fuite de gaz",
      ],
    },
  ],
},

MAG12: {
  operation:
    "Alimentation des équipements",

  product:
    "Gaz",

  hazards: [
    {
      central_event:
        "Surpression",

      possible_causes: [
        "Présence d’un point chaud",
      ],

      dangerous_phenomenon: [
        "Explosion",
        "Incendie",
      ],

      consequences: [
        "Projection",
        "Incendie",
      ],

      risks: [
        "Explosion de gaz",
      ],
    },
  ],
},

MAG13: {
  operation:
    "Régulation de la pression",

  product:
    "Gaz",

  hazards: [
    {
      central_event:
        "Dysfonctionnement de la soupape",

      possible_causes: [
        "Mauvais réglage du jeu de la soupape",
        "La bague de siège de soupape et le guide soupape n’ont pas été centrés",
      ],

      dangerous_phenomenon: [
        "Explosion",
        "Fuite de gaz",
      ],

      consequences: [
        "Projection",
        "Incendie",
      ],

      risks: [
        "Explosion de gaz",
      ],
    },
  ],
},

MAG14: {
  operation:
    "Stockage",

  product:
    "Bouteilles / Casiers",

  hazards: [
    {
      central_event:
        "Perte de stabilité",

      possible_causes: [
        "Mauvais empilement",
        "Stockage prolongé",
        "Absence d’étagères",
        "Inattention de l’opérateur de tri",
      ],

      dangerous_phenomenon: [
        "Renversement des bouteilles",
        "Casse des bouteilles",
      ],

      consequences: [
        "Blessure",
        "Ecrasement partiel",
      ],

      risks: [
        "Accident de stockage",
      ],
    },
  ],
},

MAG15: {
  operation:
    "Stockage",

  product:
    "Extraits / arômes",

  hazards: [
    {
      central_event:
        "Perte d’étanchéité",

      possible_causes: [
        "Contenant vétuste",
        "Choc mécanique",
        "Stockage prolongé",
      ],

      dangerous_phenomenon: [
        "Déversement du produit",
      ],

      consequences: [
        "Perte matérielle",
      ],

      risks: [
        "Déversement de produit",
      ],
    },
  ],
},

MAG16: {
  operation:
    "Stockage",

  product:
    "Basse température",

  hazards: [
    {
      central_event:
        "Exposition",

      possible_causes: [
        "Basse température",
      ],

      dangerous_phenomenon: [
        "Hypothermie",
      ],

      consequences: [
        "Frissons",
        "Fatigue",
        "Confusion",
        "Perte de connaissance",
      ],

      risks: [
        "Hypothermie",
      ],
    },
  ],
},

ZMT01: {
  operation:
    "Usinage et chaudronnerie",

  product:
    "Perceuse, tours, nacelle, scie mécanique, presse",

  hazards: [
    {
      central_event:
        "Contact d’une partie du corps avec un objet en mouvement",

      possible_causes: [
        "Inattention de l’opérateur",
        "Mauvaise manipulation",
        "Dérèglement de la machine",
      ],

      dangerous_phenomenon: [
        "Coupure",
        "Ecrasement",
      ],

      consequences: [
        "Blessure grave",
        "Contusion",
      ],

      risks: [
        "Accident mécanique",
      ],
    },
  ],
},

ZMT02: {
  operation:
    "Usinage et chaudronnerie",

  product:
    "Energie électrique",

  hazards: [
    {
      central_event:
        "Contact avec un câble sous tension",

      possible_causes: [
        "Câble vétuste",
        "Intervention sans EPI",
      ],

      dangerous_phenomenon: [
        "Electrocution",
        "Electrisation",
      ],

      consequences: [
        "Blessure interne",
        "Blessure externe",
        "Mort",
      ],

      risks: [
        "Accident électrique",
      ],
    },
  ],
},

ZMT03: {
  operation:
    "Usinage",

  product:
    "Perceuse, tour, scie",

  hazards: [
    {
      central_event:
        "Corps étranger dans l’œil",

      possible_causes: [
        "Absence d’EPI",
        "Non-respect des consignes de sécurité",
      ],

      dangerous_phenomenon: [
        "Projection",
      ],

      consequences: [
        "Atteinte visuelle",
        "Blessure au niveau de la cornée",
      ],

      risks: [
        "Blessure oculaire",
      ],
    },
  ],
},

ZMT04: {
  operation:
    "Chaudronnerie",

  product:
    "Flamme",

  hazards: [
    {
      central_event:
        "Reflet des rayonnements",

      possible_causes: [
        "Emission des rayonnements lors du soudage",
      ],

      dangerous_phenomenon: [
        "Atteinte visuelle",
      ],

      consequences: [
        "Réduction de la capacité visuelle",
      ],

      risks: [
        "Rayonnement de soudage",
      ],
    },
  ],
},

ZMT05: {
  operation:
    "Déplacement du personnel",

  product:
    "Escalier",

  hazards: [
    {
      central_event:
        "Confusion de marche",

      possible_causes: [
        "Inattention",
        "Faible visibilité",
      ],

      dangerous_phenomenon: [
        "Chute",
      ],

      consequences: [
        "Fracture",
        "Blessure",
      ],

      risks: [
        "Chute dans escalier",
      ],
    },
  ],
},

ZMT06: {
  operation:
    "Soudure",

  product:
    "Gaz",

  hazards: [
    {
      central_event:
        "Fuite",

      possible_causes: [
        "Mauvaise manutention",
        "Mauvaise fixation des flexibles",
      ],

      dangerous_phenomenon: [
        "Intoxication",
        "Incendie",
      ],

      consequences: [
        "Asphyxie",
        "Mort",
        "Dégâts matériels",
      ],

      risks: [
        "Fuite de gaz",
      ],
    },
  ],
},

ZMT07: {
  operation:
    "Graissage",

  product:
    "Equipements",

  hazards: [
    {
      central_event:
        "Présence de fluide au sol",

      possible_causes: [
        "Déversement accidentel",
        "Travaux de maintenance",
      ],

      dangerous_phenomenon: [
        "Glissade",
      ],

      consequences: [
        "Blessure",
        "Fracture",
        "Entorse",
      ],

      risks: [
        "Glissade industrielle",
      ],
    },
  ],
},

ZMT08: {
  operation:
    "Déplacement du personnel",

  product:
    "Voies de circulation",

  hazards: [
    {
      central_event:
        "Présence d’obstacle sur le passage",

      possible_causes: [
        "Câble qui traine",
        "Passage encombré par des objets",
      ],

      dangerous_phenomenon: [
        "Chute de plein pied",
      ],

      consequences: [
        "Entorse",
        "Blessure",
      ],

      risks: [
        "Accident piéton",
      ],
    },
  ],
},

CON01: {
  operation:
    "Transport de bouteilles / Boîtes",

  product:
    "Convoyeur",

  hazards: [
    {
      central_event:
        "Partie du corps ou vêtement entraînée",

      possible_causes: [
        "Intervention sur un convoyeur",
        "Présence d’objet qui traine (vêtement, cheveux)",
      ],

      dangerous_phenomenon: [
        "Happement",
        "Coincement",
        "Enroulement",
      ],

      consequences: [
        "Blessure",
        "Fracture",
      ],

      risks: [
        "Accident mécanique",
      ],
    },
  ],
},

CON02: {
  operation:
    "Réservoir de gaz CO2 et conduit",

  product:
    "CO2",

  hazards: [
    {
      central_event:
        "Eclatement du réservoir",

      possible_causes: [
        "Mauvaise utilisation",
        "Mauvaise conception",
        "Augmentation de la pression",
      ],

      dangerous_phenomenon: [
        "Projection",
      ],

      consequences: [
        "Intoxication",
        "Mort par asphyxie",
      ],

      risks: [
        "Explosion de réservoir",
      ],
    },
  ],
},

CON03: {
  operation:
    "Réservoir de gaz CO2 et conduit",

  product:
    "CO2",

  hazards: [
    {
      central_event:
        "Fuite de CO2",

      possible_causes: [
        "Usure de la bâche",
        "Mauvaise utilisation",
        "Mauvaise conception",
      ],

      dangerous_phenomenon: [
        "Intoxication",
      ],

      consequences: [
        "Etouffement",
        "Mort par asphyxie",
      ],

      risks: [
        "Fuite de gaz",
      ],
    },
  ],
},

CON04: {
  operation:
    "Mise en palette des bouteilles",

  product:
    "Palettiseur / dépalettiseur",

  hazards: [
    {
      central_event:
        "Perte de stabilité",

      possible_causes: [
        "Equipement défectueux",
        "Dysfonctionnement",
      ],

      dangerous_phenomenon: [
        "Chute de palette",
      ],

      consequences: [
        "Blessure",
        "Perte de produit",
      ],

      risks: [
        "Accident de manutention",
      ],
    },
  ],
},

  CMT01: {
    operation: "Dépotage",

    product: "Bière",

    hazards: [
      {
        central_event: "Perte de confinement",

        possible_causes: [
          "Erreur de manipulation",
          "Canalisation défectueuse",
        ],

        dangerous_phenomenon: [
          "Déversement de la bière",
        ],

        consequences: [
          "Perte de la matière",
          "Pollution environnementale",
        ],

        risks: [
          "Pollution industrielle",
        ],
      },
    ],
  },

  CMT02: {
    operation:
      "Déplacement dans le site",

    product: "Personne",

    hazards: [
      {
        central_event:
          "Collision entre véhicule et homme",

        possible_causes: [
          "Voie de circulation encombrée",
          "Mauvais état du véhicule",
          "Mauvais état du sol",
          "Défaillance du conducteur",
          "Inattention des personnes à proximité",
        ],

        dangerous_phenomenon: [
          "Accident de circulation",
        ],

        consequences: [
          "Blessure",
          "Fracture",
          "Mort",
        ],

        risks: [
          "Accident de circulation",
        ],
      },
    ],
  },

  CMT03: {
    operation:
      "Chargement et déchargement",

    product:
      "Matières premières et consommables divers",

    hazards: [
      {
        central_event:
          "Perte de stabilité",

        possible_causes: [
          "Mauvais enfourchage",
          "Non-respect des procédures",
        ],

        dangerous_phenomenon: [
          "Renversement accidentel",
        ],

        consequences: [
          "Pollution",
          "Perte de la matière",
          "Blessure",
          "Mort",
        ],

        risks: [
          "Accident de manutention",
        ],
      },
    ],
  },

  CMT04: {
    operation:
      "Livraison des bouteilles à gaz",

    product: "Gaz",

    hazards: [
      {
        central_event: "Fuite de gaz",

        possible_causes: [
          "Choc",
          "Mauvaise manipulation",
        ],

        dangerous_phenomenon: [
          "Intoxication",
          "Explosion",
        ],

        consequences: [
          "Effet thermique",
          "Dégâts humains et matériels",
        ],

        risks: [
          "Explosion industrielle",
        ],
      },
    ],
  },

  CAN01: {
    operation:
      "Transfert de fluide",

    product: "Eau chaude",

    hazards: [
      {
        central_event:
          "Eclatement des conduites",

        possible_causes: [
          "Conduite vétuste",
          "Conduite inadaptée",
          "Choc mécanique",
        ],

        dangerous_phenomenon: [
          "Explosion mécanique avec projection de vapeur",
        ],

        consequences: [
          "Atteinte des personnes à proximité",
          "Perte de la matière",
        ],

        risks: [
          "Explosion mécanique",
        ],
      },
    ],
  },

  CAN02: {
    operation:
      "Transfert de fluide",

    product:
      "Liquide (Gasoil, fuel)",

    hazards: [
      {
        central_event:
          "Perte de confinement",

        possible_causes: [
          "Défaillance de canalisation",
        ],

        dangerous_phenomenon: [
          "Déversement",
        ],

        consequences: [
          "Pollution",
        ],

        risks: [
          "Pollution environnementale",
        ],
      },
    ],
  },

  CAN03: {
    operation:
      "Transfert de fluide",

    product: "Soude",

    hazards: [
      {
        central_event:
          "Perte de confinement",

        possible_causes: [
          "Canalisation défectueuse",
        ],

        dangerous_phenomenon: [
          "Déversement chimique",
        ],

        consequences: [
          "Pollution",
          "Brûlure",
        ],

        risks: [
          "Risque chimique",
        ],
      },
    ],
  },

  CAN04: {
    operation:
      "Transfert de fluide",

    product:
      "Gaz (Butane, CO2)",

    hazards: [
      {
        central_event:
          "Eclatement des conduites",

        possible_causes: [
          "Conduite vétuste",
          "Conduite inadaptée",
          "Forte pression",
          "Choc mécanique",
        ],

        dangerous_phenomenon: [
          "Explosion mécanique avec projection de gaz",
        ],

        consequences: [
          "Intoxication",
          "Incendie",
        ],

        risks: [
          "Explosion gaz",
        ],
      },
    ],
  },

  LAB01: {
    operation:
      "Manipulation de produits chimiques",

    product:
      "HCl, Acide orthophosphorique, Phénol",

    hazards: [
      {
        central_event:
          "Emanation des vapeurs",

        possible_causes: [
          "Produits volatils",
        ],

        dangerous_phenomenon: [
          "Inhalation",
        ],

        consequences: [
          "Intoxication chronique",
          "Intoxication aiguë",
        ],

        risks: [
          "Risque chimique",
        ],
      },
    ],
  },

  LAB02: {
    operation:
      "Stockage des produits chimiques",

    product:
      "Produits chimiques",

    hazards: [
      {
        central_event:
          "Formation d’une atmosphère explosive",

        possible_causes: [
          "Non-respect des règles de stockage",
          "Mélange incompatible",
        ],

        dangerous_phenomenon: [
          "Incendie",
          "Explosion",
        ],

        consequences: [
          "Perte humaine",
          "Perte matérielle",
        ],

        risks: [
          "Explosion chimique",
        ],
      },
    ],
  },

  LAB03: {
    operation:
      "Manipulation de produits chimiques",

    product:
      "Produits chimiques",

    hazards: [
      {
        central_event:
          "Contact produit-corps",

        possible_causes: [
          "Mauvaise manipulation",
        ],

        dangerous_phenomenon: [
          "Brûlure",
        ],

        consequences: [
          "Blessure",
        ],

        risks: [
          "Brûlure chimique",
        ],
      },
    ],
  },

  SIL01: {
    operation:
      "Déchargement de matière première",

    product: "Malt et maïs",

    hazards: [
      {
        central_event:
          "Présence de poussières",

        possible_causes: [
          "Déversement de la matière première",
        ],

        dangerous_phenomenon: [
          "Inhalation",
        ],

        consequences: [
          "Allergie",
          "Gêne respiratoire",
          "Maladie pulmonaire",
        ],

        risks: [
          "Risque respiratoire",
        ],
      },
    ],
  },

  SIL02: {
    operation:
      "Déchargement matière première",

    product: "Malt et maïs",

    hazards: [
      {
        central_event:
          "Présence d’un corps étranger",

        possible_causes: [
          "Absence de tri",
        ],

        dangerous_phenomenon: [
          "Incident appareil de manutention",
        ],

        consequences: [
          "Bourrage",
          "Incendie",
        ],

        risks: [
          "Incident industriel",
        ],
      },
    ],
  },

  SIL03: {
    operation: "Chargement",

    product: "Malt",

    hazards: [
      {
        central_event:
          "Présence de poussière",

        possible_causes: [
          "Mise en marche du processus",
        ],

        dangerous_phenomenon: [
          "Inhalation",
        ],

        consequences: [
          "Gêne respiratoire",
          "Allergie",
        ],

        risks: [
          "Risque respiratoire",
        ],
      },
    ],
  },

  SIL04: {
    operation:
      "Zone de désilage",

    product: "Maïs",

    hazards: [
      {
        central_event:
          "Présence de poussières",

        possible_causes: [
          "Manipulation du maïs",
        ],

        dangerous_phenomenon: [
          "Inhalation",
        ],

        consequences: [
          "Allergie",
          "Gêne respiratoire",
        ],

        risks: [
          "Risque respiratoire",
        ],
      },
    ],
  },

  SIL05: {
    operation:
      "Alimentation électrique",

    product:
      "Energie électrique",

    hazards: [
      {
        central_event:
          "Contact avec câble sous tension",

        possible_causes: [
          "Câble vétuste",
          "Câble mal fixé",
        ],

        dangerous_phenomenon: [
          "Electrisation",
          "Electrocution",
        ],

        consequences: [
          "Blessure interne",
          "Mort",
        ],

        risks: [
          "Risque électrique",
        ],
      },
    ],
  },

  SIL06: {
    operation:
      "Transport matière première",

    product: "Convoyeur",

    hazards: [
      {
        central_event:
          "Contact avec élément mobile",

        possible_causes: [
          "Intervention lors du nettoyage",
          "Déblocage",
          "Débourrage",
        ],

        dangerous_phenomenon: [
          "Lacération",
          "Happement",
        ],

        consequences: [
          "Blessure grave",
          "Handicap",
        ],

        risks: [
          "Accident mécanique",
        ],
      },
    ],
  },

  SIL07: {
    operation:
      "Fonctionnement équipements",

    product: "Equipements",

    hazards: [
      {
        central_event:
          "Augmentation intensité sonore",

        possible_causes: [
          "Mise en marche des équipements",
        ],

        dangerous_phenomenon: [
          "Nuisance sonore",
        ],

        consequences: [
          "Fatigue",
          "Stress",
          "Surdité",
        ],

        risks: [
          "Risque sonore",
        ],
      },
    ],
  },

  SIL08: {
    operation:
      "Intervention",

    product: "Personnel",

    hazards: [
      {
        central_event:
          "Absence de circulation d’air",

        possible_causes: [
          "Espace moins aéré",
        ],

        dangerous_phenomenon: [
          "Difficulté à respirer",
        ],

        consequences: [
          "Malaise",
        ],

        risks: [
          "Asphyxie",
        ],
      },
    ],
  },

  SIL09: {
    operation:
      "Déplacement en hauteur",

    product:
      "Echelle / escalier",

    hazards: [
      {
        central_event:
          "Perte d’équilibre",

        possible_causes: [
          "Echelle en mauvais état",
          "Etat du personnel",
        ],

        dangerous_phenomenon: [
          "Chute de hauteur",
        ],

        consequences: [
          "Blessure",
          "Fracture",
          "Mort",
        ],

        risks: [
          "Chute de hauteur",
        ],
      },
    ],
  },

  SIL10: {
    operation:
      "Alimentation des équipements en air",

    product:
      "Réservoir d’air",

    hazards: [
      {
        central_event:
          "Dégradation du réservoir",

        possible_causes: [
          "Exposition à l’humidité",
        ],

        dangerous_phenomenon: [
          "Corrosion",
        ],

        consequences: [
          "Fuite du fluide",
        ],

        risks: [
          "Défaillance équipement",
        ],
      },
    ],
  },

  SIL11: {
    operation:
      "Stockage air comprimé",

    product:
      "Réservoir d’air comprimé",

    hazards: [
      {
        central_event:
          "Rupture du réservoir",

        possible_causes: [
          "Surpression d’air",
          "Défaillance équipement",
        ],

        dangerous_phenomenon: [
          "Explosion",
        ],

        consequences: [
          "Projection de fragments",
          "Blessure",
          "Dégâts matériels",
        ],

        risks: [
          "Explosion mécanique",
        ],
      },
    ],
  },

  SIL12: {
    operation:
      "Nettoyage et maintenance",

    product:
      "Malt et gritz",

    hazards: [
      {
        central_event:
          "Formation d’un nuage de poussière",

        possible_causes: [
          "Présence d’un point chaud",
          "Auto-inflammation",
        ],

        dangerous_phenomenon: [
          "Explosion",
        ],

        consequences: [
          "Destruction du silo",
          "Projection des fragments",
          "Incendie",
        ],

        risks: [
          "Explosion poussière",
        ],
      },
    ],
  },

  SIL13: {
    operation:
      "Vidange et nettoyage des silos",

    product: "Silos",

    hazards: [
      {
        central_event:
          "Présence de matière à écoulement facile",

        possible_causes: [
          "Vidange complète silos",
          "Nettoyage interne",
        ],

        dangerous_phenomenon: [
          "Ensevelissement",
          "Engloutissement",
        ],

        consequences: [
          "Mort par asphyxie",
          "Etouffement",
        ],

        risks: [
          "Ensevelissement",
        ],
      },
    ],
  },

  SIL14: {
    operation:
      "Nettoyage silos",

    product: "Poussières",

    hazards: [
      {
        central_event:
          "Forte concentration de poussières",

        possible_causes: [
          "Vidange complète silos",
          "Nettoyage interne",
        ],

        dangerous_phenomenon: [
          "Etouffement",
        ],

        consequences: [
          "Mort par asphyxie",
          "Maladie pulmonaire",
        ],

        risks: [
          "Risque respiratoire",
        ],
      },
    ],
  },

  SIL15: {
    operation:
      "Fonctionnement vis",

    product: "Vis mécanique",

    hazards: [
      {
        central_event:
          "Contact avec vis en mouvement",

        possible_causes: [
          "Intervention",
        ],

        dangerous_phenomenon: [
          "Lacération",
          "Happement",
        ],

        consequences: [
          "Blessure",
          "Atteinte corporelle",
        ],

        risks: [
          "Accident mécanique",
        ],
      },
    ],
  },

  SIL16: {
    operation:
      "Travail en hauteur",

    product: "Personnel",

    hazards: [
      {
        central_event:
          "Perte d’équilibre",

        possible_causes: [
          "Travail en hauteur",
        ],

        dangerous_phenomenon: [
          "Chute de hauteur",
        ],

        consequences: [
          "Blessure grave",
          "Mort",
        ],

        risks: [
          "Chute de hauteur",
        ],
      },
    ],
  },

  SIL17: {
    operation:
      "Déplacement du personnel",

    product: "Personnel",

    hazards: [
      {
        central_event:
          "Présence d’obstacle",

        possible_causes: [
          "Inattention",
          "Sol glissant",
          "Câbles qui trainent",
          "Voie encombrée",
        ],

        dangerous_phenomenon: [
          "Chute de plein pied",
        ],

        consequences: [
          "Fracture",
          "Entorse",
          "Blessure",
        ],

        risks: [
          "Accident de circulation interne",
        ],
      },
    ],
  },

  SIL18: {
    operation:
      "Stockage de grain",

    product: "Silos",

    hazards: [
      {
        central_event:
          "Perte de stabilité",

        possible_causes: [
          "Silos vétustes",
          "Matériels non conformes",
        ],

        dangerous_phenomenon: [
          "Effondrement des silos",
        ],

        consequences: [
          "Ensevelissement",
          "Perte de la matière",
          "Dégâts matériels et humains",
        ],

        risks: [
          "Effondrement structurel",
        ],
      },
    ],
  },

  SIL19: {
    operation:
      "Point de distribution",

    product: "Gaz",

    hazards: [
      {
        central_event: "Surpression",

        possible_causes: [
          "Présence de point chaud",
        ],

        dangerous_phenomenon: [
          "Explosion",
        ],

        consequences: [
          "Projection des fragments",
          "Destruction des installations voisines",
        ],

        risks: [
          "Explosion gaz",
        ],
      },
    ],
  },

  TRA01: {
    operation:
      "Manutentions, réceptions, expéditions, chargements et déplacements des véhicules sur le site",

    product:
      "Matériels roulants",

    hazards: [
      {
        central_event:
          "Présence de personne ou d’autres véhicules sur la voie de circulation",

        possible_causes: [
          "Inattention",
          "Excès de vitesse",
        ],

        dangerous_phenomenon: [
          "Heurt de personne",
          "Collision entre véhicules",
        ],

        consequences: [
          "Blessure",
          "Dégâts matériels",
          "Incendie",
        ],

        risks: [
          "Accident de circulation",
        ],
      },
    ],
  },

  TRA02: {
    operation:
      "Mouvement de véhicules dans le site / Stationnement",

    product:
      "Véhicules roulants",

    hazards: [
      {
        central_event:
          "Fuite d’huile ou de carburant",

        possible_causes: [
          "Collision entre deux engins",
          "Matériel vétuste",
          "Absence de maintenance",
        ],

        dangerous_phenomenon: [
          "Incendie en présence d’une source de chaleur",
        ],

        consequences: [
          "Brûlure",
          "Dégâts matériels",
          "Pollution de l’air et du sol",
        ],

        risks: [
          "Incendie industriel",
          "Pollution environnementale",
        ],
      },
    ],
  },

  TRA03: {
    operation:
      "Circulation et stationnement des véhicules",

    product:
      "Carburant",

    hazards: [
      {
        central_event:
          "Déversement du carburant",

        possible_causes: [
          "Fuite du système de carburant",
          "Erreur de manipulation",
        ],

        dangerous_phenomenon: [
          "Déversement d’hydrocarbure",
        ],

        consequences: [
          "Pollution",
          "Incendie au contact d’une source d’énergie",
        ],

        risks: [
          "Pollution environnementale",
          "Incendie",
        ],
      },
    ],
  },

  TRA04: {
    operation:
      "Déplacement des matériels roulants",

    product:
      "Camions, pick-up",

    hazards: [
      {
        central_event:
          "Perte de stabilité",

        possible_causes: [
          "Absence de maintenance",
          "Etat du sol dégradé",
          "Sol glissant",
          "Instabilité du sol",
          "Présence de trou",
          "Pente et dénivelé",
          "Défaut de résistance du sol",
        ],

        dangerous_phenomenon: [
          "Heurt",
        ],

        consequences: [
          "Blessure",
          "Destruction du bâti",
          "Perte de la matière",
          "Pollution",
          "Incendie",
        ],

        risks: [
          "Accident de circulation",
          "Renversement de véhicule",
        ],
      },
    ],
  },
}