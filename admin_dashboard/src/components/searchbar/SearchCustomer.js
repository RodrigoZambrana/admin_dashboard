import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import useAsync from "../../hooks/useAsync";
import customerServices from "../../services/CustomerServices";
import { notifySuccess, notifyError } from "../../utils/toast";
import useCheckoutSubmit from "../../hooks/useCheckoutSubmit";

const SearchCustomer = () => {
  const { data, loading } = useAsync(customerServices.getAllCustomers);
  const {
    handleSubmit,
    submitHandler,
    register,
    errors,
    total,
    isEmpty,
    items,
    cartTotal,
    isCheckoutSubmit,
    customerId,
    setCustomerId,
  } = useCheckoutSubmit();

  return (
    <Stack spacing={4}>
      <Autocomplete
        onChange={(event, value) => setCustomerId({ value })}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={data.map((option) => ({
          id: option.id,
          label: option.full_name,
        }))}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar cliente"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Stack>
  );
};
export default SearchCustomer;
