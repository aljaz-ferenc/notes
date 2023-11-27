import { useEffect, useState } from "react";
import "./Search.scss";
import { isSameDay } from "../../functions/utils";
import Button from "../ui/Button";

export default function Search({ setDisplayedNotes, notes, userId }) {
  const [searchBy, setSearchBy] = useState("title");
  const [query, setQuery] = useState("");
  const [date, setDate] = useState();

  useEffect(() => {
    handleSearch(notes, query, searchBy, date);
  }, [query, searchBy, date, userId, notes]);

  function handleSearch(notes, query, searchBy, date) {
    let newNotes = [...notes]; 
  
    if (searchBy === "title" && query) {
      newNotes = newNotes.filter((note) =>
        note.title.toLowerCase().includes(query)
      );
    }
    
    if (searchBy === "tags" && query) {
      newNotes = newNotes.filter((note) =>
      note.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    
    if (date) {
      newNotes = newNotes.filter((note) => isSameDay(note.createdAt, date));
    }
    
    setDisplayedNotes(newNotes);
    return newNotes;
  }

  function handleDateChange(e) {
    const date = e.target.value;
    date ? setDate(date) : setDate(null);
  }

  function handleClearInputs() {
    setQuery("");
    setDate("");
    setSearchBy("title");
  }

  function handleSearchByChange(e) {
    setSearchBy(e.target.value);
    setQuery("");
  }

  return (
    <div className="search">
      <p>Search by</p>
      <select
        onChange={handleSearchByChange}
        name="search"
        id="search"
        value={searchBy}
      >
        <option value="title">Title</option>
        <option value="tags">Tags</option>
      </select>
      <input
        placeholder="Search notes..."
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
      />
      <input type="date" value={date} onChange={handleDateChange} />
      <Button onClick={handleClearInputs}>
        <p>Clear All</p>
      </Button>
    </div>
  );
}
