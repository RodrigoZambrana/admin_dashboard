import React from "react";
import useCheckoutSubmit from "../../hooks/useCheckoutSubmit";
import Error from "../form/Error";
import InputArea from "../form/InputArea";
import { Link } from "react-router-dom";
import { IoReturnUpBackOutline, IoArrowForward } from "react-icons/io5";
import { Button } from "@windmill/react-ui";
import { useForm } from "react-hook-form";

const CheckoutForm = (customerId) => {
  const {
    errors,
    isCheckoutSubmit,
    onSubmit,
    customerBudget,
    register,
    handleSubmit,
  } = useCheckoutSubmit(customerId);

  let prealoadedValues = {
    id: 0,
    full_name: "Rodrigo",
    email: "rodrigo@gmail.com",
    telephone: "35353534",
    address: "general fraga",
  };

  if (customerId) {
    prealoadedValues = customerId;
  }

  return (
    <div>
      <div className="mt-20 md:mt-0 md:col-span-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <h2 className="font-semibold font-serif text-base text-gray-700 pb-3 mt-10">
              Datos del cliente
            </h2>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <InputArea
                  register={register}
                  label="Nombre"
                  name="full_name"
                  type="text"
                  placeholder="Nombre"
                  required="true"
                />
                <Error errorName={errors.full_name} />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <InputArea
                  register={register}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="email"
                  required="true"
                />
                <Error errorName={errors.email} />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <InputArea
                  register={register}
                  label="Teléfono"
                  name="telephone"
                  type="tel"
                  placeholder="teléfono"
                  required="true"
                />
                <Error errorName={errors.telephone} />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <InputArea
                  register={register}
                  label="Direccion"
                  name="address"
                  type="text"
                  placeholder="Direccion"
                  required="true"
                />
                <Error errorName={errors.address} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
            <div className="col-span-6 sm:col-span-3">
              <Link to="/market">
                <a className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center font-serif w-full">
                  <span className="text-xl mr-2">
                    <IoReturnUpBackOutline />
                  </span>
                  Agregar productos
                </a>
              </Link>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <Button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
              >
                {isCheckoutSubmit ? (
                  <span className="flex justify-center text-center">
                    {" "}
                    <img
                      src="/spinner.gif"
                      alt="Loading"
                      width={20}
                      height={10}
                    />{" "}
                    <span className="ml-2">Procesando</span>
                  </span>
                ) : (
                  <span className="flex justify-center text-center">
                    {" "}
                    Confirmar
                    <span className="text-xl ml-2">
                      {" "}
                      <IoArrowForward />
                    </span>
                  </span>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
