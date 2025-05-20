const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

export async function getFlightList(searchTerm, page) {
  let request = API_URL + "/list?";

  if (searchTerm) request = request.concat(`search=${searchTerm}&`);

  request = request.concat(`page=${page}`);

  const response = await axios(request);

  return response.data;
}

export async function getFlightPlan(id) {
  let request = API_URL + "/plan/" + id;
  const response = await axios(request);

  return response.data;
}
