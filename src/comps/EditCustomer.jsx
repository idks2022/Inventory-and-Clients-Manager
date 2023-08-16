import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateItem, deleteItem } from "./utils";
import { useForm } from "react-hook-form";
import InputComponent from "./FormInput";
import {
  nameValidation,
  phoneValidation,
  idValidation,
  SubmitButton,
  DeleteButton,
} from "./utils_forms";
import PurchasesQuery from "./PurchasesQuery";

const EditCustomer = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const customer = useSelector(
    (state) => state.customers.customers[customerId]
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (customer) {
      setValue("id", customer.id);
      setValue("firstName", customer.firstName);
      setValue("lastName", customer.lastName);
      setValue("city", customer.city);
      setValue("phone", customer.phone);
    }
  }, [customer, setValue]);

  const onSubmit = async (data) => {
    try {
      const { id, ...restOfData } = data;
      await updateItem("customers", restOfData, customerId);
      console.log(data);
      reset(data);
    } catch (error) {
      console.log(error);
      alert(
        "There was a problem fulfilling your request, if the problem persists, please contact the administrator."
      );
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteItem("customers", customerId);
        navigate("/customers");
      } catch (error) {
        console.error(error);
        alert(
          "There was a problem fulfilling your request, if the problem persists, please contact the administrator."
        );
      }
    }
  };

  if (!customer) return <p>Loading...</p>;

  return (
    <>
      <div className="container mx-auto py-3 px-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border border-gray-300 p-1 mb-2 space-y-2 rounded">
            <h4>Edit Customer:</h4>

            {/* Customer ID */}
            <InputComponent
              label="Customer ID"
              name="id"
              register={register}
              disabled={true}
            />

            {/* First Name */}
            <InputComponent
              label="First Name"
              name="firstName"
              register={register}
              validation={nameValidation("First name", 20)}
              error={errors.firstName}
            />

            {/* Last Name */}
            <InputComponent
              label="Last Name"
              name="lastName"
              register={register}
              validation={nameValidation("Last name", 20)}
              error={errors.lastName}
            />

            {/* City */}
            <InputComponent
              label="City"
              name="city"
              register={register}
              validation={nameValidation("City", 20)}
              error={errors.city}
            />

            {/* Phone */}
            <InputComponent
              label="Phone"
              type="number"
              name="phone"
              register={register}
              validation={phoneValidation}
              error={errors.phone}
            />

            <div className="flex justify-between">
              {/* Update button */}
              <SubmitButton
                isDirty={isDirty}
                isSubmitting={isSubmitting}
                label="Update"
              />

              {/* Delete button */}
              <DeleteButton handleClick={handleDelete} label="Delete" />
            </div>
          </div>
        </form>

        <div className="border border-gray-300 p-1 rounded">
          <h4>Purchases of this customer:</h4>
          <PurchasesQuery customer={customerId} renderedFrom="customer" />
        </div>
      </div>
    </>
  );
};

export default EditCustomer;
