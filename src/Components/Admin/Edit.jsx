import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function Edit() {
  const [form, setForm] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:9000/api/category/view")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  const handleCategoryChange = (event) => {
    setSelectedCat(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("brand", form.brand);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("condition", form.condition);
    formData.append("category", selectedCat);
    formData.append("productImage", form.productImage);

    Axios.post("http://localhost:9000/api/product/insertadmin", formData, {})
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-9 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-500">
          <b>INPUT FORM</b>
        </h1>
        <form className="grid grid-cols-2 gap-4">
          {/* Other input fields */}
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
            placeholder="Enter name"
            className="p-2 border rounded"
          />
          {/* ... (repeat for other input fields) */}

          {/* Category Select */}
          <div className="col-span-2">
            <label className="text-sm font-semibold mb-1">Category</label>
            <select
              value={selectedCat}
              onChange={handleCategoryChange}
              className="p-2 border rounded w-full"
            >
              <option value="" disabled>Select category</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-green-500 text-white p-2 rounded cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
