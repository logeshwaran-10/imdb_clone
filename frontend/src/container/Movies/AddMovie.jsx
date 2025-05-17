import React, { useMemo, useEffect, useState } from "react";
import { Modal, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";

import FormFields from "../../component/shared/FormField";
import ModalForm from "../../component/shared/Modal";

//Action

import {
  addMovie,
  addNewPerson,
  setShowAddNewModal,
  updateMovie,
} from "../../redux/movie/reducer";

const movieForm = [
  {
    label: "Movie Name",
    name: "movie_name",
    type: "text",
    required: true,
    col: 12,
  },
  {
    label: "Actors",
    name: "actors",
    type: "multiselect",
    options: [],
    addNew: true,
    required: true,
    col: 12,
  },
  {
    label: "Producer",
    name: "producer",
    type: "select",
    addNew: true,
    required: true,
    options: [],
    col: 12,
  },
  {
    label: "Year of Release",
    name: "year_of_release",
    type: "date",
    picker: "year",
    required: true,
    format: "YYYY",
    col: 12,
  },
  {
    label: "Poster",
    name: "poster",
    type: "file",
    required: true,
    format: [".png", ".jpeg"],
    mode: "single",
    col: 24,
  },

  { label: "Plot", name: "plot", type: "textarea", required: true, col: 24 },
];

const commonFields = [
  {
    label: "Gender",
    name: "gender",
    type: "select",
    required: true,
    options: [
      { label: "Male", value: "male" },
      { label: "Famale", value: "famale" },
      { label: "Others", value: "others" },
    ],
  },
  {
    label: "DOB",
    name: "dob",
    type: "date",
    required: true,
    format: "DD-MM-YYYY",
  },
  { label: "Bio", name: "bio", type: "textarea", required: true },
];

const newActorForm = [
  { label: "Actor", name: "name", type: "text", required: true },
  ...commonFields,
];

const newProducerForm = [
  {
    label: "Producer",
    name: "name",
    type: "text",
    required: true,
  },
  ...commonFields,
];
const AddMovie = ({ handleCancel, data }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.MovieReducer.loading);
  const actorsList = useSelector((state) => state.MovieReducer.actorsList);
  const producersList = useSelector(
    (state) => state.MovieReducer.producersList
  );
  const addNewLoader = useSelector((state) => state.MovieReducer.addNewLoader);
  const showAddNewModal = useSelector(
    (state) => state.MovieReducer.showAddNewModal
  );

  const formField = useMemo(() => {
    return movieForm.map((field) => {
      if (field?.name === "actors") {
        field.options = actorsList.map((item) => ({
          label: item?.name,
          value: item?.name,
        }));
      }

      if (field?.name === "producer") {
        field.options = producersList.map((item) => ({
          label: item?.name,
          value: item?.name,
        }));
      }

      return field;
    });
  }, [movieForm, actorsList, producersList]);

  const setShowModal = (data) => {
    dispatch(setShowAddNewModal({ show: true, ...data }));
  };

  const handleNew = (value) => {
    try {
      dispatch(addNewPerson({ value, showAddNewModal }));
    } catch (err) {}
  };

  const handelCancelNew = () => {
    dispatch(setShowAddNewModal({ show: false }));
  };

  // Handle form submission
  const handleSubmitMovie = (values) => {
    try {
      if (data) {
        dispatch(updateMovie({ ...data, ...values }));
        handleCancel();
      } else {
        dispatch(addMovie(values));
      }
    } catch (err) {}
  };

  return (
    <div>
      <FormFields
        data={data}
        formField={formField}
        setShowModal={setShowModal}
        handleSubmit={handleSubmitMovie}
        handleCancel={handleCancel}
        type={"addMovie"}
        loader={loading}
      />

      {showAddNewModal?.show && (
        <ModalForm
          handleCancel={handelCancelNew}
          title={`Add New ${showAddNewModal?.label}`}
          showModal={showAddNewModal?.show}
          width={500}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <FormFields
              formField={
                showAddNewModal?.name === "actors"
                  ? newActorForm
                  : newProducerForm
              }
              handleSubmit={handleNew}
              handleCancel={handelCancelNew}
              type={"addnew"}
              loader={addNewLoader}
            />
          </Space>
        </ModalForm>
      )}
    </div>
  );
};

export default AddMovie;
