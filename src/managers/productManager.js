import crypto from "crypto";
import e from "express";
import { utimes } from "fs";
import fs from "fs/promises";

class ProductManager{
    constructor(pathFile){
        this.pathFile = pathFile;
    }

    generateNewId(){
        return crypto.randomUUID();
    }

    async getDataFile(){
        const fileData = await fs.readFile(this.pathFile, "utf-8");
        const products = JSON.parse(fileData);

        return products;
    }

    async addProduct(newProduct){
        try{
            const products = await this.getDataFile();
            const newId = this.generateNewId();

            const product = {id: newId, ...newProduct};
            products.push(product);

            await fs.writeFile( this.pathFile, JSON.stringify(products, null, 2), "utf-8");
            
            return {message: "Producto añadido correctamente"};

        }catch(error){
            return error.message;
        }
    }

    async getProducts(){
        try{
            const data =  await this.getDataFile();
            const products = [...data];
            return products;
        }catch(error){
            return error.message;
        }
    }

    async updateProductById(productId, updates){
        try {
            const products = await this.getDataFile();
            const indexProduct = products.findIndex((product)=> product.id === productId);
            if(indexProduct === -1) throw new Error("Producto no encontrado");

            products[indexProduct] = {...products[indexProduct], ...updates}

            await fs.writeFile(this.pathFile, JSON.stringify(products, null, 2), "utf-8");

            return products[indexProduct];
            
        } catch (error) {
            return error.message;
        }
    }

    async deleteProductById(productId){
        try {
            const products = await this.getDataFile();

            const filteredProduct = products.filter(product => product.id !== productId);

            await fs.writeFile(this.pathFile, JSON.stringify(filteredProduct, null, 2) , "utf-8");

            return filteredProduct;
        } catch (error) {
            return error.message;
        }
        


    }

    async getProductById(productId){
        try {
            const products = await this.getDataFile();
            const product = products.find((p) => p.id === productId);
            return product;
        } catch (error) {
           return error.message;
        }
    } 



} 




export default ProductManager;