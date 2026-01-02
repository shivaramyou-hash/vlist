const extractData = (text) => {
  const data = {};

  // Extracting Electoral Roll Year
  const yearMatch = text.match(/ELECTORAL ROLL (\d{4})/);
  if (yearMatch) {
    data["Electoral Roll Year"] = yearMatch[1];
  }

  // Extracting Assembly Constituency Details
  const constituencyMatch = text.match(
    /No\. Name and Reservation Status of Assembly Constituency: (\d+) - (.+)/
  );
  if (constituencyMatch) {
    data["Assembly Constituency Number"] = constituencyMatch[1];
    data["Assembly Constituency Name"] = constituencyMatch[2];
  }

  // Extracting Parliamentary Constituency Details
  const parliamentaryMatch = text.match(
    /No\. Name and Reservation Status of Parliamentary Constituency\(ies\) in which the Assembly Constituency is located: (\d+)-(.+)/
  );
  if (parliamentaryMatch) {
    data["Parliamentary Constituency Number"] = parliamentaryMatch[1];
    data["Parliamentary Constituency Name"] = parliamentaryMatch[2];
  }

  // Extracting Revision Details
  const revisionMatch = text.match(
    /Year of Revision\n(\d+)\nQualifying Date\nType of revision\nDate of Publication\n(\d{2}-\d{2}-\d{4})\nSpecial Summary Revision\n(\d{4})\nRoll Identification\nBasic Roll of Special Summary Revision (\d{4}) and Supplement-1 of Additions,\nDeletions and Corrections Under Special Summary Revision (\d{4})\n(\d{2}-\d{2}-\d{4})/
  );
  if (revisionMatch) {
    data["Revision Year"] = revisionMatch[1];
    data["Qualifying Date"] = revisionMatch[2];
    data["Type of Revision"] = revisionMatch[3];
    data["Date of Publication"] = revisionMatch[7];
  }

  // Extracting Polling Station Details
  const pollingStationMatch = text.match(
    /No\. and Name of Polling Station:\n(\d+) - (.+)\nAddress of Polling Station:\n(.+)\n/
  );
  if (pollingStationMatch) {
    data["Polling Station Number"] = pollingStationMatch[1];
    data["Polling Station Name"] = pollingStationMatch[2];
    data["Polling Station Address"] = pollingStationMatch[3];
  }

  // Extracting Number of Electors
  const electorsMatch = text.match(
    /Net Electors\nSerial No\.\nSerial No\.\nMale\nFemale\nThird Gender\nTotal\n1\n(\d+)\n(\d+)\n(\d+)\n(\d+)\n(\d+)/
  );
  if (electorsMatch) {
    data["Number of Male Electors"] = electorsMatch[1];
    data["Number of Female Electors"] = electorsMatch[2];
    data["Number of Third Gender Electors"] = electorsMatch[3];
    data["Total Number of Electors"] = electorsMatch[4];
  }

  // Add more regex patterns to extract other details as needed

  return data;
};

export default extractData;
