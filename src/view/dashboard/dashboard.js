import React, { useEffect, useState } from "react";
import './styles.css';
import { CChart } from "@coreui/react-chartjs";
import axios from "../../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { isLocate } from "../../redux/actions/locate";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [obat, setObat] = useState([])
  const [users, setUsers] = useState([])
  const [dates, setDates] = useState([])
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
  })
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
  })
  console.log("🚀 ~ file: dashboard.js:41 ~ Dashboard ~ monthObat:", monthObat)
  console.log("🚀 ~ file: dashboard.js:14 ~ Dashboard ~ month:", month)
  console.log("🚀 ~ file: dashboard.js:14 ~ Dashboard ~ date:", dates)

  const navigate = useNavigate()
  // const d = new Date(date)

  const checkObat = true
  const checkUser = true

  const token = useSelector((item) => item.access)
  const dispatch = useDispatch()


  useEffect(() =>{
    dispatch(isLocate('dashboard'))
    for (let i = 0; i < dates.length; i++) {
      const element = dates[i];     
    }
  },[])
  

  useEffect(() => {
    axios.get("/drugs").then((res) => {
      setObat(res.data)
    })
    for (let i = 0; i < obat.length; i++) {
      const element = obat[i];
      console.log("🚀 ~ file: dashboard.js:60 ~ useEffect ~ new Date(element.created_time).getMonth() + 1:", new Date(element.created_time).getMonth() + 1)
      switch( new Date(element.created_time).getMonth()){
        case 0:
          setMonth({
            ...month,
            Jan: month.Jan + 1
          })
          break;
        case 1:
          setMonth({
            ...month,
            Feb: month.Feb + 1
          })
          break;
      
        case 2:
          setMonth({
            ...month,
            Mar: month.Mar + 1
          })
          break;
        case 3:
          setMonth({
            ...month,
            Apr: month.Apr + 1
          })
          break;
        case 4:
          setMonth({
            ...month,
            Mei: month.Mei + 1
          })
          break;
        case 5:
          setMonth({
            ...month,
            Jun: month.Jun + 1
          })
          break;
        case 6:
          setMonth({
            ...month,
            Jul: month.Jul + 1
          })
          break;
        case 7:
          setMonth({
            ...month,
            Jun: month.Agt + 1
          })
          break;
        case 8:
          setMonth({
            ...month,
            Agt: month.Sep + 1
          })
          break;
        case 9:
          setMonth({
            ...month,
            Sep: month.Okt + 1
          })
          break;
        case 10:
          setMonth({
            ...month,
            Nov: month.Nov + 1
          })
          break;
        case 11:
          console.log('test')
          setMonth({
            ...month,
            Des: month.Des + 1
          })
          break;
      }
    }
  },[])

  useEffect(() => {
    axios.get("/auth/api/users",{
      headers: {
        Authorization: `Bearer ${token.isToken}`
      }
    }).then((res) => {
      setUsers(res.data)
      for (let i = 0; i < users.length; i++) {
        const element = users[i];
        console.log("🚀 ~ file: dashboard.js:162 ~ useEffect ~ element:", element.created_time)
        switch( new Date(element.created_time).getMonth()){
          case 0:
            setMonthObat({
              ...monthObat,
              Jan: monthObat.Jan + 1
            })
            break;
          case 1:
            setMonthObat({
              ...monthObat,
              Feb: monthObat.Feb + 1
            })
            break;
        
          case 2:
            setMonthObat({
              ...monthObat,
              Mar: monthObat.Mar + 1
            })
            break;
          case 3:
            setMonthObat({
              ...monthObat,
              Apr: monthObat.Apr + 1
            })
            break;
          case 4:
            setMonthObat({
              ...monthObat,
              Mei: monthObat.Mei + 1
            })
            break;
          case 5:
            setMonthObat({
              ...monthObat,
              Jun: monthObat.Jun + 1
            })
            break;
          case 6:
            setMonthObat({
              ...monthObat,
              Jul: monthObat.Jul + 1
            })
            break;
          case 7:
            console.log('test')
            setMonthObat({
              ...monthObat,
              Jun: monthObat.Agt + 1
            })
            break;
          case 8:
            setMonthObat({
              ...monthObat,
              Agt: monthObat.Sep + 1
            })
            break;
          case 9:
            setMonthObat({
              ...monthObat,
              Sep: monthObat.Okt + 1
            })
            break;
          case 10:
            setMonthObat({
              ...monthObat,
              Nov: monthObat.Nov + 1
            })
            break;
          case 11:
            console.log('test')
            setMonthObat({
              ...monthObat,
              Des: monthObat.Des + 1
            })
            break;
        }
      }
    })
  },[])

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 50}}>
        <div style={{border: '1px solid #D5E2F4 ', width: '45%', borderRadius: 8, height: '10vh', padding: 10, background: '#E5ECF6'}}>
          <h6>User</h6>
          <span>{users.length}</span>
        </div>
        <div style={{border: '1px solid #D5E2F4',  width: '45%', borderRadius: 8, height: '10vh', padding: 10, background: '#E5ECF6'}}>
          <h6>Obat</h6>
          <span>{obat.length}</span>
        </div>
      </div>
      <div style={{border: '1px solid', height: '50vh', borderRadius: 8, width: '100%'}}>
      <CChart
          style={{width: '100%'}}
          height={100}
          type="line" 
          data={{
            labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September","November" , "November", "Desember"],
            datasets: [
              {
                label: "Obat",
                backgroundColor: "rgba(220, 220, 220, 0.2)",
                borderColor: "rgba(220, 220, 220, 1)",
                pointBackgroundColor: "rgba(220, 220, 220, 1)",
                pointBorderColor: "#fff",
                data: [monthObat.Jan, monthObat.Feb, monthObat.Mar, monthObat.Apr, monthObat.Mei, monthObat.Jun, monthObat.Jul, monthObat.Agt, monthObat.Sep, monthObat.Okt, monthObat.Nov, monthObat.Des]

              },
              {
                label: "Users",
                backgroundColor: "rgba(151, 187, 205, 0.2)",
                borderColor: "rgba(151, 187, 205, 1)",
                pointBackgroundColor: "rgba(151, 187, 205, 1)",
                pointBorderColor: "#fff",
                data: [month.Jan, month.Feb, month.Mar, month.Apr, month.Mei, month.Jun, month.Jul, month.Agt, month.Sep, month.Okt, month.Nov, month.Des]
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: "#000",
                }
              }
            },
            scales: {
              x: {
                grid: {
                  color: "#0000",
                },
                ticks: {
                  color: "#000",
                },
              },
              y: {
                grid: {
                  color: "#c4c4c4",
                },
                ticks: {
                  color: "#000",
                },
              },
            },
          }}
        />
      </div>

      <div style={{height: '20vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Link to='/Input' className="btn-navigation" 
          style={{ width: '30%', borderRadius: 8, height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000', textDecoration: 'none'}}
        >
          <h6>Input Data Obat</h6>
        </Link>
        <Link to='/DataObat' className="btn-navigation" 
          style={{ width: '30%', borderRadius: 8, height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000', textDecoration: 'none'}}
        >
          <h6>Data Obat</h6>
        </Link>
        <Link to='/DataUsers' className="btn-navigation" 
          style={{ width: '30%', borderRadius: 8, height: 60, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#000', textDecoration: 'none'}}
        >
          <h6>Data Users</h6>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
