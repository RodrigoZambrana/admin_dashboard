import requests from "./httpService";

const CategoryServices = {
  getAllCategory() {
    return requests.get("/categories");
  },

  getCategoryById(id) {
    return requests.get(`/categories/${id}`);
  },

  addCategory(body) {
    return requests.post("/categories/add", body);
  },

  updateCategory(id, body) {
    return requests.put(`/categories/${id}`, body);
  },

  updateStatus(id, body) {
    return requests.put(`/category/status/${id}`, body);
  },

  deleteCategory(id, body) {
    return requests.patch(`/category/${id}`, body);
  },
};

export default CategoryServices;
