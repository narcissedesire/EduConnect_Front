import React, { useState } from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import Button from "./Button";
import { valideInput } from "./Validation";

export default function Form({
  initialValues,
  validationRules,
  onSubmit,
  children,
  labelBtn,
  typeBtn,
  bgBtn,
  bgBtnHover,
  width,
  defaultValue,
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = valideInput(values, validationRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };

  const inputProps = Object.keys(values).reduce((acc, key) => {
    acc[key] = {
      value: values[key],
      onChange: handleChange,
      error: errors[key],
    };
    return acc;
  }, {});

  const cloneInputs = (children) => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      if (child.type === Input || child.type === TextArea) {
        return React.cloneElement(child, {
          ...inputProps[child.props.name],
        });
      }

      if (child.props.children) {
        return React.cloneElement(child, {
          children: cloneInputs(child.props.children),
        });
      }

      return child;
    });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        {cloneInputs(children)}
        <Button
          type={typeBtn}
          label={labelBtn}
          bgBtn={bgBtn}
          bgBtnHover={bgBtnHover}
          width={width}
        />
      </form>
    </div>
  );
}
