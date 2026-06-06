const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const db = new PrismaClient();

const DEMO_EMAIL = "demo@globalhaven.com";
const DEMO_PASSWORD = "GlobalHaven2024!";

const listings = [
  // ─── BEACH ──────────────────────────────────────────────────────────────
  {
    title: "Beachfront Villa — Miami Shores",
    description: "Wake up to panoramic Atlantic views in this stunning 3-bedroom beachfront villa. Private deck, outdoor shower, and direct beach access steps from your door. Perfect for families and couples seeking sun-soaked luxury.",
    imageSrc: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    category: "Beach", roomCount: 3, bathroomCount: 2, guestCount: 6, price: 420,
    country: "United States", region: "Florida", latlng: [25, -80],
  },
  {
    title: "Amalfi Cliffside Sea House",
    description: "Perched dramatically on the Amalfi Coast with terraced gardens cascading to the sea. Terracotta tiles, hand-painted ceramics, and a lemon grove make this an authentic Italian escape like no other.",
    imageSrc: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
    category: "Beach", roomCount: 2, bathroomCount: 2, guestCount: 4, price: 380,
    country: "Italy", region: "Campania", latlng: [40, 14],
  },
  {
    title: "Costa del Sol Beachside Retreat",
    description: "Sun-bleached walls, mosaic fountains, and a private infinity pool overlooking the Mediterranean. This Andalusian beach house sleeps six in style with a fully equipped outdoor kitchen.",
    imageSrc: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&q=80",
    category: "Beach", roomCount: 3, bathroomCount: 3, guestCount: 6, price: 310,
    country: "Spain", region: "Andalusia", latlng: [36, -5],
  },
  {
    title: "Sydney Northern Beaches Hideaway",
    description: "A surf-lovers paradise on the Northern Beaches — steps from Manly Beach. Modern interiors, a rooftop deck with city views, and an easy ferry ride to the CBD. Boards provided.",
    imageSrc: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
    category: "Beach", roomCount: 2, bathroomCount: 1, guestCount: 4, price: 260,
    country: "Australia", region: "New South Wales", latlng: [-33, 151],
  },
  {
    title: "Malibu Pacific Coast Retreat",
    description: "Hollywood royalty has stayed here. This Malibu gem sits on a bluff above the Pacific with a cantilevered deck, designer interiors, and uninterrupted ocean sunsets.",
    imageSrc: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
    category: "Beach", roomCount: 4, bathroomCount: 3, guestCount: 8, price: 790,
    country: "United States", region: "California", latlng: [34, -119],
  },

  // ─── CITY ───────────────────────────────────────────────────────────────
  {
    title: "Manhattan SoHo Luxury Loft",
    description: "Cast-iron columns, exposed brick, and 14-foot ceilings in one of SoHo's most coveted buildings. Walking distance to the best galleries, restaurants, and boutiques NYC has to offer.",
    imageSrc: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    category: "City", roomCount: 2, bathroomCount: 2, guestCount: 4, price: 560,
    country: "United States", region: "New York", latlng: [40, -74],
  },
  {
    title: "Le Marais Parisian Apartment",
    description: "A pied-à-terre in the heart of Le Marais — Paris's most fashionable neighbourhood. Parquet floors, a marble fireplace, and a private courtyard terrace. Moments from the Picasso Museum.",
    imageSrc: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    category: "City", roomCount: 2, bathroomCount: 1, guestCount: 3, price: 295,
    country: "France", region: "Île-de-France", latlng: [48, 2],
  },
  {
    title: "Shinjuku Designer Studio — Tokyo",
    description: "Minimalist Japanese design meets urban convenience in this architect-designed studio in Shinjuku. Walking distance to Kabukicho, the Golden Gai, and Shinjuku Gyoen National Garden.",
    imageSrc: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    category: "City", roomCount: 1, bathroomCount: 1, guestCount: 2, price: 175,
    country: "Japan", region: "Tokyo", latlng: [35, 139],
  },
  {
    title: "Mitte Loft — Berlin",
    description: "Industrial-chic in the heart of Berlin's cultural corridor. Polished concrete, floor-to-ceiling windows overlooking a leafy courtyard, and a Nespresso machine that means business.",
    imageSrc: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
    category: "City", roomCount: 2, bathroomCount: 1, guestCount: 4, price: 210,
    country: "Germany", region: "Berlin", latlng: [52, 13],
  },
  {
    title: "Trastevere Rooftop Apartment — Rome",
    description: "Cobblestones below, a private rooftop terrace above with views over Rome's terracotta rooftops to St. Peter's dome. This Trastevere apartment is everything a Roman holiday should be.",
    imageSrc: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80",
    category: "City", roomCount: 2, bathroomCount: 1, guestCount: 4, price: 240,
    country: "Italy", region: "Lazio", latlng: [41, 12],
  },

  // ─── MODERN ─────────────────────────────────────────────────────────────
  {
    title: "Beverly Hills Glass House",
    description: "A striking modernist statement in the Hollywood Hills. Walls of glass, a cantilevered pool, and an open-plan living space designed by a Pritzker-shortlisted architect. Views from downtown LA to the ocean.",
    imageSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    category: "Modern", roomCount: 4, bathroomCount: 4, guestCount: 8, price: 1200,
    country: "United States", region: "California", latlng: [34, -118],
  },
  {
    title: "Munich Contemporary Villa",
    description: "Award-winning architecture in one of Munich's finest residential addresses. White render, Brazilian hardwood, and a heated indoor pool — designed for those who live well.",
    imageSrc: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    category: "Modern", roomCount: 5, bathroomCount: 4, guestCount: 10, price: 850,
    country: "Germany", region: "Bavaria", latlng: [48, 11],
  },
  {
    title: "Sydney Harbour View Penthouse",
    description: "Three storeys of glass above Sydney Harbour with a private rooftop terrace and plunge pool. Watch the Opera House light up at night from your living room while sipping Barossa Valley Shiraz.",
    imageSrc: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    category: "Modern", roomCount: 3, bathroomCount: 3, guestCount: 6, price: 950,
    country: "Australia", region: "New South Wales", latlng: [-33, 151],
  },
  {
    title: "Barcelona Diagonal Mar Flat",
    description: "Floor-to-ceiling windows, a wraparound terrace, and Zaha Hadid-inspired interiors overlooking the sea. Minutes from the beach and within walking distance of the El Born cultural scene.",
    imageSrc: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    category: "Modern", roomCount: 3, bathroomCount: 2, guestCount: 6, price: 420,
    country: "Spain", region: "Catalonia", latlng: [41, 2],
  },

  // ─── COUNTRYSIDE ────────────────────────────────────────────────────────
  {
    title: "Tuscan Stone Farmhouse — Val d'Orcia",
    description: "A 16th-century stone farmhouse surrounded by rolling Tuscan hills, olive groves, and medieval hilltowns. Swim in the natural stone pool, cook in the original fireplace kitchen, and live la dolce vita.",
    imageSrc: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80",
    category: "Countryside", roomCount: 4, bathroomCount: 3, guestCount: 8, price: 490,
    country: "Italy", region: "Tuscany", latlng: [43, 11],
  },
  {
    title: "Provence Lavender Farm Villa",
    description: "Lavender fields as far as the eye can see surround this sun-warmed Provençal mas. A pool shaded by ancient plane trees, outdoor dining terrace, and an herb garden you're encouraged to raid.",
    imageSrc: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80",
    category: "Countryside", roomCount: 5, bathroomCount: 3, guestCount: 10, price: 530,
    country: "France", region: "Provence", latlng: [43, 5],
  },
  {
    title: "Bavaria Alpine Farmhouse",
    description: "Geraniums spill from the window boxes of this traditional Bavarian farmhouse, surrounded by wildflower meadows and mountain views. A wood-fired sauna, cow bells at dusk, and fresh milk from the farm next door.",
    imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    category: "Countryside", roomCount: 3, bathroomCount: 2, guestCount: 6, price: 285,
    country: "Germany", region: "Bavaria", latlng: [47, 11],
  },
  {
    title: "Cotswolds Honey-Stone Cottage",
    description: "Hollyhocks outside, inglenook fireplace within. This quintessentially English Cotswolds cottage sits in a village that time forgot, with a pub within walking distance and gardens backing onto open farmland.",
    imageSrc: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    category: "Countryside", roomCount: 2, bathroomCount: 1, guestCount: 4, price: 220,
    country: "United States", region: "Vermont", latlng: [44, -73],
  },

  // ─── POOLS ──────────────────────────────────────────────────────────────
  {
    title: "Mykonos Infinity Pool Villa",
    description: "Pure white Cycladic architecture with an infinity pool that melts into the Aegean. Watch the sun set behind the Little Venice windmills from your private terrace with a glass of Assyrtiko.",
    imageSrc: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=80",
    category: "Pools", roomCount: 3, bathroomCount: 3, guestCount: 6, price: 720,
    country: "Italy", region: "Sardinia", latlng: [40, 9],
  },
  {
    title: "Palm Springs Desert Pool Estate",
    description: "A 1960s midcentury masterpiece fully restored — kidney-shaped pool, citrus trees, and shag-carpet-free designer interiors. The San Jacinto Mountains form a dramatic backdrop to every swim.",
    imageSrc: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
    category: "Pools", roomCount: 4, bathroomCount: 3, guestCount: 8, price: 590,
    country: "United States", region: "California", latlng: [33, -116],
  },
  {
    title: "Ibiza Villa with Saltwater Pool",
    description: "Secluded in the pine forests of Santa Eulalia, this whitewashed villa has a heated saltwater pool, outdoor cinema screen, and a chef's kitchen stocked with local olive oil and herbs.",
    imageSrc: "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=800&q=80",
    category: "Pools", roomCount: 5, bathroomCount: 4, guestCount: 10, price: 650,
    country: "Spain", region: "Balearic Islands", latlng: [38, 1],
  },
  {
    title: "Gold Coast Hinterland Pool Retreat",
    description: "A cantilevered deck and vanishing-edge pool hang over rainforest canopy in the Gold Coast Hinterland. Koalas in the trees, waterfalls a short drive away, and a spa bath under the stars.",
    imageSrc: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
    category: "Pools", roomCount: 3, bathroomCount: 2, guestCount: 6, price: 380,
    country: "Australia", region: "Queensland", latlng: [-28, 153],
  },

  // ─── ISLANDS ────────────────────────────────────────────────────────────
  {
    title: "Santorini Caldera Cave House",
    description: "Built into the volcanic cliff face with the caldera and Aegean stretching to the horizon. A private plunge pool, cave bedroom, and the most spectacular sunrise on earth.",
    imageSrc: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=80",
    category: "Islands", roomCount: 1, bathroomCount: 1, guestCount: 2, price: 650,
    country: "Italy", region: "Sicily", latlng: [37, 14],
  },
  {
    title: "Capri Clifftop Villa",
    description: "Terracotta-potted bougainvillea frames the view from this Capri villa to the Faraglioni rocks. Take the chairlift to Anacapri, explore hidden grottoes, and return to a private terrace dinner.",
    imageSrc: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    category: "Islands", roomCount: 3, bathroomCount: 2, guestCount: 6, price: 820,
    country: "Italy", region: "Campania", latlng: [40, 14],
  },
  {
    title: "Whitsundays Island Retreat",
    description: "An eco-luxury retreat on a private island in the Whitsundays. Solar-powered bungalows, snorkelling from the beach, and the Great Barrier Reef 20 minutes by boat.",
    imageSrc: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&q=80",
    category: "Islands", roomCount: 2, bathroomCount: 2, guestCount: 4, price: 480,
    country: "Australia", region: "Queensland", latlng: [-20, 149],
  },
  {
    title: "Okinawa Traditional Villa",
    description: "A restored Ryukyuan-style villa on a quiet stretch of Okinawa's emerald coast. Red-tiled roof, shisa lion guardians, and crystal-clear water perfect for sea kayaking and snorkelling.",
    imageSrc: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    category: "Islands", roomCount: 3, bathroomCount: 2, guestCount: 6, price: 340,
    country: "Japan", region: "Okinawa", latlng: [26, 127],
  },

  // ─── LAKE ───────────────────────────────────────────────────────────────
  {
    title: "Lake Tahoe Pine Lodge",
    description: "A soaring timber-framed lodge on the shores of Lake Tahoe with a private dock, kayaks, and paddleboards. After dark, the Milky Way puts on a show that city dwellers forget is possible.",
    imageSrc: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
    category: "Lake", roomCount: 4, bathroomCount: 3, guestCount: 8, price: 540,
    country: "United States", region: "California", latlng: [39, -120],
  },
  {
    title: "Lake Como Grand Villa",
    description: "Marble columns, frescoed ceilings, and a private boat mooring on Lake Como. Where George Clooney holidays — a place of cinematic beauty and absolute serenity.",
    imageSrc: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
    category: "Lake", roomCount: 6, bathroomCount: 5, guestCount: 12, price: 1450,
    country: "Italy", region: "Lombardy", latlng: [45, 9],
  },
  {
    title: "Bavarian Lake Chalet",
    description: "A flower-bedecked chalet on the shores of the Tegernsee, with a rowing boat, fishing pier, and views of snowcapped Alps reflected in still water. Breakfast includes local trout caught that morning.",
    imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    category: "Lake", roomCount: 3, bathroomCount: 2, guestCount: 6, price: 320,
    country: "Germany", region: "Bavaria", latlng: [47, 11],
  },
  {
    title: "Lake Annecy French Chateau",
    description: "A 19th-century lakeside chateau with manicured gardens, private beach, and views across the clearest lake in Europe to the Haute-Savoie Alps. Tennis court and a wine cellar worth exploring.",
    imageSrc: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    category: "Lake", roomCount: 5, bathroomCount: 4, guestCount: 10, price: 780,
    country: "France", region: "Auvergne-Rhône-Alpes", latlng: [45, 6],
  },

  // ─── SKIING ─────────────────────────────────────────────────────────────
  {
    title: "Aspen Slope-Side Ski Lodge",
    description: "Ski-in, ski-out access from the front door of this timber and stone mountain lodge in Aspen. A vaulted living room with a stone fireplace, a hot tub, and a wine fridge stocked with Colorado reds.",
    imageSrc: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
    category: "Skiing", roomCount: 5, bathroomCount: 4, guestCount: 10, price: 1100,
    country: "United States", region: "Colorado", latlng: [39, -107],
  },
  {
    title: "Garmisch Alpine Ski Chalet",
    description: "Hand-carved balconies and painted facade in Germany's premier ski resort town, at the foot of the Zugspitze. Après-ski in the village, a private sauna at home.",
    imageSrc: "https://images.unsplash.com/photo-1548777123-e216912df7d8?w=800&q=80",
    category: "Skiing", roomCount: 4, bathroomCount: 3, guestCount: 8, price: 620,
    country: "Germany", region: "Bavaria", latlng: [47, 11],
  },
  {
    title: "Niseko Powder Snow Chalet — Japan",
    description: "Hokkaido's legendary powder snow is steps away from this beautifully designed mountain chalet. An indoor onsen bath, tatami lounge, and the most reliable champagne powder on the planet.",
    imageSrc: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
    category: "Skiing", roomCount: 3, bathroomCount: 2, guestCount: 6, price: 490,
    country: "Japan", region: "Hokkaido", latlng: [42, 140],
  },
  {
    title: "Chamonix Mont-Blanc Ski Retreat",
    description: "Directly below Mont-Blanc, Europe's highest peak. A converted farmhouse with a fireplace, outdoor hot tub, and ski-in access to the legendary Vallée Blanche glacier run.",
    imageSrc: "https://images.unsplash.com/photo-1520208422220-d12a3c588e6c?w=800&q=80",
    category: "Skiing", roomCount: 4, bathroomCount: 3, guestCount: 8, price: 720,
    country: "France", region: "Haute-Savoie", latlng: [45, 6],
  },

  // ─── CASTLES ────────────────────────────────────────────────────────────
  {
    title: "Rhineland Medieval Castle",
    description: "A fully restored 12th-century castle tower above the Rhine Valley vineyards. Thick stone walls, a great hall with tapestries, and a dungeon-turned-wine-cellar stocked for your arrival.",
    imageSrc: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "Castles", roomCount: 6, bathroomCount: 5, guestCount: 12, price: 980,
    country: "Germany", region: "Rhineland-Palatinate", latlng: [50, 7],
  },
  {
    title: "Loire Valley Château",
    description: "A private wing of a classified Loire Valley château, surrounded by a moat and 18 hectares of formal French gardens. Breakfast delivered by a butler, dinner under the ancient vaulted ceiling.",
    imageSrc: "https://images.unsplash.com/photo-1569172122301-3e8c8b4dd8a7?w=800&q=80",
    category: "Castles", roomCount: 4, bathroomCount: 3, guestCount: 8, price: 860,
    country: "France", region: "Loire Valley", latlng: [47, 0],
  },
  {
    title: "Bavarian Neuschwanstein Estate",
    description: "A hunting lodge on the private estate adjacent to Neuschwanstein Castle. Antler chandeliers, hunting trophies, and a turreted reading tower with views of the fairy-tale castle across the valley.",
    imageSrc: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
    category: "Castles", roomCount: 5, bathroomCount: 4, guestCount: 10, price: 750,
    country: "Germany", region: "Bavaria", latlng: [47, 10],
  },
  {
    title: "Scottish Highland Tower Castle",
    description: "Your own private tower castle in the Cairngorms National Park. Four-poster beds in each turret room, a great room with a roaring log fire, and red deer grazing at dawn outside your window.",
    imageSrc: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    category: "Castles", roomCount: 4, bathroomCount: 3, guestCount: 8, price: 690,
    country: "United States", region: "Maine", latlng: [44, -69],
  },

  // ─── CABINS ─────────────────────────────────────────────────────────────
  {
    title: "Rocky Mountain Log Cabin — Colorado",
    description: "Hand-hewn logs, a stone fireplace that dominates the living room, and a wraparound porch from which elk are a daily sight. Snowshoeing from the door in winter, wildflower meadows in summer.",
    imageSrc: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
    category: "Cabins", roomCount: 3, bathroomCount: 2, guestCount: 6, price: 350,
    country: "United States", region: "Colorado", latlng: [39, -106],
  },
  {
    title: "Black Forest Timber Cabin — Schwarzwald",
    description: "A traditional half-timbered Schwarzwald cabin surrounded by dense fir forests and wildflower meadows. Cuckoo clock on the wall, homemade Schwarzwälder Kirschtorte in the fridge.",
    imageSrc: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    category: "Cabins", roomCount: 2, bathroomCount: 1, guestCount: 4, price: 195,
    country: "Germany", region: "Baden-Württemberg", latlng: [48, 8],
  },
  {
    title: "Japanese Mountain Kominka",
    description: "A beautifully restored 200-year-old kominka (traditional farmhouse) in the Japanese Alps. Irori sunken hearth, hand-plastered walls, and a soaking tub with mountain views.",
    imageSrc: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80",
    category: "Cabins", roomCount: 3, bathroomCount: 2, guestCount: 6, price: 280,
    country: "Japan", region: "Nagano", latlng: [36, 137],
  },
  {
    title: "Siberian Taiga Log Retreat",
    description: "A hand-built cedar log cabin deep in the Siberian taiga, on the banks of a salmon river. Banya (Russian sauna), fishing rods, and a complete digital detox experience.",
    imageSrc: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?w=800&q=80",
    category: "Cabins", roomCount: 2, bathroomCount: 1, guestCount: 4, price: 230,
    country: "Russia", region: "Siberia", latlng: [60, 73],
  },

  // ─── CAMPING ────────────────────────────────────────────────────────────
  {
    title: "Grand Canyon Rim Glamping Tent",
    description: "A luxury safari tent on the South Rim of the Grand Canyon with king bed, Persian rugs, and a wood-burning stove. Watch condors soar over one of the world's great wonders from your private deck.",
    imageSrc: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
    category: "Camping", roomCount: 1, bathroomCount: 1, guestCount: 2, price: 420,
    country: "United States", region: "Arizona", latlng: [36, -112],
  },
  {
    title: "Tuscany Vineyard Glamping",
    description: "Canvas tents set among working Chianti Classico vines in the Val d'Elsa. Breakfast of local pecorino and prosciutto, morning yoga on the terrace, and evening wine tastings in the cantina.",
    imageSrc: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80",
    category: "Camping", roomCount: 1, bathroomCount: 1, guestCount: 2, price: 195,
    country: "Italy", region: "Tuscany", latlng: [43, 11],
  },
  {
    title: "Schwarzwald Forest Camp — Germany",
    description: "Four luxury bell tents in a private Black Forest clearing with an outdoor kitchen, fire pit, and a wood-fired hot tub heated each evening. Fireflies in summer, snow in winter — both magical.",
    imageSrc: "https://images.unsplash.com/photo-1533873984035-25970ab07461?w=800&q=80",
    category: "Camping", roomCount: 1, bathroomCount: 1, guestCount: 2, price: 165,
    country: "Germany", region: "Baden-Württemberg", latlng: [48, 8],
  },
  {
    title: "Outback Star Camp — Northern Territory",
    description: "Sleep under the most spectacular starfield on earth at this remote outback camp. Guided walks, indigenous art experiences, and the knowledge that the nearest city is 500km away.",
    imageSrc: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80",
    category: "Camping", roomCount: 1, bathroomCount: 1, guestCount: 3, price: 280,
    country: "Australia", region: "Northern Territory", latlng: [-23, 133],
  },

  // ─── ARCTIC ─────────────────────────────────────────────────────────────
  {
    title: "Karelia Aurora Glass Cabin",
    description: "A glass-roofed cabin in the Russian Karelian wilderness — lie in bed and watch the Northern Lights dance overhead without leaving your duvet. Reindeer sleigh rides and ice fishing included.",
    imageSrc: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
    category: "Arctic", roomCount: 1, bathroomCount: 1, guestCount: 2, price: 590,
    country: "Russia", region: "Karelia", latlng: [62, 31],
  },
  {
    title: "Hokkaido Ice Hotel Suite",
    description: "A carved-ice suite in Japan's northernmost island — walls of sculpted ice, reindeer furs for bedding, and an ice bar serving Hokkaido whisky. The surrounding landscape is a winter wonderland.",
    imageSrc: "https://images.unsplash.com/photo-1520176098027-f09f5b7d2bdc?w=800&q=80",
    category: "Arctic", roomCount: 1, bathroomCount: 1, guestCount: 2, price: 480,
    country: "Japan", region: "Hokkaido", latlng: [43, 142],
  },
  {
    title: "Alaska Wilderness Retreat",
    description: "A remote lodge accessible only by floatplane, on a lake surrounded by grizzlies, bald eagles, and salmon runs. Summer brings the midnight sun; fall the aurora. Both unforgettable.",
    imageSrc: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    category: "Arctic", roomCount: 3, bathroomCount: 2, guestCount: 6, price: 890,
    country: "United States", region: "Alaska", latlng: [64, -153],
  },

  // ─── DESERT ─────────────────────────────────────────────────────────────
  {
    title: "Sedona Red Rock Adobe Villa",
    description: "A southwest adobe surrounded by Sedona's cathedral red rocks. A vortex site reputed for spiritual energy, a private plunge pool cooled by a desert breeze, and sunsets that turn the sky molten.",
    imageSrc: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
    category: "Desert", roomCount: 3, bathroomCount: 2, guestCount: 6, price: 420,
    country: "United States", region: "Arizona", latlng: [34, -111],
  },
  {
    title: "Marrakech Desert Riad",
    description: "A restored riad in the old medina with a courtyard fountain, hand-painted zellige tiles, and rooftop terrace overlooking a sea of terracotta rooftops to the snow-capped High Atlas.",
    imageSrc: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&q=80",
    category: "Desert", roomCount: 4, bathroomCount: 3, guestCount: 8, price: 310,
    country: "Spain", region: "Andalusia", latlng: [37, -6],
  },
  {
    title: "Sonoran Desert Luxury Dome",
    description: "Geodesic domes with panoramic desert views, outdoor showers under the stars, and a private chef who forages local ingredients. Coyotes howl at moonrise; hummingbirds at dawn.",
    imageSrc: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    category: "Desert", roomCount: 1, bathroomCount: 1, guestCount: 2, price: 360,
    country: "United States", region: "Arizona", latlng: [32, -111],
  },
  {
    title: "Almería Desert Film Location Home",
    description: "A sun-bleached cortijo in the Tabernas Desert — Europe's only true desert and location for countless spaghetti westerns. A private pool, orange and almond trees, and utter tranquility.",
    imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    category: "Desert", roomCount: 3, bathroomCount: 2, guestCount: 6, price: 255,
    country: "Spain", region: "Andalusia", latlng: [37, -2],
  },

  // ─── VINEYARD ───────────────────────────────────────────────────────────
  {
    title: "Chianti Classico Wine Estate",
    description: "Stay in the original estate house of a centuries-old Chianti Classico winery. Organic wine tastings, truffle hunts, and a clay-pot swimming pool among the vines. Breakfast features estate olive oil and honey.",
    imageSrc: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
    category: "Vineyard", roomCount: 4, bathroomCount: 3, guestCount: 8, price: 520,
    country: "Italy", region: "Tuscany", latlng: [43, 11],
  },
  {
    title: "Napa Valley Vineyard Cottage",
    description: "A weatherboard cottage at the end of a long oak-lined drive, surrounded by premium Cabernet Sauvignon vines in the heart of Napa Valley. Private wine cellar and vintage tasting included.",
    imageSrc: "https://images.unsplash.com/photo-1506377872008-6645d9d29ef7?w=800&q=80",
    category: "Vineyard", roomCount: 2, bathroomCount: 2, guestCount: 4, price: 480,
    country: "United States", region: "California", latlng: [38, -122],
  },
  {
    title: "Saint-Émilion Bordeaux Château",
    description: "A working Bordeaux château with Grand Cru Classé classification. Stay in the historic chai converted to luxury suites, surrounded by perfectly manicured Merlot vines and rolling Gironde countryside.",
    imageSrc: "https://images.unsplash.com/photo-1543158181-e6f9f6712055?w=800&q=80",
    category: "Vineyard", roomCount: 3, bathroomCount: 2, guestCount: 6, price: 590,
    country: "France", region: "Bordeaux", latlng: [44, -0],
  },
  {
    title: "Mosel Valley Riesling Estate",
    description: "Steep slate slopes above the looping Mosel River are home to this 18th-century Riesling estate. The slate-roofed guesthouse sleeps six and comes with a basement Vinothek of estate wines.",
    imageSrc: "https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=800&q=80",
    category: "Vineyard", roomCount: 3, bathroomCount: 2, guestCount: 6, price: 345,
    country: "Germany", region: "Rhineland-Palatinate", latlng: [50, 7],
  },

  // ─── WINDMILLS ──────────────────────────────────────────────────────────
  {
    title: "La Mancha Windmill Retreat — Spain",
    description: "Don Quixote's windmills are your neighbours at this converted Castilian windmill on the plateau of La Mancha. A round living room in the tower, saffron fields all around, and a silence so deep you hear yourself think.",
    imageSrc: "https://images.unsplash.com/photo-1596367418895-a5a2e78b11c9?w=800&q=80",
    category: "Windmills", roomCount: 2, bathroomCount: 1, guestCount: 4, price: 195,
    country: "Spain", region: "Castilla-La Mancha", latlng: [39, -3],
  },
  {
    title: "Pampow Converted Mill — Germany",
    description: "A 19th-century grain windmill converted into a spectacular living space. The circular rooms stack four stories tall, with original mill machinery preserved as art and a rooftop terrace at the top.",
    imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    category: "Windmills", roomCount: 3, bathroomCount: 2, guestCount: 5, price: 225,
    country: "Germany", region: "Mecklenburg", latlng: [53, 11],
  },
  {
    title: "Crete Windmill Hillside Home",
    description: "A restored Cretan windmill with a conical thatched roof and panoramic Aegean views. White-domed villages tumble down the hillside below; the scent of thyme fills every room.",
    imageSrc: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80",
    category: "Windmills", roomCount: 1, bathroomCount: 1, guestCount: 2, price: 165,
    country: "Italy", region: "Sicily", latlng: [37, 14],
  },

  // ─── BARNS ──────────────────────────────────────────────────────────────
  {
    title: "Vermont Timber Frame Barn",
    description: "A soaring 1840s post-and-beam barn transformed into a warm and contemporary family home. The original haymow is now a mezzanine bedroom; a wood stove dominates the double-height living space.",
    imageSrc: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    category: "Barns", roomCount: 3, bathroomCount: 2, guestCount: 6, price: 320,
    country: "United States", region: "Vermont", latlng: [44, -72],
  },
  {
    title: "Normandy Apple Barn",
    description: "A half-timbered Normandy barn with a cider press on the ground floor converted to a games room. Apple trees surround the property; the local calvados is exceptional; the silence is total.",
    imageSrc: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    category: "Barns", roomCount: 4, bathroomCount: 2, guestCount: 8, price: 275,
    country: "France", region: "Normandy", latlng: [49, 0],
  },
  {
    title: "Bavaria Scheune Farmstead",
    description: "A converted Alpine barn (Scheune) in the Berchtesgadener Land national park, with original wooden beams, traditional painted furniture, and cows in the meadow directly below your window.",
    imageSrc: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80",
    category: "Barns", roomCount: 3, bathroomCount: 2, guestCount: 6, price: 260,
    country: "Germany", region: "Bavaria", latlng: [47, 13],
  },

  // ─── CAVES ──────────────────────────────────────────────────────────────
  {
    title: "Matera Sassi Cave Dwelling",
    description: "One of Europe's most extraordinary addresses — a 9,000-year-old cave dwelling in Matera's ancient Sassi quarter, a UNESCO World Heritage Site. Stone vaults, a roof terrace, and a civilisation beneath your feet.",
    imageSrc: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    category: "Caves", roomCount: 2, bathroomCount: 1, guestCount: 4, price: 280,
    country: "Italy", region: "Basilicata", latlng: [40, 16],
  },
  {
    title: "Cappadocia Rock Cave Suite",
    description: "Carved deep into a volcanic tufa cone overlooking the Göreme valley in Cappadocia. Hot-air balloons drift past your window at dawn; the interior is a treasure-chest of Ottoman antiques.",
    imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    category: "Caves", roomCount: 2, bathroomCount: 2, guestCount: 4, price: 310,
    country: "Italy", region: "Sardinia", latlng: [40, 9],
  },
  {
    title: "Andalusian Cave House — Guadix",
    description: "A family cave house in the white troglodyte village of Guadix — naturally cool in summer, naturally warm in winter. Whitewashed walls, bright Andalusian tiles, and a rooftop terrace with mountain views.",
    imageSrc: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
    category: "Caves", roomCount: 2, bathroomCount: 1, guestCount: 4, price: 145,
    country: "Spain", region: "Andalusia", latlng: [37, -3],
  },

  // ─── APARTMENTS ─────────────────────────────────────────────────────────
  {
    title: "Park Avenue Luxury Apartment — NYC",
    description: "White-glove building on Park Avenue with a 24-hour doorman, private gym, and a beautifully appointed 3-bedroom apartment with skyline views. Everything you expect from New York's best address.",
    imageSrc: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    category: "Apartments", roomCount: 3, bathroomCount: 2, guestCount: 6, price: 680,
    country: "United States", region: "New York", latlng: [40, -73],
  },
  {
    title: "Brera Design Apartment — Milan",
    description: "Curated designer furniture, contemporary Italian art, and a private roof garden in Milan's most desirable neighbourhood. Armani, Prada, and La Scala are all within walking distance.",
    imageSrc: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    category: "Apartments", roomCount: 2, bathroomCount: 2, guestCount: 4, price: 390,
    country: "Italy", region: "Lombardy", latlng: [45, 9],
  },
  {
    title: "Omotesando High-Rise — Tokyo",
    description: "A glittering high-rise apartment on Omotesando Avenue — Tokyo's answer to the Champs-Élysées. Designer boutiques at your feet, Meiji Shrine gardens around the corner, and the city spread below.",
    imageSrc: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    category: "Apartments", roomCount: 2, bathroomCount: 2, guestCount: 4, price: 340,
    country: "Japan", region: "Tokyo", latlng: [35, 139],
  },
  {
    title: "Haussmann Boulevard Apartment — Paris",
    description: "Fifth-floor Haussmann apartment with parquet, ornate plasterwork, and a Juliet balcony overlooking a wide Parisian boulevard. A curated library of French literature, an espresso machine, and absolute chic.",
    imageSrc: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    category: "Apartments", roomCount: 3, bathroomCount: 2, guestCount: 5, price: 320,
    country: "France", region: "Île-de-France", latlng: [48, 2],
  },
  {
    title: "Moscow Golden Ring Residence",
    description: "An elegant pre-revolution apartment on the storied Golden Ring of Moscow boulevards. High ceilings, parquet floors, and original 1910 tiling — modernised with contemporary comforts.",
    imageSrc: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&q=80",
    category: "Apartments", roomCount: 2, bathroomCount: 1, guestCount: 4, price: 195,
    country: "Russia", region: "Moscow", latlng: [55, 37],
  },

  // ─── SPA ────────────────────────────────────────────────────────────────
  {
    title: "Baden-Baden Thermal Spa Villa",
    description: "A gracious Belle Époque villa in Baden-Baden — the city that invented the European spa holiday. Private thermal pool, in-house masseur available, and direct access to the legendary Caracalla Baths.",
    imageSrc: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
    category: "Spa", roomCount: 4, bathroomCount: 4, guestCount: 8, price: 680,
    country: "Germany", region: "Baden-Württemberg", latlng: [48, 8],
  },
  {
    title: "Tuscany Wellness Farmhouse",
    description: "A dedicated wellness retreat in the Maremma — morning meditation in the organic garden, afternoon massages in the converted olive press, evening aperitivo by the fire. Holistic, gentle, restorative.",
    imageSrc: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    category: "Spa", roomCount: 3, bathroomCount: 3, guestCount: 6, price: 520,
    country: "Italy", region: "Tuscany", latlng: [42, 11],
  },
  {
    title: "Kyoto Onsen Ryokan",
    description: "A traditional Kyoto ryokan with a private open-air onsen (hot spring bath) in a moss garden. Kaiseki dinner served by kimono-clad staff; sleeping on a futon in a tatami room. Japan at its most serene.",
    imageSrc: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    category: "Spa", roomCount: 2, bathroomCount: 2, guestCount: 4, price: 450,
    country: "Japan", region: "Kyoto", latlng: [35, 135],
  },

  // ─── LUX ────────────────────────────────────────────────────────────────
  {
    title: "Bel-Air Estate — Los Angeles",
    description: "A 10,000 sq ft Bel-Air estate with a cinema room, wine cave, tennis court, and a team of on-call staff. The infinity pool looks over LA to Catalina Island — a life lived at the absolute top.",
    imageSrc: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    category: "Lux", roomCount: 8, bathroomCount: 7, guestCount: 16, price: 5500,
    country: "United States", region: "California", latlng: [34, -118],
  },
  {
    title: "Villa Rotonda — Amalfi Coast",
    description: "An iconic hillside villa directly above Positano — the most photographed view on the Amalfi Coast. A private boat moored below, a personal chef, and a guest list that reads like a 1960s Who's Who.",
    imageSrc: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    category: "Lux", roomCount: 6, bathroomCount: 6, guestCount: 12, price: 4200,
    country: "Italy", region: "Campania", latlng: [40, 14],
  },
  {
    title: "Cap Ferrat Belle Époque Mansion",
    description: "One of the last great Belle Époque villas on Cap Ferrat — the peninsula that holds the highest concentration of billionaires in the world. A 50-metre pool, private jetty, and staff of six.",
    imageSrc: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    category: "Lux", roomCount: 7, bathroomCount: 7, guestCount: 14, price: 6800,
    country: "France", region: "Côte d'Azur", latlng: [43, 7],
  },
  {
    title: "Minato Mirai Penthouse — Yokohama",
    description: "The entire top floor of Yokohama's finest residential tower — 360-degree views from Fuji to Tokyo Bay, a private rooftop garden, and a Japanese stone bathroom designed by a Living National Treasure.",
    imageSrc: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    category: "Lux", roomCount: 4, bathroomCount: 4, guestCount: 8, price: 3200,
    country: "Japan", region: "Kanagawa", latlng: [35, 139],
  },
];

