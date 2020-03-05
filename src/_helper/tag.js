// @material-ui/core components;
import useFz2Api from "../ORFManagement/_subApi/fz2Api";

const useTagHelper = () => {
  const { fetchOneFile } = useFz2Api();

  const tagOnClickFetchFile = (e, file) => {
    let fireOnClick = async () => {
      const data = await fetchOneFile(file);
      const downloadUrl = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", file.name); //any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    };
    fireOnClick();
  };

  const tagOnClickObjectUrl = (e, file) => {
    let fireOnClick = async () => {
      const data = URL.createObjectURL(file);
      let link = document.createElement("a");
      link.href = data;
      link.download = file.name;
      link.click();
      setTimeout(function() {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
      }, 100);
    };
    fireOnClick();
  };

  return {
    tagOnClickFetchFile,
    tagOnClickObjectUrl
  };
};

export { useTagHelper };
