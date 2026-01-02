function separateAndUpload(data) {
  // Group the array of objects by PSName
  const groupedData = data.reduce((acc, obj) => {
    const psName = obj.PSName || "Other"; // If PSName is missing, assign it to 'Other'
    acc[psName] = acc[psName] || [];
    acc[psName].push(obj);
    return acc;
  }, {});

  // Upload each group (PS data) to the backend
  Object.entries(groupedData).forEach(([psName, psData]) => {
    psData.forEach((item, index) => {
      // Upload item to the backend here
    });
  });
}

export default separateAndUpload;
