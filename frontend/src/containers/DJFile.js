import React from "react";
import { useSelector } from "react-redux";
import {
  InboxOutlined,
  WarningOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { message, Upload, Button, Form } from "antd";
import readXlsxFile from "read-excel-file";

const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: false,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  accept: ".xlsx",

  onChange(info) {
    const { status } = info.file;
    console.log(status);
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
      message.success(`${info.file.name} file uploaded successfully.`);
      // readXlsxFile(info.file.name)
      //   .then((rows) => {
      //     console.log(rows);
      //   })
      //   .catch(console.log("Some error in rows"));
    }
  },

  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const onFinish = (values) => {
  console.log("Received values of form:", values);
};
const normFile = (e) => {
  console.log("Upload event:", e);
};

const DJFile = () => {
  const userState = useSelector((state) => state.users);

  return (
    <>
      {userState.isAuthenticated ? (
        <>
          <div class="text-center mt-5">
            <h1>File Converter</h1>
            <p>
              <i>
                (Download the template{" "}
                <a href="/files/dj-studio.xlsx" download>
                  here
                </a>
                )
              </i>
            </p>
          </div>
          <Form className="text-center container" onFinish={onFinish}>
            <Form.Item getValueFromEvent={normFile}>
              <Dragger {...props} getValueFromEvent={normFile}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support only .xlsx files. Please download the template
                </p>
              </Dragger>
            </Form.Item>
            <Form.Item>
              <Button
                type="submit"
                htmlType="submit"
                onClick={() => {
                  console.log("Button clicked");
                }}
              >
                Convert to MP3
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : (
        <div
          class="text-center
        container mt-5"
        >
          <WarningOutlined
            type="message"
            style={{ fontSize: "300px", color: "#08c" }}
          ></WarningOutlined>
          <h3>You should login to access this page</h3>
        </div>
      )}
    </>
  );
};

export default DJFile;
