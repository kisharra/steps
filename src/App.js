import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [form, setForm] = useState({ date: "", distance: "" });
  const [records, setRecords] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || !form.distance) return;

    const existingIndex = records.findIndex((r) => r.date === form.date);
    let updated;

    if (existingIndex >= 0) {
      updated = [...records];
      updated[existingIndex].distance += parseFloat(form.distance);
    } else {
      updated = [...records, { date: form.date, distance: parseFloat(form.distance) }];
    }

    updated.sort((a, b) => new Date(b.date) - new Date(a.date));
    setRecords(updated);
    setForm({ date: "", distance: "" });
  };

  const handleDelete = (date) => {
    setRecords(records.filter((r) => r.date !== date));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
          <input
            type="date"
            id="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="distance">Пройдено км</label>
          <input
            type="number"
            step="0.1"
            id="distance"
            name="distance"
            value={form.distance}
            onChange={handleChange}
            className="input"
          />
        </div>
        <button type="submit" className="button">
          OK
        </button>
      </form>

      <div className="table-wrapper">
        <div className="table-header">
          <span>Дата (ДД.ММ.ГГ)</span>
          <span>Пройдено км</span>
          <span>Действия</span>
        </div>
        <div className="table-body">
          {records.map((r) => (
            <div className="table-row" key={r.date}>
              <span>{r.date}</span>
              <span>{r.distance.toFixed(1)}</span>
              <span>
                <button
                  onClick={() => handleDelete(r.date)}
                  className="delete"
                >
                  ✘
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

