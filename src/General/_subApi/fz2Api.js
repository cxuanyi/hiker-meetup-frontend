import useORMSAxios from "../../_axios/ormsAxios";

const useFz2Api = () => {
  const {
    ormsAxiosPostRequest,
    ormsAxiosGetRequest
    // ormsAxiosPutRequest,
    // ormsAxiosDeleteRequest,
    // ormsAxiosGetFileRequest
  } = useORMSAxios();

  /* #region ######################## Fetch all Fz2Pms types  ######################## */
  const fetchAllEvents = async () => {
    const allEvents = await ormsAxiosGetRequest("/events");
    return allEvents;
  };
  /* #endregion */

  /* #region ######################## Create Full Fz2 (includes pms, fz2pms, pmsfile)  ######################## */
  const createFz2Pms = async ({ fz2, files, pmsFileList }) => {
    try {
      // Create Fz2 & Upload File.
      const formData = new FormData();

      Object.keys(fz2).forEach(key => {
        if (Array.isArray(fz2[key]) && fz2[key].length > 0)
          formData.append(key, JSON.stringify(fz2[key]));

        if (fz2[key] && typeof fz2[key] === "string")
          formData.append(key, fz2[key]);
      });

      if (pmsFileList) formData.append("files", files);

      formData.append("pmsFiles", JSON.stringify(pmsFileList));

      const responseData = await ormsAxiosPostRequest("/fz2/one", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      // backend return failure to create
      if (responseData.error) {
        throw new Error();
      }

      return responseData;
    } catch (error) {
      return { error: 1 };
    }
  };
  /* #endregion */

  return {
    fetchAllEvents,
    createFz2Pms
  };
};

export default useFz2Api;
