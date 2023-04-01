import axios from "axios";
import config from "./config.json";

const getAllToDo = async (setToDo) => {
  try {
    const response = await axios.get(config.api_base_url);
    console.log(response.data);
    setToDo(response.data);
  } catch (err) {
    console.log(err);
  }
};

const addToDo = async (text, setText, setToDo) => {
  try {
    const data = { text };
    const response = await axios.post(`${config.api_base_url}/add`, data);
    console.log(response.data);
    setText("");
    getAllToDo(setToDo);
  } catch (err) {
    console.log(err);
  }
};

const updateToDo = async (toDoId, text, setToDo, setText, setIsUpdating) => {
  try {
    const data = { _id: toDoId, text };
    const response = await axios.put(`${config.api_base_url}/update/${toDoId}`, data);
    console.log(response.data);
    setText("");
    setIsUpdating(false);
    getAllToDo(setToDo);
  } catch (err) {
    console.log(err);
  }
};

const deleteToDo = async (_id, setToDo) => {
  try {
    const response = await axios.delete(`${config.api_base_url}/delete/${_id}`);
    console.log(response);
    getAllToDo(setToDo);
  } catch (err) {
    console.log(err);
  }
};

export { getAllToDo, addToDo, updateToDo, deleteToDo };
