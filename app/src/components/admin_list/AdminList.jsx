import "./AdminList.scss";
import EditIcon from '../../assets/icons/edit_icon.svg'

function AdminList({columns, rows, onClickRow}) {

  return (
    <table className="admin-list">
      <tr className="header">
        {columns.map((column) => <td>{column.title}</td>)}
        <td>Editar</td>
      </tr>   
      {rows.map((row) => (
        <tr className="row">
        {columns.map((column) => <td>{row[column.rowKey]}</td>)}
        <td><img src={EditIcon} alt="" onClick={() => onClickRow(row)}/></td>
        </tr>
      ))}   
    </table>
  );
}

export default AdminList;
