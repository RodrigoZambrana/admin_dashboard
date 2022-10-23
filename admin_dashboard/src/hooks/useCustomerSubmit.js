import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../context/SidebarContext";
import CustomerServices from "../services/CustomerServices";
import { notifyError, notifySuccess } from "../utils/toast";

const useCustomerSubmit = (id) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const customerData = {
      full_name: data.full_name,
      email: data.email,
      telephone: data.telephone,
      street: data.street,
      number: data.number,
      apartment: data.apartment,
      corner: data.corner,
    };

    if (id && id != 0) {
      CustomerServices.updateCustomer(id, customerData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      // closeDrawer();
    } else {
      CustomerServices.addCustomer(customerData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  useEffect(() => {
    if (id != 0) {
      CustomerServices.getCustomerById(id)
        .then((res) => {
          console.log(res);
          if (res) {
            setValue("full_name", res.full_name);
            setValue("email", res.email);
            setValue("telephone", res.telephone);
            setValue("street", res.full_name);
            setValue("number", res.full_name);
            setValue("apartment", res.addresses[0].apartment);
            setValue("corner", res.addresses[0].corner);
            setValue("number", res.addresses[0].number);
          }
        })
        .catch((err) => {
          notifyError("There is a server error!");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};

export default useCustomerSubmit;
