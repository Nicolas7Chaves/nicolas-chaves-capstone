import React, { useState } from 'react';
import './EditEmployee.scss'
import { useNavigate } from 'react-router-dom';

function EditEmployee({ employee, onSave, onRemove, onClose, onActionComplete }) {
    const [editedEmployee, setEditedEmployee] = useState({ ...employee });
    const navigate = useNavigate();

    function handleChange(e) {
        setEditedEmployee({ ...editedEmployee, [e.target.name]: e.target.value });
    }

    const handleSave = (e) => {
        e.preventDefault();
        onSave(editedEmployee);
        onActionComplete();
        navigate('/employees');
    };

    const handleRemove = () => {
        onRemove(editedEmployee.id);
        onActionComplete();
        navigate('/employees'); 
    };


    return (
        <div className="modal">
            <div className="modal__content">
                <span className="modal__close" onClick={onClose}>&times;</span>
                <h3 className='modal__title'>Edit Employee</h3>
                <form className='modal__form' onSubmit={handleSave}>
                    <label className='modal__label'>ID:</label>
                    <input className='modal__input' type="text" name="id" value={editedEmployee.id} onChange={handleChange} disabled />

                    <label className='modal__label'>First Name:</label>
                    <input className='modal__input' type="text" name="first_name" value={editedEmployee.first_name} onChange={handleChange} />

                    <label className='modal__label'>Last Name:</label>
                    <input className='modal__input' type="text" name="last_name" value={editedEmployee.last_name} onChange={handleChange} />

                    <label className='modal__label'>Hourly Rate:</label>
                    <input className='modal__input' type="number" name="hourly_rate" value={editedEmployee.hourly_rate} onChange={handleChange} />

                    <button className='modal__button modal__button--save' type="submit">Save Changes</button>
                    <button className='modal__button modal__button--remove' type="button" onClick={handleRemove}>Remove Employee</button>
                </form>
            </div>
        </div>
    );
}

export default EditEmployee;
