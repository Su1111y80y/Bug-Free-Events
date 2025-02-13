import { useState } from "react";
import Button from "./ui/Button";
import { fetchCoordinates } from "../services/address";
import CustomAddressAutocomplete from "./CustomAddressAutocomplete";
import MapPreview from "./MapPreview";
import { toast } from "react-toastify";
import { addEvent } from "../services/eventsApi";
import { eventHandler } from "../services/events.handler";
import { tokenService } from "../services/token.service";

const CreateEventForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        latitude: null,
        longitude: null,
        imageUrl: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errorsObj = {};
        if (!formData.title.trim()) {
            errorsObj.title = "Title is required";
        }
        if (!formData.date) {
            errorsObj.date = "Date & Time is required";
        } else if (new Date(formData.date) <= new Date()) {
            errorsObj.date = "Date & Time must be in the future";
        }
        if (!formData.location.trim()) {
            errorsObj.location = "Location is required";
        }
        // If imageUrl is provided, validate its format
        if (formData.imageUrl.trim()) {
            try {
                new URL(formData.imageUrl);
            } catch {
                errorsObj.imageUrl = "Please enter a valid URL";
            }
        }
        return errorsObj;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        const eventData = {
            ...formData,
            date: new Date(formData.date).toISOString(),
        };

        const updateEventData =
            eventHandler.prepareEventForSubmission(eventData);

        const token = tokenService.getToken();

        try {
            await addEvent(token, updateEventData);
            toast.success("Event added successfully!");

            setFormData({
                title: "",
                description: "",
                date: "",
                location: "",
                latitude: null,
                longitude: null,
                imageUrl: "",
            });
        } catch (error) {
            console.error("Error adding event:", error);
            toast.error("Failed to add event. Please try again.");
        } finally {
            setIsSubmitting(false);
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
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.title}
                        </p>
                    )}
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
                    <label className="label font-semibold flex justify-start gap-1">
                        Image
                    </label>
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="Enter image url..."
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="input input-bordered input-primary w-full"
                    />
                    {errors.imageUrl && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.imageUrl}
                        </p>
                    )}
                </div>

                <div className="flex gap-4 items-start">
                    <div className="flex-1">
                        <CustomAddressAutocomplete
                            name="location"
                            value={formData.location}
                            onAddressSelect={handleAddressSelect}
                        />
                        {errors.location && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.location}
                            </p>
                        )}
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
                    {errors.date && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.date}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    text={isSubmitting ? "Submitting..." : "Add Event"}
                    className="btn-primary w-full"
                    disabled={isSubmitting}
                />
            </form>
        </div>
    );
};

export default CreateEventForm;
