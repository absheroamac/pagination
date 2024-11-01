import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";

export const Table = () => {
  const [data, setData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);

  const handleNext = () => {
    setPage((current) => current + 1);
  };

  const handlePrev = () => {
    setPage((current) => current - 1);
  };

  useEffect(() => {
    const handleAPI = async () => {
      try {
        const res = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setData(data);
          setPages(Math.ceil(data.length / 10));
        }
      } catch (error) {
        alert("failed to fetch data");
        console.error("failed to fetch data");
      }
    };

    handleAPI();
    if (data.length > 0) {
      setCurrentData(data.slice(0, 10));
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setCurrentData(data.slice(0, 10));
    }
  }, [data]);

  useEffect(() => {
    const end = Math.min(page * 10, data.length - 1);
    const start = page * 10 - 10;
    const newSet = data.slice(start, end);
    setCurrentData(newSet);
  }, [page]);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
        {currentData.length !== 0 &&
          currentData.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
      </table>

      <div className={styles.buttonContainer}>
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={styles.button}
        >
          Previous
        </button>
        <button className={styles.button}>{page}</button>
        <button
          onClick={handleNext}
          disabled={page === pages}
          className={styles.button}
        >
          Next
        </button>
      </div>
    </div>
  );
};
