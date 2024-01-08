import React, { useEffect, useState } from 'react';
import { isLocate } from '../../../redux/actions/locate';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../api/axios';
import * as MdIcons from 'react-icons/md';
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
    cursor: 'pointer',
  };

  const styleEdit = {
    border: '1px solid #ffb700',
    borderRadius: 8,
    width: 25,
    height: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ffc73b',
    cursor: 'pointer',
  };

  const [obat, setObat] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dispatch = useDispatch();
  const id_obat = useSelector((state) => state.choose.id);
  const token = useSelector((state) => state.access);

  useEffect(() => {
    dispatch(isLocate('data'));
  }, [dispatch]);

  useEffect(() => {
    axios.get('/drugs').then((res) => {
      setObat(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete('/deleteDrugs', {
        headers: {
          Authorization: `Bearer ${token.isToken}`,
        },
        data: {
          id_drugs: id,
        },
      })
      .then((res) => {
        console.log('Deleted successfully:', res);
        // Reload the data after deletion
        axios.get('/drugs').then((res) => {
          setObat(res.data);
        });
      })
      .catch((err) => {
        console.error('Error deleting:', err);
      });
  };

//   const handleEdit = (id) => {
//     axios.put
//   }

  // Filtering function
  const filteredObat = obat.filter(
    (item) =>
      item.drugs_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id_drugs.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredObat.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ padding: 10 }}>
      <div style={{ border: '1px solid', borderRadius: 8, padding: 15 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4>Data Obat</h4>
          <div className="input-group mb-3" style={{ width: '20%' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              aria-describedby="button-addon2"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <hr />
        <table className="table">
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
            {currentItems.length > 0 ? (
              <>
                {currentItems.map((item) => (
                  <tr key={item.id_drugs}>
                    <th scope="row">{item.drugs_name}</th>
                    <td>{item.subTitle}</td>
                    <td>{item.deskripsi}</td>
                    <td>{item.image}</td>
                    <td style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                      <Link
                        style={styleDelete}
                        onClick={() => {
                          dispatch(chooseId(item.id_drugs));
                          handleDelete(id_obat);
                        }}
                      >
                        <MdIcons.MdDelete color="#fff" />
                      </Link>
                      <Link to='/editObat' onClick={() => dispatch(chooseId(item?.id_drugs))} style={styleEdit}>
                            <MdIcons.MdEdit color='#fff'/>
                        </Link>

                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  <h6>Tidak ada data</h6>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <nav style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <ul className="pagination">
            {Array(Math.ceil(filteredObat.length / itemsPerPage))
              .fill()
              .map((_, index) => (
                <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                  <button onClick={() => paginate(index + 1)} className="page-link">
                    {index + 1}
                  </button>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default DataObat;
