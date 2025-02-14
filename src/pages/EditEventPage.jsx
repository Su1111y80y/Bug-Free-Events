import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getEventById, updateEvent } from "../services/eventsApi";
import { tokenService } from "../services/token.service";
import { eventHandler } from "../services/events.handler";
import { toast } from "react-toastify";
import { fetchCoordinates } from "../services/address";
import CustomAddressAutocomplete from "../components/CustomAddressAutocomplete";
import MapPreview from "../components/MapPreview";
import Button from "../components/ui/Button";

const EditEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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

  // Add auth check
  useEffect(() => {
    const token = tokenService.getToken();
    if (!token) {
      toast.error("Please log in to edit events");
      navigate("/login");
      return;
    }
  }, [navigate]);

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        const processedEvent = eventHandler.processEventData(data);
        const eventDate = new Date(processedEvent.date);

        setFormData({
          title: processedEvent.title,
          description: processedEvent.description,
          date: eventDate.toISOString().slice(0, 16), // Format for datetime-local input
          location: processedEvent.location,
          latitude: processedEvent.latitude,
          longitude: processedEvent.longitude,
          imageUrl: processedEvent.imageUrl || "",
        });
      } catch (err) {
        toast.error("Failed to load event");
        navigate("/events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate]);

  const handleAddressSelect = async (selectedAddress) => {
    setFormData((prevData) => ({
      ...prevData,
      location: selectedAddress,
    }));

    try {
      const coordinates = await fetchCoordinates(selectedAddress);
      setFormData((prevData) => ({
        ...prevData,
        latitude: parseFloat(coordinates.lat),
        longitude: parseFloat(coordinates.lon),
      }));
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const handleChange = (e) => {
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

    const updateEventData = eventHandler.prepareEventForSubmission(eventData);
    const token = tokenService.getToken();

    try {
      await updateEvent(id, updateEventData, token);
      toast.success("Event updated successfully!");
      navigate(`/events/${id}`);
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-base-100 rounded-lg mt-4">
      <h2 className="text-2xl font-bold text-primary mb-4 text-center">Edit Event</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Field */}
        <div>
          <label className="label font-semibold flex justify-start gap-1">
            Title of your Event<span className="text-red-700">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered input-primary w-full"
            required
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Description Field */}
        <div>
          <label className="label font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered textarea-primary w-full"
          />
        </div>

        {/* Image URL Field */}
        <div>
          <label className="label font-semibold">Image</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="input input-bordered input-primary w-full"
          />
          {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
        </div>

        {/* Location Field with Map Preview */}
        <div className="flex gap-4 items-start">
          <div className="flex-1">
            <CustomAddressAutocomplete
              name="location"
              value={formData.location}
              onAddressSelect={handleAddressSelect}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
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

        {/* Date & Time Field */}
        <div className="pb-4">
          <label className="label font-semibold flex justify-start gap-1">
            Select Date & Time<span className="text-red-700">*</span>
          </label>
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input input-bordered input-primary w-full"
            required
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button
            type="submit"
            text={isSubmitting ? "Updating..." : "Update Event"}
            className="btn-primary flex-1"
            disabled={isSubmitting}
          />
          <Button
            type="button"
            text="Cancel"
            className="btn-outline flex-1"
            onClick={() => navigate(`/events/${id}`)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditEventPage;
