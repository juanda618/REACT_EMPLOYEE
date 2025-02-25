import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ListEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [employeeToEdit, setEmployeeToEdit] = useState(null);
    const [editedEmployee, setEditedEmployee] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.get('http://127.0.0.1:8000/api/employees', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setEmployees(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the employees!", error);
                });

        } else {
            console.log('No token found. Redirecting to login...');
        }
    }, []);

    const columns = useMemo(
        () => [
            { Header: "ID", accessor: "id" },
            { Header: "Nombre", accessor: "name" },
            { Header: "Apellido", accessor: "last_name" },
            { Header: "Puesto", accessor: "position" },
            { Header: "Fecha de Nacimiento", accessor: "date_of_birth" },
            {
                Header: "Acciones",
                id: "actions",
                Cell: ({ row }) => (
                    <div className="flex gap-2">
                        <button
                            className="btn-ghost"
                            onClick={() => openEditModal(row.original)}
                        >
                            Editar
                        </button>
                        <button
                            className="btn-ghost"
                            onClick={() => openDeleteModal(row.original)}
                        >
                            Eliminar
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    // useTable hook
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter, state } =
        useTable({
            columns,
            data: employees, 
        },
        useGlobalFilter
        );

    const openDeleteModal = (employee) => {
        setEmployeeToDelete(employee);
        setIsDeleteModalOpen(true);
    };

    const openEditModal = (employee) => {
        console.log(employee);
        setEmployeeToEdit(employee);
        setEditedEmployee(employee);
        setIsEditModalOpen(true);
    };

    const closeDeleteModal = () => {
        setEmployeeToDelete(null);
        setIsDeleteModalOpen(false);
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
        axios.put(`http://127.0.0.1:8000/api/employees/${employeeToEdit.id}`, editedEmployee, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                setEmployees(employees.map(emp =>
                    emp.id === employeeToEdit.id ? editedEmployee : emp
                ));
                closeEditModal();
            })
            .catch(error => {
                console.error("Error updating employee:", error);
            });
    };

    const handleDelete = () => {
        const token = localStorage.getItem('token');
    
        axios.delete(`http://127.0.0.1:8000/api/employees/${employeeToDelete.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            setEmployees(employees.filter(emp => emp.id !== employeeToDelete.id));
            closeDeleteModal();
            toast.success('Empleado eliminado correctamente');
        })
        .catch(error => {
            console.error("Error deleting employee:", error);
        });
    };

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="title">Listado de Empleados</h1>
            
            <div className="card">
                <div className="card-header">
                    <p className="card-title">Empleados</p>
                    <input
                        type="text"
                        value={state.globalFilter || ""}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        placeholder="Buscar empleado..."
                        className="mb-4 p-2 border border-gray-300 rounded w-min"
                    />
                </div>
                <div className="card-body p-0">
                    <div className="relative h-[500px] w-full flex-shrink-0 overflow-auto rounded-none [scrollbar-width:_thin]">
                        <table {...getTableProps()} className="table">
                            <thead className="table-header">
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                                        {headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps()} key={column.id} className="table-head">
                                                {column.render('Header')}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()} className="table-body">
                                {rows.map((row, i) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()} key={row.original.id}>
                                            {row.cells.map(cell => (
                                                <td {...cell.getCellProps()} key={cell.column.id} className="table-cell">
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal open={isDeleteModalOpen} onClose={closeDeleteModal} center>
                <h2>Confirmar Eliminación</h2>
                <p>¿Está seguro de que desea eliminar a {employeeToDelete?.name}?</p>
                <div className="flex justify-end gap-2 mt-4">
                    <button className="btn-ghost" onClick={closeDeleteModal}>Cancelar</button>
                    <button className="btn-ghost" onClick={handleDelete}>Eliminar</button>
                </div>
            </Modal>

             <Modal open={isEditModalOpen} onClose={closeEditModal} center
                 classNames={{
                    modal: "custom-modal"
                }}
             >
                <h2 className="title">Editar Empleado</h2>
                {employeeToEdit && (
                    <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                        <input type="text" name="name" placeholder="Nombre" value={editedEmployee.name} onChange={handleEditChange} className="input !text-black" />
                        <input type="text" name="last_name" placeholder="Apellido" value={editedEmployee.last_name} onChange={handleEditChange} className="input !text-black" />
                        <input type="text" name="position" placeholder="Puesto" value={editedEmployee.position} onChange={handleEditChange} className="input !text-black" />
                        <input type="date" name="date_of_birth" placeholder="Fecha de Nacimiento" value={editedEmployee.date_of_birth} onChange={handleEditChange} className="input !text-black" />

                        <div className="flex justify-end gap-2 mt-4">
                            <button type="button" className="btn-ghost" onClick={closeEditModal}>Cancelar</button>
                            <button type="submit" className="btn-ghost">Guardar</button>
                        </div>
                    </form>
                )}
            </Modal> 
        </div>
    );
};

export default ListEmployees;
