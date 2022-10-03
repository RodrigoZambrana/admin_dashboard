import React, { useEffect, useState } from 'react'
import Error from '../components/form/Error'
import LabelArea from '../components/form/LabelArea'
import InputArea from '../components/form/InputArea'
import useProductSubmit from '../hooks/useProductSubmit'
import useAsync from '../hooks/useAsync'
import CategoryServices from '../services/CategoryServices'
import PageTitle from '../components/Typography/PageTitle'

import { Card, CardBody } from '@windmill/react-ui'

const Customers = ({ id }) => {
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
  } = useProductSubmit(id)

  const { data } = useAsync(CategoryServices.getAllCategory) //   console.log(value);
  const [selectedCategory, setSelectedCategory] = useState()
  const [categoryId, setCategoryId] = useState()

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <PageTitle>Actualizar Cliente</PageTitle>
        ) : (
          <PageTitle>Agregar Cliente</PageTitle>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="block">
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
              Contacto
            </p>
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full">
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Nombre" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    required="true"
                    label="Nombre"
                    name="name"
                    type="text"
                    placeholder="Nombre"
                  />
                  <Error errorName={errors.name} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="E-mail" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    required="false"
                    label="E-mail"
                    name="email"
                    type="email"
                    placeholder="E-mail"
                  />
                  <Error errorName={errors.name} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Teléfono" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    required="true"
                    label="Teléfono"
                    name="telephone"
                    type="number"
                    placeholder="E-mail"
                  />
                  <Error errorName={errors.name} />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
              Dirección
            </p>
            <div className="px-6 pt-8 flex-grow w-full h-full max-h-full">
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Nombre" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    required="true"
                    label="Nombre"
                    name="name"
                    type="text"
                    placeholder="Nombre"
                  />
                  <Error errorName={errors.name} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="E-mail" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    required="false"
                    label="E-mail"
                    name="email"
                    type="email"
                    placeholder="E-mail"
                  />
                  <Error errorName={errors.name} />
                </div>
              </div>
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label="Teléfono" />
                <div className="col-span-8 sm:col-span-4">
                  <InputArea
                    register={register}
                    required="true"
                    label="Teléfono"
                    name="telephone"
                    type="number"
                    placeholder="E-mail"
                  />
                  <Error errorName={errors.name} />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </form>
    </>
  )
}

export default Customers
