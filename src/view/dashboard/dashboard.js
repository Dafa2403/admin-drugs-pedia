import React, { useEffect, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import axios from "../../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { isLocate } from "../../redux/actions/locate";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [obat, setObat] = useState([]);
  const [users, setUsers] = useState([]);
  const [month, setMonth] = useState({
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    Mei: 0,
    Jun: 0,
    Jul: 0,
    Agt: 0,
    Sep: 0,
    Okt: 0,
    Nov: 0,
    Des: 0,
  });
  const [monthObat, setMonthObat] = useState({
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    Mei: 0,
    Jun: 0,
    Jul: 0,
    Agt: 0,
    Sep: 0,
    Okt: 0,
    Nov: 0,
    Des: 0,
  });

  const navigate = useNavigate();

  const token = useSelector((item) => item.access);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLocate('dashboard'));
  }, [dispatch]);

  useEffect(() => {
    axios.get("/drugs").then((res) => {
      setObat(res.data);
      res.data.forEach((element) => {
        const monthIndex = new Date(element.created_time).getMonth();
        setMonth((prevMonth) => ({ ...prevMonth, [getMonthName(monthIndex)]: prevMonth[getMonthName(monthIndex)] + 1 }));
      });
    });
  }, []);

  useEffect(() => {
    axios.get("/auth/api/users", {
      headers: {
        Authorization: `Bearer ${token.isToken}`,
      },
    }).then((res) => {
      setUsers(res.data);
      res.data.forEach((element) => {
        const monthIndex = new Date(element.created_time).getMonth();
        setMonthObat((prevMonthObat) => ({
          ...prevMonthObat,
          [getMonthName(monthIndex)]: prevMonthObat[getMonthName(monthIndex)] + 1,
        }));
      });
    });
  }, [token.isToken]);

  const getMonthName = (index) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];
    return monthNames[index];
  };

  return (
    <div className="container-fluid">
      <h2 className="mt-4">Dashboard</h2>
      <div className="row mt-4">
        <div className="col-lg-6 mb-4">
          <div className="card border-secondary-subtle h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <h6 className="card-title" style={{ borderBottom: '1px solid #d9d9d9', color: '#333' }}>User</h6>
              <span style={{ color: '#333' }}>{users.length}</span>
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-4">
          <div className="card border-secondary-subtle h-100">
            <div className="card-body d-flex flex-column justify-content-between">
              <h6 className="card-title" style={{ borderBottom: '1px solid #d9d9d9', color: '#333' }}>Obat</h6>
              <span style={{ color: '#333' }}>{obat.length}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="card border-secondary-subtle mb-4">
        <div className="card-body">
          <CChart
            height={'100vh'}
            type="line"
            data={{
              labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
              datasets: [
                {
                  label: "Obat",
                  backgroundColor: "rgba(220, 220, 220, 0.2)",
                  borderColor: "rgba(220, 220, 220, 1)",
                  pointBackgroundColor: "rgba(220, 220, 220, 1)",
                  pointBorderColor: "#fff",
                  data: [monthObat.Jan, monthObat.Feb, monthObat.Mar, monthObat.Apr, monthObat.Mei, monthObat.Jun, monthObat.Jul, monthObat.Agt, monthObat.Sep, monthObat.Okt, monthObat.Nov, monthObat.Des],
                },
                {
                  label: "Users",
                  backgroundColor: "rgba(151, 187, 205, 0.2)",
                  borderColor: "rgba(151, 187, 205, 1)",
                  pointBackgroundColor: "rgba(151, 187, 205, 1)",
                  pointBorderColor: "#fff",
                  data: [month.Jan, month.Feb, month.Mar, month.Apr, month.Mei, month.Jun, month.Jul, month.Agt, month.Sep, month.Okt, month.Nov, month.Des],
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: "#333", // Adjust legend text color
                  },
                },
              },
              scales: {
                x: {
                  grid: {
                    color: "#ccc", // Adjust x-axis grid color
                  },
                  ticks: {
                    color: "#333", // Adjust x-axis tick color
                  },
                },
                y: {
                  grid: {
                    color: "#ccc", // Adjust y-axis grid color
                  },
                  ticks: {
                    color: "#333", // Adjust y-axis tick color
                  },
                },
              },
            }}
          />
        </div>
      </div>
      <div className="row mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to='/Input' className="btn btn-primary col-lg-3 mb-3" style={{ marginRight: 15 }}>
          <h6 className="m-0">Input Data Obat</h6>
        </Link>
        <Link to='/DataObat' className="btn btn-primary col-lg-3 mb-3" style={{ marginRight: 15 }}>
          <h6 className="m-0">Data Obat</h6>
        </Link>
        <Link to='/DataUsers' className="btn btn-primary col-lg-3 mb-3" style={{ marginRight: 15 }}>
          <h6 className="m-0">Data Users</h6>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
