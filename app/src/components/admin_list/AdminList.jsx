import "./AdminList.scss";
import EditIcon from '../../assets/icons/edit_icon.svg'

function AdminList({columns, rows, onClickRow}) {

  return (
    <table className="admin-list">
      <thead>
        <tr className="header">
          {columns.map((column) => (
            <td key={column.title}>{column.title}</td>
          ))}
          <td>Editar</td>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} className="row">
            {columns.map((column, i) => (
              <td key={`${index} - ${i}`}>{row[column.rowKey]}</td>
            ))}
            <td>
              <img src={EditIcon} alt="" onClick={() => onClickRow(row)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AdminList;
