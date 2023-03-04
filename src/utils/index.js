import writeXlsxFile from "write-excel-file";

export const convertToExcelFormat = (jsonData) => {
  const data = [];
  const HEADER_ROW = [
    {
      value: "Code",
      fontWeight: "bold",
    },
    {
      value: "Is Used",
      fontWeight: "bold",
    },
  ];
  data.push(HEADER_ROW);

  jsonData.forEach((codeData, i) => {
    data.push([
      {
        type: String,
        value: codeData.code,
      },
      {
        type: Boolean,
        value: false,
      },
    ]);
  });
  return data;
};

export const downloadExcel = async (codes,name) => {
  await writeXlsxFile(convertToExcelFormat(codes), {
    fileName: name + ".xlsx",
  });
};
