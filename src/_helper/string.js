const formatPMSFileDisplayName = pmsOriginalFileName => {
  let pmsNoDisplayTemp = pmsOriginalFileName;
  const fileExtension = pmsNoDisplayTemp.substring(
    pmsNoDisplayTemp.lastIndexOf(".")
  );
  pmsNoDisplayTemp = pmsNoDisplayTemp.substring(
    0,
    pmsNoDisplayTemp.lastIndexOf(".")
  );
  const pmsNoDisplayTempSplit = pmsNoDisplayTemp.split("_");
  pmsNoDisplayTemp = `${pmsNoDisplayTempSplit[0]}-${
    pmsNoDisplayTempSplit[1]
  } Rev${pmsNoDisplayTempSplit[3]} (${fileExtension})`;

  return pmsNoDisplayTemp;
};

export { formatPMSFileDisplayName };
