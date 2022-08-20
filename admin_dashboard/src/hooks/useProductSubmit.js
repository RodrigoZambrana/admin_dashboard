import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../context/SidebarContext";
import ProductServices from "../services/ProductServices";
import { notifyError, notifySuccess } from "../utils/toast";

const useProductSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState();
  const [subcategory, setSubcategory] = useState();
  const [tag, setTag] = useState([]);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!imageUrl) {
      notifyError("Image is required!");
      return;
    }
    if (data.price < data.salePrice) {
      notifyError("El precio de costo no puede ser mayor al precio de venta!");
      return;
    }

    const productData = {
      name: data.title,
      category: data.subcategory.categoryId,
      subcategory: data.subcategory.id,
      unit: data.unit,
      price: data.price,
      sale_price: data.sale_price,
      discount: data.discount,
      image: imageUrl,
      tag: JSON.stringify(tag),
      provider: data.provider,
      description: data.description,
    };

    if (id) {
      ProductServices.updateProduct(id, productData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      ProductServices.addProduct(productData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("name");
      setValue("description");
      setValue("category");
      setValue("subcategory");
      setValue("unit");
      setValue("price");
      setValue("sale_price");
      setImageUrl("");
      setTag([]);
      clearErrors("name");
      clearErrors("description");
      clearErrors("category");
      clearErrors("subcategory");
      clearErrors("unit");
      clearErrors("price");
      clearErrors("sale_price");
      return;
    }

    if (id) {
      ProductServices.getProductById(id)
        .then((res) => {
          if (res) {
            setValue("name", res.name);
            setValue("subcategory", res.subcategory.name);
            setValue("category", res.subcategory.categoryId);
            setValue("unit", res.unit);
            setValue("price", res.price);
            setValue("sale_price", res.sale_price);
            setValue("provider", res.provider);
            setTag(JSON.parse(res.tags));
            setImageUrl(res.image);
            setValue("description", res.description);
          }
        })
        .catch((err) => {
          notifyError("There is a server error!");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);

  useEffect(() => {
    setSubcategory(watch("subcategory"));
  }, [watch, subcategory]);

  return {
    register,
    watch,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    tag,
    setTag,
  };
};

export default useProductSubmit;
