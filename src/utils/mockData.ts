import iphone14pro from '../assets/images/Apple_iphone_14_pro.jpg';
import samsung23 from '../assets/images/Samsung_Galaxy_S23.jpeg';
import sonyheadphone from '../assets/images/Sony_WH-1000XM5.jpeg';
import iphone15pro from '../assets/images/iPhone_15_Pro.jpeg';
import samsungs24 from '../assets/images/Samsung_Galaxy_S24_Ultra.jpeg';
import macbookairm3 from '../assets/images/MacBook_Air_M3.jpeg';
import dellxps15 from '../assets/images/Dell_XPS_15.jpeg';
import airpodspro from '../assets/images/AirPods_Pro .jpeg';
import logitechmxmaster from '../assets/images/Logitech_MX_Master_3S.jpeg';
import lgoledc4 from '../assets/images/LG_OLED_C4.jpeg';
import asusrogstrix from '../assets/images/Asus_ROG_Strix_G16.jpeg';
import bosequitecomfort from '../assets/images/Bose_QuietComfort_Ultra.jpeg';
import garimforerunner from '../assets/images/Garmin_Forerunner_965.jpeg';
import canoneosr8 from '../assets/images/Canon_EOS_R8.jpeg';
import nintendoswitcholed from '../assets/images/Nintendo_Switch_OLED.jpeg';
import philipshuestarterkit from '../assets/images/Philips_Hue_Starter_Kit.jpeg';
import goprohero12black from '../assets/images/GoPro_HERO12_Black.jpeg';
import dysonv15detect from '../assets/images/Dyson_V15_Detect.jpeg';
import samsungodysseyg9 from '../assets/images/Samsung_Odyssey_G9.jpeg';
import ankerpowercore20000 from '../assets/images/Anker_PowerCore_20000.jpeg';
import samsunggalaxys25ultra from '../assets/images/Samsung_Galaxy_S25_Ultra.jpeg';
import iphone17air from '../assets/images/iPhone_17_Air.jpeg';
import fairphone6 from '../assets/images/Fairphone_6.jpeg';
import nothingphone3 from '../assets/images/Nothing_Phone_3.jpeg';
import nintendoswitch2 from '../assets/images/Nintendo_Switch_2.jpeg';
import frameworkdesktopamdstrixhaloapu from '../assets/images/Framework_Desktop_AMD_Strix_Halo_APU.jpeg';
import lenovothinkbookplusgen6rollable from '../assets/images/Lenovo_ThinkBook_Plus_Gen_6_Rollable.jpeg';
import rokidairgov2smartglasses from '../assets/images/Rokid_AirGo_V2_Smart_Glasses.jpeg';
import roborockomnigriprobotvacuum from '../assets/images/Roborock_OmniGrip_Robot_Vacuum.jpeg';
import panasonicz95boledtv from '../assets/images/Panasonic_Z95B_OLED_TV.jpeg';
import oppoa5pro5g from '../assets/images/Oppo_A5_Pro_5G.jpeg';
import suuntorunwatch from '../assets/images/Suunto_Run_Watch.jpeg';
import whooplifewithmgsensor from '../assets/images/Whoop_Life_with_MG_Sensor.jpeg';
import core2temperaturesensor from '../assets/images/Core_2_Temperature_Sensor.jpeg';
import cyberpadtreadmill from '../assets/images/CyberPad_Treadmill.jpeg';
import audiotechnicaathcks50tw2earbuds from '../assets/images/Audio-Technica_ATH-CKS50TW2_Earbuds.jpeg';
import belkinstagepowergrip from '../assets/images/Belkin_Stage_PowerGrip.jpeg';
import nvidiaprojectdigits from '../assets/images/Nvidia_Project_Digits.jpeg';
import teslaoptimusgen2humanoidrobot from '../assets/images/Tesla_Optimus_Gen_2_Humanoid_Robot.jpeg';
import lgstanbyme2portabletv from '../assets/images/LG_StanbyME_2_Portable_TV.jpeg';
import eufy3in1e20robotvacuum from '../assets/images/Eufy_3-in-1_E20_Robot_Vacuum.jpeg';
import pocketbookinkposter from '../assets/images/PocketBook_InkPoster.jpeg';
import ankersolarbeachumbrella from '../assets/images/Anker_Solar_Beach_Umbrella.jpeg';

