/**
 * Destinations Catalogue for VR Everywhere - Virtual Travel Experience
 * Multi-Viewpoint Navigation Support (Street View / Walkable Waypoints)
 */

export const DESTINATIONS = [
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    location: "Agra, Uttar Pradesh, India",
    continent: "Asia",
    category: "Historical Wonder",
    rating: 4.9,
    reviewsCount: 1420,
    duration: "15 min tour",
    coverImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    description: "An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan in memory of his favourite wife.",
    historicalFacts: [
      "Commissioned in 1631 by Mughal Emperor Shah Jahan for Mumtaz Mahal.",
      "Employs over 20,000 artisans from across India, Persia, and the Ottoman Empire.",
      "The four minarets were deliberately constructed tilting slightly outward to safeguard the central tomb in case of earthquakes.",
      "Features intricate pietra dura inlay work using semi-precious stones including lapis lazuli, turquoise, and jade."
    ],
    attractions: [
      "The Main Marble Dome & Tomb Chamber",
      "Charbagh Mughal Gardens",
      "Yamuna Riverfront Reflection Promenade",
      "The Great Red Sandstone Gate (Darwaza-i-rauza)"
    ],
    bestTimeToVisit: "October to March (Cool, pleasant weather)",
    climate: "Subtropical with warm summers and mild winters",
    audioNarration: "Welcome to the Taj Mahal. You can walk between multiple viewpoints across the grounds. Use the W and S keys, click the ground arrows, or tap the top walk bar to navigate from the Main Gate to the Central Reflection Pool, up to the Marble Plinth, and along the Yamuna riverfront.",
    
    // Multi-Viewpoint Street View Walkway
    viewpoints: [
      {
        id: "taj-gate",
        name: "Main Entrance Gate (Darwaza-i-rauza)",
        subtitle: "Classic long-view framing the entire monument",
        panoramaUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2400&q=80",
        mapCoords: { x: 50, y: 80 },
        navLinks: [
          { targetId: "taj-pool", label: "Walk Forward to Central Reflection Pool", position: { x: 0, y: -14, z: -32 }, direction: "forward" }
        ],
        hotspots: [
          {
            id: "taj-darwaza",
            title: "Darwaza-i-rauza (Great Gate)",
            description: "Monumental red sandstone gateway with Arabic calligraphy carved into white marble borders.",
            position: { x: 0, y: 12, z: 30 },
            category: "Architecture",
            details: "The calligraphic inscriptions from the Quran are subtly scaled: letters at the top are larger than letters at the bottom so they appear uniform to viewers below."
          },
          {
            id: "taj-pool-distant",
            title: "Central Charbagh Canal",
            description: "The elongated water channel running from the south gate to the main terrace.",
            position: { x: 0, y: -10, z: -25 },
            category: "Garden",
            details: "Designed according to the Islamic Paradise Garden concept, divided into four quadrants by raised walkways and canals."
          }
        ]
      },
      {
        id: "taj-pool",
        name: "Central Reflection Pool (Al-Hawd)",
        subtitle: "Midway viewpoint near the famous bench & fountains",
        panoramaUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2400&q=80",
        mapCoords: { x: 50, y: 55 },
        navLinks: [
          { targetId: "taj-gate", label: "Walk Backward to Main Gate", position: { x: 0, y: -14, z: 32 }, direction: "backward" },
          { targetId: "taj-plinth", label: "Walk Forward to Marble Terrace Plinth", position: { x: 0, y: -14, z: -32 }, direction: "forward" }
        ],
        hotspots: [
          {
            id: "taj-pool",
            title: "Al-Hawd al-Kawthar (Pool of Abundance)",
            description: "Raised marble reflection basin with lotus fountain jets reflecting the main dome.",
            position: { x: 0, y: -10, z: -20 },
            category: "Garden",
            details: "Positioned halfway between the entrance and the mausoleum, offering the world-famous symmetrical reflection."
          },
          {
            id: "taj-dome-view",
            title: "The Great Onion Dome",
            description: "Reaching nearly 35 meters high, constructed of pure Makrana white marble.",
            position: { x: 0, y: 15, z: -35 },
            category: "Architecture",
            details: "Topped with a bronze finial that blends Islamic crescent moon motifs with Hindu trident symbols."
          }
        ]
      },
      {
        id: "taj-plinth",
        name: "Marble Terrace Base & Minarets",
        subtitle: "Up close beneath the soaring dome and pillars",
        panoramaUrl: "https://images.unsplash.com/photo-1585506942812-e72b29cef752?auto=format&fit=crop&w=2400&q=80",
        mapCoords: { x: 50, y: 30 },
        navLinks: [
          { targetId: "taj-pool", label: "Walk Backward to Reflection Pool", position: { x: 0, y: -14, z: 32 }, direction: "backward" },
          { targetId: "taj-river", label: "Walk to Yamuna Riverside Promenade", position: { x: 22, y: -14, z: -25 }, direction: "forward" }
        ],
        hotspots: [
          {
            id: "taj-minaret-left",
            title: "Western Guardian Minaret",
            description: "Over 40 meters tall, engineered with a calculated outward lean.",
            position: { x: -28, y: 8, z: -25 },
            category: "Engineering",
            details: "Designed to fall away from the main tomb chamber in the event of an earthquake."
          },
          {
            id: "taj-inlay",
            title: "Pietra Dura Inlay Art",
            description: "Intricate flower arabesques carved with 28 types of semi-precious gems.",
            position: { x: 18, y: -2, z: -26 },
            category: "Craftsmanship",
            details: "Includes lapis lazuli from Afghanistan, jade from China, and carnelian from Arabia inlaid seamlessly into white marble."
          }
        ]
      },
      {
        id: "taj-river",
        name: "Yamuna Riverside Promenade",
        subtitle: "Back terrace overlooking the sacred riverfront",
        panoramaUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2400&q=80",
        mapCoords: { x: 50, y: 12 },
        navLinks: [
          { targetId: "taj-plinth", label: "Walk Backward to Marble Terrace Plinth", position: { x: -20, y: -14, z: 28 }, direction: "backward" }
        ],
        hotspots: [
          {
            id: "taj-river-view",
            title: "Yamuna Riverfront",
            description: "Scenic view of the river that cools the marble terrace foundations.",
            position: { x: 0, y: -4, z: -35 },
            category: "Nature",
            details: "The foundation of the Taj Mahal rests upon subterranean timber wells that require moisture from the river to maintain structural durability."
          },
          {
            id: "taj-mehtab",
            title: "View toward Mehtab Bagh",
            description: "The Moonlight Garden located directly across the Yamuna river.",
            position: { x: 25, y: 2, z: -30 },
            category: "Garden",
            details: "Shah Jahan planned Mehtab Bagh as a viewing garden to admire the Taj Mahal illuminated under moonlight."
          }
        ]
      }
    ]
  },
  {
    id: "colosseum",
    name: "The Colosseum",
    location: "Rome, Lazio, Italy",
    continent: "Europe",
    category: "Ancient Monument",
    rating: 4.8,
    reviewsCount: 1890,
    duration: "20 min tour",
    coverImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    description: "The largest ancient amphitheatre ever built, capable of seating an estimated 50,000 to 80,000 spectators for gladiatorial spectacles.",
    historicalFacts: [
      "Constructed between 72 AD and 80 AD under Emperor Vespasian and Titus.",
      "Originally known as the Flavian Amphitheatre.",
      "Had 80 entrance arches allowing rapid evacuation within minutes."
    ],
    attractions: [
      "Hypogeum (Subterranean Tunnels & Cages)",
      "Imperial Box & Senatorial Tier",
      "Outer Arcades & Doric/Ionic/Corinthian Columns"
    ],
    bestTimeToVisit: "April to May or September to October",
    climate: "Mediterranean",
    audioNarration: "Welcome to the Colosseum. Use the walk arrows or press W and S to transition between the Outer Perimeter, the central Gladiator Arena Floor, and the subterranean Hypogeum tunnels.",
    viewpoints: [
      {
        id: "col-exterior",
        name: "Outer Piazza & Arch of Constantine",
        subtitle: "Exterior panoramic viewpoint of the four-tiered travertine facade",
        panoramaUrl: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=2400&q=80",
        mapCoords: { x: 50, y: 80 },
        navLinks: [
          { targetId: "col-arena", label: "Walk Inside to Gladiator Arena Floor", position: { x: 0, y: -14, z: -32 }, direction: "forward" }
        ],
        hotspots: [
          {
            id: "col-arches",
            title: "Travertine Arcades",
            description: "Three tiers of 80 arches adorned with Doric, Ionic, and Corinthian columns.",
            position: { x: 22, y: 12, z: -28 },
            category: "Architecture",
            details: "Fastened with 300 metric tons of iron clamps scavenged during the Middle Ages."
          }
        ]
      },
      {
        id: "col-arena",
        name: "Gladiator Arena Floor",
        subtitle: "Standing in the heart of the ancient combat amphitheatre",
        panoramaUrl: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=2400&q=80",
        mapCoords: { x: 50, y: 50 },
        navLinks: [
          { targetId: "col-exterior", label: "Walk Out to Outer Piazza", position: { x: 0, y: -14, z: 32 }, direction: "backward" },
          { targetId: "col-hypogeum", label: "Walk Down to Underground Hypogeum", position: { x: 18, y: -14, z: -28 }, direction: "forward" }
        ],
        hotspots: [
          {
            id: "col-arena-floor",
            title: "Reconstructed Wooden Arena Floor",
            description: "Wooden staging covered with sand to absorb combat blood.",
            position: { x: 0, y: -10, z: -30 },
            category: "Arena",
            details: "Allows visitors to stand directly where gladiators fought before the Emperor."
          }
        ]
      },
      {
        id: "col-hypogeum",
        name: "Subterranean Hypogeum",
        subtitle: "Corridors and animal lift chambers beneath the arena",
        panoramaUrl: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=2400&q=80",
        mapCoords: { x: 50, y: 25 },
        navLinks: [
          { targetId: "col-arena", label: "Walk Up to Arena Floor", position: { x: 0, y: -14, z: 32 }, direction: "backward" }
        ],
        hotspots: [
          {
            id: "col-hypogeum-lifts",
            title: "Underground Elevator Lifts",
            description: "28 counterweight wooden pulley elevators.",
            position: { x: -18, y: -6, z: -25 },
            category: "Engineering",
            details: "Elevated wild animals directly into the arena through secret trapdoors."
          }
        ]
      }
    ]
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    location: "Cusco Region, Peru",
    continent: "South America",
    category: "Lost Civilization",
    rating: 4.95,
    reviewsCount: 980,
    duration: "25 min tour",
    coverImage: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80",
    description: "A 15th-century Inca citadel situated on a mountain ridge 2,430 metres above sea level in the Sacred Valley.",
    historicalFacts: [
      "Built by Inca Emperor Pachacuti around 1450.",
      "Constructed using ashlar dry-stone masonry with zero mortar."
    ],
    attractions: [
      "Intihuatana Ritual Sun Stone",
      "Temple of the Sun (Torreón)",
      "Agricultural Terraces"
    ],
    bestTimeToVisit: "May to October (Dry Andean Season)",
    climate: "Highland tropical",
    audioNarration: "You have arrived atop Machu Picchu. Navigate along the terraces from the Guardhouse Lookout to the Temple of the Sun and the Intihuatana sundial.",
    viewpoints: [
      {
        id: "mp-lookout",
        name: "Upper Guardhouse Citadel Lookout",
        subtitle: "Iconic panoramic overview of the entire citadel and Huayna Picchu",
        panoramaUrl: "https://images.unsplash.com/photo-1509299349698-dd22323b5963?auto=format&fit=crop&w=2400&q=80",
        mapCoords: { x: 50, y: 75 },
        navLinks: [
          { targetId: "mp-temple", label: "Walk Forward to Temple of the Sun", position: { x: 0, y: -14, z: -32 }, direction: "forward" }
        ],
        hotspots: [
          {
            id: "mp-panorama",
            title: "Huayna Picchu Peak & Main Plaza",
            description: "Spectacular backdrop peak rising behind the residential quarters.",
            position: { x: 0, y: 12, z: -35 },
            category: "Landscape",
            details: "The green peak provides the signature silhouette recognized worldwide."
          }
        ]
      },
      {
        id: "mp-temple",
        name: "Temple of the Sun & Terraces",
        subtitle: "Sanctuary aligned with the winter solstice sunrise",
        panoramaUrl: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2400&q=80",
        mapCoords: { x: 50, y: 35 },
        navLinks: [
          { targetId: "mp-lookout", label: "Walk Back to Upper Lookout", position: { x: 0, y: -14, z: 32 }, direction: "backward" }
        ],
        hotspots: [
          {
            id: "mp-sun-temple",
            title: "Torreón Sun Sanctuary",
            description: "Curved ashlar stone wall aligned with solar solstices.",
            position: { x: -16, y: -4, z: -30 },
            category: "Sacred",
            details: "Light streams through the trapezoidal window directly at the June solstice."
          }
        ]
      }
    ]
  },
  {
    id: "fushimi-inari",
    name: "Fushimi Inari Shrine",
    location: "Kyoto, Kansai, Japan",
    continent: "Asia",
    category: "Spiritual Heritage",
    rating: 4.85,
    reviewsCount: 1650,
    duration: "18 min tour",
    coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    description: "The head shrine of the kami Inari, famous for its thousands of vibrant vermilion Senbon Torii gates.",
    historicalFacts: [
      "Established in 711 AD during the Nara Period.",
      "Dedicated to Inari, patron kami of agriculture and commerce."
    ],
    attractions: [
      "Senbon Torii (Tunnel of Ten Thousand Gates)",
      "Main Honden Shrine Hall"
    ],
    bestTimeToVisit: "March to May or November",
    climate: "Temperate",
    audioNarration: "Walk through the vermilion gates of Fushimi Inari in Kyoto. Walk between the entrance Honden and deep into the Senbon Torii tunnel.",
    viewpoints: [
      {
        id: "fi-entrance",
        name: "Main Honden Shrine & Fox Guardians",
        subtitle: "Grand shrine courtyard with sacred stone messengers",
        panoramaUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=2400&q=80",
        mapCoords: { x: 50, y: 70 },
        navLinks: [
          { targetId: "fi-torii", label: "Walk Forward into Senbon Torii Tunnel", position: { x: 0, y: -14, z: -32 }, direction: "forward" }
        ],
        hotspots: [
          {
            id: "fi-kitsune",
            title: "Kitsune Fox Messenger",
            description: "Stone fox messenger holding the key to the rice granary.",
            position: { x: -16, y: -4, z: -24 },
            category: "Symbolism",
            details: "Inari foxes represent divine protection, wisdom, and bountiful harvest."
          }
        ]
      },
      {
        id: "fi-torii",
        name: "Senbon Torii Sacred Path",
        subtitle: "Surrounded by thousands of vermilion lacquered wooden arches",
        panoramaUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=80",
        mapCoords: { x: 50, y: 30 },
        navLinks: [
          { targetId: "fi-entrance", label: "Walk Back to Main Honden", position: { x: 0, y: -14, z: 32 }, direction: "backward" }
        ],
        hotspots: [
          {
            id: "fi-senbon-gates",
            title: "Senbon Torii Path",
            description: "Dense tunnel of vermilion lacquered gates.",
            position: { x: 0, y: 4, z: -30 },
            category: "Ritual",
            details: "The vibrant vermilion pigment is believed to ward off evil and foster good fortune."
          }
        ]
      }
    ]
  },
  {
    id: "giza-pyramids",
    name: "Great Pyramids of Giza",
    location: "Giza Plateau, Greater Cairo, Egypt",
    continent: "Africa",
    category: "Ancient Wonder",
    rating: 4.92,
    reviewsCount: 2100,
    duration: "22 min tour",
    coverImage: "https://images.unsplash.com/photo-1503177112275-5de592a45e4f?auto=format&fit=crop&w=1200&q=80",
    description: "The oldest and only substantially surviving monument of the original Seven Wonders of the Ancient World.",
    historicalFacts: [
      "Constructed around 2560 BC for Pharaoh Khufu.",
      "Composed of approximately 2.3 million limestone blocks."
    ],
    attractions: [
      "The Great Pyramid of Khufu",
      "The Great Sphinx of Giza"
    ],
    bestTimeToVisit: "November to March",
    climate: "Arid desert",
    audioNarration: "Explore the Giza Plateau. Walk between the panoramic plateau overview, the base of the Great Pyramid of Khufu, and the Great Sphinx.",
    viewpoints: [
      {
        id: "giza-plateau",
        name: "Giza Plateau Panoramic Vista",
        subtitle: "Elevated view across all three major pyramids and the desert sands",
        panoramaUrl: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=2400&q=80",
        mapCoords: { x: 50, y: 70 },
        navLinks: [
          { targetId: "giza-sphinx", label: "Walk Down to Great Sphinx", position: { x: 0, y: -14, z: -32 }, direction: "forward" }
        ],
        hotspots: [
          {
            id: "giza-khufu",
            title: "Pyramid of Khufu",
            description: "The Great Pyramid standing 138 meters tall.",
            position: { x: 0, y: 15, z: -35 },
            category: "Wonder",
            details: "Built with 2.3 million stone blocks aligned precisely to celestial north."
          }
        ]
      },
      {
        id: "giza-sphinx",
        name: "The Great Sphinx Enclosure",
        subtitle: "Standing before the legendary lion-bodied pharaoh monument",
        panoramaUrl: "https://images.unsplash.com/photo-1503177112275-5de592a45e4f?auto=format&fit=crop&w=2400&q=80",
        mapCoords: { x: 50, y: 30 },
        navLinks: [
          { targetId: "giza-plateau", label: "Walk Back to Plateau Vista", position: { x: 0, y: -14, z: 32 }, direction: "backward" }
        ],
        hotspots: [
          {
            id: "giza-sphinx-face",
            title: "The Great Sphinx Face",
            description: "Carved from a single outcrop of natural bedrock.",
            position: { x: -16, y: -4, z: -26 },
            category: "Monument",
            details: "Measures 73 meters long and 20 meters high, facing directly due east toward the rising sun."
          }
        ]
      }
    ]
  }
];

// Helper: Get active viewpoint or fallback to first
export function getActiveViewpoint(destination, viewpointId) {
  if (!destination || !destination.viewpoints || destination.viewpoints.length === 0) {
    return {
      id: "default",
      name: destination?.name || "Viewpoint",
      panoramaUrl: destination?.panoramaUrl || "",
      hotspots: destination?.hotspots || [],
      navLinks: []
    };
  }
  const found = destination.viewpoints.find((v) => v.id === viewpointId);
  return found || destination.viewpoints[0];
}

export const CATEGORIES = [
  "All",
  "Historical Wonder",
  "Ancient Monument",
  "Lost Civilization",
  "Spiritual Heritage"
];

export const CONTINENTS = [
  "All",
  "Asia",
  "Europe",
  "South America",
  "Africa"
];
