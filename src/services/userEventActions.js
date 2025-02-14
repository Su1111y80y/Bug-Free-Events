const STORAGE_KEYS = {
  notes: "event_notes",
  bookmarks: "event_bookmarks",
};

export const userEventActions = {
  // Helper methods
  _getNotes() {
    const notes = localStorage.getItem(STORAGE_KEYS.notes);
    return notes ? JSON.parse(notes) : {};
  },

  _getBookmarks() {
    const bookmarks = localStorage.getItem(STORAGE_KEYS.bookmarks);
    return bookmarks ? JSON.parse(bookmarks) : [];
  },

  // Main methods
  saveNote: async (eventId, note) => {
    try {
      const notes = userEventActions._getNotes();
      notes[eventId] = note;
      localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(notes));
      return { note, error: null };
    } catch (error) {
      console.error("Save note error:", error);
      return { note: "", error: "Failed to save note" };
    }
  },

  toggleBookmark: async (eventId) => {
    try {
      const bookmarks = userEventActions._getBookmarks();
      const isCurrentlyBookmarked = bookmarks.includes(eventId);

      if (isCurrentlyBookmarked) {
        const newBookmarks = bookmarks.filter((id) => id !== eventId);
        localStorage.setItem(STORAGE_KEYS.bookmarks, JSON.stringify(newBookmarks));
        return { isBookmarked: false, error: null };
      } else {
        bookmarks.push(eventId);
        localStorage.setItem(STORAGE_KEYS.bookmarks, JSON.stringify(bookmarks));
        return { isBookmarked: true, error: null };
      }
    } catch (error) {
      console.error("Bookmark error:", error);
      return { isBookmarked: false, error: "Failed to update bookmark" };
    }
  },

  getEventInteractions: async (eventId) => {
    try {
      const notes = userEventActions._getNotes();
      const bookmarks = userEventActions._getBookmarks();

      return {
        note: notes[eventId] || "",
        isBookmarked: bookmarks.includes(eventId),
        error: null,
      };
    } catch (error) {
      console.error("Get interactions error:", error);
      return { note: "", isBookmarked: false, error: "Failed to get interactions" };
    }
  },
};
