import { useTheme } from "@/hooks/use-theme";
import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom"; 
import { Bell, ChevronsLeft, Moon, Search, Sun, LogOut } from "lucide-react";
import profileImg from "@/assets/profile-image.jpg";
import PropTypes from "prop-types";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { toast } from 'react-toastify';
import 'react-responsive-modal/styles.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const Header = ({ collapsed, setCollapsed }) => {
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState(null);
    const [editedEmployee, setEditedEmployee] = useState({
        name: "",
        last_name: "",
        position: "",
        date_of_birth: ""
    });

    useEffect(() => {
        if (employeeToEdit) {
            setEditedEmployee(employeeToEdit);
        }
    }, [employeeToEdit]);

    
    const openEditModal = () => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log("Datos del usuario decodificados:", decodedToken.id);

                const userData = {
                    name: decodedToken.name || "",
                    last_name: decodedToken.last_name || "",
                    position: decodedToken.position || "",
                    date_of_birth: decodedToken.date_of_birth ? decodedToken.date_of_birth.split("T")[0] : ""
                };

                setEmployeeToEdit(userData);
                setIsEditModalOpen(true);
            } catch (error) {
                console.error("Error al decodificar el token:", error);
            }
        } else {
            console.error("No se encontró el token.");
        }
    };

    const closeEditModal = () => {
        setEmployeeToEdit(null);
        setEditedEmployee({});
        setIsEditModalOpen(false);
    };

    const handleEditChange = (e) => {
        setEditedEmployee({ ...editedEmployee, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const userEdit = jwtDecode(token);
        axios.put(`http://127.0.0.1:8000/api/employees/${userEdit.id}`, editedEmployee, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                console.log('token actualizado');
                console.log(response.data.token);
                localStorage.removeItem("token"); 
                navigate("/"); 
                toast.success('se actualizo su perfil correctamente');
            }
            alert('Perfil actualizado correctamente.');
            closeEditModal();
        })
        .catch(error => {
            console.error("Error updating profile:", error);
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); 
        navigate("/"); 
    };

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        const userDel = jwtDecode(token);
        console.log("user a eliminar ",userDel.id );
        
        axios.delete(`http://127.0.0.1:8000/api/employees/${userDel}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            closeDeleteModal();
            toast.success('Empleado eliminado correctamente');
            navigate("/");
        })
        .catch(error => {
            console.error("Error deleting employee:", error);
        });
    };



    return (
        <div> 
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronsLeft className={collapsed && "rotate-180"} />
                </button>
                <div className="input">
                    <Search
                        size={20}
                        className="text-slate-300"
                    />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
                    />
                </div>
            </div>
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    <Sun
                        size={20}
                        className="dark:hidden"
                    />
                    <Moon
                        size={20}
                        className="hidden dark:block"
                    />
                </button>
                <button className="btn-ghost size-10" onClick={handleLogout}>
                    <LogOut size={20} />
                </button>
                <button className="size-10 overflow-hidden rounded-full">
                    <img
                        src={profileImg}
                        alt="profile image"
                        onClick={() => openEditModal()}
                        className="size-full object-cover"
                    />
                </button>
            </div>

            

        </header>
        
        <Modal open={isEditModalOpen} onClose={closeEditModal} center
                 classNames={{
                    modal: "custom-modal"
                }}
             >
                <h2 className="title">Editar Empleado</h2>
        {employeeToEdit && (
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
        <input 
            type="text" 
            name="name" 
            placeholder="Nombre" 
            value={editedEmployee.name} 
            onChange={handleEditChange} 
            className="input !text-black" 
        />
        <input 
            type="text" 
            name="last_name" 
            placeholder="Apellido" 
            value={editedEmployee.last_name} 
            onChange={handleEditChange} 
            className="input !text-black" 
        />
        <input 
            type="text" 
            name="position" 
            placeholder="Puesto" 
            value={editedEmployee.position} 
            onChange={handleEditChange} 
            className="input !text-black" 
        />
        <input 
            type="date" 
            name="date_of_birth" 
            placeholder="Fecha de Nacimiento" 
            value={editedEmployee.date_of_birth} 
            onChange={handleEditChange} 
            className="input !text-black" 
        />
      <div className="flex justify-between mt-4">
    {/* Botón de eliminar alineado a la izquierda */}
    <button type="button" className="btn-ghost text-red-500" onClick={handleDelete}>
        Eliminar
    </button>

    {/* Botones de cancelar y guardar alineados a la derecha */}
    <div className="flex gap-2">
        <button type="button" className="btn-ghost" onClick={closeEditModal}>
            Cancelar
            </button>
            <button type="submit" className="btn-ghost">
                Guardar
            </button>
        </div>
    </div>
        </form>
        )}
        </Modal> 

        </div>
        
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
};
