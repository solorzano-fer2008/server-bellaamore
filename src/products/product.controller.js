import Product from './product.model.js';

export const seedProductsFn = async (req, res) => {
  const seedProducts = [
    {
      title: "COMBO #1 - CHALUPA BAJA",
      description: "Chalupa Baja, complemento a elegir y bebida.",
      price: "$120.00",
      image: "combo1.webp",
      category: "combos"
    },
    {
      title: "COMBO #2 - BURRITO 1/2 LB CRUNCHY",
      description: "Burrito 1/2 lb Crunchy, complemento a elegir y bebida.",
      price: "$140.00",
      image: "combo2.webp",
      category: "combos"
    },
    {
      title: "CORTE INDIVIDUAL",
      description: "Exquisito corte servido con finas hierbas y ensalada fresca.",
      price: "$250.00",
      image: "individual1.jpg",
      category: "individuales"
    },
    {
      title: "LIMONADA ROSA",
      description: "Refrescante limonada rosa con un toque especial.",
      price: "$45.00",
      image: "limonada.png",
      category: "bebidas"
    },
    {
      title: "DESAYUNO CLÁSICO",
      description: "Huevos al gusto, pan artesanal y café de olla.",
      price: "$130.00",
      image: "desayuno1.png",
      category: "desayunos"
    },
    {
      title: "TARTALETA DE FRUTOS",
      description: "Deliciosa tartaleta con frutos rojos.",
      price: "$85.00",
      image: "postre1.png",
      category: "postres"
    }
  ];

  try {
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);
    return res.status(200).json({ success: true, message: 'Productos restaurados' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Obtener productos (con filtro opcional por categoría)
 */
export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};

    if (category) {
      query.category = category.toLowerCase();
    }

    const products = await Product.find(query);

    return res.status(200).json({
      success: true,
      products
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener productos',
      error: error.message
    });
  }
};


/**
 * Crear producto
 */
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    return res.status(201).json({
      success: true,
      message: 'Producto creado',
      product
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear producto',
      error: error.message
    });
  }
};

/**
 * Actualizar producto (FIX IMPORTANTE)
 */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // devuelve el actualizado
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Producto actualizado correctamente',
      product
    });

  } catch (error) {
    console.error('Error al actualizar:', error);

    return res.status(500).json({
      success: false,
      message: 'Error al actualizar producto',
      error: error.message
    });
  }
};

/**
 * Eliminar producto de forma lógica (Soft Delete)
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Producto eliminado correctamente (soft delete)',
      product
    });

  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar producto',
      error: error.message
    });
  }
};