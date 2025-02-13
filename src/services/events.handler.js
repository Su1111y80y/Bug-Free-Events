export const eventHandler = {
  /**
   * Extracts image URL from event description
   * @param {string} description - Event description text
   * @returns {string|null} Extracted image URL or null if not found
   */
  extractImageUrl: (description) => {
    if (typeof description !== "string") return null;
    if (!description) return null;
    const match = description.match(/\[imageUrl:(.*?)\]/);
    return match ? match[1] : null;
  },

  /**
   * Removes image URL markup from description
   * @param {string} description - Event description text
   * @returns {string} Clean description without image URL markup
   */
  extractDescription: (description) => {
    if (typeof description !== "string") return "";
    if (!description) return "";
    return description.replace(/\[imageUrl:.*?\]/, "").trim();
  },

  /**
   * Processes event data to separate image URL from description
   * @param {Object} event - Event data object
   * @returns {Object|null} Processed event data with separated imageUrl
   */
  processEventData: (event) => {
    if (!event || typeof event !== "object") return null;
    if (!event) return null;
    const imageUrl = eventHandler.extractImageUrl(event.description);
    const cleanDescription = eventHandler.extractDescription(event.description);

    return {
      ...event,
      description: cleanDescription,
      imageUrl: imageUrl,
    };
  },

  /**
   * Prepares event data for submission by combining description and image URL
   * @param {Object} eventData - Event data to prepare
   * @returns {Object} Prepared event data with embedded image URL
   */
  prepareEventForSubmission: (eventData) => {
    if (!eventData || typeof eventData !== "object") {
      throw new Error("Invalid event data provided");
    }

    const { imageUrl, ...eventDataWithoutImage } = eventData;

    return {
      ...eventDataWithoutImage,
      description: imageUrl
        ? `${eventData.description || ""}\n[imageUrl:${imageUrl}]`
        : eventData.description || "",
    };
  },
};
