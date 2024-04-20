"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";

const expectedColumnPattern = ["NO", "ID", "NAME", "GRADE"];

const validateColumnNames = (worksheet) => {
  const range = XLSX.utils.decode_range(worksheet["!ref"]);
  const columnNames = [];

  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cellAddress = { r: range.s.r, c: C }; // Assuming the column names are in the first row
    const cellRef = XLSX.utils.encode_cell(cellAddress);
    const columnName = worksheet[cellRef]?.v;
    columnNames.push(columnName);
  }

  const uppercaseColumnNames = columnNames.map((name) =>
    name ? name.toUpperCase() : null
  );

  return expectedColumnPattern.every(
    (expectedColumnName, index) =>
      uppercaseColumnNames[index] === expectedColumnName.toUpperCase()
  );
};

export default function Test() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      if (!validateColumnNames(worksheet)) {
        setError("Invalid column names. Please upload a file with columns: NO, ID, NAME, GRADE");
        setData([]);
        return;
      }

      const parsedData = XLSX.utils.sheet_to_json(worksheet);
      setData(parsedData);
      setError(null);
    };
  };

  return (
    <div className="App">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.ID}</td>
                <td>{row.NAME}</td>
                <td>{row.GRADE}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

