// MapPreview.jsx
const MapPreview = ({ lat, lng, width = "100%", height = "100%" }) => {
    // Ensure lat and lng are treated as numbers
    const numericLat = Number(lat);
    const numericLng = Number(lng);

    // Calculate a simple bounding box using a small offset
    const offset = 0.005;
    const bbox = `${numericLng - offset},${numericLat - offset},${
        numericLng + offset
    },${numericLat + offset}`;
    const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${numericLat},${numericLng}`;

    return (
        <iframe
            title="Map preview"
            width={width}
            height={height}
            src={src}
        ></iframe>
    );
};

export default MapPreview;
