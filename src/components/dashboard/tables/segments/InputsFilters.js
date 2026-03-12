import usePermissions from '@/hooks/usePermissions';
import SearchFilter from './inputSearch/searchFilter';
import { Roles } from '@/config/roles';

export default function InputFilters({
  rol,
  view,
  filters,
  handleFilterChange,
}) {
  const { canViewAll } = usePermissions();

  const allFilters = [
    {
      name: 'orderNumber',
      title: 'Numero de Orden',
      show:
        view === 'approved' ||
        view === 'delivered' ||
        view === 'creditManagement' ||
        view === 'motoForDelivery' ||
        view === 'motorcyclesScheduled',
    },
    {
      name: 'advisor',
      title: 'Asesor',
      show:
        ((canViewAll && view === 'customers') ||
          view === 'delivered' ||
          view === 'preApproved' ||
          view === 'approved' ||
          view === 'creditManagement' ||
          view === 'motoForDelivery' ||
          view === 'motorcyclesScheduled' ||
          view === 'customerWarehouse') &&
        rol !== Roles.ASESOR,
    },
    { name: 'role', title: 'Rol', show: view === 'advisors' },
    { name: 'name', title: 'Nombre', show: true },
    {
      name: 'document',
      title: 'Documento',
      show: view !== 'motorcyclesScheduled',
    },
    {
      name: 'deliveryDate',
      title: 'Fecha de Entrega',
      show: view === 'delivered',
    },
    { name: 'plate', title: 'Placa', show: view === 'delivered' },
    {
      name: 'email',
      title: 'Correo',
      show:
        view !== 'creditManagement' &&
        view !== 'motoForDelivery' &&
        view !== 'motorcyclesScheduled' &&
        view !== 'approved',
    },
    { name: 'phone', title: 'Teléfono', show: true },
    {
      name: 'city',
      title: 'Ciudad',
      show:
        view !== 'creditManagement' &&
        view !== 'motoForDelivery' &&
        view !== 'motorcyclesScheduled' &&
        view !== 'approved',
    },
    {
      name: 'distributor',
      title: 'Distribuidor',
      show:
        view === 'creditManagement' ||
        view === 'motoForDelivery' ||
        view === 'motorcyclesScheduled' ||
        view === 'approved',
    },
    {
      name: 'financialEntity',
      title: 'Financiera',
      show:
        view === 'creditManagement' ||
        view === 'motoForDelivery' ||
        view === 'approved',
    },
    {
      name: 'creditManagementStatus',
      title: 'Estado de Gestión de Crédito',
      show: view === 'creditManagement',
    },
    {
      name: 'reference',
      title: 'Referencia',
      show: view === 'motoForDelivery' || view === 'motorcyclesScheduled',
    },
    {
      name: 'approvalDate',
      title: 'Fecha de Aprobación',
      show: view === 'approved',
    },
    {
      name: 'creditManagement',
      title: 'Gestión de crédito',
      show: view === 'approved',
    },
    {
      name: 'plate',
      title: 'Placa',
      show: view === 'motorcyclesScheduled',
    },
    {
      name: 'scheduledDate',
      title: 'Fecha Agendada',
      show: view === 'motorcyclesScheduled',
    },
    {
      name: 'scheduledTime',
      title: 'Hora Entrega',
      show: view === 'motorcyclesScheduled',
    },
    {
      name: 'address',
      title: 'Direccion Entrega',
      show: view === 'motorcyclesScheduled',
    },
    {
      name: 'state',
      title: 'Estado',
      show: view === 'customers',
    },
    {
      name: 'saleState',
      title: 'Estado Venta',
      show:
        view === 'customers' ||
        view === 'preApproved' ||
        view === 'customerWarehouse',
      type: 'select',
      options: [
        { label: 'Pendiente por aprobar', value: 'PENDIENTE_POR_APROBAR' },
        { label: 'Aprobado', value: 'APROBADO' },
        { label: 'Rechazado', value: 'RECHAZADO' },
        { label: 'No aplica', value: 'NA' },
      ],
    },
    {
      name: 'terminationStatus',
      title: 'Finalizado',
      show: view === 'delivered',
    },
  ];

  return (
    <tr>
      {canViewAll && view === 'customers' && <th></th>}

      {allFilters
        .filter((f) => f.show)
        .map(({ name, title }) => (
          <th key={name} className="px-4 py-2">
            <SearchFilter
              name={name}
              title={title}
              value={filters[name] || ''}
              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              handleFilterChange={handleFilterChange}
            />
          </th>
        ))}

      <th></th>
    </tr>
  );
}
