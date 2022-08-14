import requests from "./httpService";

const ProductServices = {
  getAllProducts() {
    return requests.get("/product");
  },

  getStockOutProducts() {
    return requests.get("/product/stock-out");
  },

  getProductById(id) {
    return requests.post(`/product/${id}`);
  },

  addProduct(body) {
    return requests.post("/product/add", body);
  },

  addAllProducts(body) {
    return requests.post("/product/all", body);
  },

  updateProduct(id, body) {
    return requests.put(`/product/${id}`, body);
  },

  updateStatus(id, body) {
    return requests.put(`/product/status/${id}`, body);
  },

  deleteProduct(id) {
    return requests.delete(`/product/${id}`);
  },
};

export default ProductServices;
