import * as XLSX from "sheetjs-style";
import { saveAs } from "file-saver";

const monthNames = {
  "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun",
  "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"
};

const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");
  return `${parseInt(day)} ${monthNames[month]} ${year}`;
};

export const downloadExcel = (data) => {
  if (!Array.isArray(data) || data.length === 0) return;

  const exportData = data.map(entry => ({
    "Kava Winner": entry.winner,
    "Position": entry.position,
    "Team Name": entry.team,
    "Date": formatDate(entry.date)
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);

  const headers = Object.keys(exportData[0]);

  // Apply styles to headers
  headers.forEach((header, index) => {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c: index });
    worksheet[cellRef].s = {
      font: { bold: true },
      alignment: { horizontal: "center", vertical: "center" },
      fill: { fgColor: { rgb: "D9E1F2" } }, // Light blue header
      border: {
        top: { style: "thin", color: { auto: 1 } },
        bottom: { style: "thin", color: { auto: 1 } },
        left: { style: "thin", color: { auto: 1 } },
        right: { style: "thin", color: { auto: 1 } }
      }
    };
  });

  // Apply styles to all data rows
  for (let r = 1; r < exportData.length + 1; r++) {
    for (let c = 0; c < headers.length; c++) {
      const cellRef = XLSX.utils.encode_cell({ r, c });
      if (worksheet[cellRef]) {
        worksheet[cellRef].s = {
          alignment: { horizontal: "center", vertical: "center" },
          border: {
            top: { style: "thin", color: { auto: 1 } },
            bottom: { style: "thin", color: { auto: 1 } },
            left: { style: "thin", color: { auto: 1 } },
            right: { style: "thin", color: { auto: 1 } }
          }
        };
      }
    }
  }

  // Auto column width
  worksheet["!cols"] = headers.map(key => ({
    wch: Math.max(
      key.length,
      ...exportData.map(row => (row[key] ? row[key].toString().length : 10))
    ) + 4
  }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "WCC_Awards");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true
  });

  const blob = new Blob([excelBuffer], {
    type: "application/octet-stream"
  });

  const year = new Date().getFullYear();
  saveAs(blob, `WCC_${year}.xlsx`);
};
