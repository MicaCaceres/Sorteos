"use client";
import DuckRace from "./DuckRace";
import "../../css/duck-race.css";
import "../../css/globals.css";

export default function Page() {
  return (
    <main className="home-container">
      <div className="content-wrapper">
        <h1 className="page-title">Carrera de Patos</h1>
        <DuckRace />
      </div>
    </main>
  );
}
