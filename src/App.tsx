import { useEffect, useState} from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
  } from 'material-react-table';

  interface TableConfig {
    enableRowSelection: boolean;
    enableFilters: boolean;
    enableColumnFilterModes: boolean;
    enableColumnActions: boolean;
  }

  interface RowData {
    name: string;
    age: number;
  }

  const defaultTableConfig: TableConfig = {
    enableRowSelection: false,
    enableFilters: false,
    enableColumnFilterModes: false,
    enableColumnActions: false,
  };

const App = () => {
  const [tableProps,setTableProps] = useState<TableConfig>(defaultTableConfig);
  const [columns,setColumns] = useState<MRT_ColumnDef<RowData>[]>([]);
  const [data, setData] = useState<RowData[]>([]);
  const table = useMaterialReactTable({
        columns,
        data,
        ...tableProps
      });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./Employees.json');
        const jsonData = await response.json();
        setData(jsonData.data);
        setColumns(jsonData.columns);
        setTableProps(jsonData.props);
      }catch(error){
        console.error(error);
      }
    }
    fetchData();
  },[])
  return (
    <div>
      <MaterialReactTable table={table} />;
    </div>
  )
}

export default App