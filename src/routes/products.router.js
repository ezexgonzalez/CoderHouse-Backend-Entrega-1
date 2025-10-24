import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

// get all
router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = query
      ? { $or: [{ category: query }, { status: query === 'true' }] }
      : {};

    const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sortOption,
      lean: true
    };

    const result = await productModel.paginate(filter, options);

    const response = {
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}` : null,
      nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}` : null
    };

    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: 'Error al obtener productos' });
  }
});

// get by id
router.get("/:pid", async (req,res)=>{
    try {
        const pid = req.params.pid;
      const product = await productManager.getProductById(pid);
      res.status(200).json(product)
    } catch (error) {
        res.status(404).json({error: "Producto no encontrado."});
    }
})


// POST 

router.post("/", async (req, res)=>{
    try {
        const newProduct = await productManager.addProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(404).json({error:"Error al agregar producto."})
    }
    
})

//PUT

router.put("/:pid", async(req, res)=>{
    try {
        const updated = await productManager.updateProductById(req.params.pid, req.body);
        res.status(202).json(updated);
    } catch (error) {
        res.status(404).json({error: error});
    }
});

//DELETE

router.delete("/:pid", async (req,res) =>{
    try {
        if(await productManager.getProductById(req.params.pid)){
            const deleted = await productManager.deleteProductById(req.params.pid);
            res.status(202).json({product: deleted, mesagge:"Producto eliminado"});

        }else{
            res.status(404).json({error:"El producto seleccionado no existe"});
        }
        

    } catch (error) {
        res.status(404).json({error:error});
    }

});



export default router;