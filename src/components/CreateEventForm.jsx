import { useState } from "react";
import Button from "./ui/Button";
import { fetchCoordinates } from "../services/adress";

const CreateEventForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        dateTime: "",
        address: "",
        homepage: "",
        logo: null,
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "address") {
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
        // The dateTime value is already in a proper format (e.g. "2025-02-10T14:30")
        // If needed, you can convert it to an ISO string:
        // const isoDateTime = new Date(formData.dateTime).toISOString();
        console.log(formData);
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-primary mb-4">Event Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="label font-semibold">
                        Title of your Event *
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div>
                    <label className="label font-semibold">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                </div>

                <div>
                    <label className="label font-semibold">Address *</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                    <p className="text-sm text-gray-500">
                        Your address details are not publicly visible.
                    </p>
                </div>

                <div>
                    <label className="label font-semibold">
                        Select Date &amp; Time
                    </label>
                    <input
                        type="datetime-local"
                        name="dateTime"
                        value={formData.dateTime}
                        onChange={handleChange}
                        className="input input-bordered input-primary w-full"
                        required
                    />
                </div>

                <Button type="submit" text={"Submit"} />
            </form>
        </div>
    );
};

export default CreateEventForm;
