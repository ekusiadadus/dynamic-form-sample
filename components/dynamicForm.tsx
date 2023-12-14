"use client";
import React, { useState, useEffect, useMemo } from "react";

interface FormFieldsType {
  age: string;
  gender: string;
  content: string;
}

const DynamicForm = () => {
  const [formFields, setFormFields] = useState<FormFieldsType>({
    age: "",
    gender: "",
    content: "",
  });
  const [contentOptions, setContentOptions] = useState([]);
  const [submittedData, setSubmittedData] = useState<FormFieldsType[]>([]); // 提出されたデータを保存するための状態

  const genders = useMemo(() => ["男性", "女性", "その他"], []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((data) => {
        setContentOptions(data.map((comment: any) => comment.name));
      });

    setFormFields((fields) => ({
      ...fields,
      gender: genders[Math.floor(Math.random() * genders.length)],
    }));
  }, [genders]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormFields((fields) => ({
      ...fields,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmittedData((prev) => [...prev, formFields]);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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

          <select
            name="gender"
            value={formFields.gender}
            onChange={handleChange}
          >
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
            defaultValue={contentOptions[0]}
          >
            {contentOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" onClick={handleSubmit}>
          送信
        </button>
      </form>
      <div>
        <h2>提出されたデータ:</h2>
        {submittedData.map((data, index) => (
          <div key={index}>
            <p>年齢: {data.age}</p>
            <p>性別: {data.gender}</p>
            <p>内容: {data.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default DynamicForm;
