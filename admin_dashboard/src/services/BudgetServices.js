import requests from "./httpService";

const BudgetServices = {
  addCoupon(body) {
    return requests.post("/coupon/add", body);
  },

  getAllCoupons() {
    return requests.get("/budget");
  },
  getCouponById(id) {
    return requests.get(`/coupon/${id}`);
  },
  updateCoupon(id, body) {
    return requests.put(`/coupon/${id}`, body);
  },
  deleteCoupon(id) {
    return requests.delete(`/coupon/${id}`);
  },
};

export default BudgetServices;
