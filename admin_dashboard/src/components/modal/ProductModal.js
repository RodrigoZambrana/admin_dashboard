import React, { useContext, useEffect } from 'react'
import { FiPlus, FiMinus } from 'react-icons/fi'
import Stock from '../common/Stock'
import Price from '../common/Price'
import useAddToCart from '../../hooks/useAddToCart'
import BudgetAddModal from '../modal/BudgetAddModal'
import { SidebarContext } from '../../context/SidebarContext'
import Title from '../form/Title'
import Error from '../form/Error'
import InputArea from '../form/InputArea'
import useProductSubmit from '../../hooks/useProductSubmit'
import { Button, Textarea } from '@windmill/react-ui'

const ProductModal = ({ modalOpen, setModalOpen, product }) => {
  const { setIsLoading, isLoading } = useContext(SidebarContext)
  const {
    setItem,
    item,
    register,
    errors,
    handleSubmit,
    onSubmit,
    setProduct,
  } = useAddToCart()

  useEffect(() => {
    setProduct(product)
  }, [])

  const handleMoreInfo = (slug) => {
    setModalOpen(false)
    //router.push(`/product/${slug}`)
    setIsLoading(!isLoading)
  }

  return (
    <BudgetAddModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block w-full max-w-lg p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <div className="w-full flex flex-col p-5 md:p-8 text-left">
          <div className="mb-2 md:mb-2.5 block -mt-1.5">
            <h1 className="text-heading text-lg md:text-xl lg:text-2xl align-middle font-semibold font-serif hover:text-black cursor-pointer text-center">
              Agregar producto al presupuesto - {product.name}
            </h1>
            {/* <Stock product={product} /> */}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {product.unit !== 'Unidad' ? (
              <>
                <div className="grid grid-cols-6 gap-6 text-center ml-10 mb-5">
                  <div className="col-span-2">
                    <InputArea
                      register={register}
                      label="Ancho"
                      name="width"
                      type="number"
                      required="true"
                      placeholder="Ancho"
                    />
                    <Error errorName={errors.height} />
                  </div>
                  <span>x</span>
                  <div className="col-span-2">
                    <InputArea
                      register={register}
                      label="Ancho"
                      name="height"
                      type="number"
                      required="true"
                      placeholder="Alto"
                    />
                    <Error errorName={errors.height} />
                  </div>
                </div>
                <Textarea
                  className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  {...register('description', {
                    minLength: {
                      value: 10,
                      message: 'Minimum 10 character!',
                    },
                  })}
                  name="description"
                  placeholder="Informacion adicional"
                  rows="4"
                  spellCheck="false"
                />
                <Error errorName={errors.description} />
              </>
            ) : (
              <>
                <Textarea
                  className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  {...register('description', {
                    required: 'Description is required!',
                    minLength: {
                      value: 10,
                      message: 'Minimum 10 character!',
                    },
                  })}
                  name="description"
                  placeholder="Informacion adicional"
                  rows="4"
                  spellCheck="false"
                />
                <Error errorName={errors.description} />
              </>
            )}
            <Price product={product} />
            <div className="flex items-center mt-4">
              <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
                <div className="group flex items-center justify-between rounded-md overflow-hidden flex-shrink-0 border h-11 md:h-12 border-gray-300">
                  <button
                    type="button"
                    onClick={() => setItem(item - 1)}
                    className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-e border-gray-300 hover:text-gray-500"
                  >
                    <span className="text-dark text-base">
                      <FiMinus />
                    </span>
                  </button>
                  <p className="font-semibold flex items-center justify-center h-full  transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-8  md:w-20 xl:w-24">
                    {item}
                  </p>
                  <button
                    type="button"
                    onClick={() => setItem(item + 1)}
                    className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-8 md:w-12 text-heading border-s border-gray-300 hover:text-gray-500"
                  >
                    <span className="text-dark text-base">
                      <FiPlus />
                    </span>
                  </button>
                </div>
                <Button
                  type="submit"
                  disabled={product.stock < 1}
                  className="text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-emerald-500 hover:bg-emerald-600 w-full h-12"
                >
                  Agregar al presupuesto
                </Button>
              </div>
            </div>
          </form>
          <div className="flex flex-col mt-4">
            <div className="flex items-center justify-between space-s-3 sm:space-s-4 w-full">
              <div>
                <span className="font-serif font-semibold py-1 text-sm d-block"></span>
              </div>
              <div>
                <button
                  onClick={() => handleMoreInfo(product.id)}
                  className="font-sans font-medium text-sm text-orange-500"
                >
                  Mas detalles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BudgetAddModal>
  )
}

export default React.memo(ProductModal)
