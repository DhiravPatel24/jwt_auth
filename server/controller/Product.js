const Product = require('../model/Product')

const AddProduct = async (req, res) => {
    const { name, category, price } = req.body;
    const image = req.file.path;
  
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Image file is required' });
      }
  
      const newProduct = new Product({
        name,
        category,
        price,
        image: req.file.path 
      });
  
      await newProduct.save();
      res.status(200).json({
        message: 'Product added successfully',
        product: newProduct,
      });
    } catch (error) {
      console.log('Error in adding the product', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

const DeleteProduct = async(req,res) =>{
    const {id} = req.params
    try{
        const deletedProduct = await Product.findByIdAndDelete(id)
        if(!deletedProduct){
            return res.status(404).json({
                message:'product not found',
            })
        }
        res.status(200).json({message:'product deleted successfully'})
    }catch(error){
        console.log('error in deleting product',error)
    }
}

const GetAllProducts = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();

        // Check if there are no products
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        // Send the products in the response
        res.status(200).json({
            message: 'Products retrieved successfully',
            products: products.map(product => ({
                ...product.toObject(), // Convert mongoose document to plain object
                image: product.image // Cloudinary URL
            })),
        });
    } catch (error) {
        console.log('Error in fetching products', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {AddProduct,DeleteProduct,GetAllProducts}