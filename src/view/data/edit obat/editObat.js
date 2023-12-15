import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../api/axios';

function EditObat() {
    const [drugs_name, setDrugsName] = useState('')
    console.log("🚀 ~ file: editObat.js:7 ~ EditObat ~ drugs_name:", drugs_name)
    const [kategori, setKategori] = useState('')
    console.log("🚀 ~ file: editObat.js:9 ~ EditObat ~ kategori:", kategori)
    const [deskripsi, setDeskripsi] = useState('')
    console.log("🚀 ~ file: editObat.js:11 ~ EditObat ~ deskripsi:", deskripsi)
    const [image, setImage] = useState('')
    console.log("🚀 ~ file: editObat.js:12 ~ EditObat ~ image:", image)
    const [id,setId] = useState(null)
    console.log("🚀 ~ file: editObat.js:11 ~ EditObat ~ id:", id)
    const [current, setCurrent] = useState([])
    console.log("🚀 ~ file: editObat.js:11 ~ EditObat ~ current:", current)

    const token = useSelector((item) => item.access)
    const profile = useSelector((state) => state.profile.isProfile)
    const id_obat = useSelector((state) => state.choose.id)
    console.log("🚀 ~ file: editObat.js:17 ~ EditObat ~ id_obat:", id_obat)
    console.log("🚀 ~ file: input.js:14 ~ InputObat ~ profile:", profile.currUser)

    const isData = true

    useEffect(() =>{
      axios.get(
        `/Drugs/${id_obat}`
      ).then((res) => {
        for (let i = 0; i < res.data.length; i++) {
            const element = res.data[i];
            setDrugsName(element.drugs_name)
            setKategori(element.subTitle)
            setDeskripsi(element.deskripsi)
            setImage(element.image)   
            setId(element.id_drugs)
            
        }
    })
    },[isData])

    const handleSubmit = async (e) =>{

        try {
            const res = await axios.put(
                '/editDrugs',
                JSON.stringify({id_drugs: id, drugs_name, subTitle : kategori, deskripsi, image}),
                {
                    headers: {
                        "Content-Type" : "application/json",
                        withCredentials: true,
                        Authorization: `Bearer ${token.isToken}`
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
                        value={drugs_name}
                    ></input>
                </div>
                <div className='mb-3'>
                    <label for="exampleInputEmail1" class="form-label">Kategori</label>
                    <input type="text" class="form-control" 
                        placeholder='Masukan Kategori Obat..'
                        onChange={(e) => setKategori(e.target.value)}
                        value={kategori}
                    ></input>
                </div>
                <div className='mb-3'>
                    <label for="exampleInputEmail1" class="form-label">Deskripsi</label>
                    <input type="text" class="form-control" 
                        placeholder='Masukan Deskripsi..'
                        onChange={(e) => setDeskripsi(e.target.value)}
                        value={deskripsi}
                    ></input>
                </div>
                <div className='mb-3'>
                    <label for="exampleInputEmail1" class="form-label">Image</label>
                    <input type="text" class="form-control" 
                        placeholder='Masukan Image..' 
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
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

export default EditObat