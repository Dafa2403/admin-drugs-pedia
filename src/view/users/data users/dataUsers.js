import React, { useEffect, useState } from 'react';
import { isLocate } from '../../../redux/actions/locate';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../api/axios';
import * as MdIcons from 'react-icons/md';

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
    cursor: 'pointer',
  };

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const token = useSelector((item) => item.access);
  const id_user = useSelector((item) => item.choose.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLocate('users'));
  }, [dispatch]);

  useEffect(() => {
    axios
      .get('/auth/api/users', {
        headers: {
          Authorization: `Bearer ${token.isToken}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      });
  }, [token.isToken]);

  const handleDelete = (id) => {
    axios
      .delete('/auth/api/deleteUser', {
        headers: {
          Authorization: `Bearer ${token.isToken}`,
        },
        data: {
          id_user: id,
        },
      })
      .then((res) => {
        console.log('Deleted successfully:', res);
        // Reload the data after deletion
        axios.get('/auth/api/users', {
          headers: {
            Authorization: `Bearer ${token.isToken}`,
          },
        }).then((res) => {
          setUsers(res.data);
        });
      })
      .catch((err) => {
        console.error('Error deleting:', err);
      });
  };

  // Filtering function
  const filteredUsers = users.filter(
    (item) =>
      item.id_user.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ padding: 10 }}>
      <div style={{ border: '1px solid', borderRadius: 8, padding: 15 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4>Data Users</h4>
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
              <th scope="col">Id User</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              <>
                {currentItems.map((item) => (
                  <tr key={item.id_user}>
                    <th scope="row">{item.id_user}</th>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.role === null || item.role === 0 ? 'pengguna' : 'admin'}</td>
                    <td style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                      <div
                        style={styleDelete}
                        onClick={() => {
                          handleDelete(id_user);
                        }}
                      >
                        <MdIcons.MdDelete color="#fff" />
                      </div>
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
            {Array(Math.ceil(filteredUsers.length / itemsPerPage))
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

export default DataUsers;
