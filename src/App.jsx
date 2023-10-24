import { useState } from "react";
import "./styles/index.css";
import { Button, Modal, Space, Input, Tabs } from "antd";

import { MainContext } from "./context/main-context";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator.min.css";
import { Table } from "./components/table";
import { ReadUploadFile } from "./components/read-upload-file";
import { Analiz1 } from "./components/analiz-1";
import { Analiz2 } from "./components/analiz-2";
import { EditModal } from "./components/edit-modal";

function App() {
  const calculatePercentage = (data, status) => {
    const count = data.filter((item) => item.status === status).length;
    const percentage = (count / data.length) * 100;
    return percentage;
  };

  const [open, setOpen] = useState(false);
  const [rowId, setRowId] = useState();
  const [openEditModal, setOpenEditModal] = useState(false);

  const onChange = (key) => {
    console.log(key);
  };
  const tabItems = [
    {
      key: "1",
      label: "Table",
      children: <Table />,
    },
    {
      key: "2",
      label: "Analiz 1",
      children: <Analiz1 />,
    },
    {
      key: "3",
      label: "Analiz 2",
      children: <Analiz2 />,
    },
  ];

  const [json, setJson] = useState();
  console.log(json);
  const columnsData = [
    {
      title: "id",
      field: "id",
      headerFilter: true,
      sorter: "number",
      headerSortStartingDir: "desc",
    },
    {
      title: "len",
      field: "len",
      headerFilter: true,
      editable: true,
      editor: "input",
    },
    { title: "status", field: "status", headerFilter: true },
    { title: "wkt", field: "wkt", headerFilter: true },
    {
      title: "Actions",
      field: "actions",
      formatter: function (cell, formatterParams, onRendered) {
        return `
          <button class="edit-button">Edit</button>
          <button class="delete-button">Delete</button>
        `;
      },
      headerSort: false,
      width: 100,
      cellClick: function (e, cell) {
        const rowData = cell.getRow().getData();
        if (e.target.classList.contains("edit-button")) {
          // edit row
          console.log(`row id: ${rowData.id} - clicked edit button`);
          setRowId(rowData.id);
          setOpenEditModal(true);
        } else if (e.target.classList.contains("delete-button")) {
          // Delete row
          const table = cell.getTable();
          table.deleteRow(cell.getRow());
        }
      },
    },
  ];
  const [columns, setColumns] = useState(columnsData);

  const data = {
    json,
    setJson,
    columns,
    setColumns,
    open,
    setOpen,
    calculatePercentage,
    rowId,
    openEditModal,
    setOpenEditModal,
  };

  return (
    <MainContext.Provider value={data}>
      <div className="container">
        <ReadUploadFile />
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          onChange={onChange}
          size={"small"}
          tabPosition={"bottom"}
        />
        <EditModal />
      </div>
    </MainContext.Provider>
  );
}

export default App;
