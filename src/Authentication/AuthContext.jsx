import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("eventSphereUser")) || null;
    } catch {
      return null;
    }
  });

  function register(userData) {
    const users = JSON.parse(localStorage.getItem("eventSphereUsers") || "[]");

    const email = userData.email.trim().toLowerCase();

    if (users.some((user) => user.email === email)) {
      throw new Error("An account with this email already exists.");
    }

    const newUser = {
      id: Date.now(),
      name: userData.name.trim(),
      email,
      phone: userData.phone.trim(),
      password: userData.password,
    };

    localStorage.setItem(
      "eventSphereUsers",
      JSON.stringify([...users, newUser]),
    );

    const safeUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
    };

    localStorage.setItem("eventSphereUser", JSON.stringify(safeUser));
    setCurrentUser(safeUser);
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem("eventSphereUsers") || "[]");

    const user = users.find(
      (item) =>
        item.email === email.trim().toLowerCase() && item.password === password,
    );

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };

    localStorage.setItem("eventSphereUser", JSON.stringify(safeUser));
    setCurrentUser(safeUser);
  }

  function updateProfile(updatedData) {
    if (!currentUser) {
      throw new Error("Please log in first.");
    }

    const users = JSON.parse(localStorage.getItem("eventSphereUsers") || "[]");

    const email = updatedData.email.trim().toLowerCase();

    if (
      users.some((user) => user.email === email && user.id !== currentUser.id)
    ) {
      throw new Error("That email is already registered.");
    }

    const updatedUsers = users.map((user) =>
      user.id === currentUser.id
        ? {
            ...user,
            name: updatedData.name.trim(),
            email,
            phone: updatedData.phone.trim(),
          }
        : user,
    );

    const safeUser = {
      ...currentUser,
      name: updatedData.name.trim(),
      email,
      phone: updatedData.phone.trim(),
    };

    localStorage.setItem("eventSphereUsers", JSON.stringify(updatedUsers));
    localStorage.setItem("eventSphereUser", JSON.stringify(safeUser));
    setCurrentUser(safeUser);
  }

  function logout() {
    localStorage.removeItem("eventSphereUser");
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, register, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
