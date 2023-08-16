import { useNavigate } from "react-router-dom";
import { addItem } from "./utils";
import { useForm } from "react-hook-form";
import InputComponent from "./FormInput";
import {
  nameValidation,
  priceValidation,
  unitsValidation,
  SubmitButton,
} from "./utils_forms";

const AddProduct = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addItem("products", data);
      console.log(data);
      navigate("/Products");
    } catch (error) {
      console.log(error);
      alert(
        "There was a problem fulfilling your request, if the problem persists, please contact the administrator."
      );
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <InputComponent
          label="Product Name"
          name="name"
          register={register}
          validation={nameValidation("name", 30)}
          //required={true}
          error={errors.name}
        />

        {/* Product Price */}
        <InputComponent
          label="Product Price"
          type="number"
          name="price"
          register={register}
          validation={priceValidation}
          //required={true}
          error={errors.price}
        />

        {/* Product Units */}
        <InputComponent
          label="Product Units"
          type="number"
          name="units"
          register={register}
          validation={unitsValidation}
          //required={true}
          error={errors.units}
        />

        {/* Add button */}
        <SubmitButton
          isDirty={isDirty}
          isSubmitting={isSubmitting}
          label="Create"
        />
      </form>
    </div>
  );
};
export default AddProduct;
