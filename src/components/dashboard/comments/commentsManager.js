'use client';

export default function CommentsManager({
  value,
  onChange,
  label = 'Comentario',
}) {
  return (
    <div className="flex flex-col mt-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className={`w-full border rounded-xl px-4 py-2 text-sm shadow-sm
          focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition
          border-gray-200 focus:outline-none
        `}
        placeholder="Escriba una observación..."
      />
    </div>
  );
}
