"use client";
import React, { useState, useEffect } from "react";

const DynamicForm = () => {
  const [formFields, setFormFields] = useState({
    age: "",
    gender: "",
    content: "",
  });
  const [contentOptions, setContentOptions] = useState([]);

  const genders = ["男性", "女性", "その他"];

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((data) => {
        setContentOptions(data.map((comment) => comment.name));
      });

    setFormFields((fields) => ({
      ...fields,
      gender: genders[Math.floor(Math.random() * genders.length)],
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((fields) => ({
      ...fields,
      [name]: value,
    }));
  };

  return (
    <form>
      <div>
        <label>年齢:</label>
        <input
          type="number"
          name="age"
          value={formFields.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>性別:</label>

        <select name="gender" value={formFields.gender} onChange={handleChange}>
          {genders.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>内容:</label>
        <select
          name="content"
          value={formFields.content}
          onChange={handleChange}
        >
          {contentOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">送信</button>
    </form>
  );
};

export default DynamicForm;
