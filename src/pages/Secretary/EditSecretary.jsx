import React from "react";
import { useParams } from "react-router-dom";
import { useSecretaryData } from "../../hooks/Queries/useSecretaryData";
import { InputText } from "primereact/inputtext";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useEditSecretaryData } from "../../hooks/Queries/useSecretariesData";
import { Card } from "primereact/card";

const EditSecretary = () => {
  const { id } = useParams();
  const { isLoading, data, error, isError } = useSecretaryData(id);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <Form data={data} id={id} />
    </>
  );
};

const Form = ({ data, id }) => {
  const { mutate: editSecretary } = useEditSecretaryData();
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is Required"),
    last_name: Yup.string().required("Last Name is Required"),
    mail: Yup.string()
      .email("Invalid Email Format")
      .required("Email is Required"),
    phone: Yup.string().required("Phone Number is Required"),
  });
  const formik = useFormik({
    initialValues: {
      first_name: data.first_name,
      last_name: data.last_name,
      mail: data.mail,
      phone: data.phone,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const secretary = { ...values, id, clinicID: 1, roleID: 2 };
      editSecretary(secretary);

      navigate("/secretary");
    },
    validationSchema,
  });
  return (
    <Card>
      <form id="editSecretary" onSubmit={formik.handleSubmit}>
        <label htmlFor="first_name" className="mb-1 inline-block">
          First Name:
        </label>
        <InputText
          autoFocus={true}
          id="first_name"
          type="text"
          className="inputfield w-full"
          name="first_name"
          autoComplete="nope"
          {...formik.getFieldProps("first_name")}
        />
        <div className="p-error h-1rem">
          {formik.touched.first_name && formik.errors.first_name ? (
            <span>{formik.errors.first_name}</span>
          ) : null}
        </div>
        {/*  */}
        <label htmlFor="last_name" className="mb-1 inline-block">
          Last Name:
        </label>
        <InputText
          id="last_name"
          type="text"
          className="inputfield w-full"
          name="last_name"
          autoComplete="nope"
          {...formik.getFieldProps("last_name")}
        />
        <div className="p-error h-1rem">
          {formik.touched.last_name && formik.errors.last_name ? (
            <span>{formik.errors.last_name}</span>
          ) : null}
        </div>
        {/*  */}
        <label htmlFor="phone" className="mb-1 inline-block">
          Phone:
        </label>
        <InputText
          id="phone"
          type="text"
          className="inputfield w-full"
          name="phone"
          autoComplete="nope"
          {...formik.getFieldProps("phone")}
        />
        <div className="p-error h-1rem">
          {formik.touched.phone && formik.errors.phone ? (
            <span>{formik.errors.phone}</span>
          ) : null}
        </div>
        {/*  */}
        <label htmlFor="mail" className="mb-1 inline-block">
          Email:
        </label>
        <InputText
          id="mail"
          type="text"
          className="inputfield w-full"
          name="mail"
          autoComplete="nope"
          {...formik.getFieldProps("mail")}
        />
        <div className="p-error h-1rem">
          {formik.touched.mail && formik.errors.mail ? (
            <span>{formik.errors.mail}</span>
          ) : null}
        </div>
      </form>
    </Card>
  );
};

export default EditSecretary;
