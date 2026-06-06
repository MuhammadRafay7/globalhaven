import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
  GiGrapes,
} from "react-icons/gi";
import { FaSkiing, FaSpa } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla, MdOutlineCabin, MdOutlineApartment, MdOutlineLocationCity } from "react-icons/md";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "City",
    icon: MdOutlineLocationCity,
    description: "This property is in the heart of a city!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is sleek and modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a beautiful pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is an ancient castle!",
  },
  {
    label: "Cabins",
    icon: MdOutlineCabin,
    description: "This property is a cozy cabin!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property offers camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in an arctic environment!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Vineyard",
    icon: GiGrapes,
    description: "This property is surrounded by vineyards!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is a converted barn!",
  },
  {
    label: "Caves",
    icon: GiCaveEntrance,
    description: "This property is carved into a cave!",
  },
  {
    label: "Apartments",
    icon: MdOutlineApartment,
    description: "This property is a stylish apartment!",
  },
  {
    label: "Spa",
    icon: FaSpa,
    description: "This property features a luxury spa!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
  },
];

export const LISTINGS_BATCH = 16;

export const menuItems = [
  { label: "My trips", path: "/trips" },
  { label: "My favorites", path: "/favorites" },
  { label: "My reservations", path: "/reservations" },
  { label: "My properties", path: "/properties" },
];

export const FEATURED_DESTINATIONS = [
  {
    country: "United States",
    flag: "🇺🇸",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
    description: "From NYC penthouses to LA beach homes",
    listings: "50,000+",
  },
  {
    country: "Italy",
    flag: "🇮🇹",
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80",
    description: "Tuscan villas, Amalfi cliffside retreats",
    listings: "30,000+",
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
    description: "Medieval castles and Black Forest cabins",
    listings: "20,000+",
  },
  {
    country: "Russia",
    flag: "🇷🇺",
    image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&q=80",
    description: "Moscow city apartments & countryside dachas",
    listings: "15,000+",
  },
  {
    country: "France",
    flag: "🇫🇷",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    description: "Parisian lofts and Provence farmhouses",
    listings: "40,000+",
  },
  {
    country: "Japan",
    flag: "🇯🇵",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    description: "Traditional ryokans and Tokyo studios",
    listings: "25,000+",
  },
  {
    country: "Spain",
    flag: "🇪🇸",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
    description: "Barcelona apartments & Andalusian villas",
    listings: "35,000+",
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80",
    description: "Beachfront homes and outback retreats",
    listings: "22,000+",
  },
];
