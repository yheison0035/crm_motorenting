import React from 'react';
import { formatToAmPm, normalizeDateForInput } from '@/lib/api/utils/utils';

export default function DeliverySchedules({ deliverySchedules }) {
  return (
    <details className="group border rounded-xl p-4 border-gray-200">
      <summary className="cursor-pointer font-semibold text-gray-800 text-lg flex justify-between items-center">
        Evidencias de Entrega
        <span className="text-gray-400 group-open:rotate-180 transition-transform">
          ▼
        </span>
      </summary>

      <div className="space-y-8 mt-6">
        {deliverySchedules.map((schedule) => (
          <div key={schedule.id} className="rounded-xl space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gray-700">Fecha Programada</p>
                <p className="text-gray-600">
                  {normalizeDateForInput(schedule.scheduledDate)}
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Hora</p>
                <p className="text-gray-600">
                  {formatToAmPm(schedule.scheduledTime)}
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Dirección</p>
                <p className="text-gray-600">{schedule.address}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Estado de Entrega</p>
                <p className="text-gray-600">
                  {schedule.deliveryScheduleStatus === 'NA'
                    ? 'NUEVA'
                    : schedule.deliveryScheduleStatus || 'NUEVA'}
                </p>
              </div>
            </div>

            {schedule.evidences?.length > 0 ? (
              <div className="space-y-6">
                {schedule.evidences.map((evidence) => (
                  <div
                    key={evidence.id}
                    className="border border-gray-300 rounded-xl p-4 bg-white shadow-sm"
                  >
                    <div className="mb-4">
                      <p className="font-semibold text-gray-700">
                        Fecha de Entrega
                      </p>
                      <p className="text-gray-600">
                        {normalizeDateForInput(evidence.deliveredAt)}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <img
                        src={evidence.photoOne}
                        alt="Evidencia 1"
                        className="w-full h-64 object-contain rounded-xl border border-gray-200"
                      />
                      <img
                        src={evidence.photoTwo}
                        alt="Evidencia 2"
                        className="w-full h-64 object-contain rounded-xl border border-gray-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              schedule.deliveryScheduleStatus !== 'RECHAZADO' && (
                <p className="text-gray-400 text-sm">
                  No hay evidencias cargadas para este agendamiento
                </p>
              )
            )}
          </div>
        ))}
      </div>
    </details>
  );
}
