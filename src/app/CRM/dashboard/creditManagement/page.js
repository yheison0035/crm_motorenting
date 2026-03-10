'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/authContext';
import Table from '@/components/dashboard/tables/table';
import Pagination from '@/components/dashboard/tables/segments/pagination';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import useColumnFilters from '@/components/dashboard/tables/hooks/useColumnFilters';
import { useDebounce } from '@/components/dashboard/tables/hooks/useDebounce';
import { useDragScroll } from '@/hooks/useDragScroll';
import ContentViewModal from '@/components/dashboard/preApproved/contentViewModal';
import useCreditManagement from '@/lib/api/hooks/useCreditManagement';

export default function CreditManagement() {
  const { usuario } = useAuth();
  const { getAllCreditManagement, loading, error } = useCreditManagement();

  const tableRef = useRef(null);
  const drag = useDragScroll();

  const [creditManagement, setCreditManagement] = useState([]);
  const [meta, setMeta] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { filters, handleFilterChange } = useColumnFilters({
    orderNumber: '',
    advisor: '',
    name: '',
    document: '',
    phone: '',
    distributor: '',
    financialEntity: '',
  });

  const debouncedFilters = useDebounce(filters, 200);

  const fetchData = useCallback(async () => {
    const res = await getAllCreditManagement({
      page,
      limit,
      ...debouncedFilters,
    });

    setCreditManagement(res.data || []);
    setMeta(res.meta || null);
  }, [getAllCreditManagement, page, limit, debouncedFilters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    tableRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [page]);

  return (
    <div className="w-full p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          Gestión de Créditos
        </h1>
      </div>

      <div ref={tableRef} className="bg-white rounded-lg shadow relative">
        <LoadingOverlay show={loading} text="Cargando gestión de créditos..." />

        <div
          ref={drag.ref}
          onMouseDown={drag.onMouseDown}
          onMouseUp={drag.onMouseUp}
          onMouseLeave={drag.onMouseLeave}
          onMouseMove={drag.onMouseMove}
          className="relative overflow-x-auto scroll-dark cursor-grab"
        >
          <div className="w-full">
            <Table
              info={creditManagement}
              view="creditManagement"
              rol={usuario?.role}
              loading={loading}
              error={error}
              filters={filters}
              handleFilterChange={handleFilterChange}
              setSelectedState={setSelectedState}
              fetchData={fetchData}
            />
          </div>
        </div>

        {meta && (
          <Pagination
            page={meta.page}
            totalPages={meta.totalPages}
            limit={limit}
            setPage={setPage}
            setLimit={setLimit}
          />
        )}
      </div>

      {selectedState && (
        <ContentViewModal
          data={selectedState}
          view="creditManagement"
          onClose={(shouldReload) => {
            setSelectedState(null);
            if (shouldReload) {
              fetchData();
            }
          }}
        />
      )}
    </div>
  );
}
