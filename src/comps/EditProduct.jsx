import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateItem, deleteItem } from "./utils";
import { useForm } from "react-hook-form";
import InputComponent from "./FormInput";
import {
  nameValidation,
  priceValidation,
  unitsValidation,
  idValidation,
  SubmitButton,
  DeleteButton,
} from "./utils_forms";
import PurchasesQuery from "./PurchasesQuery";

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const product = useSelector((state) => state.products.products[productId]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm();

  useEffect(() => {
    if (product) {
      setValue("id", product.id);
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("units", product.units);
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    try {
      const { id, ...restOfData } = data;
      await updateItem("products", restOfData, productId);
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
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteItem("products", productId);
        navigate("/products");
      } catch (error) {
        console.error(error);
        alert(
          "There was a problem fulfilling your request, if the problem persists, please contact the administrator."
        );
      }
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-3 px-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border border-gray-300 p-1 mb-2 space-y-2 rounded">
          <h4>Edit Product:</h4>

          {/* Product ID */}
          <InputComponent
            label="Product ID"
            name="id"
            register={register}
            disabled={true}
          />

          {/* Product Name */}
          <InputComponent
            label="Name"
            name="name"
            register={register}
            validation={nameValidation("Name", 30)}
            error={errors.name}
          />

          {/* Product Price */}
          <InputComponent
            label="Price"
            type="number"
            name="price"
            register={register}
            validation={priceValidation}
            error={errors.price}
          />

          {/* Product Units */}
          <InputComponent
            label="Units"
            type="number"
            name="units"
            register={register}
            validation={unitsValidation}
            error={errors.units}
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
        <h4>Purchases of this product:</h4>
        <PurchasesQuery product={productId} renderedFrom="product" />
      </div>
    </div>
  );
};

export default EditProduct;
