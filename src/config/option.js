const options = {
    fileSystem:{
        cartFileName:"./src/data/cart.json",
        productsFileName:"./src/data/Product.json"
    },
    mongoDb:{
        url:"mongodb+srv://admin:1234@ecommerce.koayiwg.mongodb.net/ecommerce?retryWrites=true&w=majority"
    }
};

module.exports = options ;