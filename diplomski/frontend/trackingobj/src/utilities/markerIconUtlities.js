import * as L from "leaflet";
import icon from '../images/icon.png';

      function createBlobUrl(encodedImage) {
        const byteCharacters = atob(encodedImage);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        const blobUrl = URL.createObjectURL(blob);
        return blobUrl;
    }
      function createIcon(url) {
        return new L.Icon({
            iconUrl: url,
            iconSize: [32, 32]
        });
    }
    export default function getMarkerIcon(encodedImage, useDefault) {
        if (useDefault) {
            return createIcon(icon);
        }
        const blUrl = createBlobUrl(encodedImage)
        return createIcon(blUrl);
    }