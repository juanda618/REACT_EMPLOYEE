import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-responsive-modal/styles.css';
import axios from 'axios';


const EmployeeRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    position: '',
    date_of_birth: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [positions, setPositions] = useState([]); 
  const [message, setMessage] = useState('');


  useEffect(() => {
    axios.get('https://ibillboard.com/api/positions')
      .then(response => {
        setPositions(response.data.positions); 
        console.log(response.data.positions);
      })
      .catch(error => {
        console.error("Error fetching positions:", error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    axios.post('http://127.0.0.1:8000/api/register', formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setMessage('Empleado registrado exitosamente');
      setFormData({
        name: '',
        last_name: '',
        position: '',
        date_of_birth: '',
        email: '',
        password: '',
        password_confirmation: ''
      });
      toast.success('se creo el usaurio exitosamente');
    })
    .catch(error => {
      console.error("There was an error registering the employee!", error);
      setMessage('Error al registrar el empleado');
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-slate-900">
      <h1 className="title text-center mb-6">Registrar Empleado</h1>
      {message && <p className="text-center text-blue-500">{message}</p>}
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primera columna */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300">Nombre:</label>
            <input
              type="text"
              name="name"
              className="input w-full !text-black"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300">Apellido:</label>
            <input
              type="text"
              name="last_name"
              className="input w-full !text-black"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300">Puesto:</label>
            <select
              name="position"
              className="input w-full !text-black"
              value={formData.position}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un puesto</option>
              {positions.map((position, index) => (
                <option key={index} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300">Fecha de Nacimiento:</label>
            <input
              type="date"
              name="date_of_birth"
              className="input w-full !text-black"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Segunda columna */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300">Correo Electrónico:</label>
            <input
              type="email"
              name="email"
              className="input w-full !text-black"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300">Contraseña:</label>
            <input
              type="password"
              name="password"
              className="input w-full !text-black"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium text-slate-700 dark:text-slate-300">Confirmar Contraseña:</label>
            <input
              type="password"
              name="password_confirmation"
              className="input w-full !text-black"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        {/* Botón en una fila completa */}
        <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
          <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeRegister;
