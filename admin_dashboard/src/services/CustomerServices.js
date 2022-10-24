import requests from "./httpService";

const CustomerServices = {
  getAllCustomers(body) {
    return requests.get(`/customer`, body);
  },
  getCustomerById(id) {
    return requests.post(`/customer/${id}`);
  },

  addCustomer(body) {
    return requests.post("/customer/add", body);
  },

  updateCustomer(id, body) {
    return requests.put(`/customer/${id}`, body);
  },

  deleteCustomer(id) {
    return requests.delete(`/customer/${id}`);
  },
};

export default CustomerServices;
