import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import "./filterseries.css";

const API_BASE_URL = "https://wccbackend.onrender.com";

const FilterSeries = ({ initialData, isOpen, filterTableRefreshKey }) => {
  const [filteredData, setFilteredData] = useState(initialData || []);
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [filters, setFilters] = useState({});
  const [showDone, setShowDone] = useState(false);
  const [activeColumn, setActiveColumn] = useState(null);
  const [dateFilter, setDateFilter] = useState({ startDate: "", endDate: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFilteredData(initialData);
    const startDates = [...new Set(initialData.map(entry => entry.startDate?.split("T")[0]))];
    const endDates = [...new Set(initialData.map(entry => entry.endDate?.split("T")[0]))];

    const options = {
      // "Series Name": [...new Set(initialData.flatMap(entry => [entry.teams?.teamA, entry.teams?.teamB]))],
      "Captains": [...new Set(initialData.flatMap(entry => [entry?.captain?.teamA, entry?.captain?.teamB]))],
      "Winning captain": [...new Set(initialData.map(entry => {
        if (entry.points?.teamA === entry.points?.teamB) {
          return `${entry?.captain?.teamA}, ${entry?.captain?.teamB}`;
      }
       return entry.points?.teamA > entry.points?.teamB ? entry?.captain?.teamA : entry?.captain?.teamB;
      }))],
      "SeriesDate": {
        startDates,
        endDates
      }
      // scorePatterns is omitted from filter options
    };

    setDropdownOptions(options);
  }, [initialData]);

  const handleHeaderClick = (column) => {
    if (column !== "Points") {
      setActiveColumn(activeColumn === column ? null : column);
    }
  };

  const handleFilterChange = (column, value) => {
    setFilters((prev) => ({ ...prev, [column]: value }));
    setShowDone(true);
    setActiveColumn(null);
  };

  const handleDateDropdownChange = (field, value) => {
    const newDateFilter = { ...dateFilter, [field]: value };
    setDateFilter(newDateFilter);

    const newFilters = { ...filters, date: {} };
    if (newDateFilter.startDate) newFilters.date.startDate = newDateFilter.startDate;
    if (newDateFilter.endDate) newFilters.date.endDate = newDateFilter.endDate;

    setFilters(newFilters);
    setShowDone(true);
  };

  const removeFilter = (column) => {
    const newFilters = { ...filters };
    if (column === "date") {
      delete newFilters.date;
      setDateFilter({ startDate: "", endDate: "" });
    } else {
      delete newFilters[column];
    }
    setFilters(newFilters);
    setShowDone(true);
  };

  const applyFilters = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/team/filter-series`, filters);
      setFilteredData(response.data.history || []);
      setShowDone(false);
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({});
    setDateFilter({ startDate: "", endDate: "" });
    setFilteredData(initialData);
    setShowDone(false);
  };

  return (
    <>
      <div >
      <div className={`collapsible-content ${isOpen ? "open" : ""}`}>
        <table className="series-table">
          <thead>
            <tr>
              {["Captains", "Winning captian", "SeriesDate", "Points"].map((col) => (
                <th
                  key={col}
                  onClick={() => handleHeaderClick(col)}
                  style={{ cursor: col === "Points" ? "default" : "pointer" }}
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </th>
              ))}
            </tr>
            {activeColumn && (
              <tr>
                <td colSpan="5">
                  {activeColumn === "SeriesDate" ? (
                    <div className="date-dropdowns">
                      <select value={dateFilter.startDate} onChange={(e) => handleDateDropdownChange("startDate", e.target.value)}>
                        <option value="">Start Date</option>
                        {dropdownOptions.SeriesDate?.startDates?.map((d, idx) => (
                          <option key={idx} value={d}>{d}</option>
                        ))}
                      </select>
                      <select value={dateFilter.endDate} onChange={(e) => handleDateDropdownChange("endDate", e.target.value)}>
                        <option value="">End Date</option>
                        {dropdownOptions.SeriesDate?.endDates?.map((d, idx) => (
                          <option key={idx} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <select onChange={(e) => handleFilterChange(activeColumn, e.target.value)} defaultValue="">
                      <option value="" disabled>Select {activeColumn}</option>
                      {dropdownOptions[activeColumn]?.map((option, idx) => (
                        <option key={idx} value={option}>{option}</option>
                      ))}
                    </select>
                  )}
                </td>
              </tr>
            )}
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((series, index) => (
                <tr key={index}>
                  {/* <td>
                    <span className="team team-a">{series.teams.teamA}</span> vs{" "}
                    <span className="team team-b">{series.teams.teamB}</span>
                  </td> */}
                  <td>
                    <span className="team team-a">{series?.captain?.teamA || "Unknown"}</span> vs{" "}
                    <span className="team team-b">{series?.captain?.teamB || "Unknown"}</span>
                  </td>
                  <td>
                    <span className="winner">
                    {series.points.teamA === series.points.teamB ? `${series?.captain?.teamA}, ${series?.captain?.teamB}` : series.points.teamA > series.points.teamB ? series?.captain?.teamA : series?.captain?.teamB}
                    </span>
                  </td>
                  <td>
                    {new Date(series.startDate).toLocaleDateString()} -{" "}
                    {new Date(series.endDate).toLocaleDateString()}
                  </td>
                  <td>
                    <span className="team team-a">{series?.points?.teamA}</span> vs{" "}
                    <span className="team team-b">{series?.points?.teamB}</span>
                  </td>
                  {/* <td>
                    <span className="team-score">
                      {series?.score?.teamA?.slice(-4).map((r, i) => (
                        <span key={`a-${i}`} className={`score-badge ${r.toLowerCase()}`}>{r}</span>
                      ))}
                    </span>
                    <span className="vs-separator">vs</span>
                    <span className="team-score">
                      {series?.score?.teamB?.slice(-4).map((r, i) => (
                        <span key={`b-${i}`} className={`score-badge ${r.toLowerCase()}`}>{r}</span>
                      ))}
                    </span>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>No data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="selected-filters">
        {Object.entries(filters).map(([key, value]) => (
          key === "date" ? (
            <span key={key} className="filter-tag">
              {value.startDate && <>Start: <strong>{value.startDate}</strong></>}
              {" "}
              {value.endDate && <>End: <strong>{value.endDate}</strong></>}
              <button className="remove-tag-btn" onClick={() => removeFilter(key)}>❌</button>
            </span>
          ) : (
            <span key={key} className="filter-tag">
              {key}: <strong>{value}</strong>
              <button className="remove-tag-btn" onClick={() => removeFilter(key)}>❌</button>
            </span>
          )
        ))}
      </div>

      <div className="filter-buttons">
        {showDone && (
          <button className="filter-done-btn" onClick={applyFilters} disabled={loading}>
            {loading ? "Loading..." : "Done"}
          </button>
        )}
        {Object.keys(filters).length > 0 && (
          <button className="filter-clear-btn" onClick={clearFilters}>
            Clear
          </button>
        )}
      </div>
      </div>
    </>
  );
};

export default FilterSeries;
