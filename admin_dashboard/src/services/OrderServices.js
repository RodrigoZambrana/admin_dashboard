import requests from "./httpService";

const OrderServices = {
  getAllOrders(body, headers) {
    return requests.get("/order", body, headers);
  },

  getOrderByUser(id, body) {
    return requests.get(`/order/user/${id}`, body);
  },

  getOrderById(id, body) {
    return requests.get(`/order/${id}`, body);
  },

  updateOrder(id, body, headers) {
    return requests.put(`/orders/${id}`, body, headers);
  },

  deleteOrder(id) {
    return requests.delete(`/order/${id}`);
  },
};

export default OrderServices;
