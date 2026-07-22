import mongoose from 'mongoose';
import Product from './src/products/product.model.js';
import dotenv from 'dotenv';
dotenv.config();

const seedProducts = [
  // BEBIDAS
  {
    title: "LIMONADA ROSA",
    description: "Nuestra refrescante firma: limonada de fresa natural con un toque cítrico balanceado y mucho hielo.",
    price: "$45.00",
    image: "limonada.png",
    category: "bebidas"
  },
  {
    title: "TÉ HELADO",
    description: "Infusión premium de té negro con notas de frutos rojos, menta fresca y un toque de endulzante natural.",
    price: "$40.00",
    image: "bebida2.png",
    category: "bebidas"
  },
  {
    title: "LIMONADA TRADICIONAL",
    description: "Deliciosa limonada con hierbabuena",
    price: "$40.00",
    image: "bebida11.png",
    category: "bebidas"
  },
  {
    title: "COCTEL AZUL",
    description: "Delicioso coctel con piña y azul curazao",
    price: "$70.00",
    image: "bebida12.png",
    category: "bebidas"
  },
  {
    title: "AGUA NATURAL",
    description: "Deliciosa bebida refrescante con de diferentes sabores",
    price: "$30.00",
    image: "bebida13.png",
    category: "bebidas"
  },
  {
    title: "ROJITO",
    description: "Agua mineral con frutos rojos, limón.",
    price: "$35.00",
    image: "bebida17.png",
    category: "bebidas"
  },
  // BRUNCH
  {
    title: "Pan con jamon",
    description: "Pan fresco con jamon y queso manchego",
    price: "$50.00",
    image: "refa1.png",
    category: "brunch"
  },
  {
    title: "BAGEL GOURMET",
    description: "Bagel recién horneado relleno de salmón ahumado, crema de queso, alcaparras y cebolla morada fresca.",
    price: "$115.00",
    image: "refa2.png",
    category: "brunch"
  },
  {
    title: "Pan con pollo desmenuzado",
    description: "Pan con pollo desmenuzado, queso manchego y jitomate",
    price: "$100.00",
    image: "refa3.png",
    category: "brunch"
  },
  {
    title: "NACHOS",
    description: "Nachos con guacamole, pico de gallo y queso",
    price: "$125.00",
    image: "refa4.png",
    category: "brunch"
  },
  {
    title: "CALDO DE RES",
    description: "Delicioso caldo de res con verduras frescas y un toque casero.",
    price: "$95.00",
    image: "refa5.png",
    category: "brunch"
  },
  {
    title: "HAMBUERGUESA PREMIUM",
    description: "Hamburguesa premium con carne de res, queso manchego y verduras frescas",
    price: "$110.00",
    image: "refa6.png",
    category: "brunch"
  },
  // CENAS
  {
    title: "TOSTADAS CON AGUACATE Y POLLO",
    description: "Deliciosas tostadas con aguacate y pollo deshebrado",
    price: "$120.00",
    image: "cena1.jpg",
    category: "cenas"
  },
  {
    title: "FIDEOS CON QUESO",
    description: "Deliciosos fideos con queso",
    price: "$120.00",
    image: "cena2.jpg",
    category: "cenas"
  },
  {
    title: "PAN CON QUESO Y JAMON",
    description: "Pan con queso y jamon",
    price: "$120.00",
    image: "cena3.jpg",
    category: "cenas"
  },
  {
    title: "TORTILLAS DE HARINA CON POLLO",
    description: "300g de jugoso corte New York a la parrilla, servido con papas al horno gratinadas y mantequilla de ajo artesanal.",
    price: "$350.00",
    image: "cena4.jpg",
    category: "cenas"
  },
  {
    title: "TOSTADAS DE POLLO",
    description: "Deliciosas tostadas con pollo deshebrado",
    price: "$120.00",
    image: "cena5.jpg",
    category: "cenas"
  },
  {
    title: "MIX DE VERDURAS",
    description: "Deliciosas verduras salteadas",
    price: "$120.00",
    image: "cena6.jpeg",
    category: "cenas"
  },
  // DESAYUNOS
  {
    title: "DESAYUNO CLÁSICO",
    description: "El despertar perfecto: huevos al gusto, frijoles refritos, plátanos dulces, queso fresco y pan artesanal. Incluye café de olla.",
    price: "$130.00",
    image: "desayuno1.png",
    category: "desayunos"
  },
  {
    title: "WAFFLES CON FRUTA",
    description: "Waffles dorados y esponjosos servidos con una selección de frutas frescas de temporada, miel de maple y un toque de azúcar glass.",
    price: "$120.00",
    image: "waffles.png",
    category: "desayunos"
  },
  {
    title: "TOSTADAS CON MERMELADA",
    description: "Tostadas con mermelada y requesón",
    price: "$120.00",
    image: "desayuno17.png",
    category: "desayunos"
  },
  {
    title: "PAN CON JAMON",
    description: "Pan con jamon y queso manchego",
    price: "$65.00",
    image: "desayuno18.png",
    category: "desayunos"
  },
  {
    title: "SANDWITCH DE ATÚN",
    description: "Delicioso sandwich de atún con verduras frescas y aderezo especial.",
    price: "$85.00",
    image: "desayuno20.png",
    category: "desayunos"
  },
  {
    title: "AVENA NUTRITIVA",
    description: "Avena preparada con leche, fruta fresca, semillas y miel.",
    price: "$120.00",
    image: "desayuno21.png",
    category: "desayunos"
  },
  // INDIVIDUALES
  {
    title: "CORTE INDIVIDUAL",
    description: "Jugoso corte premium sellado a la perfección con mantequilla de finas hierbas, acompañado de una ensalada fresca de la estación.",
    price: "$250.00",
    image: "/images/individual1.png",
    category: "individuales"
  },
  {
    title: "POLLO A LA PARRILLA",
    description: "Pechuga tierna marinada en especias secretas, asada a la parrilla y servida con vegetales al wok y puré de papa cremoso.",
    price: "$180.00",
    image: "/images/individual2.png",
    category: "individuales"
  },
  {
    title: "LASAÑA ARTESANAL",
    description: "Capas de pasta fresca con ragú de res cocinado a fuego lento, mezcla de tres quesos fundidos y salsa pomodoro casera.",
    price: "$165.00",
    image: "individual2.png",
    category: "individuales"
  },
  {
    title: "HAMBURGUESA GOURMET",
    description: "Res de alta calidad (200g) en pan brioche, con queso cheddar maduro, tocino crujiente, cebolla caramelizada y papas gajo sazonadas.",
    price: "$195.00",
    image: "individual6.png",
    category: "individuales"
  },
  {
    title: "ENSALADA CÉSAR CON SALMÓN",
    description: "Corazones de lechuga romana, crutones artesanales y aderezo César de la casa, coronada con un filete de salmón fresco a la plancha.",
    price: "$210.00",
    image: "ensaladacesar.png",
    category: "individuales"
  },
  {
    title: "PASTA ALFREDO",
    description: "Fettuccine al dente bañado en nuestra sedosa salsa de crema y parmesano auténtico, terminado con perejil fresco y pimienta negra.",
    price: "$155.00",
    image: "pasta.png",
    category: "individuales"
  },
  // POSTRES
  {
    title: "TARTALETA DE FRUTOS",
    description: "Delicada base de pasta sablée rellena de suave crema pastelera artesanal y coronada con una selección de frutos rojos frescos.",
    price: "$85.00",
    image: "postre1.png",
    category: "postres"
  },
  {
    title: "BROWNIE CON HELADO",
    description: "Intenso brownie de chocolate belga, servido tibio para un corazón fundente, acompañado de una generosa bola de helado de vainilla bourbon.",
    price: "$95.00",
    image: "postre2.png",
    category: "postres"
  },
  {
    title: "PIE DE LIMON",
    description: "Delicioso pie de limon, con ralladura de naranja",
    price: "$85.00",
    image: "postre4.png",
    category: "postres"
  },
  {
    title: "PIE DE FRUTOS ROJOS",
    description: "Delicioso pastel de frutos rojos, con merengue y frutos rojos frescos.",
    price: "$95.00",
    image: "postre7.png",
    category: "postres"
  },
  {
    title: "FLAN TRADICIONAL",
    description: "Delicioso flan casero con salsa de caramelo",
    price: "$95.00",
    image: "postre5.png",
    category: "postres"
  },
  {
    title: "TIRAMISU",
    description: "Delicioso tiramisu casero con salsa de caramelo",
    price: "$95.00",
    image: "postre8.png",
    category: "postres"
  },
  // PROMOCIONES
  {
    title: "2X1 EN HAMBURGUESAS",
    description: "Martes de sabor",
    price: "Q195",
    image: "combo1.webp",
    category: "promociones"
  },
  {
    title: "BRUNCH FAMILIAR",
    description: "Para 4 personas",
    price: "Q350",
    image: "combo2.webp",
    category: "promociones"
  },
  {
    title: "NOCHE DE CÓCTELES",
    description: "Bebidas seleccionadas",
    price: "Q45",
    image: "combo3.webp",
    category: "promociones"
  }
];

import { dbConnection } from './configs/db.js';

const runSeed = async () => {
  try {
    await dbConnection();
    console.log('Conectado a la BD para seeding');
    
    // Opcional: limpiar antes
    await Product.deleteMany({});
    
    await Product.insertMany(seedProducts);
    console.log('Productos insertados correctamente!');
    process.exit(0);
  } catch (error) {
    console.error('Error insertando:', error);
    process.exit(1);
  }
};

runSeed();