async function main() {
  console.log("🌍 Seeding GlobalHaven database...\n");

  // Create or find the demo host user
  const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 12);

  let user = await db.user.findUnique({ where: { email: DEMO_EMAIL } });

  if (!user) {
    user = await db.user.create({
      data: {
        name: "GlobalHaven Host",
        email: DEMO_EMAIL,
        password: hashedPassword,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
      },
    });
    console.log(`✅ Created demo user: ${DEMO_EMAIL}`);
  } else {
    console.log(`✅ Found existing demo user: ${DEMO_EMAIL}`);
  }

  // Delete existing listings by this user before re-seeding
  const deleted = await db.listing.deleteMany({ where: { userId: user.id } });
  if (deleted.count > 0) {
    console.log(`🗑️  Removed ${deleted.count} existing seed listings\n`);
  }

  // Create all listings
  let created = 0;
  for (const listing of listings) {
    await db.listing.create({
      data: {
        ...listing,
        userId: user.id,
      },
    });
    created++;
    process.stdout.write(`\r📦 Creating listings... ${created}/${listings.length}`);
  }

  console.log(`\n\n✅ Seeded ${created} listings across ${new Set(listings.map((l) => l.category)).size} categories`);
  console.log(`\n📋 Categories seeded:`);
  const byCat = {};
  for (const l of listings) {
    byCat[l.category] = (byCat[l.category] || 0) + 1;
  }
  Object.entries(byCat)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([cat, count]) => console.log(`   ${cat.padEnd(15)} ${count} listings`));

  console.log(`\n🎉 Database seeded successfully!`);
  console.log(`   Demo login: ${DEMO_EMAIL} / ${DEMO_PASSWORD}\n`);
}

main()
  .catch((e) => {
    console.error("\n❌ Seed failed:", e.message);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
