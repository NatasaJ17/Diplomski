    // Converts from degrees to radians.
    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    };

    // Converts from radians to degrees.
    function toDegrees(radians) {
        return radians * 180 / Math.PI;
    }

    export default function bearing(startLatp, startLngp, destLatp, destLngp) {
        var startLat = toRadians(startLatp);
        var startLng = toRadians(startLngp);
        var destLat = toRadians(destLatp);
        var destLng = toRadians(destLngp);

        var y = Math.sin(destLng - startLng) * Math.cos(destLat);
        var x = Math.cos(startLat) * Math.sin(destLat) -
            Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
        var brng = Math.atan2(y, x);
        brng = toDegrees(brng) - 90;
        return (brng + 360) % 360;
    }