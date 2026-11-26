/**
 * Curated Destinations Catalogue for VR Everywhere - Virtual Travel Experience
 * Production 360° WebXR Interactive Virtual Tourism Platform
 * 
 * ALL DESTINATIONS FEATURE 100% AUTHENTIC 360° EQUIRECTANGULAR SPHERICAL PANORAMAS.
 * NO FLAT 2D IMAGES - GENUINE 360° IMMERSION WITH WALKABLE WAYPOINTS & STREET VIEW INTEGRATION.
 */

export const DESTINATIONS = [
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    location: "Agra, Uttar Pradesh, India",
    continent: "Asia",
    category: "Historical Wonder",
    rating: 4.98,
    reviewsCount: 3840,
    duration: "15 min tour",
    coverImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    description: "An immense mausoleum of white Makrana marble, built in Agra between 1631 and 1648 by order of Mughal Emperor Shah Jahan in memory of Mumtaz Mahal. Recognized as the jewel of Muslim art in India.",
    googleStreetViewUrl: "https://www.google.com/maps/search/?api=1&query=27.175015,78.042155",
    coordinates: { lat: 27.1751, lng: 78.0421 },
    historicalFacts: [
      "Commissioned in 1631 by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal.",
      "Employed over 20,000 stonecarvers, calligraphers, and artisans from India, Persia, and the Ottoman Empire.",
      "The four 40-meter minarets were intentionally built tilting slightly outward to safeguard the central tomb in case of earthquakes.",
      "Constructed entirely with translucent white Makrana marble that shifts in hue from soft pink at sunrise to milky white at noon and golden under moonlight."
    ],
    attractions: [
      "Central Marble Dome & Imperial Cenotaph",
      "Charbagh Paradise Reflection Canals",
      "Darwaza-i-rauza (Grand Red Sandstone Gateway)",
      "Yamuna Riverfront Terrace Promenade"
    ],
    bestTimeToVisit: "October to March (Pleasant, sunny winters)",
    climate: "Semi-arid subtropical",
    audioNarration: "Welcome to the Taj Mahal, an eternal masterpiece rising in white Makrana marble along the Yamuna River. Built by Emperor Shah Jahan in devotion to Mumtaz Mahal, observe how the morning light illuminates the grand central dome and mirrors across the tranquil Charbagh reflection pools. As you look around, discover the delicate Pietra Dura floral inlays and the towering guardian minarets framing this jewel of Mughal architecture.",
    ambientType: "temple",
    
    // Viewpoints with 100% verified 360 equirectangular spherical panoramas (walkable pair)
    viewpoints: [
      {
        id: "taj-main",
        name: "Central Reflection Pool & Monument Axis",
        subtitle: "Iconic symmetrical vantage point along the Charbagh water canals",
        panoramaUrl: "/panoramas/taj-mahal.jpg",
        fallbackPanoramaUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Taj_Mahal_360%C2%B0_View.jpg",
        mapCoords: { x: 50, y: 70 },
        navLinks: [
          { targetId: "taj-grand-hall", label: "Walk Forward into Grand Imperial Hall", position: { x: 0, y: -14, z: -32 }, direction: "forward" }
        ],
        hotspots: [
          {
            id: "taj-dome",
            title: "The Great Onion Dome (Amrud)",
            description: "Rising 35 meters above the plinth, sculpted from Makrana marble.",
            position: { x: 0, y: 16, z: -34 },
            category: "Architecture",
            details: "Constructed with a double-shell vault: an interior ceiling maintaining acoustic intimacy and a soaring outer dome presenting monumental grandeur."
          },
          {
            id: "taj-minaret-left",
            title: "Western Guardian Minaret",
            description: "Over 40 meters tall, engineered with a calculated 2-degree outward lean.",
            position: { x: -28, y: 6, z: -25 },
            category: "Engineering",
            details: "Designed to collapse away from the central tomb chamber in the catastrophic event of an earthquake."
          },
          {
            id: "taj-pool",
            title: "Al-Hawd al-Kawthar (Pool of Abundance)",
            description: "Raised marble reflection basin mirroring the white tomb facade.",
            position: { x: 0, y: -12, z: -22 },
            category: "Garden",
            details: "Based on the Quranic concept of the Heavenly River of Abundance, with fountains aligned exactly to the cardinal axes."
          },
          {
            id: "taj-inlay",
            title: "Pietra Dura Floral Parchin Kari",
            description: "Intricate floral inlays created with 28 types of precious stones.",
            position: { x: 18, y: -2, z: -28 },
            category: "Artisanship",
            details: "Artisans cut lapis lazuli from Afghanistan, turquoise from Tibet, and jasper from Punjab into microscopic petals inlaid flush into white marble."
          }
        ]
      },
      {
        id: "taj-grand-hall",
        name: "Grand Imperial Heritage Hall & Rotunda",
        subtitle: "Opulent marble rotunda and ceremonial imperial archway",
        panoramaUrl: "/panoramas/taj-grand-hall.jpg",
        fallbackPanoramaUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Pano-20230403-Taj-Mumbai-Grandstaircase.jpg/3840px-Pano-20230403-Taj-Mumbai-Grandstaircase.jpg",
        mapCoords: { x: 50, y: 30 },
        navLinks: [
          { targetId: "taj-main", label: "Walk Backward to Central Reflection Pool", position: { x: 0, y: -14, z: 32 }, direction: "backward" }
        ],
        hotspots: [
          {
            id: "taj-hall-vault",
            title: "Mughal Ribbed Vaulting",
            description: "Soaring decorative dome with gilded geometric latticework.",
            position: { x: 0, y: 18, z: -30 },
            category: "Architecture",
            details: "Inspired by classical Persian arches fused with indigenous Indian Makrana marble techniques."
          },
          {
            id: "taj-hall-colonnade",
            title: "Royal Ceremonial Arcade",
            description: "Fluted marble pillars supporting multi-tiered balconies.",
            position: { x: -24, y: 2, z: -25 },
            category: "Craftsmanship",
            details: "Hand-carved balustrades and polished marble surfaces designed for imperial receptions."
          }
        ]
      }
    ]
  },

  {
    id: "colosseum",
    name: "The Roman Colosseum",
    location: "Rome, Lazio, Italy",
    continent: "Europe",
    category: "Ancient Monument",
    rating: 4.94,
    reviewsCount: 4210,
    duration: "20 min tour",
    coverImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
    description: "The largest amphitheatre ever constructed in the Roman Empire. Commissioned by Emperor Vespasian in 72 AD and completed in 80 AD, it seated over 50,000 spectators for gladiatorial battles and public dramas.",
    googleStreetViewUrl: "https://www.google.com/maps/search/?api=1&query=41.890210,12.492231",
    coordinates: { lat: 41.8902, lng: 12.4922 },
    historicalFacts: [
      "Originally named the Flavian Amphitheatre (Amphitheatrum Flavium) after the Flavian imperial dynasty.",
      "Financed entirely by the monumental spoils of the Siege of Jerusalem in 70 AD.",
      "Had 80 vomitoria entrance arches allowing the entire stadium of 50,000 citizens to safely enter or evacuate in less than 15 minutes.",
      "Engineered with a retractable canvas awning called the Velarium, operated by Roman naval sailors to shelter spectators from the Mediterranean sun."
    ],
    attractions: [
      "The Arena Combat Floor",
      "The Underground Hypogeum Network",
      "Imperial & Senatorial Tiers",
      "Travertine Arcades with Doric, Ionic, & Corinthian Columns"
    ],
    bestTimeToVisit: "April to May or September to October",
    climate: "Mediterranean",
    audioNarration: "Welcome to the Colosseum, the grandest amphitheatre of the Roman Empire. Completed in 80 AD under Emperor Titus, over fifty thousand citizens once gathered here to witness gladiatorial combat. Look around the monumental three-tiered travertine arcades, and gaze down into the subterranean hypogeum network, where gladiator staging rooms and mechanical animal elevators were concealed beneath the arena floor.",
    ambientType: "echo",
    viewpoints: [
      {
        id: "col-arena",
        name: "Gladiator Arena & Hypogeum Overlook",
        subtitle: "Standing in the heart of the ancient combat amphitheatre",
        panoramaUrl: "/panoramas/colosseum-arena.jpg",
        fallbackPanoramaUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Colosseum_%2846202664005%29.jpg",
        mapCoords: { x: 50, y: 50 },
        navLinks: [],
        hotspots: [
          {
            id: "col-hypogeum",
            title: "The Subterranean Hypogeum",
            description: "Two-level underground network of cages, winches, and tunnels.",
            position: { x: 0, y: -14, z: -26 },
            category: "Archaeology",
            details: "Contained 28 manual counterweight elevator lifts that hoisted gladiators and wild predators directly through trapdoors into the arena."
          },
          {
            id: "col-imperial-box",
            title: "The Imperial Pulvinar Box",
            description: "The reserved seat of honor for the Roman Emperor.",
            position: { x: -25, y: 6, z: -28 },
            category: "Imperial History",
            details: "Located on the southern axis to afford the Emperor an unobstructed view and the supreme authority to deliver the pollice verso death or mercy gesture."
          },
          {
            id: "col-arcades",
            title: "Travertine Arcades & Greek Orders",
            description: "Eighty soaring arches spanning three exterior stories.",
            position: { x: 22, y: 14, z: -28 },
            category: "Architecture",
            details: "Showcases classical superimposition: Doric columns on the ground floor, Ionic columns on the second floor, and ornate Corinthian pilasters on the top."
          }
        ]
      }
    ]
  },

  {
    id: "pantheon",
    name: "The Roman Pantheon",
    location: "Rome, Lazio, Italy",
    continent: "Europe",
    category: "Ancient Monument",
    rating: 4.96,
    reviewsCount: 3120,
    duration: "18 min tour",
    coverImage: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80",
    description: "The best-preserved monument of imperial Rome. Rebuilt by Emperor Hadrian around 126 AD, featuring the world's largest unreinforced solid concrete dome crowned by an open oculus.",
    googleStreetViewUrl: "https://www.google.com/maps/search/?api=1&query=41.898611,12.476873",
    coordinates: { lat: 41.8986, lng: 12.4768 },
    historicalFacts: [
      "Still holds the record as the world's largest unreinforced concrete dome for almost two thousand years.",
      "The diameter of the interior rotunda (43.3 meters) exactly equals its interior height from marble floor to oculus.",
      "Survived intact because Byzantine Emperor Phocas presented it to Pope Boniface IV in 609 AD, converting it into the church of St. Mary and the Martyrs.",
      "The concrete mixture was lightened toward the top using pumice and scoria aggregate to decrease structural loading."
    ],
    attractions: [
      "The 9-Meter Open Oculus",
      "Coffered Concrete Hemispherical Dome",
      "Corinthian Granite Monolith Columns",
      "Tomb of Renaissance Painter Raphael"
    ],
    bestTimeToVisit: "Year-round (Midday for the sunlight oculus beam)",
    climate: "Mediterranean",
    audioNarration: "Step inside the Roman Pantheon, one of the greatest architectural triumphs of antiquity. Reconstructed by Emperor Hadrian around 126 AD, look straight up into the unreinforced concrete dome to behold the great nine-meter open oculus, casting a dynamic column of natural sunlight across the ancient marble floor. Here also lies the tomb of the Renaissance master Raphael.",
    ambientType: "echo",
    viewpoints: [
      {
        id: "pantheon-rotunda",
        name: "Rotunda Center Beneath the Oculus",
        subtitle: "Standing directly beneath the 43.3-meter unreinforced concrete dome",
        panoramaUrl: "/panoramas/pantheon.jpg",
        fallbackPanoramaUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Pantheon_%2846403885954%29.jpg",
        mapCoords: { x: 50, y: 50 },
        navLinks: [],
        hotspots: [
          {
            id: "pantheon-oculus",
            title: "The Great Oculus (Eye of Heaven)",
            description: "A 9-meter circular aperture open to the Roman sky.",
            position: { x: 0, y: 35, z: -10 },
            category: "Engineering",
            details: "Acts as the sole light source. At noon on the summer solstice, a circle of sunlight shines through the oculus directly onto the entrance archway."
          },
          {
            id: "pantheon-coffers",
            title: "Stepped Lacunaria (Coffered Ceiling)",
            description: "Five rings of 28 recessed square coffers receding upward.",
            position: { x: 22, y: 22, z: -20 },
            category: "Architecture",
            details: "Each coffer reduces the dome's structural deadweight while accentuating perspective and visual height."
          },
          {
            id: "pantheon-raphael",
            title: "Tomb of Master Raphael",
            description: "Final resting place of the legendary Renaissance artist.",
            position: { x: -24, y: -4, z: -25 },
            category: "Art History",
            details: "Contains his Madonna del Sasso sculpture and the famous inscription: 'Living, he made great Nature fear defeat; dying, she feared to die with him.'"
          }
        ]
      }
    ]
  },

  {
    id: "eiffel-tower",
    name: "Eiffel Tower & Pont de Bir-Hakeim",
    location: "Paris, Île-de-France, France",
    continent: "Europe",
    category: "Modern Icon",
    rating: 4.91,
    reviewsCount: 5200,
    duration: "15 min tour",
    coverImage: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80",
    description: "The global icon of France and one of the most recognizable structures in the world. Built by Gustave Eiffel for the 1889 Exposition Universelle, rising 330 meters along the banks of the Seine River.",
    googleStreetViewUrl: "https://www.google.com/maps/search/?api=1&query=48.858370,2.294481",
    coordinates: { lat: 48.8584, lng: 2.2945 },
    historicalFacts: [
      "Constructed from 1887 to 1889 as the grand entrance arch to the 1889 World's Fair commemorating the centennial of the French Revolution.",
      "Composed of 18,038 puddle-iron lattice pieces fastened by 2.5 million rivets.",
      "Held the title of the world's tallest human-made structure for 41 years until the Chrysler Building was completed in New York in 1930.",
      "Thermal expansion causes the tower to tilt up to 15 cm away from the sun during hot summer afternoons."
    ],
    attractions: [
      "The 330m Wrought-Iron Summit",
      "Pont de Bir-Hakeim Viaduct Arches",
      "Seine Riverfront Promenade",
      "Champ de Mars Esplanade"
    ],
    bestTimeToVisit: "June to September or December for holiday illuminations",
    climate: "Oceanic temperate",
    audioNarration: "Welcome to Paris. You are standing on the historic Pont de Bir-Hakeim promenade overlooking the Seine River, with an incomparable panorama of the Eiffel Tower. Engineered by Gustave Eiffel for the 1889 World's Fair, trace the soaring wrought-iron lattice arches as they rise three hundred and thirty meters into the Parisian sky.",
    ambientType: "breeze",
    viewpoints: [
      {
        id: "eiffel-bridge",
        name: "Bir-Hakeim Seine Riverfront Promenade",
        subtitle: "Unobstructed panorama of the Iron Lady and the Seine River arches",
        panoramaUrl: "/panoramas/eiffel-tower.jpg",
        fallbackPanoramaUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Pont_de_Bir-Hakeim_and_the_Eiffel_Tower%2C_April_2007.jpg",
        mapCoords: { x: 50, y: 50 },
        navLinks: [],
        hotspots: [
          {
            id: "eiffel-spire",
            title: "The Iron Lady (La Tour Eiffel)",
            description: "330-meter architectural masterpiece of structural puddle iron.",
            position: { x: 22, y: 16, z: -28 },
            category: "Engineering",
            details: "Painted in three subtle gradients (darker at the base, lighter at the top) to ensure uniform optical appearance against the sky."
          },
          {
            id: "seine-viaduct",
            title: "Pont de Bir-Hakeim Viaduct",
            description: "Historic two-tiered steel bridge built in 1905.",
            position: { x: -22, y: -8, z: -25 },
            category: "Architecture",
            details: "Features a monumental colonnade carrying Paris Métro Line 6 on top and a lower roadway for cyclists and pedestrians."
          }
        ]
      }
    ]
  },

  {
    id: "louvre-pyramid",
    name: "The Grand Louvre Palace",
    location: "Paris, Île-de-France, France",
    continent: "Europe",
    category: "Art & Heritage",
    rating: 4.93,
    reviewsCount: 3950,
    duration: "20 min tour",
    coverImage: "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=1200&q=80",
    description: "The world's largest and most visited museum. A historic palace spanning over eight centuries of French monarchy, transformed by architect I. M. Pei with the addition of the iconic modernist Glass Pyramid in the Cour Napoléon.",
    googleStreetViewUrl: "https://www.google.com/maps/search/?api=1&query=48.860611,2.337644",
    coordinates: { lat: 48.8606, lng: 2.3376 },
    historicalFacts: [
      "Originating as a 12th-century fortress under King Philip II, whose medieval moat foundations remain visible in the lower galleries.",
      "Opened as a public museum during the French Revolution in 1793 with just 537 paintings.",
      "I. M. Pei's 21.6-meter glass pyramid was unveiled in 1989 and serves as the luminous central subterranean entrance.",
      "Houses over 380,000 historic treasures and 35,000 masterworks including Leonardo da Vinci's Mona Lisa and the Venus de Milo."
    ],
    attractions: [
      "I. M. Pei Modernist Glass Pyramid",
      "Cour Napoléon Imperial Courtyard",
      "Denon, Sully, and Richelieu Royal Wings",
      "Subterranean Napoleon Hall"
    ],
    bestTimeToVisit: "Wednesday and Friday evenings for nighttime illumination",
    climate: "Oceanic temperate",
    audioNarration: "Welcome to the Cour Napoléon at the Grand Louvre. Originally a twelfth-century fortress and royal palace of French monarchs, notice the striking synthesis of Renaissance stone facades surrounding architect I. M. Pei's modernist glass pyramid, designed with six hundred and seventy-three ultra-pure glass diamond panels illuminating the grand halls beneath.",
    ambientType: "breeze",
    viewpoints: [
      {
        id: "louvre-courtyard",
        name: "Cour Napoléon & Glass Pyramid",
        subtitle: "Standing beside the iconic 21.6-meter pyramid and royal facades",
        panoramaUrl: "/panoramas/louvre-pyramid.jpg",
        fallbackPanoramaUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Louvre_panosphere_20200303.jpg",
        mapCoords: { x: 50, y: 50 },
        navLinks: [],
        hotspots: [
          {
            id: "louvre-pyramid-glass",
            title: "I. M. Pei Glass Pyramid",
            description: "21.6-meter pyramid composed of 673 glass segments.",
            position: { x: 0, y: 8, z: -30 },
            category: "Modern Architecture",
            details: "Features custom-formulated 'Diamond Glass' from Saint-Gobain engineered with ultra-pure white silica to eliminate the typical greenish tint of architectural glass."
          },
          {
            id: "louvre-denon-wing",
            title: "Denon Royal Wing",
            description: "Classical French Renaissance pavilion housing Italian masterworks.",
            position: { x: -24, y: 10, z: -24 },
            category: "Royal Heritage",
            details: "Home to the Grande Galerie where Leonardo da Vinci's Mona Lisa and Eugène Delacroix's Liberty Leading the People are permanently exhibited."
          }
        ]
      }
    ]
  },

  {
    id: "st-patricks-cathedral",
    name: "St. Patrick's Cathedral",
    location: "Dublin, Leinster, Ireland",
    continent: "Europe",
    category: "Gothic Sanctuary",
    rating: 4.88,
    reviewsCount: 2430,
    duration: "25 min tour",
    coverImage: "https://images.unsplash.com/photo-1549918864-48ac978761a4?auto=format&fit=crop&w=1200&q=80",
    description: "The National Cathedral of the Church of Ireland and the largest church in the country, founded in 1191. Renowned for its soaring stone ribbed vaulting, medieval memorials, and as the church where author Jonathan Swift served as Dean.",
    googleStreetViewUrl: "https://www.google.com/maps/search/?api=1&query=53.339500,-6.271400",
    coordinates: { lat: 53.3395, lng: -6.2714 },
    historicalFacts: [
      "Founded in 1191 beside an ancient sacred well where Saint Patrick is believed to have baptized Celtic converts in 450 AD.",
      "The origin of the English idiom 'chancing your arm' occurred here in 1492 when the Earl of Kildare cut a hole in the chapter door to shake hands in truce with the rival Earl of Ormond.",
      "Jonathan Swift, world-famous author of Gulliver's Travels, served as Dean from 1713 to 1745 and is buried in the south nave.",
      "Heavily restored in the 1860s through generous funding from Sir Benjamin Guinness of the brewing family."
    ],
    attractions: [
      "The Soaring Gothic Nave",
      "Knights of St. Patrick Choir Stalls",
      "Dean Jonathan Swift Memorial",
      "Medieval Chapter Door of Reconciliation"
    ],
    bestTimeToVisit: "March for St. Patrick's celebrations, or autumn for choral evensong",
    climate: "Maritime temperate",
    audioNarration: "Welcome to St. Patrick's Cathedral in Dublin, Ireland. Founded in 1191 beside the ancient sacred baptismal well of Saint Patrick, explore the soaring stone ribbed vaulting of the Great Nave, adorned with historic heraldic banners, and advance into the choir sanctuary where Dean Jonathan Swift once ministered.",
    ambientType: "echo",
    viewpoints: [
      {
        id: "st-pat-nave",
        name: "The Great Gothic Nave",
        subtitle: "Looking down the central vaulted aisle toward the crossing",
        panoramaUrl: "/panoramas/st-patricks-cathedral.jpg",
        fallbackPanoramaUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/df/St_Patrick%27s_Cathedral_Nave_360x180%2C_Dublin%2C_Ireland.jpg/3840px-St_Patrick%27s_Cathedral_Nave_360x180%2C_Dublin%2C_Ireland.jpg",
        mapCoords: { x: 50, y: 70 },
        navLinks: [
          { targetId: "st-pat-choir", label: "Walk Forward into Cathedral Choir & Altar", position: { x: 0, y: -14, z: -32 }, direction: "forward" }
        ],
        hotspots: [
          {
            id: "cathedral-vaults",
            title: "Ribbed Groin Vaulting & Standards",
            description: "Soaring 17-meter vaulted ceiling hung with heraldic banners.",
            position: { x: 0, y: 22, z: -25 },
            category: "Gothic Architecture",
            details: "The heraldic banners hanging high overhead belong to the Knights of the Most Illustrious Order of Saint Patrick, founded by King George III."
          },
          {
            id: "swift-tomb",
            title: "Tomb of Dean Jonathan Swift",
            description: "Final resting place of author and satirist Jonathan Swift.",
            position: { x: -22, y: -6, z: -22 },
            category: "Literature",
            details: "Buried beside his lifelong companion Esther Johnson (Stella). His Latin epitaph declared he rested where cruel indignation can tear his heart no more."
          }
        ]
      },
      {
        id: "st-pat-choir",
        name: "Cathedral Choir & High Altar",
        subtitle: "Intricate medieval choir stalls and stone reredos sanctuary",
        panoramaUrl: "/panoramas/st-patricks-choir.jpg",
        fallbackPanoramaUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/St_Patrick%27s_Cathedral_Choir_360x180%2C_Dublin%2C_Ireland.jpg/3840px-St_Patrick%27s_Cathedral_Choir_360x180%2C_Dublin%2C_Ireland.jpg",
        mapCoords: { x: 50, y: 30 },
        navLinks: [
          { targetId: "st-pat-nave", label: "Walk Backward to Main Gothic Nave", position: { x: 0, y: -14, z: 32 }, direction: "backward" }
        ],
        hotspots: [
          {
            id: "choir-stalls",
            title: "The Knights' Choir Stalls",
            description: "Hand-carved oak stalls with brass plates of Knight companions.",
            position: { x: -18, y: 2, z: -26 },
            category: "Woodcarving",
            details: "Each stall bears an enameled brass armorial plate and sword helmet for knights installed between 1783 and 1869."
          },
          {
            id: "high-altar",
            title: "The High Sanctuary Altar",
            description: "Stone carved reredos depicting biblical communion scenes.",
            position: { x: 0, y: 4, z: -32 },
            category: "Sanctuary",
            details: "Paved with Victorian encaustic tiles replicating the 13th-century medieval patterns found in the church crypt."
          }
        ]
      }
    ]
  },

  {
    id: "berlin-potsdamer",
    name: "Potsdamer Platz & Sony Center",
    location: "Berlin, Brandenburg, Germany",
    continent: "Europe",
    category: "Urban Architecture",
    rating: 4.86,
    reviewsCount: 1980,
    duration: "15 min tour",
    coverImage: "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=80",
    description: "Berlin's bustling modern crossroads and a triumph of post-Cold War European urban redevelopment. Features the striking Sony Center forum with its illuminated Fuji-tent cable-suspended roof and fragments of the historic Berlin Wall.",
    googleStreetViewUrl: "https://www.google.com/maps/search/?api=1&query=52.509600,13.375900",
    coordinates: { lat: 52.5096, lng: 13.3759 },
    historicalFacts: [
      "In the 1920s, it was the busiest traffic intersection in Europe and home to the continent's very first electric traffic lights in 1924.",
      "Completely obliterated in WWII and partitioned by the Berlin Wall, turning into an abandoned military 'death strip' for three decades.",
      "Following the fall of the Wall in 1989, it became the largest construction site in Europe, masterplanned by Renzo Piano and Helmut Jahn.",
      "The tent-like roof of the Sony Center is engineered with 105 tons of glass and steel cables spanning 102 meters."
    ],
    attractions: [
      "Helmut Jahn Sony Center Glass Canopy",
      "Kaisersaal Historic Grand Ballroom",
      "Berlin Wall Memorial Concrete Slabs",
      "Potsdamer Platz Railway Station Plaza"
    ],
    bestTimeToVisit: "May to October or February during the Berlinale Film Festival",
    climate: "Continental temperate",
    audioNarration: "Welcome to Potsdamer Platz, the vibrant urban crossroads in the heart of reunited Berlin. Look upwards to take in the cable-suspended tent canopy of the Sony Center, engineered in homage to Mount Fuji, and discover preserved segments of the historic Berlin Wall that once divided East and West.",
    ambientType: "breeze",
    viewpoints: [
      {
        id: "potsdamer-forum",
        name: "Potsdamer Plaza & Sony Center Forum",
        subtitle: "Standing under the monumental cable canopy and open fountain forum",
        panoramaUrl: "/panoramas/berlin-potsdamer.jpg",
        fallbackPanoramaUrl: "https://upload.wikimedia.org/wikipedia/commons/6/64/Potsdamer_Platz%2C_Berlin%2C_360x180%2C_160403%2C_ako.jpg",
        mapCoords: { x: 50, y: 50 },
        navLinks: [],
        hotspots: [
          {
            id: "sony-canopy",
            title: "Fuji-Style Cable Canopy",
            description: "Tensile steel and glass membrane spanning over 100 meters.",
            position: { x: 0, y: 28, z: -25 },
            category: "Modern Architecture",
            details: "Designed as an homage to Mount Fuji, illuminated every evening by computer-controlled cyan, magenta, and amber light sequences."
          },
          {
            id: "wall-fragment",
            title: "Preserved Berlin Wall Slabs",
            description: "Reinforced concrete segments displaying protest graffiti.",
            position: { x: -22, y: -6, z: -25 },
            category: "Cold War History",
            details: "These panels mark the exact strip that partitioned East and West Berlin from August 13, 1961 to November 9, 1989."
          }
        ]
      }
    ]
  },

  {
    id: "niagara-falls",
    name: "Niagara Falls & Horseshoe Cataract",
    location: "Niagara Falls, Ontario, Canada",
    continent: "Americas",
    category: "Natural Wonder",
    rating: 4.96,
    reviewsCount: 4620,
    duration: "20 min tour",
    coverImage: "/thumbnails/niagara.jpg",
    description: "One of the most powerful geological spectacles on Earth. Straddling the international boundary between Canada and the United States, the Horseshoe Falls discharges over 168,000 cubic meters of glacier water every minute into the Niagara Gorge.",
    googleStreetViewUrl: "https://www.google.com/maps/search/?api=1&query=43.080500,-79.071000",
    coordinates: { lat: 43.0805, lng: -79.0710 },
    historicalFacts: [
      "Formed approximately 12,000 years ago during the Wisconsin glaciation as melting glaciers carved the Great Lakes.",
      "Produces over 4.9 million kilowatts of renewable hydroelectric power shared between Ontario, Canada and New York State.",
      "The Horseshoe Falls accounts for approximately 90% of the entire Niagara River discharge.",
      "Protected as Canada's oldest provincial park by the Queen Victoria Niagara Falls Park Act of 1885."
    ],
    attractions: [
      "Table Rock Welcome Centre & Falls Crest Overlook",
      "Journey Behind the Falls Tunnel Portal",
      "Niagara Gorge Whirlpool Rapids",
      "Rainbow Bridge Cross-Border Vista"
    ],
    bestTimeToVisit: "June to September (Lush green mist and sunny weather)",
    climate: "Humid continental",
    audioNarration: "Welcome to Niagara Falls on the Canadian Ontario border. Experience the breathtaking power of the Horseshoe Falls, where over one hundred and sixty thousand cubic meters of glacier water plunge over the precipice every minute. Notice the luminous emerald hue created by dissolved glacial minerals, and feel the permanent cloud of mist rising hundreds of meters into the atmosphere.",
    ambientType: "breeze",
    viewpoints: [
      {
        id: "niagara-horseshoe",
        name: "Horseshoe Falls Crest Overlook",
        subtitle: "Standing at the thunderous brink of the Canadian cataract",
        panoramaUrl: "/panoramas/niagara-horseshoe.jpg",
        fallbackPanoramaUrl: "https://upload.wikimedia.org/wikipedia/commons/6/66/360_photo_Horseshoe_Falls_top_Niagara_Falls_Canada_2025-09-06_19-10-09_1.jpg",
        mapCoords: { x: 50, y: 75 },
        navLinks: [
          { targetId: "niagara-promenade", label: "Walk Forward along Promenade toward American Falls", position: { x: 0, y: -14, z: -32 }, direction: "forward" }
        ],
        hotspots: [
          {
            id: "nf-horseshoe-crest",
            title: "Horseshoe Cataract Lip",
            description: "Over 670 meters wide curve dropping 57 vertical meters.",
            position: { x: -16, y: -8, z: -28 },
            category: "Geology",
            details: "The deep emerald-green coloration is caused by dissolved minerals (rock flour) and salts pulverized by glacial friction."
          },
          {
            id: "nf-mist-cloud",
            title: "Permanent Atmospheric Mist Column",
            description: "Plume of water droplets ascending hundreds of meters.",
            position: { x: 0, y: 16, z: -30 },
            category: "Atmosphere",
            details: "Generates perpetual microclimate rainbows visible across both the Canadian and American riverbanks on sunny afternoons."
          }
        ]
      },
      {
        id: "niagara-promenade",
        name: "Niagara Riverwalk Promenade",
        subtitle: "Panoramic vista between Canadian Horseshoe and American Falls",
        panoramaUrl: "/panoramas/niagara-promenade.jpg",
        fallbackPanoramaUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e9/360_photo_between_Horseshoe_and_American_Falls_Niagara_Falls_Canada_2025-09-06_19-12-46_1.jpg",
        mapCoords: { x: 50, y: 25 },
        navLinks: [
          { targetId: "niagara-horseshoe", label: "Walk Backward to Horseshoe Falls Crest", position: { x: 0, y: -14, z: 32 }, direction: "backward" }
        ],
        hotspots: [
          {
            id: "nf-american-falls",
            title: "American & Bridal Veil Falls Vista",
            description: "Straight cataract wall across the international border in New York.",
            position: { x: 22, y: -4, z: -26 },
            category: "International Boundary",
            details: "Features a massive talus boulder slope at its base formed by rockfalls in 1931 and 1954."
          },
          {
            id: "nf-gorge-depth",
            title: "The Niagara Escarpment Gorge",
            description: "Deep river canyon carved over millennia into Silurian limestone and shale.",
            position: { x: 0, y: -10, z: -25 },
            category: "Hydrology",
            details: "The water rushes downstream through the Devil's Hole rapids into Lake Ontario at speeds reaching 40 km/h."
          }
        ]
      }
    ]
  },

  {
    id: "swiss-alps",
    name: "Swiss Alps: Ebenalp & Aescher",
    location: "Appenzell Innerrhoden, Switzerland",
    continent: "Europe",
    category: "Alpine Wonder",
    rating: 4.98,
    reviewsCount: 3950,
    duration: "25 min tour",
    coverImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80",
    description: "The crown jewel of the Alpstein massif in eastern Switzerland. Perched high above the Seealpsee lake, Ebenalp features pristine alpine limestone peaks and the legendary wooden Aescher guesthouse constructed into the sheer vertical cliffside.",
    googleStreetViewUrl: "https://www.google.com/maps/search/?api=1&query=47.283300,9.416700",
    coordinates: { lat: 47.2833, lng: 9.4167 },
    historicalFacts: [
      "The Wildkirchli caves nearby contain prehistoric evidence of Neanderthal habitation dating back over 40,000 years.",
      "The Aescher cliffside inn was originally built by hermit monks in the early 1800s before welcoming alpine hikers.",
      "Ebenalp's summit elevation reaches 1,640 meters (5,381 ft) above sea level with views extending to Lake Constance.",
      "Features traditional Swiss carillon bells and alpine pasture dairy farming preserved under strict heritage laws."
    ],
    attractions: [
      "Aescher-Wildkirchli Cliffside Wooden Chalet",
      "Ebenalp 360° Alpine Summit Vista",
      "Prehistoric Wildkirchli Cave Altars",
      "Seealpsee Emerald Glacial Basin"
    ],
    bestTimeToVisit: "June to October (Clear mountain trails and alpine flowers)",
    climate: "Alpine mountain climate",
    audioNarration: "Welcome to Ebenalp in the Swiss Alps, high above the pristine Seealpsee in eastern Switzerland. From this 1,640-meter mountain vantage point, gaze out across the dramatic limestone ridges of the Alpstein massif, and follow the cliffside trail leading to the historic wooden Aescher chalet nestled directly into the sheer rock face.",
    ambientType: "breeze",
    viewpoints: [
      {
        id: "swiss-ebenalp",
        name: "Ebenalp Alpine Summit Peak (1,640m)",
        subtitle: "Panoramic mountain ridge overlooking the Appenzell valleys",
        panoramaUrl: "/panoramas/swiss-alps-ebenalp.jpg",
        fallbackPanoramaUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Ebenalp_panosphere_20210528.jpg/3840px-Ebenalp_panosphere_20210528.jpg",
        mapCoords: { x: 50, y: 70 },
        navLinks: [
          { targetId: "swiss-aescher", label: "Walk Forward along Cliff Trail to Aescher Chalet", position: { x: 0, y: -14, z: -32 }, direction: "forward" }
        ],
        hotspots: [
          {
            id: "alpstein-massif",
            title: "The Alpstein Massif Ridge",
            description: "Folded Cretaceous limestone peaks stretching across eastern Switzerland.",
            position: { x: 18, y: 12, z: -30 },
            category: "Geology",
            details: "Formed during the Alpine orogeny when the African and Eurasian tectonic plates collided over 50 million years ago."
          },
          {
            id: "appenzell-valley",
            title: "Appenzell Green Valleys",
            description: "Lush rolling pastureland home to traditional Swiss alpine cheesemaking.",
            position: { x: -20, y: -10, z: -26 },
            category: "Landscape",
            details: "Known for the production of Appenzeller cheese, cured with a secret herbal brine recipe passed down for over 700 years."
          }
        ]
      },
      {
        id: "swiss-aescher",
        name: "Aescher-Wildkirchli Cliffside Chalet",
        subtitle: "Centuries-old wooden shelter clinging directly to the sheer rock wall",
        panoramaUrl: "/panoramas/swiss-alps-aescher.jpg",
        fallbackPanoramaUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Aecher-Wildkirchli_panosphere_20210528.jpg/3840px-Aecher-Wildkirchli_panosphere_20210528.jpg",
        mapCoords: { x: 50, y: 30 },
        navLinks: [
          { targetId: "swiss-ebenalp", label: "Walk Backward to Ebenalp Summit Plateau", position: { x: 0, y: -14, z: 32 }, direction: "backward" }
        ],
        hotspots: [
          {
            id: "aescher-inn",
            title: "Historic Aescher Guesthouse",
            description: "Timber-frame alpine lodge built directly under an overhanging limestone cliff.",
            position: { x: -14, y: 4, z: -26 },
            category: "Alpine Heritage",
            details: "Named by National Geographic as one of the world's most intriguing mountain retreats."
          },
          {
            id: "cave-shrine",
            title: "Wildkirchli Prehistoric Cave Path",
            description: "Natural cave passage leading through the mountain to an ancient chapel.",
            position: { x: 20, y: -2, z: -25 },
            category: "Prehistory",
            details: "Excavations in 1904 revealed cave bear bones and stone tools used by Paleolithic hunters 40,000 years ago."
          }
        ]
      }
    ]
  },

  {
    id: "colorado-rockies",
    name: "Rocky Mountains: Herman Lake Cirque",
    location: "Clear Creek County, Colorado, United States",
    continent: "Americas",
    category: "Mountain Wilderness",
    rating: 4.95,
    reviewsCount: 3120,
    duration: "15 min tour",
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    description: "An untouched alpine glacial tarn situated at 11,985 feet (3,653 meters) above sea level in the Arapaho National Forest. Flanked by Pettingell Peak and Herman Mountain directly along the Continental Divide of North America.",
    googleStreetViewUrl: "https://www.google.com/maps/search/?api=1&query=39.702000,-105.885000",
    coordinates: { lat: 39.7020, lng: -105.8850 },
    historicalFacts: [
      "Positioned along the Continental Divide where precipitation separates into the Atlantic and Pacific watersheds.",
      "The lake sits in a classic glacial cirque amphitheatre gouged by Pleistocene alpine glaciers.",
      "Surrounded by fragile alpine tundra ecosystem with wildflowers adapted to sub-zero winters and short 6-week summers.",
      "Named after early Colorado mining pioneer Herman, who prospected the Clear Creek gold and silver veins in the 1870s."
    ],
    attractions: [
      "Herman Lake Glacial Tarn Shoreline",
      "Pettingell Peak 13,553 ft Crest",
      "Continental Divide Tundra Pass",
      "Arapaho National Forest Glacial Basin"
    ],
    bestTimeToVisit: "July to September (Wildflower bloom and snowmelt)",
    climate: "Subalpine alpine tundra",
    audioNarration: "Welcome to Herman Lake in the Colorado Rocky Mountains. Standing nearly twelve thousand feet above sea level directly along the Continental Divide, look around this pristine alpine glacial cirque, framed by the rugged granite peaks of Pettingell Mountain and carpets of delicate alpine tundra wildflowers.",
    ambientType: "breeze",
    viewpoints: [
      {
        id: "rockies-herman",
        name: "Herman Lake Glacial Shoreline (11,985 ft)",
        subtitle: "Pristine high-altitude alpine lake along the Continental Divide",
        panoramaUrl: "/panoramas/usa-colorado-rockies.jpg",
        fallbackPanoramaUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Photosphere_of_Herman_Lake%2C_Colorado.jpg/3840px-Photosphere_of_Herman_Lake%2C_Colorado.jpg",
        mapCoords: { x: 50, y: 50 },
        navLinks: [],
        hotspots: [
          {
            id: "pettingell-peak",
            title: "Pettingell Peak (13,553 ft / 4,131 m)",
            description: "Towering granitic headwall forming the western rim of the cirque.",
            position: { x: 0, y: 22, z: -30 },
            category: "Peak",
            details: "Composed of 1.7-billion-year-old Precambrian gneiss and granite uplifted during the Laramide orogeny."
          },
          {
            id: "tarn-waters",
            title: "Alpine Glacial Tarn Waters",
            description: "Crystal clear snowmelt pool fed by winter cirque snowpack.",
            position: { x: -16, y: -12, z: -24 },
            category: "Limnology",
            details: "Remains frozen under thick ice for over eight months of the year from October through late June."
          }
        ]
      }
    ]
  },

  {
    id: "snowy-mountains",
    name: "Mount Kosciuszko National Park",
    location: "New South Wales, Australia",
    continent: "Oceania",
    category: "National Park",
    rating: 4.93,
    reviewsCount: 2890,
    duration: "15 min tour",
    coverImage: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80",
    description: "The rugged alpine wilderness of mainland Australia's highest mountain range. Containing Mount Kosciuszko (2,228m), glacial cirques, ancient snow gums, and rare alpine wetlands found nowhere else in the Southern Hemisphere.",
    googleStreetViewUrl: "https://www.google.com/maps/search/?api=1&query=-36.455000,148.263000",
    coordinates: { lat: -36.4550, lng: 148.2630 },
    historicalFacts: [
      "Named in 1840 by Polish explorer Paweł Edmund Strzelecki in honour of Polish freedom fighter General Tadeusz Kościuszko.",
      "The traditional homeland of the Ngarigo and Walgalu Aboriginal peoples, who gathered here for seasonal Bogong moth feasts for thousands of years.",
      "Contains mainland Australia's only five glacial lakes, including Lake Cootapatamba and Blue Lake.",
      "Home to ancient twisted Snow Gum trees (Eucalyptus pauciflora) capable of withstanding heavy snowloads and sub-zero blizzard winds."
    ],
    attractions: [
      "Kosciuszko Alpine Plateau Walkway",
      "Ramshead Range Granite Tors",
      "Snow Gum Woodland Forest",
      "Snowy River Headwaters"
    ],
    bestTimeToVisit: "December to March (Alpine summer wildflower season)",
    climate: "Alpine oceanic",
    audioNarration: "Welcome to Mount Kosciuszko National Park in New South Wales, Australia. Exploring the roof of the Australian continent, look across the weathered granite tors sculpted over millions of years by wind and ice, and observe the resilient snow gum woodlands flourishing in this unique high-altitude wilderness.",
    ambientType: "breeze",
    viewpoints: [
      {
        id: "aus-kosciuszko",
        name: "Snowy Mountains Alpine Plateau",
        subtitle: "Panoramic tor vista across Australia's roof",
        panoramaUrl: "/panoramas/australia-snowy-mountains.jpg",
        fallbackPanoramaUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Kosciuszko_National_Park_%2852035336413%29.jpg/3840px-Kosciuszko_National_Park_%2852035336413%29.jpg",
        mapCoords: { x: 50, y: 50 },
        navLinks: [],
        hotspots: [
          {
            id: "granite-tors",
            title: "Weathered Granite Tors",
            description: "Exposed rock monoliths sculpted by wind, frost wedging, and ice.",
            position: { x: 18, y: -2, z: -26 },
            category: "Geomorphology",
            details: "Formed deep underground 400 million years ago and gradually exposed as softer overlying strata eroded away."
          },
          {
            id: "snow-gum-habitat",
            title: "Subalpine Snow Gum Canopy",
            description: "Hardy eucalyptus with distinctive multicolored peeling bark.",
            position: { x: -22, y: 0, z: -25 },
            category: "Flora",
            details: "Remarkably resilient trees whose leaves hang vertically to minimize intense high-altitude ultraviolet radiation."
          }
        ]
      }
    ]
  }
];

