import { Router } from "express";
import ProductManager from "../managers/productManager.js";

const router = Router();
const productManager = new ProductManager("./src/data/products.json");

// get all
router.get("/", async (req,res)=>{
    try {
        const products = await productManager.getProducts();
        res.json({message: "Lista de prodcutos", products});
    } catch (error) {
        res.status(404).json({error:error});
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