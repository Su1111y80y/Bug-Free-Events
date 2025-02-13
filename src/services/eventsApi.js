import { API_BASE_URL } from "./config";

const eventsPath = `${API_BASE_URL}/events`;

export const addEvent = async (token, eventData) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(eventData),
        };

        const response = await fetch(`${eventsPath}`, options);

        if (!response.ok) {
            throw new Error("Failed to create event");
        }
        const data = await response.json();
        // console.log("Event created successfully:", data);
        return data;
    } catch (e) {
        console.log(`${e}, Error adding an Event`);
    }
};

export const getAllEvents = async () => {
    try {
        const options = {
            method: "GET",
        };

        const response = await fetch(`${eventsPath}`, options);

        if (!response.ok) {
            throw new Error("Failed to fetch all events");
        }
        const data = await response.json();
        // console.log("Getting events successfully:", data);
        return data;
    } catch (e) {
        console.log(`${e}, Error fetching all events`);
    }
};

export const getUpcomingEvents = async () => {
    try {
        const eventsUpcoming = `${eventsPath}/upcoming`;

        const options = {
            method: "GET",
        };

        const response = await fetch(`${eventsUpcoming}`, options);

        if (!response.ok) {
            throw new Error("Failed fetching upcoming events");
        }
        const data = await response.json();
        // console.log("Getting upcoming events successfully:", data);
        return data;
    } catch (e) {
        console.log(`${e}, Error fetching all upcoming events`);
    }
};

export const deleteEvent = async (token, id) => {
    try {
        const eventsDeletePath = `${eventsPath}/${id}`;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(`${eventsDeletePath}`, options);

        if (!response.ok) {
            throw new Error("Failed to delete an event");
        }
        const data = await response.json();
        // console.log("Deleting an event successfully:", data);
        return data;
    } catch (e) {
        console.log(`${e}, Error deleting an event`);
    }
};

export const editEvent = async (token, id, eventData) => {
    try {
        const eventsUpdatePath = `${eventsPath}/${id}`;
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(eventData),
        };

        const response = await fetch(`${eventsUpdatePath}`, options);

        if (!response.ok) {
            throw new Error("Failed to update an event");
        }
        const data = await response.json();
        // console.log("Updating an event successfully:", data);
        return data;
    } catch (e) {
        console.log(`${e}, Error updating an event`);
    }
};

export const getEventById = async (id) => {
    try {
        const eventsByIdPath = `${eventsPath}/${id}`;
        const options = {
            method: "GET",
        };
        const response = await fetch(`${eventsByIdPath}`, options);

        if (!response.ok) {
            throw new Error("Failed to get an event by id");
        }
        const data = await response.json();
        // console.log("Getting an event by id successfully:", data);
        return data;
    } catch (e) {
        console.log(`${e}, Error getting an event by id`);
    }
};
