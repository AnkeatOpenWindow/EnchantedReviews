import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore"; 
import { storage, db } from "../../firebase"; // Adjust the import path if necessary

export const handleUpLoadOfImage = async (userId, uri, fileName) => {
    try {
        console.log("Uploading...");
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        // Refers to where the image should be stored and what it should be called
        const imageRef = ref(storage, fileName);
        await uploadBytes(imageRef, blob);

        // Get the download URL of the image
        const imageUrl = await getDownloadURL(imageRef);
        console.log("Image URL: ", imageUrl);

        // Save the image URL to Firestore under the user's document
        const userDoc = doc(db, "users", userId);
        await updateDoc(userDoc, {
            imageUrl: imageUrl
        });

        console.log("User image URL saved to Firestore!");

    } catch (error) {
        console.error("Error uploading image or saving to Firestore: ", error);
    }
};
