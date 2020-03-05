import readXlsxFile from "read-excel-file";

const readExcelFile = async file => {
  const data = await readXlsxFile(file).then(rows => {
    return rows;
  });
  return data;
};

export { readExcelFile };
