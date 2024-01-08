import React, { useEffect, useState } from 'react';
import { isLocate } from "../../redux/actions/locate";
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../api/axios';
import { CAlert, CForm, CFormInput, CFormTextarea, CInputGroup, CInputGroupText } from '@coreui/react';

function InputObat() {
    const [drugs_name, setDrugsName] = useState('');
    const [kategori, setKategori] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [image, setImage] = useState(null);
    const [visible, setVisible] = useState(false)
    const [color, setColor] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile.isProfile);

    useEffect(() => {
        dispatch(isLocate('input'));
    }, []);

    const handleSubmit = async () => {
        try {
            if (drugs_name !== '' && kategori !== '' && deskripsi !== '' && image !== null){
                const formData = new FormData();
                formData.append('id_user', profile.currUser);
                formData.append('drugs_name', drugs_name);
                formData.append('subTitle', kategori);
                formData.append('deskripsi', deskripsi);
                formData.append('image', image);
                const res = await axios.post(
                    "/addDrugs",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            withCredentials: true
                        }
                    }
                );
                setDrugsName("");
                setKategori("");
                setDeskripsi("");
                setImage(null);
                setVisible(true)
                handleMessage('success')
            }else{
                setVisible(true)
                handleMessage('null')
            }
        } catch (err) {
            console.log('error');
            setVisible(true)
            handleMessage('error')
        }
    }

    const handleMessage = (type) => {
        if (type === 'error') {
            setColor('danger')
            setMessage('Input data gagal') 
        }else if(type === 'null'){
            setColor('warning')
            setMessage('Jangan lupa untuk input nama obat, kategori obat, gambar dan deskripsi')
        }else{
            setColor('success')
            setMessage('Input data berhasil')
        }
    }

    return (
        <div style={{padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
            <div style={{border: '1px solid', borderRadius: 8, padding: 15, width: '100%'}}>
                <h6>Input Obat</h6>
                <hr/>
                <div>
                    <div className='mb-3'>
                        <label htmlFor="exampleInputEmail1" className="form-label">Nama Obat</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Masukan Nama Obat..'
                            onChange={(e) => setDrugsName(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleInputEmail1" className="form-label">Kategori</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Masukan Kategori Obat..'
                            onChange={(e) => setKategori(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <CForm>
                            <CFormTextarea
                                id="deskripsi"
                                label="Deskripsi"
                                rows={3}
                                onChange={(e) => setDeskripsi(e.target.value)}
                            ></CFormTextarea>
                        </CForm>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="exampleInputEmail1" className="form-label">Image</label>
                        <input class="form-control" type="file" id="formFile" accept="image/png, image/jpeg" name='image' onChange={e => setImage(e.target.files[0])}></input>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 10}}>
                        <button onClick={() => handleSubmit()} className="btn btn-primary">Submit</button>
                    </div>
                    <CAlert color={color} visible={visible}>
                        {message}
                    </CAlert>
                </div>
            </div>
        </div>
    );
}

export default InputObat;
