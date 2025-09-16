'use client';

import BtnReturn from '../buttons/return';
import BtnSave from '../buttons/save';
import CommentsHistory from '../comments/CommentsHistory';
import AddComment from '../comments/addComment';
import { stateCustomer } from '@/lib/api/stateCustomer';
import { advisors } from '@/lib/api/advisors';
import DepartaCiudad from '@/components/dashboard/select/depart_ciud';

export default function CustomerForm({
  formData,
  handleSubmit,
  setFormData,
  handleReset,
  isLocked = false,
  newComment,
  setNewComment,
  handleAddComment,
  loading,
  mode = 'edit',
  usuario,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'department' ? { city: '' } : {}),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          ['name', 'Nombres y Apellidos', '', true],
          ['email', 'Correo Electronico', 'email', true],
          ['birthdate', 'Fecha de Nacimiento', 'date', true],
          ['phone', 'Teléfono', '', true],
          ['address', 'Dirección', 'text', true],
          ['document', 'Documento', 'text', true],
        ].map(([name, label, type = 'text', required = true]) => (
          <div key={name} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={formData[name] || ''}
              onChange={handleChange}
              disabled={isLocked}
              className={`w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm focus:outline-none transition ${
                isLocked
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
              }`}
              required={required}
            />
          </div>
        ))}

        {usuario?.role === 'ADMIN' && (
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Asignar Asesor
            </label>
            <select
              name="advisorId"
              value={formData.advisorId || ''}
              onChange={handleChange}
              disabled={isLocked}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            >
              <option value="">Seleccione un asesor</option>
              {advisors.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <DepartaCiudad formData={formData} handleChange={handleChange} />

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <select
            name="stateId"
            value={formData.stateId || ''}
            onChange={handleChange}
            disabled={isLocked}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            required
          >
            <option value="">Seleccione un estado</option>
            {stateCustomer.map((state, i) => (
              <option key={i} value={i + 1}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

      {mode === 'edit' && (
        <>
          <AddComment
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={handleAddComment}
          />
          <CommentsHistory formData={formData} />
        </>
      )}

      <div className="flex justify-end mt-6 gap-3">
        <BtnReturn route="/CRM/dashboard/customers" />
        {mode === 'new' && handleReset && (
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm shadow-sm hover:bg-gray-50 transition cursor-pointer"
          >
            Limpiar
          </button>
        )}
        <BtnSave disabled={loading} />
      </div>
    </form>
  );
}
