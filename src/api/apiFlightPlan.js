const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

export async function getFlightList(searchTerm, page) {
  let request = API_URL + "/list?";
  if (searchTerm) request = request.concat(`search=${searchTerm}&`);
  request = request.concat(`page=${page}`);

  try {
    const response = await axios.get(request);
    return response.data;
  } catch (err) {
    throw new Error(`Error: ${err.response.data.message}`);
  }
}

export async function getFlightPlan(id) {
  let request = API_URL + "/plan/" + id;

  try {
    const response = await axios.get(request);

    return response.data;
  } catch (err) {
    throw new Error(`Error: ${err.response.data.message}`);
  }
}
