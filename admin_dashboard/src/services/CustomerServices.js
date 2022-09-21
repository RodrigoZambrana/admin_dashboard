import requests from "./httpService";

const CustomerServices = {
  getAllCustomers(body) {
    return requests.get(`/customer`, body);
  },
  customerById(id) {
    return requests.get(`/customer/${id}`);
  },

  deleteCustomer(id) {
    return requests.delete(`/customer/${id}`);
  },
};

export default CustomerServices;
