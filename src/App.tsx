import { useEffect, useState} from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_TableState,
  } from 'material-react-table';

  interface TableConfig {
    enableTopToolbar: boolean;
    enableRowSelection: boolean;
    enableColumnActions: boolean;
  }

  type Person = {
    name: string;
    userName: string;
    age: number;
    email :string;
    role: string;
    status: string;
    teams: string[];
  };

  const defaultTableConfig: TableConfig = {
    enableTopToolbar: true,
    enableRowSelection: true,
    enableColumnActions: true,
  };

const App = () => {
  const [tableProps,setTableProps] = useState<TableConfig>(defaultTableConfig);
  const [initialStates, setInitialStates] = useState<Partial<MRT_TableState<Person>>>({});
  console.log(initialStates)
  console.log(initialStates.pagination);
  const [columns,setColumns] = useState<MRT_ColumnDef<Person>[]>([]);
  const [data, setData] = useState<Person[]>([]);
  
  const fetchData = async () => {
    try {
      const response = await fetch('./Employees.json');
      const jsonData = await response.json();
      setData(jsonData.data);
      setColumns(jsonData.columns);
      setTableProps(jsonData.props);
      setInitialStates(jsonData.initialStates);
    }catch(error){
      console.error(error);
    }
  }

  const table = useMaterialReactTable({
        columns,
        data,
        initialState: initialStates,
        renderColumnActionsMenuItems: ({ internalColumnMenuItems }) => {
          return internalColumnMenuItems.slice(0, 2);
        },
        ...tableProps
  });

  useEffect(() => {
    fetchData();
  },[])

  return (
    <div>
      <MaterialReactTable table={table} />;
    </div>
  )
}

export default App