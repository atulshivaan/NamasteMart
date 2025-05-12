import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
const AddUser = () => {
    const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!user.password) {
    alert("Password is required!");
    return;
  }

 

  try {
    const response = await axiosInstance.post("/api/v1/register", user);
    console.log(response.data);

    
    setUser({
      name: "",
      email: "",
      password: "",
      number: "",
    });

   
    navigate("/verify-user");
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response ? error.response.data : error.message
    );
    alert("An error occurred while registering. Please try again.");
  }
};
  return (
    <div className="flex justify-center mt-2 h-fit">
      <div className="w-[30%] bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Hello There! Add User
        </h1>
        <form className="flex flex-col gap-4"  onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter user name"
              value={user.name}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter user email"
              value={user.email}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter user password"
              value={user.password}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Number</label>
            <input
              type="number"
              name="number"
              placeholder="Enter user number"
              value={user.number}
              onChange={handleChange}
              className="border p-2 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <button
            type="submit"
          
            className="bg-black mx-[30%] w-[30%] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
