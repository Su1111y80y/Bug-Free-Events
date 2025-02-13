export const addEvent = async (token, eventData) => {
    try {
        const eventsPath = "http://localhost:3001/api/events";
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
        console.log("Event created successfully:", data);
        return data;
    } catch (e) {
        console.log(`${e}, Error adding an Event`);
    }
};
