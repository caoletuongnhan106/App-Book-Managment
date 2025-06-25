import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from '@mui/material';

interface Column {
  id: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface CustomTableProps {
  columns: Column[];
  data: any[];
  page?: number;
  rowsPerPage?: number;
}

const CustomTable: React.FC<CustomTableProps> = ({ columns, data, page = 0, rowsPerPage = 5 }) => {
  const startIndex = page * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {column.render ? column.render(row[column.id], row) : row[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;