import React, { useEffect } from 'react'
import { isLocate } from '../../../redux/actions/locate';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../api/axios'
import { useState } from 'react';
import * as MdIcons from "react-icons/md";
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { chooseId } from '../../../redux/actions/chooseDrugs';


function DataObat() {
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

    const [obat, setObat] = useState([])
    console.log("🚀 ~ file: dataObat.js:9 ~ DataObat ~ obat:", obat)
    const checkObat = true

    const dispatch = useDispatch()
    const id_obat = useSelector(state => state.choose.id)
    console.log("🚀 ~ file: dataObat.js:44 ~ DataObat ~ id_obat:", id_obat)
    const token = useSelector(state => state.access)

    useEffect(() =>{
        dispatch(isLocate('data'))
    },[])

    useEffect(() => {
        axios.get("/drugs").then((res) => {
          setObat(res.data)
        })
    },[checkObat])
    
    const handleDelete = (id) =>{
        axios.delete('/deleteDrugs',
            {
                headers: {
                    Authorization: `Bearer ${token.isToken}`
                },
                data: {
                    id_drugs: id
                }
            }
        ).then(res => {
            console.log("🚀 ~ file: dataObat.js:65 ~ handleDelete ~ res:", res)  
        }).catch(err => {
            console.log("🚀 ~ file: dataObat.js:67 ~ handleDelete ~ err:", err)   
        })
    }
    
  return (
    <div style={{padding: 10}}>
        <div style={{border: '1px solid', borderRadius: 8, padding: 15, }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center  '}}>
                <h4>Data Obat</h4>
                <div class="input-group mb-3" style={{width: '20%'}}>
                    <input type="text" class="form-control" placeholder="Search..." aria-describedby="button-addon2"></input>
                    <button class="btn btn-outline-primary" type="button" id="button-addon2">Search</button>
                </div>
            </div>
            <hr/>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Nama Obat</th>
                        <th scope="col">Jenis Obat</th>
                        <th scope="col">Deskripsi</th>
                        <th scope="col">Gambar Obat</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {obat.length > 0 ? 
                        <>
                            {obat?.map((item) =>
                                    <tr>
                                        <th scope="row">{item?.drugs_name}</th>
                                        <td>{item?.subTitle}</td>
                                        <td>{item?.deskripsi}</td>
                                        <td>{item?.image}</td>
                                        <td style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                                            <Link style={styleDelete} onClick={() => {
                                                dispatch(chooseId(item?.id_drugs))
                                                handleDelete(id_obat)
                                            }}>
                                                <MdIcons.MdDelete color='#fff'/>
                                            </Link>
                                            <Link to='/editObat' onClick={() => dispatch(chooseId(item?.id_drugs))} style={styleEdit}>
                                                <MdIcons.MdEdit color='#fff'/>
                                            </Link>
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

export default DataObat