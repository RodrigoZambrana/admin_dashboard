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
  const [customerBudget, setCustomerBudget] = useState({
    full_name: "Learn Hooks",
    email: "rodrigo@gmail.com",
    telephone: "",
    address: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsCheckoutSubmit(true);
    setError("");
    let orderInfo = {
      name: `${data.firstName} ${data.lastName}`,
      address: data.address,
      contact: data.contact,
      email: data.email,
      city: data.city,
      status: "Pending",
      cart: items,
      subTotal: cartTotal,
      shippingCost: shippingCost,
      discount: discountAmount,
      total: total,
    };
  };

  useEffect(() => {
    if (customerId !== undefined) {
      CustomerServices.getCustomerById(customerId.value.id)
        .then((res) => {
          if (res) {
            setValue("full_name", res.full_name);
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