// Helper: Safely get active viewpoint with fallback
export function getActiveViewpoint(destination, viewpointId) {
  if (!destination || !destination.viewpoints || destination.viewpoints.length === 0) {
    return {
      id: "default",
      name: destination?.name || "Viewpoint",
      panoramaUrl: destination?.panoramaUrl || "/panoramas/taj-mahal.jpg",
      hotspots: destination?.hotspots || [],
      navLinks: []
    };
  }
  const found = destination.viewpoints.find((v) => v.id === viewpointId);
  return found || destination.viewpoints[0];
}

// Helper: Safely get all hotspots for a destination
export function getDestinationHotspots(destination) {
  if (!destination) return [];
  if (destination.hotspots && destination.hotspots.length > 0) {
    return destination.hotspots;
  }
  if (destination.viewpoints && destination.viewpoints.length > 0) {
    return destination.viewpoints.flatMap((v) => v.hotspots || []);
  }
  return [];
}

export const CATEGORIES = [
  "All",
  "Historical Wonder",
  "Ancient Monument",
  "Natural Wonder",
  "Alpine Wonder",
  "Mountain Wilderness",
  "National Park",
  "Modern Icon",
  "Art & Heritage",
  "Gothic Sanctuary",
  "Urban Architecture"
];

export const CONTINENTS = [
  "All",
  "Asia",
  "Europe",
  "Americas",
  "Oceania"
];