import type { Product } from './types';

export const mockProducts: Product[] = [
  {
    _id: "1",
    title: "Apple iPhone 14 Pro",
    description: "The latest iPhone with A16 Bionic chip, Super Retina XDR display",
    price: 999.99,
    category: "Mobile Phones",
    brand: "Apple",
    color: "Silver",
    stock: 10,
    images: [iphone14pro],
    ratings: [],
    totalrating: 5,
    featured: true,
    newArrival: true,
    isOnSale: true,
    discountPercentage: 10,
    reviews: [
      { user: "Alice", comment: "Absolutely love the camera quality!", stars: 5 },
      { user: "Bob", comment: "Smooth performance but battery could be better.", stars: 4 }
    ]
  },
  {
    _id: "2",
    title: "Samsung Galaxy S23",
    description: "Premium Android smartphone with Snapdragon processor",
    price: 899.99,
    category: "Mobile Phones",
    brand: "Samsung",
    color: "Black",
    stock: 15,
    images: [samsung23],
    ratings: [],
    totalrating: 5,
    featured: true,
    newArrival: true,
    reviews: [
      { user: "Charlie", comment: "Bright and vibrant display!", stars: 5 },
      { user: "Dana", comment: "Battery lasts all day, very happy with it.", stars: 5 }
    ]
  },
  {
    _id: "3",
    title: "Sony WH-1000XM5",
    description: "Industry-leading noise cancellation headphones",
    price: 399.99,
    category: "Headphones",
    brand: "Sony",
    color: "Black",
    stock: 20,
    images: [sonyheadphone],
    ratings: [],
    totalrating: 5,
    featured: true,
    reviews: [
      { user: "Evan", comment: "Noise cancellation is unreal!", stars: 5 },
      { user: "Fiona", comment: "Super comfortable for long use.", stars: 4 }
    ]
  },
  {
    _id: "4",
    title: "iPhone 15 Pro",
    description: "Apple's latest flagship with A17 Pro chip, titanium design, and advanced camera system.",
    price: 1199,
    category: "Mobile Phones",
    brand: "Apple",
    color: "Natural Titanium",
    stock: 25,
    images: [iphone15pro],
    ratings: [
      { star: 5, comment: "Incredible phone!", postedBy: "User123" },
      { star: 4, comment: "Pricey but worth it.", postedBy: "User456" }
    ],
    totalrating: 4.5,
    featured: true,
    newArrival: true,
    reviews: [
      { user: "Grace", comment: "Camera upgrades are amazing.", stars: 5 },
      { user: "Henry", comment: "Lighter than previous models, love it.", stars: 4 }
    ]
  },
  {
    _id: "5",
    title: "Samsung Galaxy S24 Ultra",
    description: "High-end Android flagship with powerful camera zoom and Snapdragon 8 Gen 3 chip.",
    price: 1299,
    category: "Mobile Phones",
    brand: "Samsung",
    color: "Phantom Black",
    stock: 30,
    images: [samsungs24],
    ratings: [
      { star: 5, comment: "Best Android phone yet!", postedBy: "User789" }
    ],
    totalrating: 5,
    featured: true,
    reviews: [
      { user: "Ivy", comment: "Zoom camera is mind-blowing!", stars: 5 },
      { user: "Jack", comment: "Performance is lightning fast.", stars: 5 }
    ]
  },
  {
    _id: "6",
    title: "MacBook Air M3",
    description: "Lightweight laptop with M3 chip, long battery life, and fanless design.",
    price: 1499,
    category: "Laptops",
    brand: "Apple",
    color: "Space Gray",
    stock: 15,
    images: [macbookairm3],
    ratings: [
      { star: 4, comment: "Perfect for students.", postedBy: "User222" }
    ],
    totalrating: 4,
    newArrival: true,
    reviews: [
      { user: "Kelly", comment: "Battery lasts all day, super light.", stars: 5 },
      { user: "Leo", comment: "Wish it had more ports.", stars: 4 }
    ]
  },
  {
    _id: "7",
    title: "Dell XPS 15",
    description: "Premium Windows laptop with OLED display and RTX 4050 GPU.",
    price: 1699,
    category: "Laptops",
    brand: "Dell",
    color: "Silver",
    stock: 12,
    images: [dellxps15],
    ratings: [
      { star: 5, comment: "Amazing display quality.", postedBy: "User333" }
    ],
    totalrating: 4.8,
    reviews: [
      { user: "Mia", comment: "OLED screen is gorgeous!", stars: 5 },
      { user: "Nate", comment: "Handles video editing with ease.", stars: 5 }
    ]
  },
  {
    _id: "8",
    title: "AirPods Pro (4th Gen)",
    description: "Active noise cancellation, spatial audio, and MagSafe charging.",
    price: 249,
    category: "Earbuds",
    brand: "Apple",
    color: "White",
    stock: 50,
    images: [airpodspro],
    ratings: [
      { star: 5, comment: "Best earbuds I've owned.", postedBy: "User444" }
    ],
    totalrating: 5,
    isOnSale: true,
    discountPercentage: 10,
    reviews: [
      { user: "Olivia", comment: "Spatial audio is insane!", stars: 5 },
      { user: "Pete", comment: "Comfortable and great for calls.", stars: 5 }
    ]
  },
  {
    _id: "9",
    title: "Logitech MX Master 3S",
    description: "Premium ergonomic wireless mouse with MagSpeed scroll.",
    price: 99,
    category: "Accessories",
    brand: "Logitech",
    color: "Graphite",
    stock: 60,
    images: [logitechmxmaster],
    ratings: [
      { star: 5, comment: "Super smooth scrolling.", postedBy: "User102" }
    ],
    totalrating: 4.8,
    isOnSale: true,
    discountPercentage: 15,
    reviews: [
      { user: "Quinn", comment: "Scroll wheel feels magical.", stars: 5 },
      { user: "Rita", comment: "Ergonomics are top-notch.", stars: 5 }
    ]
  },
  {
    _id: "10",
    title: "LG OLED C4 55\" TV",
    description: "4K OLED smart TV with Dolby Vision and 120Hz refresh rate.",
    price: 1499,
    category: "Television",
    brand: "LG",
    color: "Black",
    stock: 8,
    images: [lgoledc4],
    ratings: [
      { star: 5, comment: "Stunning picture quality.", postedBy: "User101" }
    ],
    totalrating: 5,
    reviews: [
      { user: "Sam", comment: "Best TV I’ve ever owned.", stars: 5 },
      { user: "Tina", comment: "Colors are so vivid.", stars: 5 }
    ]
  },
  {
    _id: "11",
    title: "Asus ROG Strix G16",
    description: "Gaming laptop with Intel i9, RTX 4070 GPU, and 240Hz display.",
    price: 1899,
    category: "Laptops",
    brand: "Asus",
    color: "Eclipse Gray",
    stock: 10,
    images: [asusrogstrix],
    ratings: [
      { star: 5, comment: "Handles AAA games flawlessly.", postedBy: "User555" }
    ],
    totalrating: 4.9,
    featured: true,
    reviews: [
      { user: "Uma", comment: "Gaming at 240Hz is smooth.", stars: 5 },
      { user: "Victor", comment: "Runs cool under load.", stars: 5 }
    ]
  },
  {
    _id: "12",
    title: "Bose QuietComfort Ultra",
    description: "Premium wireless headphones with adaptive noise cancellation.",
    price: 379,
    category: "Headphones",
    brand: "Bose",
    color: "Triple Black",
    stock: 18,
    images: [bosequitecomfort],
    ratings: [
      { star: 4, comment: "Excellent sound, slightly bulky.", postedBy: "User666" }
    ],
    totalrating: 4.4,
    newArrival: true,
    reviews: [
      { user: "Wendy", comment: "Blocks out all background noise.", stars: 5 },
      { user: "Xander", comment: "Bass is punchy but not overwhelming.", stars: 4 }
    ]
  },
  {
    _id: "13",
    title: "Garmin Forerunner 965",
    description: "Advanced GPS smartwatch with AMOLED display and training readiness score.",
    price: 599,
    category: "Wearables",
    brand: "Garmin",
    color: "Black",
    stock: 22,
    images:[garimforerunner],
    ratings: [
      { star: 5, comment: "Perfect for runners and triathletes.", postedBy: "User777" }
    ],
    totalrating: 4.9,
    reviews: [
      { user: "Yara", comment: "GPS is super accurate.", stars: 5 },
      { user: "Zack", comment: "Battery lasts weeks.", stars: 5 }
    ]
  },
  {
    _id: "14",
    title: "Canon EOS R8",
    description: "Full-frame mirrorless camera with 24.2MP sensor and 4K60 recording.",
    price: 1699,
    category: "Cameras",
    brand: "Canon",
    color: "Black",
    stock: 6,
    images:[canoneosr8],
    ratings: [
      { star: 5, comment: "Lightweight yet powerful.", postedBy: "User888" }
    ],
    totalrating: 5,
    featured: true,
    isOnSale: true,
    discountPercentage: 8,
    reviews: [
      { user: "Anna", comment: "Amazing image quality.", stars: 5 },
      { user: "Ben", comment: "Compact for a full-frame.", stars: 5 }
    ]
  },
  {
    _id: "15",
    title: "Nintendo Switch OLED",
    description: "Handheld gaming console with 7-inch OLED screen and improved audio.",
    price: 349,
    category: "Gaming Consoles",
    brand: "Nintendo",
    color: "White",
    stock: 40,
    images:[nintendoswitcholed],
    ratings: [
      { star: 4, comment: "Fantastic portable gaming.", postedBy: "User999" }
    ],
    totalrating: 4.7,
    newArrival: true,
    reviews: [
      { user: "Cara", comment: "Screen looks amazing.", stars: 5 },
      { user: "Dan", comment: "Perfect for travel gaming.", stars: 5 }
    ]
  },
  {
    _id: "16",
    title: "Philips Hue Starter Kit",
    description: "Smart lighting system with 3 color bulbs and a bridge.",
    price: 199,
    category: "Smart Home",
    brand: "Philips",
    color: "Multi-color",
    stock: 50,
    images:[philipshuestarterkit],
    ratings: [
      { star: 5, comment: "Lighting automation made easy.", postedBy: "User147" }
    ],
    totalrating: 4.8,
    isOnSale: true,
    discountPercentage: 12,
    reviews: [
      { user: "Ella", comment: "Love the color options.", stars: 5 },
      { user: "Finn", comment: "App is easy to use.", stars: 5 }
    ]
  },
  {
    _id: "17",
    title: "GoPro HERO12 Black",
    description: "Action camera with 5.3K video, HyperSmooth stabilization, and waterproof design.",
    price: 499,
    category: "Cameras",
    brand: "GoPro",
    color: "Black",
    stock: 25,
    images:[goprohero12black],
    ratings: [
      { star: 5, comment: "Perfect for adventures.", postedBy: "User258" }
    ],
    totalrating: 5,
    reviews: [
      { user: "George", comment: "Video stabilization is unreal.", stars: 5 },
      { user: "Holly", comment: "Great for underwater shots.", stars: 5 }
    ]
  },
    {
    _id: "18",
    title: "Dyson V15 Detect",
    description: "Cordless vacuum cleaner with laser dust detection.",
    price: 749,
    category: "Home Appliances",
    brand: "Dyson",
    color: "Yellow",
    stock: 14,
    images:[dysonv15detect],
    ratings: [
      { star: 5, comment: "Makes cleaning oddly satisfying.", postedBy: "User369" }
    ],
    totalrating: 4.9,
    featured: true,
    reviews: [
      { user: "Iris", comment: "Laser light actually helps spot dust!", stars: 5 },
      { user: "James", comment: "Strong suction but pricey.", stars: 4 }
    ]
  },
  {
    _id: "19",
    title: "Samsung Odyssey G9",
    description: "49-inch curved QLED gaming monitor with 240Hz refresh rate.",
    price: 1499,
    category: "Monitors",
    brand: "Samsung",
    color: "White",
    stock: 8,
    images:[samsungodysseyg9],
    ratings: [
      { star: 5, comment: "Immersive for both work and play.", postedBy: "User741" }
    ],
    totalrating: 5,
    reviews: [
      { user: "Kevin", comment: "Huge screen, great for multitasking.", stars: 5 },
      { user: "Lara", comment: "Colors pop like crazy.", stars: 5 }
    ]
  },
  {
    _id: "20",
    title: "Anker PowerCore 20000",
    description: "High-capacity portable charger with fast charging support.",
    price: 69,
    category: "Accessories",
    brand: "Anker",
    color: "Black",
    stock: 100,
    images:[ankerpowercore20000],
    ratings: [
      { star: 5, comment: "Charges my phone multiple times.", postedBy: "User852" }
    ],
    totalrating: 4.9,
    isOnSale: true,
    discountPercentage: 20,
    reviews: [
      { user: "Mason", comment: "Perfect for travel.", stars: 5 },
      { user: "Nina", comment: "A bit heavy but worth it.", stars: 4 }
    ]
  },
  {
    _id: "21",
    title: "Samsung Galaxy S25 Ultra",
    description: "Flagship Android smartphone with Wi-Fi 7, Dolby Atmos stereo speakers and advanced AI enhancements.",
    price: 1399,
    category: "Mobile Phones",
    brand: "Samsung",
    color: "Titan Black",
    stock: 20,
    images:[samsunggalaxys25ultra],
    ratings: [],
    totalrating: 0,
    newArrival: true,
    reviews: [
      { user: "Owen", comment: "The AI features are game-changing.", stars: 5 },
      { user: "Paula", comment: "Speakers sound incredible.", stars: 5 }
    ]
  },
  {
    _id: "22",
    title: "iPhone 17 Air",
    description: "Ultra-thin iPhone with horizontal camera bar and ProMotion display, rumored launch in September 2025.",
    price: 899,
    category: "Mobile Phones",
    brand: "Apple",
    color: "Graphite",
    stock: 15,
    images:[iphone17air],
    ratings: [],
    totalrating: 0,
    featured: true,
    newArrival: true,
    reviews: [
      { user: "Quincy", comment: "Feels futuristic in the hand.", stars: 5 },
      { user: "Rita", comment: "Hope the battery life holds up.", stars: 4 }
    ]
  },
  {
    _id: "23",
    title: "Fairphone 6",
    description: "Ethical modular Android phone with Snapdragon 7s Gen 3, eco materials, 8 GB RAM, and 7 OS upgrades.",
    price: 599,
    category: "Mobile Phones",
    brand: "Fairphone",
    color: "Fair Gray",
    stock: 25,
    images: [fairphone6],
    ratings: [],
    totalrating: 0,
    featured: true,
    newArrival: true,
    reviews: [
      { user: "Sara", comment: "Love the sustainable design.", stars: 5 },
      { user: "Tom", comment: "Easy to repair at home.", stars: 5 }
    ]
  },
  {
    _id: "24",
    title: "Nothing Phone 3",
    description: "Affordable flagship with Snap-dragon 8s Gen 4, triple 50 MP cameras, and Glyph Matrix LED back panel.",
    price: 799,
    category: "Mobile Phones",
    brand: "Nothing",
    color: "Clear White",
    stock: 18,
    images: [nothingphone3],
    ratings: [],
    totalrating: 0,
    featured: true,
    reviews: [
      { user: "Uma", comment: "The Glyph interface is so cool.", stars: 5 },
      { user: "Victor", comment: "Cameras take sharp photos.", stars: 5 }
    ]
  },
  {
    _id: "25",
    title: "Nintendo Switch 2",
    description: "Next-gen gaming console with magnetic Joy-Con controllers and new Mario Kart World game.",
    price: 499,
    category: "Gaming Consoles",
    brand: "Nintendo",
    color: "Neon Blue-Red",
    stock: 30,
    images: [nintendoswitch2],
    ratings: [],
    totalrating: 0,
    newArrival: true,
    reviews: [
      { user: "Wendy", comment: "New Joy-Cons are very sturdy.", stars: 5 },
      { user: "Xander", comment: "Mario Kart World is addictive!", stars: 5 }
    ]
  },
  {
    _id: "26",
    title: "Framework Desktop (AMD Strix Halo APU)",
    description: "Modular Mini-ITX PC with interchangeable front tiles, Wi-Fi 7, 5 GbE, up to 128 GB RAM.",
    price: 999,
    category: "Desktops",
    brand: "Framework",
    color: "Gunmetal",
    stock: 12,
    images: [frameworkdesktopamdstrixhaloapu],
    ratings: [],
    totalrating: 0,
    newArrival: true,
    reviews: [
      { user: "Yara", comment: "Customizable to my exact needs.", stars: 5 },
      { user: "Zane", comment: "Runs cool and quiet.", stars: 5 }
    ]
  },
  {
    _id: "27",
    title: "Lenovo ThinkBook Plus Gen 6 Rollable",
    description: "Windows laptop with rollable display—14″ expands to 16.7″ vertical screen, Intel Ultra 7, 32 GB RAM.",
    price: 2199,
    category: "Laptops",
    brand: "Lenovo",
    color: "Iron Grey",
    stock: 8,
    images: [lenovothinkbookplusgen6rollable],
    ratings: [],
    totalrating: 0,
    featured: true,
    reviews: [
      { user: "Adam", comment: "Rollable display is impressive.", stars: 5 },
      { user: "Bella", comment: "Expands my workspace instantly.", stars: 5 }
    ]
  },
  {
    _id: "28",
    title: "Rokid AirGo V2 Smart Glasses",
    description: "AI-powered smart glasses with voice assistant, real-time translation, and object recognition.",
    price: 399,
    category: "Wearables",
    brand: "Rokid",
    color: "Charcoal",
    stock: 20,
    images: [rokidairgov2smartglasses],
    ratings: [],
    totalrating: 0,
    newArrival: true,
    reviews: [
      { user: "Chris", comment: "Translation works well in real-time.", stars: 5 },
      { user: "Dina", comment: "Feels lightweight for daily use.", stars: 5 }
    ]
  },
  {
    _id: "29",
    title: "Roborock OmniGrip Robot Vacuum",
    description: "Robot vacuum with 22 kPa suction and retractable claw to pick up small obstacles up to 10.5 oz.",
    price: 699,
    category: "Home Appliances",
    brand: "Roborock",
    color: "White",
    stock: 15,
    images: [roborockomnigriprobotvacuum],
    ratings: [],
    totalrating: 0,
    featured: true,
    reviews: [
      { user: "Eli", comment: "Picks up even small toys.", stars: 5 },
      { user: "Faye", comment: "Quiet and efficient cleaning.", stars: 5 }
    ]
  },
  {
    _id: "30",
    title: "Panasonic Z95B OLED TV",
    description: "Award-winning OLED TV with ultra-bright 4,000 nits panel, AI-enhanced display and sound.",
    price: 2499,
    category: "Television",
    brand: "Panasonic",
    color: "Midnight Black",
    stock: 5,
    images: [panasonicz95boledtv],
    ratings: [],
    totalrating: 0,
    featured: true,
    reviews: [
      { user: "Gabe", comment: "Brightness is unmatched.", stars: 5 },
      { user: "Hana", comment: "AI sound really enhances movies.", stars: 5 }
    ]
  },
  {
    _id: "31",
    title: "Oppo A5 Pro 5G",
    description: "Mid-range 5G smartphone with Snapdragon 6 Gen 1, 120Hz AMOLED display, and 6,500 mAh battery.",
    price: 399,
    category: "Mobile Phones",
    brand: "Oppo",
    color: "Midnight Black",
    stock: 40,
    images: [oppoa5pro5g],
    ratings: [],
    totalrating: 0,
    newArrival: true,
    reviews: [
      { user: "Ian", comment: "Battery lasts forever.", stars: 5 },
      { user: "Jade", comment: "Smooth display for the price.", stars: 5 }
    ]
  },
  {
    _id: "32",
    title: "Suunto Run Watch",
    description: "Lightweight running smartwatch with dual-frequency GPS, heart rate monitoring, and in-app coaching.",
    price: 249,
    category: "Wearables",
    brand: "Suunto",
    color: "Slate Gray",
    stock: 25,
    images: [suuntorunwatch],
    ratings: [],
    totalrating: 0,
    newArrival: true,
    reviews: [
      { user: "Kyle", comment: "GPS tracking is accurate.", stars: 5 },
      { user: "Lily", comment: "Lightweight and comfy to wear.", stars: 5 }
    ]
  },
  {
    _id: "33",
    title: "Whoop Life with MG Sensor",
    description: "Screenless biometric sensor providing 24/7 health monitoring, including ECG and blood pressure predictions.",
    price: 299,
    category: "Wearables",
    brand: "Whoop",
    color: "Onyx Black",
    stock: 30,
    images: [whooplifewithmgsensor],
    ratings: [],
    totalrating: 0,
    newArrival: true,
    reviews: [
      { user: "Mona", comment: "Great for tracking recovery.", stars: 5 },
      { user: "Nick", comment: "Subscription is a bit expensive.", stars: 4 }
    ]
  },
  {
    _id: "34",
    title: "Core 2 Temperature Sensor",
    description: "Wearable device monitoring core body temperature in real-time using heat transfer metrics.",
    price: 199,
    category: "Wearables",
    brand: "Core",
    color: "Silver",
    stock: 15,
    images: [core2temperaturesensor],
    ratings: [],
    totalrating: 0,
    newArrival: true,
    reviews: [
      { user: "Olga", comment: "Helps with training optimization.", stars: 5 },
      { user: "Perry", comment: "Accurate and easy to use.", stars: 5 }
    ]
  },
    {
    _id: "35",
    title: "CyberPad Treadmill",
    description: "Compact walking/jogging pad with adjustable incline, max speed of 4mph, and easy storage design.",
    price: 499,
    category: "Fitness Equipment",
    brand: "CyberPad",
    color: "Black",
    stock: 20,
    images: [cyberpadtreadmill],
    ratings: [],
    totalrating: 0,
    newArrival: true,
    reviews: [
      { user: "Quinn", comment: "Perfect for my small apartment.", stars: 5 },
      { user: "Rosa", comment: "Quiet operation and smooth walking.", stars: 5 }
    ]
  },
  {
    _id: "36",
    title: "Audio-Technica ATH-CKS50TW2 Earbuds",
    description: "Wireless earbuds with up to 65 hours of playback, launched at CES 2025.",
    price: 179,
    category: "Earbuds",
    brand: "Audio-Technica",
    color: "Black",
    stock: 50,
    images: [audiotechnicaathcks50tw2earbuds],
    ratings: [],
    totalrating: 0,
    newArrival: true,
    reviews: [
      { user: "Cory", comment: "Battery life is insane.", stars: 5 },
      { user: "Dana", comment: "Great bass and clear sound.", stars: 5 }
    ]
  },
  {
    _id: "37",
    title: "Belkin Stage PowerGrip",
    description: "Portable power bank with integrated stand and grip, ideal for content creators.",
    price: 99,
    category: "Accessories",
    brand: "Belkin",
    color: "White",
    stock: 60,
    images: [belkinstagepowergrip],
    ratings: [],
    totalrating: 0,
    newArrival: true,
    reviews: [
      { user: "Evan", comment: "The stand is super handy.", stars: 5 },
      { user: "Faye", comment: "Charges fast and doubles as a tripod.", stars: 5 }
    ]
  },
  {
    _id: "38",
    title: "Nvidia Project Digits",
    description: "Personal AI supercomputer with powerful processing capabilities, starting at $3,000.",
    price: 3000,
    category: "AI Devices",
    brand: "Nvidia",
    color: "Silver",
    stock: 5,
    images: [nvidiaprojectdigits],
    ratings: [],
    totalrating: 0,
    newArrival: true,
    reviews: [
      { user: "Gus", comment: "Runs AI workloads like butter.", stars: 5 },
      { user: "Holly", comment: "Expensive but unmatched performance.", stars: 5 }
    ]
  },
  {
    _id: "39",
    title: "Tesla Optimus Gen 2 Humanoid Robot",
    description: "Advanced humanoid robot designed for various applications, unveiled in December 2023.",
    price: 50000,
    category: "Robotics",
    brand: "Tesla",
    color: "White",
    stock: 2,
    images: [teslaoptimusgen2humanoidrobot],
    ratings: [],
    totalrating: 0,
    newArrival: true,
    reviews: [
      { user: "Ivan", comment: "Moves very human-like.", stars: 5 },
      { user: "Jill", comment: "Still needs more home integration.", stars: 4 }
    ]
  },
  {
    _id: "40",
    title: "LG StanbyME 2 Portable TV",
    description: "27-inch touchscreen portable TV with improved battery life, showcased at CES 2025.",
    price: 799,
    category: "Portable Displays",
    brand: "LG",
    color: "White",
    stock: 25,
    images: [lgstanbyme2portabletv],
    ratings: [],
    totalrating: 0,
    newArrival: true,
    reviews: [
      { user: "Ken", comment: "Perfect for the kitchen.", stars: 5 },
      { user: "Lia", comment: "Touchscreen is very responsive.", stars: 5 }
    ]
  },
  {
    _id: "41",
    title: "Eufy 3-in-1 E20 Robot Vacuum",
    description: "Robot vacuum with mopping and UV sterilization features, highlighted at CES 2025.",
    price: 399,
    category: "Home Appliances",
    brand: "Eufy",
    color: "Black",
    stock: 40,
    images: [eufy3in1e20robotvacuum],
    ratings: [],
    totalrating: 0,
    newArrival: true,
    reviews: [
      { user: "Max", comment: "Love the mopping feature.", stars: 5 },
      { user: "Nora", comment: "UV sterilization is a nice touch.", stars: 5 }
    ]
  },
  {
    _id: "42",
    title: "PocketBook InkPoster",
    description: "Advanced E Ink digital art display, offering a new way to showcase digital art.",
    price: 299,
    category: "Digital Art Displays",
    brand: "PocketBook",
    color: "Black",
    stock: 30,
    images: [pocketbookinkposter],
    ratings: [],
    totalrating: 0,
    newArrival: true,
    reviews: [
      { user: "Omar", comment: "E Ink looks stunning for art.", stars: 5 },
      { user: "Pia", comment: "Wish it had more color support.", stars: 4 }
    ]
  },
  {
    _id: "43",
    title: "Anker Solar Beach Umbrella",
    description: "Beach umbrella with integrated solar panels to charge devices, introduced at CES 2025.",
    price: 199,
    category: "Outdoor Tech",
    brand: "Anker",
    color: "Blue",
    stock: 50,
    images: [ankersolarbeachumbrella],
    ratings: [],
    totalrating: 0,
    newArrival: true,
    reviews: [
      { user: "Quinn", comment: "Charges phone while relaxing!", stars: 5 },
      { user: "Rhea", comment: "Stable even on windy days.", stars: 5 }
    ]
  }
];
