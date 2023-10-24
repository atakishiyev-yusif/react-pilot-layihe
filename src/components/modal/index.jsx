import { useState } from "react";
import { Modal, Button, Input, Select } from "antd";

import { MainContext, useContext } from "../../context/main-context";

export const AddModal = () => {
  const [status, setStatus] = useState();
  const [len, setLen] = useState();

  const { json, setJson, open, setOpen } = useContext(MainContext);

  const handleChange = (value) => {
    setStatus(value);
  };
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const addDataModal = () => {
    setOpen(false);
    const ids = json.map((item) => item.id);
    const maxId = Math.max(...ids);
    setJson([
      ...json,
      {
        id: Number(maxId + 1),
        len: len,
        wkt: "string",
        status: Number(status),
      },
    ]);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add new
      </Button>
      <Modal
        title="Baslik"
        open={open}
        onOk={addDataModal}
        onCancel={hideModal}
      >
        <p>Alt tanimlama</p>
        <div className="mt-6">
          <label>Len bilgisi giriniz</label>
          <Input size="large" onChange={(e) => setLen(e.currentTarget.value)} />
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
    </>
  );
};
