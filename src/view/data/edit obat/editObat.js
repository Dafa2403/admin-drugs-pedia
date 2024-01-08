import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../../api/axios';
import { CAlert, CForm, CFormInput, CFormTextarea, CInputGroup, CInputGroupText } from '@coreui/react';
import { useNavigate } from 'react-router-dom';

function EditObat() {
  const [drugs_name, setDrugsName] = useState('');
  const [kategori, setKategori] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [current, setCurrent] = useState([]);    
  const [visible, setVisible] = useState(false)
  const [color, setColor] = useState('')
  const [message, setMessage] = useState('')

  const token = useSelector((item) => item.access);
  const id_obat = useSelector((state) => state.choose.id);
  const navigate = useNavigate();


  const isData = true;

  useEffect(() => {
    axios.get(`/Drugs/${id_obat}`).then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i];
        setDrugsName(element.drugs_name);
        setKategori(element.subTitle);
        setDeskripsi(element.deskripsi);
        setImage(element.image);
        setId(element.id_drugs);
      }
    });
  }, [isData]);

  const handleSubmit = async () => {
    try {
        if (drugs_name !== '' && kategori !== '' && deskripsi !== '' && image !== null){
            const formData = new FormData();
            formData.append('id_drugs', id);
            formData.append('drugs_name', drugs_name);
            formData.append('subTitle', kategori);
            formData.append('deskripsi', deskripsi);
            formData.append('image', image);
            const res = await axios.put(
                "/editDrugs",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        withCredentials: true,
                        Authorization: `Bearer ${token.isToken}`,
                    }
                }
            );
            setDrugsName("");
            setKategori("");
            setDeskripsi("");
            setImage(null);
            setVisible(true)
            handleMessage('success')
            setTimeout(()=> {
                navigate('/DataObat')
            }, 2000);
        }else{
            setVisible(true)
            handleMessage('null')
        }
    } catch (err) {
      console.log('error');
      setVisible(true)
      handleMessage('error')
    }
  };

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
    <div className="container" >
      <div className="row justify-content-center mt-4">
        <div className="col-md-10">
          <div className="card border-primary">
            <div className="card-body p-4">
              <h6 className="mb-4">Input Obat</h6>
              <hr />
              <div>
                <div className="mb-3">
                  <label className="form-label">Nama Obat</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukan Nama Obat.."
                    onChange={(e) => setDrugsName(e.target.value)}
                    value={drugs_name}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Kategori</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukan Kategori Obat.."
                    onChange={(e) => setKategori(e.target.value)}
                    value={kategori}
                  />
                </div>
                <div className="mb-3">
                  <CForm>
                    <CFormTextarea
                      id="deskripsi"
                      label="Deskripsi"
                      rows={3}
                      onChange={(e) => setDeskripsi(e.target.value)}
                    />
                  </CForm>
                </div>
                <div className='mb-3'>
                    <label htmlFor="exampleInputEmail1" className="form-label">Image</label>
                    <input class="form-control" type="file" id="formFile" accept="image/png, image/jpeg" name='image' onChange={e => setImage(e.target.files[0])}></input>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                  <button onClick={handleSubmit} className="btn btn-primary">
                    Submit
                  </button>
                </div>
                <CAlert color={color} visible={visible}>
                    {message}
                </CAlert>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditObat;
