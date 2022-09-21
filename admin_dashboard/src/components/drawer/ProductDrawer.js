import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Textarea, Select } from "@windmill/react-ui";
import ReactTagInput from "@pathofdev/react-tag-input";

import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import InputValue from "../form/InputValue";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
import useProductSubmit from "../../hooks/useProductSubmit";
import useAsync from "../../hooks/useAsync";
import CategoryServices from "../../services/CategoryServices";
import SelectProductUnit from "../form/SelectProductUnit";
import SelectProductProvider from "../form/SelectProductProvider";

const ProductDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    tag,
    setTag,
    subcategories,
    categoryTest,
  } = useProductSubmit(id);

  const { data } = useAsync(CategoryServices.getAllCategory); //   console.log(value);
  const [selectedCategory, setSelectedCategory] = useState();
  const [categoryId, setCategoryId] = useState();

  useEffect(() => {
    setCategoryId(categoryTest);
    setSelectedCategory(subcategories);
    console.log("categoryID:" + categoryTest);
  }, [subcategories]);

  const handleCategoryChange = function (e) {
    const categoryId = e.target.value;
    setCategoryId(categoryId);

    const filter = data.filter((category) => {
      return category.id == categoryId;
    });
    setSelectedCategory(filter[0]);
  };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Actualizar Producto"
            description="Actualizar información de producto"
          />
        ) : (
          <Title
            title="Agregar Producto"
            description="Ingrese la información del nuevo producto"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="block">
          <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Imagen" />
              <div className="col-span-8 sm:col-span-4">
                <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Nombre de Producto" />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  required="true"
                  label="Nombre de Producto"
                  name="name"
                  type="text"
                  placeholder="Nombre de Producto"
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Categoria" />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="category"
                  {...register("category", {
                    required: "Product parent category is required!",
                  })}
                  onChange={handleCategoryChange}
                >
                  <option hidden defaultValue>
                    Seleccione una categoria
                  </option>
                  {data.length > 0 &&
                    data.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </Select>
                <Error errorName={errors.parent} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Subcategoria" />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name="subcategory"
                  {...register("subcategory", {
                    required: "Product parent category is required!",
                  })}
                >
                  {categoryId > -1 &&
                    selectedCategory.subCategories.length > 0 &&
                    selectedCategory.subCategories.map((subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </option>
                    ))}
                </Select>
                <Error errorName={errors.children} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Unidad de medida (m/m2/unidad)" />
              <div className="col-span-8 sm:col-span-4">
                <SelectProductUnit
                  register={register}
                  label="Unidad"
                  id="unit"
                  name="unit"
                />
                <Error errorName={errors.unit} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Proveedor" />
              <div className="col-span-8 sm:col-span-4">
                <SelectProductProvider
                  register={register}
                  label="Proveedor"
                  id="provider"
                  name="provider"
                />
                <Error errorName={errors.provider} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Precio de costo" />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  register={register}
                  required="true"
                  maxValue={2000}
                  minValue={1}
                  label="Precio de costo"
                  name="price"
                  type="number"
                  placeholder="Precio de costo"
                />
                <Error errorName={errors.price} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Precio de venta" />
              <div className="col-span-8 sm:col-span-4">
                <InputValue
                  register={register}
                  maxValue={20000}
                  minValue={1}
                  defaultValue="0"
                  required="true"
                  label="Precio de venta"
                  name="sale_price"
                  type="number"
                  placeholder="Precio de Venta"
                />
                <Error errorName={errors.sale_price} />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Product Tag" />
              <div className="col-span-8 sm:col-span-4">
                <ReactTagInput
                  placeholder="Eiquetas (Escribir y presionar enter para guardar )"
                  tags={tag}
                  onChange={(newTags) => setTag(newTags)}
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Descripcion" />
              <div className="col-span-8 sm:col-span-4">
                <Textarea
                  className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  {...register("description", {
                    required: "Description is required!",
                    minLength: {
                      value: 10,
                      message: "Minimum 10 character!",
                    },
                  })}
                  name="description"
                  placeholder="Descripción"
                  rows="4"
                  spellCheck="false"
                />
                <Error errorName={errors.description} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Producto" />
        </form>
      </Scrollbars>
    </>
  );
};

export default ProductDrawer;
