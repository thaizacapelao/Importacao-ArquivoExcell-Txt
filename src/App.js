import { useState } from "react";
import * as XLSX from "xlsx";

function App() {
  // onChange estados:

  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // submit estado:

  const [excelData, setxcelData] = useState(null);

  // onChange evento:
  const handlefile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError("Por favor selecione apenas arquivos de excel ou txt");
        setExcelFile(null);
      }
    } else {
      console.log("Por favor Selecione seu arquivo");
    }
  };

  // submit evento

  return (
    <div className="wrapper">
      <h3>Carregar e visualizar planilhas do Excel</h3>

      {/* Form */}
      <form className="form-group custom-form">
        <input
          type="file"
          className="form-control"
          requeried
          onChange={handlefile}
        />
        <button type="submit" className="btn btn-sucess btn-md">CARREGAR</button>
        {typeError&&(
          <div className="alert alert-danger" role="alert">{typeError}</div>
        )}
      </form>

      {/* View data */}
      <div className="viewer">
        {excelData ? (
          <div>Mostrar arquivo de dados</div>
        ) : (
          <div>Nenhum arquivo foi carregado.</div>
        )}
      </div>
    </div>
  );
}

export default App;
