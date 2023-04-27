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
    {
      value:"Reward",
      fontWeight: "bold",
    }
  ];
  data.push(HEADER_ROW);

  jsonData.codes.forEach((code, i) => {
    data.push([
      {
        type: String,
        value: code,
      },
      {
        type: Boolean,
        value: false,
      },
      {
        type: String,
        value: `${jsonData.requestCount} requests`,
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
