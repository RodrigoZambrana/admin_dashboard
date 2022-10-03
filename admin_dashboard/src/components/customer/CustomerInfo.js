import React from 'react'

const CustomerInfo = () => {
  return (
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
  )
}

export default CustomerInfo
