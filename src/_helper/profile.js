import placeholder from "../_rootAsset/img/placeholder.jpg";

const getProfileImage = async email => {
  const emailSplit = email.split("@");
  const activeDirectoryImageUrl = `https://apc.delve.office.com/mt/v3/people/profileimage?userId=${
    emailSplit[0]
  }%40sg.yokogawa.com&size=L`;
  const checkImageResult = await checkImage(activeDirectoryImageUrl);
  return checkImageResult.status === "error"
    ? placeholder
    : activeDirectoryImageUrl;
};

const checkIfLoggedInWindows = async () => {
  const activeDirectoryImageUrl =
    "https://apc.delve.office.com/mt/v3/people/profileimage?userId=xuanyi.chen%40sg.yokogawa.com&size=L";
  const checkImageResult = await checkImage(activeDirectoryImageUrl);
  return checkImageResult.status === "error" ? false : true;
};

const checkImage = path =>
  new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve({ path, status: "ok" });
    img.onerror = () => resolve({ path, status: "error" });

    img.src = path;
  });

export { getProfileImage, checkIfLoggedInWindows };
