import { MainContext, useContext } from "../../context/main-context";
import * as xlsx from "xlsx";
import { AddModal } from "../modal";

export const ReadUploadFile = () => {
  const { setJson, json } = useContext(MainContext);
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        setJson(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center mb-6 mt-4">
      <input type="file" name="upload" id="upload" onChange={readUploadFile} />
      <AddModal />
    </div>
  );
};
