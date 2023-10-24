import { useState } from "react";
import { Modal, Button, Input, Select } from "antd";

import { MainContext, useContext } from "../../context/main-context";

export const EditModal = () => {
  const { json, setJson, rowId, openEditModal, setOpenEditModal } =
    useContext(MainContext);

  const [status, setStatus] = useState();
  const [len, setLen] = useState();
  const [value, setValue] = useState();
  const handleChange = (value) => {
    setStatus(value);
  };
  const showModal = () => {
    setOpenEditModal(true);
  };
  const hideModal = () => {
    setOpenEditModal(false);
  };

  const editDataModal = () => {
    setOpenEditModal(false);
    const newJson = json.map((item) => {
      if (item.id === rowId) {
        return {
          ...item,
          len: len,
          status: status,
        };
      }
      return item;
    });
    setJson(newJson);
  };

  return (
    <Modal
      title="Baslik"
      open={openEditModal}
      onOk={editDataModal}
      onCancel={hideModal}
    >
      <p>Alt tanimlama</p>
      <div className="mt-6">
        <label>Len bilgisi giriniz</label>
        <Input
          placeholder="enter new len"
          value={value}
          size="large"
          onChange={(e) => {
            setLen(e.currentTarget.value);
          }}
        />
      </div>
      <div className="mt-4">
        <label>Status seciniz</label>
        <Select
          defaultValue="select value"
          style={{
            width: "100%",
            height: "3rem",
          }}
          onChange={handleChange}
          options={[
            {
              value: "1",
              label: "1",
            },
            {
              value: "2",
              label: "2",
            },
            {
              value: "0",
              label: "0",
            },
          ]}
        />
      </div>
    </Modal>
  );
};
