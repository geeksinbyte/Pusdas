import { openDB } from "idb";

const DB_NAME = "localdb";
const DB_VERSION = 1;

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("user")) {
        db.createObjectStore("user", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("book")) {
        db.createObjectStore("book", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("category")) {
        db.createObjectStore("category", { keyPath: "ddc" });
      }
    },
  });
};

export async function cacheUser(users) {
  const db = await initDB();
  const tx = db.transaction("user", "readwrite");
  const store = tx.objectStore("user");
  await store.clear();
  for (const user of users) {
    await store.put(user);
  }
  await tx.done;
}

export async function getCachedUser() {
  const db = await initDB();
  return db.getAll("user");
}

export async function cacheBook(books) {
  const db = await initDB();
  const tx = db.transaction("book", "readwrite");
  const store = tx.objectStore("book");
  await store.clear();
  for (const book of books) {
    await store.put(book);
  }
  await tx.done;
}

export async function getCachedBook() {
  const db = await initDB();
  return db.getAll("book");
}

export async function cacheCategory(categories) {
  const db = await initDB();
  const tx = db.transaction("category", "readwrite");
  const store = tx.objectStore("category");
  await store.clear();
  for (const category of categories) {
    await store.put(category);
  }
  await tx.done;
}

export async function getCachedCategory() {
  const db = await initDB();
  return db.getAll("category");
}
