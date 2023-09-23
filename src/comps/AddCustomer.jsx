import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { setItem } from "./utils";
import InputComponent from "./FormInput";
import {
  idValidation,
  nameValidation,
  phoneValidation,
  SubmitButton,
} from "./utils_forms";

const AddCustomer = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await setItem("customers", data, data.id);
      console.log(data);
      navigate("/customers");
    } catch (error) {
      console.error(error);
      alert(
        "There was a problem fulfilling your request, if the problem persists, please contact the administrator."
      );
    }
  };

  return (
    <>
      <div className="container mx-auto py-6 px-4 max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Add Customer</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Customer ID */}
          <InputComponent
            label="Customer ID"
            name="id"
            register={register}
            validation={idValidation}
            error={errors.id}
          />

          {/* First name */}
          <InputComponent
            label="First Name"
            name="firstName"
            register={register}
            validation={nameValidation("First name", 20)}
            error={errors.firstName}
          />

          {/* Last name */}
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

          {/* Submit button */}
          <SubmitButton
            isDirty={isDirty}
            isSubmitting={isSubmitting}
            label="Add Customer"
          />
        </form>
      </div>
    </>
  );
};
export default AddCustomer;
