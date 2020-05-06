const formatEventFileDisplayName = eventOriginalFileName => {
  let eventNoDisplayTemp = eventOriginalFileName;
  const fileExtension = eventNoDisplayTemp.substring(
    eventNoDisplayTemp.lastIndexOf(".")
  );
  eventNoDisplayTemp = eventNoDisplayTemp.substring(
    0,
    eventNoDisplayTemp.lastIndexOf(".")
  );
  const eventNoDisplayTempSplit = eventNoDisplayTemp.split("_");
  eventNoDisplayTemp = `${eventNoDisplayTempSplit[0]}-${eventNoDisplayTempSplit[1]} Rev${eventNoDisplayTempSplit[3]} (${fileExtension})`;

  return eventNoDisplayTemp;
};

export { formatEventFileDisplayName };
