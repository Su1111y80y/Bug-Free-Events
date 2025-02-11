import { useState } from "react";
import Button from "./ui/Button";
import { fetchCoordinates } from "../services/address";
import { addEvent } from "../services/network";
import CustomAddressAutocomplete from "./CustomAddressAutocomplete";

const CreateEventForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
    });

    const handleAddressSelect = (selectedAddress) => {
        setFormData((prevData) => ({
            ...prevData,
            location: selectedAddress,
        }));
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "location") {
            const coordinates = await fetchCoordinates(value);
            setFormData((prevData) => ({
                ...prevData,
                latitude: coordinates.lat,
                longitude: coordinates.lon,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        // Convert the datetime-local string to a complete ISO string
        const eventData = {
            ...formData,
            date: new Date(formData.date).toISOString(),
        };

        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM5MjA4ODk0LCJleHAiOjE3NDI4MDg4OTR9._vNJfzOMEWGlj7-n5vFBHzj_xA-ZjuJKTu2wde0MF0A";
        addEvent(token, eventData);

        setFormData({
            title: "",
            description: "",
            date: "",
            location: "",
        });
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

                <div>
                    <CustomAddressAutocomplete
                        name="location"
                        value={formData.location}
                        onAddressSelect={handleAddressSelect}
                    />
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
