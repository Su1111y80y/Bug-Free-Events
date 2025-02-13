import { useState } from "react";
import Button from "./ui/Button";
import { fetchCoordinates } from "../services/address";
import { addEvent } from "../services/eventHandler";
import CustomAddressAutocomplete from "./CustomAddressAutocomplete";
import MapPreview from "./MapPreview";
import { toast } from "react-toastify";

const CreateEventForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        latitude: null,
        longitude: null,
    });

    const handleAddressSelect = async (selectedAddress) => {
        setFormData((prevData) => ({
            ...prevData,
            location: selectedAddress,
        }));

        try {
            const coordinates = await fetchCoordinates(selectedAddress);
            const lat = parseFloat(coordinates.lat);
            const lng = parseFloat(coordinates.lon);

            console.log(lat, lng);
            setFormData((prevData) => ({
                ...prevData,
                latitude: lat,
                longitude: lng,
            }));
        } catch (error) {
            console.error("Error fetching coordinates:", error);
        }
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const eventData = {
            ...formData,
            date: new Date(formData.date).toISOString(),
        };

        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM5MjA4ODk0LCJleHAiOjE3NDI4MDg4OTR9._vNJfzOMEWGlj7-n5vFBHzj_xA-ZjuJKTu2wde0MF0A";
        try {
            await addEvent(token, eventData);
            toast.success("Event added successfully!");

            setFormData({
                title: "",
                description: "",
                date: "",
                location: "",
                latitude: null,
                longitude: null,
            });
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    return (
        <div className="max-w-lg w-full p-8 bg-base-100 rounded-lg mt-4">
            <h2 className="text-2xl font-bold text-primary mb-4 text-center">
                Event Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="label font-semibold flex justify-start gap-1">
                        Title of your Event
                        <span className="text-red-700">*</span>
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter title..."
                        value={formData.title}
                        onChange={handleChange}
                        className="input input-bordered input-primary w-full"
                        required
                    />
                </div>

                <div>
                    <label className="label font-semibold">Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter description..."
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea textarea-bordered textarea-primary w-full"
                    ></textarea>
                </div>

                <div className="flex gap-4 items-start">
                    <div className="flex-1">
                        <CustomAddressAutocomplete
                            name="location"
                            value={formData.location}
                            onAddressSelect={handleAddressSelect}
                        />
                    </div>
                    {formData.latitude && formData.longitude && (
                        <div className="w-40 h-40 border rounded border-[var(--fallback-bc,oklch(var(--bc)/0.2))]">
                            <MapPreview
                                lat={formData.latitude}
                                lng={formData.longitude}
                                width="100%"
                                height="100%"
                            />
                        </div>
                    )}
                </div>

                <div className="pb-4">
                    <label className="label font-semibold flex justify-start gap-1">
                        Select Date &amp; Time
                        <span className="text-red-700">*</span>
                    </label>
                    <input
                        type="datetime-local"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="input input-bordered input-primary w-full"
                        required
                    />
                </div>

                <Button
                    type="submit"
                    text="Add Event"
                    className="btn-primary w-full"
                />
            </form>
        </div>
    );
};

export default CreateEventForm;
