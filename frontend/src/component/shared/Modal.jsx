import React from "react";
import { Modal, Flex, Divider, Typography } from "antd";

const { Title } = Typography;

const ModalForm = ({ title, showModal, handleCancel, children, width }) => {
  return (
    <Flex vertical gap="middle" align="flex-start">
      <Modal
        title={
          <Title level={5} style={{ textAlign: "center" }} className="m-0">
            {title}
            <Divider />
          </Title>
        }
        centered
        closable={true}
        destroyOnClose
        open={showModal}
        onCancel={handleCancel}
        footer={false}
        width={width}
      >
        {children}
      </Modal>
    </Flex>
  );
};

export default ModalForm;
