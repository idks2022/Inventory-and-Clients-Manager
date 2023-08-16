const idValidation = {
  required: "ID is required",
  validate: (value) =>
    (value.length === 9 && /^\d{9}$/.test(value)) || "ID must be 9 digits long",
};

const nameValidation = (label, maxLength) => ({
  required: `${label} is required`,
  maxLength: {
    value: maxLength,
    message: `${label} must be less than ${maxLength} characters`,
  },
});

const priceValidation = {
  required: "Product price is required",
  validate: (value) => value > 0 || "Price must be greater than 0",
};

const unitsValidation = {
  required: "Product units are required",
  validate: (value) => value >= 0 || "Units must be 0 or more",
};

const phoneValidation = {
  required: "Phone number is required",
  validate: (value) =>
    (value.length === 10 && /^\d{10}$/.test(value)) || "Invalid phone number",
};

const SubmitButton = ({ isDirty, isSubmitting, label }) => (
  <button
    disabled={!isDirty || isSubmitting}
    type="submit"
    className={`py-2 px-4 rounded text-white ${
      isDirty && !isSubmitting
        ? "bg-red-500 hover:bg-red-600"
        : "bg-red-200 cursor-not-allowed"
    }`}
  >
    {isSubmitting ? `Loading...` : label}
  </button>
);

const DeleteButton = ({ handleClick, label }) => (
  <button
    type="button"
    onClick={handleClick}
    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
  >
    {label}
  </button>
);

export {
  phoneValidation,
  unitsValidation,
  priceValidation,
  nameValidation,
  idValidation,
  SubmitButton,
  DeleteButton,
};
