import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import ProductModel from "../models/product.model.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

// get all
router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    let filter = {};

    if (query) {
      const [key, value] = query.split(":");

      if (key === "status") {
        filter.status = value.toLowerCase() === "true";
      } else if (key === "category") {
        filter.category = value;
      }
    }

    let sortOption = {};
    if (sort === "asc") sortOption.price = 1;
    else if (sort === "desc") sortOption.price = -1;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sortOption,
      lean: true
    };

    const result = await ProductModel.paginate(filter, options);

    const response = {
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.hasPrevPage ? result.prevPage : null,
      nextPage: result.hasNextPage ? result.nextPage : null,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/api/products?limit=${limit}&page=${result.prevPage}&sort=${sort || ""}&query=${query || ""}` : null,
      nextLink: result.hasNextPage ? `/api/products?limit=${limit}&page=${result.nextPage}&sort=${sort || ""}&query=${query || ""}` : null
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Error al obtener productos" });
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