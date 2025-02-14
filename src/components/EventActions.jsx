import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaBookmark, FaRegBookmark, FaPen, FaTrash } from "react-icons/fa";
import { userEventActions } from "../services/userEventActions";
import { toast } from "react-toastify";
import { deleteEvent } from "../services/eventsApi";
import { tokenService } from "../services/token.service";

const EventActions = ({ event, isOwner }) => {
  const [note, setNote] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const {
          note: fetchedNote,
          isBookmarked: fetchedBookmark,
          error,
        } = await userEventActions.getEventInteractions(event.id);

        if (error) {
          console.log("Using default values");
          return;
        }

        setNote(fetchedNote);
        setIsBookmarked(fetchedBookmark);
      } catch (error) {
        console.error("Failed to fetch interactions:", error);
      }
    };

    fetchInteractions();
  }, [event.id]);

  const handleNoteChange = async (e) => {
    const newNote = e.target.value;
    setNote(newNote);

    const { error } = await userEventActions.saveNote(event.id, newNote);
    if (error) {
      toast.error("Failed to save note");
    }
  };

  const handleBookmarkToggle = async () => {
    const { isBookmarked: newBookmarkState, error } = await userEventActions.toggleBookmark(
      event.id
    );

    if (error) {
      toast.error("Failed to update bookmark");
      return;
    }

    setIsBookmarked(newBookmarkState);
    toast.success(newBookmarkState ? "Event bookmarked" : "Bookmark removed");
  };

  const handleEdit = () => {
    navigate(`/events/edit/${event.id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        const token = tokenService.getToken();
        await deleteEvent(event.id, token);
        toast.success("Event deleted successfully");
        navigate("/");
      } catch (error) {
        toast.error("Failed to delete event");
        console.error("Delete error:", error);
      }
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title">Your Notes</h2>
          <button onClick={handleBookmarkToggle} className="btn btn-ghost btn-circle">
            {isBookmarked ? (
              <FaBookmark className="h-5 w-5 text-primary" />
            ) : (
              <FaRegBookmark className="h-5 w-5" />
            )}
          </button>
        </div>

        <textarea
          value={note}
          onChange={handleNoteChange}
          className="textarea textarea-bordered w-full h-24"
          placeholder="Add your personal notes about this event..."
        />

        {isOwner && (
          <div className="flex gap-2 mt-4">
            <button onClick={handleEdit} className="btn btn-outline btn-primary flex-1">
              <FaPen className="h-4 w-4 mr-2" /> Edit Event
            </button>
            <button onClick={handleDelete} className="btn btn-outline btn-error flex-1">
              <FaTrash className="h-4 w-4 mr-2" /> Delete Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventActions;
