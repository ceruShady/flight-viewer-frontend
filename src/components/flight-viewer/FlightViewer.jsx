import "./FlightViewer.css";
import "leaflet/dist/leaflet.css";
import Map from "./Map";
import { getFlightList, getFlightPlan } from "../../api/apiFlightPlan";
import { useEffect, useRef, useState } from "react";

export default function FlightViewer() {
  const inputRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [flightList, setFlightList] = useState({});
  const [flightPath, setFlightPath] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function convertEpochTo24Hour(epochTime) {
    const date = new Date(epochTime * 1000);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  }

  function handleSearchFlightPlan() {
    setSearchTerm(inputRef.current.value);
    setPage(1);
  }

  function handleGetFlightPlan(id) {
    // console.log("Retrieving flight plan for id: " + id);
    getFlightPlan(id).then((response) => setFlightPath(response));
  }

  function handleSetPage(page) {
    setPage(page);
    setIsLoading(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      setFlightList(await getFlightList(searchTerm, page));
      setIsLoading(false);
    };

    fetchData();
  }, [searchTerm, page]);

  return (
    <div className="cont cont-main">
      <h1>Flight Plan Viewer</h1>
      <div className="cont cont-content">
        <Map flightPath={flightPath} />

        <div className="cont-list">
          <div className="cont-form">
            <input
              type="text"
              name="searchTermInput"
              placeholder="Search Flight ID"
              ref={inputRef}
            ></input>
            <button disabled={isLoading} onClick={handleSearchFlightPlan}>
              Search
            </button>
          </div>

          <ul>
            {flightList.result?.length ? (
              flightList.result.map((flightPlan) => (
                <li key={flightPlan._id}>
                  <button
                    disabled={isLoading}
                    onClick={() => handleGetFlightPlan(flightPlan._id)}
                  >
                    {`${flightPlan.aircraftIdentification}
                        ${flightPlan.departureDate}
                        ${convertEpochTo24Hour(flightPlan.departureTime)}`}
                  </button>
                </li>
              ))
            ) : (
              <li>No record found</li>
            )}
          </ul>
          <div className="cont-buttons">
            <button
              disabled={isLoading || flightList.page === 1}
              onClick={() => handleSetPage(page - 1)}
            >
              Prev
            </button>
            <span>{flightList.page}</span>
            <button
              disabled={isLoading || flightList.totalPage === flightList.page}
              onClick={() => handleSetPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
