import React from "react";
import "./dataTable.css";
import CountryFlag from "./CountryFlag";
import LoadingSpinner from "./LoadingSpinner";

const DataTable = ({ data, searched, loading }) => {
  return (
    <div className="data-table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4}>
                <LoadingSpinner />
              </td>
            </tr>
          ) : (
            <>
              {data.length > 0 ? (
                data.map((item, idx) => (
                  <tr key={item.id}>
                    <td className="serial">{idx + 1}</td>
                    <td>{item?.name}</td>
                    <td>{item.city}</td>
                    <td>
                      <CountryFlag countryCode={item.countryCode} />
                    </td>
                  </tr>
                ))
              ) : searched ? (
                <tr>
                  <td colSpan={4}>No result found</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={4}>Start searching</td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
