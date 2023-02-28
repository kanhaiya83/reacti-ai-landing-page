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
    return data
  };