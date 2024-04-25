import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
  
const Dashboard = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/tweets");
      setAttendanceData(
        response.data && Array.isArray(response.data.Tweets)
          ? response.data.Tweets
          : []
      );
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
      // setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm === "") {
      fetchData(); // Reload full data when search term is empty
    } else {
      const filteredData = attendanceData.filter((row) =>
        row["Tablet_Name"].toLowerCase().includes(searchTerm.toLowerCase())
      );
      setAttendanceData(filteredData);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="container p-8 w-full md:w-4/5">
        <div>
          <h1 className="md:text-4xl font-semibold font-inter pb-2">
            EHR Dashboard
          </h1>
          <div className="w-full bg-gradient-to-b from-white to-blue-50 shadow-md rounded-xl border border-gray-200 my-2">
            <header className="px-4 py-4 border-b border-gray-200 flex justify-between items-center">
              <div className="hidden md:block relative">
                <input
                  type="text"
                  placeholder="Search by tablet"
                  className="px-2 py-1 rounded-md border text-sm pl-8 border-gray-300 w-40"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <div className="absolute top-0 left-0 mt-1 ml-2 text-gray-400 cursor-text">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              </div>
              <div className="block md:hidden">T-EHR</div>
            </header>
            <div className="p-3">
              <div>
                {error && <p className="text-red-500">{error}</p>}
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                  <table className="table-auto w-full">
                    <thead className="text-sm font-semibold uppercase text-black bg-blue-300">
                      <tr>
                        {/* <th scope="col" className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">S.No</div>
                        </th>
                        <th scope="col" className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">Tablets</div>
                        </th>
                        <th scope="col" className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">Tweets</div>
                        </th>
                        <th scope="col" className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">Name</div>
                        </th>
                        <th scope="col" className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">Age</div>
                        </th>
                        
                        <th scope="col" className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Posted at
                          </div>
                        </th>
                        <th scope="col" className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Side effects
                          </div>
                        </th> */}
                        <th scope="col" className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">S.No</div>
                        </th>
                        <th scope="col" className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">URL</div>
                        </th>
                        <th scope="col" className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">Name</div>
                        </th>
                        <th scope="col" className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">Locality</div>
                        </th>
                        <th scope="col" className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">Tweet</div>
                        </th>
                        <th scope="col" className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Posted at
                          </div>
                        </th>
                        {/* <th scope="col" className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">
                            Side effects
                          </div>
                        </th> */}
                      </tr>
                    </thead>

                    <tbody className="text-sm">
                      {loading ? (
                        <tr>
                          <td
                            colSpan="7"
                            className="p-2 whitespace-nowrap font-inter text-center"
                          >
                            <div className="font-medium text-center">
                              Loading...
                            </div>
                          </td>
                        </tr>
                      ) : attendanceData.length > 0 ? (
                        attendanceData.map((row, index) => (
                          <tr key={index}>
                            {/* <td scope="col" className="p-2 whitespace-nowrap">
                              <div className="font-medium text-center">
                                {index + 1 + (currentPage - 1) * itemsPerPage}.
                              </div>
                            </td>
                            <td scope="col" className="p-2 whitespace-nowrap">
                              <div className="font-medium text-center">
                                {row["Tablet_Name"]}
                              </div>
                            </td>
                            
                            <td scope="col" className="p-2 whitespace-nowrap">
                              <div className="font-medium text-center"  style={{maxHeight: '5em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal'}}>
                                {row["User_Tweet"]}
                              </div>
                            </td>
                            <td scope="col" className="p-2 whitespace-nowrap">
                              <div className="font-medium text-center">
                                {row["User_ID"]}
                              </div>
                            </td>
                            <td scope="col" className="p-2 whitespace-nowrap">
                              <div className="font-medium text-center">
                                {row["Age"]}
                              </div>
                            </td>
                            <td scope="col" className="p-2 whitespace-nowrap">
                              <div className="font-medium text-center">
                                {row["Timestamp"]}
                              </div>
                            </td>
                            <td scope="col" className="p-2 whitespace-nowrap">
                              <div className="font-medium text-center">
                                {row["Side_Effects_Mentioned"]}
                              </div>
                            </td> */}
                            <td scope="col" className="p-2 whitespace-nowrap">
                              <div className="font-medium text-center">
                                {index + 1 + (currentPage - 1) * itemsPerPage}.
                              </div>
                            </td>
                            <td scope="col" className="p-2 whitespace-nowrap">
                              <div className="font-medium text-center">
                                {row["url"]}
                              </div>
                            </td>
                            <td scope="col" className="p-2 whitespace-nowrap">
                              <div className="font-medium text-center">
                                {row["author"]["name"]}
                              </div>
                            </td>
                            <td scope="col" className="p-2 whitespace-nowrap">
                              <div className="font-medium text-center">
                                {row["author"]["location"]}
                              </div>
                            </td>
                            <td scope="col" className="p-2 whitespace-nowrap">
                              <div className="font-medium text-center"  style={{maxHeight: '6em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal'}}>
                                {row["text"]}
                              </div>
                            </td>
                            <td scope="col" className="p-2 whitespace-nowrap">
                              <div className="font-medium text-center">
                                {row["createdAt"]}
                              </div>
                            </td>
                            {/* <td scope="col" className="p-2 whitespace-nowrap">
                              <div className="font-medium text-center">
                                {row["Side_Effects_Mentioned"]}
                              </div>
                            </td> */}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="p-2 whitespace-nowrap">
                            <div className="font-medium text-center">
                              No data available
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


