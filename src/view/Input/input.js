import React, { useEffect, useState } from 'react'
import { isLocate } from "../../redux/actions/locate";
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../api/axios';

function InputObat() {
    const [drugs_name, setDrugsName] = useState('')
    const [kategori, setKategori] = useState('')
    const [deskripsi, setDeskripsi] = useState('')
    const [image, setImage] = useState('')

    const dispatch = useDispatch()
    const profile = useSelector((state) => state.profile.isProfile)
    console.log("🚀 ~ file: input.js:14 ~ InputObat ~ profile:", profile.currUser)


    useEffect(() =>{
        dispatch(isLocate('input'))
    },[])

    const handleSubmit = async (e) =>{

        try {
            const res = await axios.post(
                "/addDrugs",
                JSON.stringify({id_user: profile.currUser, drugs_name, subTitle : kategori, deskripsi, image}),
                {
                    headers: {
                        "Content-Type" : "application/json",
                        withCredentials: true
                    }
                }
            );
            setDrugsName("")
            setKategori("")
            setDeskripsi("")
            setImage("")

            console.log("🚀 ~ file: login.js:34 ~ handleSubmit ~ res:", res)

        } catch (err){
            console.log('error')
        }
    }
    
  return (
    <div style={{padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{border: '1px solid', borderRadius: 8, height: '80vh', padding: 15, width: '100%'}}>
            <h6>Input Obat</h6>
            <hr/>
            <div>
                <div className='mb-3'>
                    <label for="exampleInputEmail1" class="form-label">Nama Obat</label>
                    <input type="text" class="form-control" 
                        placeholder='Masukan Nama Obat..'
                        onChange={(e) => setDrugsName(e.target.value)}
                    ></input>
                </div>
                <div className='mb-3'>
                    <label for="exampleInputEmail1" class="form-label">Kategori</label>
                    <input type="text" class="form-control" 
                        placeholder='Masukan Kategori Obat..'
                        onChange={(e) => setKategori(e.target.value)}
                    ></input>
                </div>
                <div className='mb-3'>
                    <label for="exampleInputEmail1" class="form-label">Deskripsi</label>
                    <input type="text" class="form-control" 
                        placeholder='Masukan Deskripsi..'
                        onChange={(e) => setDeskripsi(e.target.value)}
                    ></input>
                </div>
                <div className='mb-3'>
                    <label for="exampleInputEmail1" class="form-label">Image</label>
                    <input type="text" class="form-control" 
                        placeholder='Masukan Image..' 
                        onChange={(e) => setImage(e.target.value)}
                    ></input>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 10}}>
                    <button onClick={() => handleSubmit()} class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InputObat