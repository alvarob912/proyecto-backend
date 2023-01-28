const ProductModel = require ("../../models/products.models")

class productMongoManager{
    async getProducts() {
        try{
                const prod = ProductModel.find();
                return prod;
            }
        catch(error){
            throw new Error(`no se pudo leer el archivo ${error}`)
        }
    }

    async getProductById(id) {
        try{
            const prod = ProductModel.find(id);
                return prod;
        }
        catch(error){
            throw new Error(`no se pudo leer el archivo ${error}`)
        }
    }

    async addProduct(product) {
        try{
            const savedProducts = await this.getProducts()
            const DuplicatedProduct = savedProducts.find(item => item.code == product.code)
            if (DuplicatedProduct){
                throw new Error(`El codigo ya esta registrado ${product.code}`)
            }
            if (Object.keys(product).length < 6) {
                throw new Error(`Todos los campos son requeridos`)
            }
            const newId = savedProducts.length > 0 ? savedProducts[savedProducts.length -1 ].id + 1 : 1
            const newProduct = {
                id: newId, 
                ...product
            }
            const addProd= await ProductModel.create(newProduct)
            return addProd
        }
        catch(error){
            throw new Error(`error ${error}`)
        }
        }


        async updateProduct(id, product) {
            try {
                const ProdUpdated = await ProductModel.findByIdAndUpdate(id, product,{new:true});
                return ProdUpdated;
            } catch (error) {
                throw new Error(`Error updating ${error}`);}
    }


    async deleteById(id) {
        try {
            const prod = await ProductModel.findByIdAndDelete(id);
            return `Element with code: ${prod.code} deleted successfully`;
        } catch (error) {
            throw new Error(`Error deleting: ${error}`);
        }
    }

    async deleteAll() {
        try {
            await ProductModel.deleteMany({});
            return "delete all successfully";
        } catch (error) {
            throw new Error(`Error deleting: ${error}`);
        }
    }

}

module.exports = productMongoManager;