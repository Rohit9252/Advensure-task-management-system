import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "../components/utils/Input";
import Loader from "../components/utils/Loader";
import useFetch from "../hooks/useFetch";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { toast } from "react-toastify";


const TaskUpdate = () => {
  const authState = useSelector((state) => state.authReducer);
  // get the taskId from the url
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    description:"",
    title: "",
    dueDate: "",
    completed: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const config = {
        url: `https://advensure-backend.onrender.com/api/tasks/${taskId}`,
        method: "put",
        data: formData,
        headers: { Authorization: `Bearer `+ authState.token },
      };

    
      axios.request(config)
      .then((response) => {
        console.log(response.data);
        
        toast.success("Task updated successfully")
        navigate("/");
      }).catch((error) => {
        toast.error(error.response)
        console.log(error);
      })




  };

  useEffect(() => {
    setLoading(true);
    const config = {
      url: `https://advensure-backend.onrender.com/api/tasks/${taskId}`,
      method: "get",
      headers: { Authorization: `Bearer ${authState.token}` }
    };
    axios
      .request(config)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          const taskData = response.data?.task;
          setTask(taskData);
          setFormData({
            description: taskData?.description,
            title: taskData?.title,
            dueDate: taskData?.dueDate,
            completed: taskData?.completed
          });
          console.log(task)
          setLoading(false);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [authState, taskId]);

  return (
    <>
      <MainLayout>
        <form className="m-auto my-16 max-w-[1000px] bg-white p-8 border-2 shadow-md rounded-md">
          {loading ? (
            <Loader />
          ) : (
            <>
              <h2 className="text-center mb-4"></h2>
              <div className="mb-4">
                <label htmlFor="title">Title</label>
                <input
                  className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-primary"
                  type="title"
                  name="title"
                  id="title"
                  value={formData.title}
                  placeholder="Write here.."
                  onChange={ handleChange }
                />
                {/* {fieldError("title")} */}
              </div>
              <div className="mb-4">
                <label htmlFor="description">Description</label>
                <Textarea
                  type="description"
                  name="description"
                  id="description"
                  value={formData.description}
                  placeholder="Write here.."
                  onChange={ handleChange }
                />
                {/* {fieldError("description")} */}
              </div>

              <div className="mb-4">
                <label htmlFor="dueDate">Due Date</label>
                <input
                  className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-primary"
                  type="Date"
                  name="dueDate"
                  id="dueDate"
                  value={formData?.dueDate?.split("T")[0]}
                  placeholder="Write here.."
                  onChange={ handleChange }
                />
                {/* {fieldError("dueDate")} */}
              </div>

              <div className="mb-4">
                <label htmlFor="completed">Staus</label>
                <select
                  className="w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-primary"
                  name="completed"
                  id="completed"
                  placeholder="Write here.."
                  onChange={(e)=> setFormData({...formData, completed: e.target.value})}
                  value={formData.completed}
                >
                    <option value="false">Not Completed</option>
                    <option value="true">Completed</option>
                </select>
                {/* {fieldError("dueDate")} */}
              </div>

              <button
                className="bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark"
                onClick={handleSubmit}
              >
                Update
             
              </button>
              <button
                className="ml-4 bg-red-500 text-white px-4 py-2 font-medium"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </>
          )}
        </form>
      </MainLayout>
    </>
  );
};

export default TaskUpdate;
