import Cookies from "js-cookie";
import * as dayjs from "dayjs";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "react-use-cart";

//internal import
import useAsync from "../hooks/useAsync";
import { notifyError, notifySuccess } from "../utils/toast";
import CustomerServices from "../services/CustomerServices";

const useCheckoutSubmit = () => {
  const [error, setError] = useState("");
  const [total, setTotal] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const [customerId, setCustomerId] = useState();
  const couponRef = useRef("");
  const { isEmpty, emptyCart, items, cartTotal } = useCart();
  const [customerBudget, setCustomerBudget] = useState();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let orderInfo = {
      name: data.full_name,
      address: data.address,
      contact: data.telephone,
      email: data.email,
      status: "Pendiente",
      createdAt: dayjs(new Date()),
      cart: items,
      total: cartTotal,
    };

    Cookies.set("budget", JSON.stringify(orderInfo));
  };

  useEffect(() => {
    if (customerId !== undefined) {
      CustomerServices.getCustomerById(customerId.value.id)
        .then((res) => {
          if (res) {
            setCustomerBudget(res);
            console.log(res);
            return;
          }
        })
        .catch((err) => {
          notifyError("There is a server error!");
        });
    }
  }, [customerId, setValue]);

  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
    showCard,
    setShowCard,
    error,
    discountPercentage,
    discountAmount,
    shippingCost,
    total,
    isEmpty,
    items,
    cartTotal,
    isCheckoutSubmit,
    customerId,
    setCustomerId,
    customerBudget,
    setCustomerBudget,
  };
};

export default useCheckoutSubmit;
