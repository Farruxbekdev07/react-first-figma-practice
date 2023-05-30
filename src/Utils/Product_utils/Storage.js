import { ref, getStorage, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

function imgUploader(file) {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file[0].name}`);

    uploadBytes(storageRef, file[0]).then((snapshot) => {
        console.log("Uploaded a blob or file!");
    });
}

function downloader() {
    const storage = getStorage();
    const imageListRef = ref(storage, 'images/');
    return listAll(imageListRef).then((response) => {
        return response.items.forEach((item) => {
            return getDownloadURL(item)
            .then((url) => {
                console.log(url, 'img url');
                console.log(item, 'item');
                return {imgUrl: url};
            })
            .catch((error) => {
                console.error(error);
            })
        })
    })
}
export { imgUploader, downloader };