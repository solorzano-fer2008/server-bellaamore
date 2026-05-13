import mongoose from 'mongoose';
import Product from './src/products/product.model.js';
import dotenv from 'dotenv';
dotenv.config();

const seedProducts = [
  {
    title: "COMBO #1 - PAREJA",
    description: "Panes dobles para 2 personas con bebida y complemento",
    price: "$120.00",
    image: "combo1.webp",
    category: "combos"
  },
  {
    title: "COMBO #2 - INDIVIDUAL",
    description: "Panes individuales con bebida y complemento",
    price: "$95.00",
    image: "combo2.webp",
    category: "combos"
  },
  {
    title: "CORTE INDIVIDUAL",
    description: "Jugoso corte premium sellado a la perfección con mantequilla de finas hierbas, acompañado de una ensalada fresca de la estación.",
    price: "$250.00",
    image: "individual1.jpg",
    category: "individuales"
  },
  {
    title: "POLLO A LA PARRILLA",
    description: "Pechuga tierna marinada en especias secretas, asada a la parrilla y servida con vegetales al wok y puré de papa cremoso.",
    price: "$180.00",
    image: "individual2.png",
    category: "individuales"
  },
  {
    title: "LASAÑA ARTESANAL",
    description: "Capas de pasta fresca con ragú de res cocinado a fuego lento, mezcla de tres quesos fundidos y salsa pomodoro casera.",
    price: "$165.00",
    image: "individual3.png",
    category: "individuales"
  },
  {
    title: "HAMBURGUESA GOURMET",
    description: "Res de alta calidad (200g) en pan brioche, con queso cheddar maduro, tocino crujiente, cebolla caramelizada y papas gajo sazonadas.",
    price: "$195.00",
    image: "individual4.png",
    category: "individuales"
  },
  {
    title: "ENSALADA CÉSAR CON SALMÓN",
    description: "Corazones de lechuga romana, crutones artesanales y aderezo César de la casa, coronada con un filete de salmón fresco a la plancha.",
    price: "$210.00",
    image: "individual5.png",
    category: "individuales"
  },
  {
    title: "PASTA ALFREDO",
    description: "Fettuccine al dente bañado en nuestra sedosa salsa de crema y parmesano auténtico, terminado con perejil fresco y pimienta negra.",
    price: "$155.00",
    image: "individual6.png",
    category: "individuales"
  },
  {
    title: "ALMUERZO EJECUTIVO",
    description: "La opción perfecta para tu día: sopa artesanal del día, plato fuerte a elección y una refrescante bebida natural de la casa.",
    price: "$110.00",
    image: "platodecomida1.png",
    category: "almuerzos"
  },
  {
    title: "BOWL SALUDABLE",
    description: "Equilibrio puro en un bowl: base de quinoa orgánica, aguacate fresco, garbanzos crocantes y nuestro aderezo especial de tahini.",
    price: "$135.00",
    image: "platodecomida2.png",
    category: "almuerzos"
  },
  {
    title: "CENA ROMÁNTICA",
    description: "Corte premium con guarnición de espárragos y copa de vino.",
    price: "$450.00",
    image: "platodecomida3.png",
    category: "cenas"
  },
  {
    title: "Tacos de Rib Eye",
    description: "3 piezas de tacos de rib eye con salsa de la casa.",
    price: "$220.00",
    image: "platodecomida4.png",
    category: "cenas"
  },
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
    title: "TARTALETA DE FRUTOS",
    description: "Deliciosa tartaleta con frutos rojos y crema pastelera.",
    price: "$85.00",
    image: "postre1.png",
    category: "postres"
  },
  {
    title: "BROWNIE CON HELADO",
    description: "Brownie de chocolate caliente con una bola de helado de vainilla.",
    price: "$95.00",
    image: "postre2.png",
    category: "postres"
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