import axios from "axios";
export const UploadImage = async (x: File) => {
    try {
        const formData = new FormData();
        formData.append("file", x);
        formData.append("upload_preset", "wardrobe");

        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/lpdzwlbc/image/upload",
            formData
        );
        return res.data.secure_url;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}