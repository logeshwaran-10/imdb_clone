import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Space,
  message,
  Upload,
  Row,
  Col,
} from "antd";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const keys = ["dob", "year_of_release", "poster"];

const FormFields = ({
  formField,
  data,
  handleSubmit,
  handleCancel,
  setShowModal,
  type,
  loader,
}) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    if (data) {
      const formattedData = { ...data };
      keys.forEach((key) => {
        if (key === "poster") {
          setImageUrl(formattedData[key]);
           formattedData[key] = base64ToFile(data[key],  `${data?.movie_name}_poster.png`, "image/png")
        } else if (data?.hasOwnProperty(key)) {
          formattedData[key] = dayjs(data[key]);
        }
      });
      form.setFieldsValue(formattedData);
    }
  }, [data]);

  const onFinish = (value) => {
    const formattedData = { ...value };
    keys.forEach((key) => {
      if (key === "poster") {
        formattedData[key] = imageUrl;
      } else if (value?.hasOwnProperty(key)) {
        const formats = {
          year_of_release: "YYYY",
          dob: "DD-MM-YYYY",
        };
        formattedData[key] = dayjs(value[key]).format(formats[key]);
      }
    });
    handleSubmit(formattedData);
  };

  const handleChange = async (info) => {
    const file = info?.file?.originFileObj;
    const base64 = await convertToBase64(file);
    setImageUrl(base64);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  function base64ToFile(base64String, filename, mimeType) {
  const byteString = atob(base64String.split(",")[1]); // decode base64
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeType });

  return new File([blob], filename, { type: mimeType });
}


  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <Form
      layout={"vertical"}
      form={form}
      onFinish={onFinish}
      onValuesChange={(_, allValues) => {
        console.log("onValuesChange", _, allValues);
      }}
      key={type}
    >
      <Row gutter={24}>
        {formField.map((field, index) => {
          const rules = [
            {
              required: field.required,
              whitespace: true,
              message: `Please enter the ${field.label}`,
            },
          ];
          return (
            <Col span={field?.col || 24} key={index}>
              {field.type === "text" && (
                <Form.Item
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  rules={rules}
                >
                  <Input placeholder={`Enter ${field.label}`} />
                </Form.Item>
              )}

              {field.type === "textarea" && (
                <Form.Item
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  rules={rules}
                >
                  <TextArea rows={4} placeholder={`Enter ${field.label}`} />
                </Form.Item>
              )}

              {field.type === "number" && (
                <Form.Item
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  rules={rules}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder={`Enter ${field.label}`}
                  />
                </Form.Item>
              )}

              {field.type === "date" && (
                <Form.Item
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  rules={[
                    {
                      type: "object",
                      required: field.required,
                      message: "Please select time!",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    picker={field?.picker || "date"}
                    format={field?.format}
                    disabledDate={(current) =>
                      current && current > dayjs().endOf("day")
                    }
                  />
                </Form.Item>
              )}

              {field.type === "select" && (
                <>
                  <Form.Item
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    className={field?.addNew ? "mb-0" : ""}
                    rules={[
                      {
                        required: field.required,
                        message: `Please select ${field.label}`,
                      },
                    ]}
                  >
                    <Select
                      placeholder={`Select ${field.label}`}
                      maxTagCount={"responsive"}
                      listHeight={250}
                    >
                      {field.options?.map((opt) => (
                        <Option key={opt.value} value={opt.value}>
                          {opt.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  {field?.addNew && (
                    <Button
                      type="link"
                      onClick={() => setShowModal(field)}
                      className="p-0"
                    >
                      + Add New {field.label}
                    </Button>
                  )}
                </>
              )}

              {field.type === "multiselect" && (
                <>
                  <Form.Item
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    rules={[
                      {
                        type: "array",
                        required: field.required,
                        message: "Please select time!",
                      },
                    ]}
                    className={field?.addNew ? "mb-0" : ""}
                  >
                    <Select
                      mode="multiple"
                      placeholder={`Select ${field.label}`}
                      maxTagCount={"responsive"}
                      listHeight={250}
                    >
                      {field.options?.map((opt) => (
                        <Option key={opt.value} value={opt.value}>
                          {opt.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  {field?.addNew && (
                    <Button
                      type="link"
                      onClick={() => setShowModal(field)}
                      className="p-0"
                    >
                      + Add New {field.label.replace("s", "")}
                    </Button>
                  )}
                </>
              )}

              {field?.type === "file" && (
                <Form.Item
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  getValueFromEvent={normFile}
                  rules={[
                    {
                      type: "array",
                      required: field.required,
                      message: "Please upload the Poster",
                    },
                  ]}
                >
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Form.Item>
              )}
            </Col>
          );
        })}
      </Row>

      <Form.Item>
        <Flex justify={"center"}>
          <Space>
            <Button type="default" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loader}>
              Submit
            </Button>
          </Space>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default FormFields;
