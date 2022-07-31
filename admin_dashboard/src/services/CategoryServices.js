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
    return requests.put(`/categories/status/${id}`, body);
  },

  deleteCategory(id, body) {
    return requests.patch(`/categories/${id}`, body);
  },
};

export default CategoryServices;
