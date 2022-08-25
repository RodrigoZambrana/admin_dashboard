import requests from "./httpService";

const UserServices = {
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

export default UserServices;
