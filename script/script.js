const nav = document.querySelector("nav");
const menuTogle = document.querySelector(".menu-togle");

menuTogle.addEventListener("click", () => {
  nav.classList.toggle("active");
  menuTogle.classList.toggle("active");
});

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

const form = document.getElementById("form");
const input = document.getElementById("input");
const list = document.getElementById("list");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

let editId = null;

function saveToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  list.innerHTML = "";

  notes.forEach((note) => {
    const card = document.createElement("div");

    card.classList.add("card");

    card.innerHTML = `
      <p>${note.text}</p>

      <div class="actions">

        <button class="edit-btn" data-id="${note.id}">
          Edit
        </button>

        <button class="delete-btn" data-id="${note.id}">
          Delete
        </button>

      </div>
    `;

    list.appendChild(card);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = input.value.trim();

  if (!value) return;

  // CREATE
  if (editId === null) {
    const newNote = {
      id: Date.now(),
      text: value,
    };

    notes.push(newNote);
  }

  // UPDATE
  else {
    notes = notes.map((note) => {
      if (note.id === editId) {
        return {
          ...note,
          text: value,
        };
      }

      return note;
    });

    editId = null;
  }

  saveToLocalStorage();

  renderNotes();

  form.reset();
});

// EVENT DELEGATION
list.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);

  // DELETE
  if (e.target.classList.contains("delete-btn")) {
    notes = notes.filter((note) => note.id !== id);

    saveToLocalStorage();

    renderNotes();
  }

  // EDIT
  if (e.target.classList.contains("edit-btn")) {
    const selectedNote = notes.find((note) => note.id === id);

    input.value = selectedNote.text;

    editId = id;
  }
});

renderNotes();
