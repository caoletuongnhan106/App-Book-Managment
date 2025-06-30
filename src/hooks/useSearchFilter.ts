import { useState, useMemo } from 'react';

export const useSearchFilter = (data: any[], searchFields: string[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    return data.filter((item) =>
      searchFields.some((field) =>
        item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm, searchFields]);
  return { searchTerm, setSearchTerm, filteredData };
};