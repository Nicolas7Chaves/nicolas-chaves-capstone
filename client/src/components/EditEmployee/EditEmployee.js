import React, { useState } from 'react';
import './EditEmployee.scss'

function EditEmployee({ employee, onSave, onRemove, onClose }) {
    const [editedEmployee, setEditedEmployee] = useState({ ...employee });

    function handleChange(e) {
        setEditedEmployee({ ...editedEmployee, [e.target.name]: e.target.value });
    }

    return (
        <div className="modal">
            <div className="modal__content">
                <span className="modal__close" onClick={onClose}>&times;</span>
                <h3 className='modal__title'>Edit Employee</h3>
                <form onSubmit={(e) => { e.preventDefault(); onSave(editedEmployee); }}>
                    <label className='modal__label'>ID:</label>
                    <input className='modal__input' type="text" name="id" value={editedEmployee.id} onChange={handleChange} disabled />

                    <label className='modal__label'>First Name:</label>
                    <input className='modal__input' type="text" name="first_name" value={editedEmployee.first_name} onChange={handleChange} />

                    <label className='modal__label'>Last Name:</label>
                    <input className='modal__input' type="text" name="last_name" value={editedEmployee.last_name} onChange={handleChange} />

                    <label className='modal__label'>Hourly Rate:</label>
                    <input className='modal__input' type="number" name="hourly_rate" value={editedEmployee.hourly_rate} onChange={handleChange} />

                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => onRemove(editedEmployee.id)}>Remove Employee</button>
                </form>
            </div>
        </div>
    );
}

export default EditEmployee;
