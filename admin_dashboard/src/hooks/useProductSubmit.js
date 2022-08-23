import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../context/SidebarContext";
import ProductServices from "../services/ProductServices";
import { notifyError, notifySuccess } from "../utils/toast";
import useAsync from "../hooks/useAsync";
import CategoryServices from "../services/CategoryServices";

const useProductSubmit = (id) => {
  const { data } = useAsync(CategoryServices.getAllCategory); //   console.log(value);

  const [imageUrl, setImageUrl] = useState();
  const [subcategory, setSubcategory] = useState();
  const [subcategories, setSubcategories] = useState();
  const [categoryTest, setCategoryTest] = useState();
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
      name: data.name,
      category: data.category,
      subcategory: data.subcategory,
      unit: data.unit,
      provider: data.provider,
      price: data.price,
      sale_price: data.sale_price,
      image: imageUrl,
      tags: JSON.stringify(tag),
      description: data.description,
    };

    if (id) {
      ProductServices.updateProduct(id, productData)
        .then((res) => {
          setIsUpdate(true);
          closeDrawer();
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      // closeDrawer();
    } else {
      ProductServices.addProduct(productData)
        .then((res) => {
          console.log(productData);
          setIsUpdate(true);
          notifySuccess(res.message);
          closeDrawer();
        })
        .catch((err) => notifyError(err.message));
      // closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("name");
      setValue("description");
      setValue("category", "Seleccione una categoria");
      setValue("subcategory", "Seleccione una subcategoria");
      setValue("unit");
      setValue("price");
      setValue("sale_price");
      setValue("provider");
      setImageUrl("");
      setTag([]);
      clearErrors("name");
      clearErrors("category");
      clearErrors("subcategory");
      clearErrors("unit");
      clearErrors("price");
      clearErrors("sale_price");
      clearErrors("description");
      clearErrors("provider");

      return;
    }

    if (id) {
      ProductServices.getProductById(id)
        .then((res) => {
          if (res) {
            setValue("name", res.name);
            setValue("subcategory", res.subcategory.id);
            setValue("category", res.subcategory.categoryId);
            setValue("unit", res.unit);
            setValue("price", res.price);
            setValue("sale_price", res.sale_price);
            setValue("provider", res.provider);
            setTag(JSON.parse(res.tags));
            setImageUrl(res.image);
            setValue("description", res.description);
            setCategoryTest(res.subcategory.categoryId);
            setSubcategory(res.subcategory.id);
            loadCategories(res.subcategory.categoryId);
          }
        })
        .catch((err) => {
          notifyError("There is a server error!");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);

  const loadCategories = (categoryId) => {
    const filter = data.filter((category) => {
      return category.id == categoryId;
    });
    setSubcategories(filter[0]);
    console.log(filter[0]);
  };

  useEffect(() => {
    console.log("seteo de subcategoria" + subcategory);
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
    categoryTest,
    subcategories,
  };
};

export default useProductSubmit;
