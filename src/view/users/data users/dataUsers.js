import React, { useEffect, useState } from 'react'
import { isLocate } from '../../../redux/actions/locate';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../api/axios';
import * as MdIcons from "react-icons/md";
import { Link } from 'react-router-dom';
import { chooseId } from '../../../redux/actions/chooseDrugs';


function DataUsers() {
    const styleDelete = {
        border: '1px solid #d60202',
        borderRadius: 8,
        width: 25,
        height: 25,
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ff0808',
        cursor: 'pointer'
        
    }
    const styleEdit = {
        border: '1px solid #e8c202',
        borderRadius: 8,
        width: 25,
        height: 25,
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ffd500',
        cursor: 'pointer'
    }
    
    const [users, setUsers] = useState([])
    console.log("🚀 ~ file: dataUsers.js:9 ~ DataUsers ~ users:", users)

    const checkUser = true
    
    const token = useSelector((item) => item.access)
    const id_user = useSelector((item) => item.choose.id)
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(isLocate('users'))
    },[])

    useEffect(() => {
        axios.get("/auth/api/users",{
          headers: {
            Authorization: `Bearer ${token.isToken}`
          }
        }).then((res) => {
          setUsers(res.data)
        })
      },[checkUser])
    
    const handleDelete = (id) =>{
        axios.delete("/auth/api/deleteUser",
        {
            headers:{
                Authorization: `Bearer ${token.isToken}`
            },
            data:{
                id_user: id
            }
        }
        ).then(res => {
            console.log("🚀 ~ file: dataUsers.js:42 ~ DataUsers ~ id:", id_user)

            console.log("🚀 ~ file: dataObat.js:65 ~ handleDelete ~ res:", res)  
            
        }).catch(err => {
            console.log("🚀 ~ file: dataObat.js:67 ~ handleDelete ~ err:", err)   
        })
    }

  return (
    <div style={{padding: 10}}>
        <div style={{border: '1px solid', borderRadius: 8, padding: 15, }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center  '}}>
                <h4>Data Users</h4>
                <div class="input-group mb-3" style={{width: '20%'}}>
                    <input type="text" class="form-control" placeholder="Search..." aria-describedby="button-addon2"></input>
                    <button class="btn btn-outline-primary" type="button" id="button-addon2">Search</button>
                </div>
            </div>
            <hr/>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Id User</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ?
                        <>
                            {users.map((item) =>
                                <tr>
                                    <th scope="row">{item.id_user}</th>
                                    <td>{item.name}</td>
                                    <td>{item.username}</td>
                                    <td>{item.role === null || item.role === 0 ? 'pengguna' : 'admin'}</td>
                                    <td style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                                        <div style={styleDelete} onClick={() =>{
                                            dispatch(chooseId(item?.id_user))
                                            handleDelete(id_user)
                                        }}>
                                            <MdIcons.MdDelete color='#fff'/>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </>
                    :
                        <div style={{display: 'flex', justifyContent: 'center' , alignItems: 'center'}}>
                            <h6>Tidak ada data</h6>
                        </div>
                    }
                </tbody>
            </table>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{background: '#E5ECF6', width: '20%', height: 50, borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <span>1</span>
                </div>
            </div>

        </div>
    </div>
  )
}

export default DataUsers