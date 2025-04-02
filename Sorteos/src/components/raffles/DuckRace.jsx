"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./utils/button";
import { X, FileText, List, Trash2 } from "lucide-react";
import Duck from "./Duck";
import { Textarea } from "./utils/textarea";

export default function DuckRace() {
  const [participants, setParticipants] = useState([]);
  const [isRacing, setIsRacing] = useState(false);
  const [winner, setWinner] = useState(null);
  const [positions, setPositions] = useState([]);
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const fileInputRef = useRef(null);
  const [participantsList, setParticipantsList] = useState("");
  const [activeTab, setActiveTab] = useState("list");
  const MAX_PARTICIPANTS = 12;

  const loadParticipantsList = () => {
    if (!participantsList.trim()) return;

    const newParticipants = participantsList
      .split(/\n+/)
      .map((name) => name.trim())
      .filter((name) => name && !participants.includes(name));

    if (participants.length + newParticipants.length > MAX_PARTICIPANTS) {
      // Only take what we can fit
      const availableSlots = MAX_PARTICIPANTS - participants.length;
      const limitedParticipants = newParticipants.slice(0, availableSlots);

      if (limitedParticipants.length > 0) {
        setParticipants([...participants, ...limitedParticipants]);
        setParticipantsList("");
      }

      if (availableSlots < newParticipants.length) {
        alert(
          `Solo se añadieron ${availableSlots} participantes para no exceder el límite de ${MAX_PARTICIPANTS}.`
        );
      }
    } else if (newParticipants.length > 0) {
      setParticipants([...participants, ...newParticipants]);
      setParticipantsList("");
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const contenido = e.target.result;
      const lista = contenido
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line !== "" && !participants.includes(line));

      if (participants.length + lista.length > MAX_PARTICIPANTS) {
        const availableSlots = MAX_PARTICIPANTS - participants.length;
        const limitedLista = lista.slice(0, availableSlots);

        if (limitedLista.length > 0) {
          setParticipants([...participants, ...limitedLista]);
        }

        if (availableSlots < lista.length) {
          alert(
            `Solo se añadieron ${availableSlots} participantes para no exceder el límite de ${MAX_PARTICIPANTS}.`
          );
        }
      } else if (lista.length > 0) {
        setParticipants([...participants, ...lista]);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  const removeParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
    setPositions(positions.filter((_, i) => i !== index));
  };

  const clearAllParticipants = () => {
    setParticipants([]);
    setWinner(null);
  };

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.clientWidth - 100);
    }
    setPositions(Array(participants.length).fill(0));

    const handleResize = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.clientWidth - 100);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [participants.length]);

  const startRace = () => {
    if (isRacing) return;

    setWinner(null);
    setIsRacing(true);
    setPositions(Array(participants.length).fill(0));

    const speeds = participants.map(() => 2 + Math.random() * 3);
    const raceInterval = setInterval(() => {
      setPositions((prev) => {
        const newPositions = [...prev];
        let hasWinner = false;

        for (let i = 0; i < newPositions.length; i++) {
          newPositions[i] += speeds[i];
          if (newPositions[i] >= trackWidth && !hasWinner) {
            hasWinner = true;
            setWinner(participants[i]);
            setIsRacing(false);
            clearInterval(raceInterval);
          }
        }

        return newPositions;
      });
    }, 50);
  };

  const resetRace = () => {
    setPositions(Array(participants.length).fill(0));
    setWinner(null);
  };

  return (
    <div className="duck-race-container">
      <div className="duck-race-content">
        <div className="tabs-container">
          <div className="tabs-header">
            <button
              className={`tab-button ${activeTab === "list" ? "active" : ""}`}
              onClick={() => setActiveTab("list")}
            >
              <List size={16} />
              Cargar Listado
            </button>
            <button
              className={`tab-button ${activeTab === "csv" ? "active" : ""}`}
              onClick={() => setActiveTab("csv")}
            >
              <FileText size={16} />
              Cargar CSV
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "list" && (
              <div className="list-input">
                <Textarea
                  value={participantsList}
                  onChange={(e) => setParticipantsList(e.target.value)}
                  placeholder="Ingresa los nombres de los participantes, uno por línea"
                  className="participants-textarea"
                  disabled={isRacing || participants.length >= MAX_PARTICIPANTS}
                />
                {participants.length >= MAX_PARTICIPANTS && (
                  <p className="limit-warning">
                    Has alcanzado el límite máximo de {MAX_PARTICIPANTS}{" "}
                    participantes.
                  </p>
                )}
                <Button
                  onClick={loadParticipantsList}
                  className="button-full-width"
                  disabled={
                    !participantsList.trim() ||
                    isRacing ||
                    participants.length >= MAX_PARTICIPANTS
                  }
                >
                  Cargar Participantes
                </Button>
              </div>
            )}

            {activeTab === "csv" && (
              <div className="file-upload-container">
                <FileText size={40} className="file-icon" />
                <p className="file-instructions">
                  Selecciona un archivo CSV o TXT con un nombre por línea
                </p>
                {participants.length >= MAX_PARTICIPANTS && (
                  <p className="limit-warning">
                    Has alcanzado el límite máximo de {MAX_PARTICIPANTS}{" "}
                    participantes.
                  </p>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="hidden-input"
                  disabled={isRacing || participants.length >= MAX_PARTICIPANTS}
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isRacing || participants.length >= MAX_PARTICIPANTS}
                >
                  Seleccionar Archivo
                </Button>
              </div>
            )}
          </div>

          {participants.length > 0 && (
            <div className="participants-section">
              <div className="participants-header">
                <h3 className="participants-title">
                  Participantes ({participants.length}/{MAX_PARTICIPANTS})
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="button-red button-with-icon"
                  onClick={clearAllParticipants}
                  disabled={isRacing}
                >
                  <Trash2 size={14} />
                  Limpiar Todo
                </Button>
              </div>
              <div className="participants-grid">
                {participants.map((name, index) => (
                  <div key={index} className="participant-item">
                    <span className="participant-name">{name}</span>
                    <button
                      onClick={() => removeParticipant(index)}
                      className="remove-button"
                      disabled={isRacing}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="race-controls">
          <Button
            onClick={startRace}
            disabled={isRacing || participants.length < 2}
            className="button-green button-full-width button-large-padding"
          >
            {isRacing ? "Corriendo..." : "¡Iniciar Carrera!"}
          </Button>
        </div>

        {winner && (
          <div className="winner-announcement">
            <span className="winner-text">
              ¡{winner} ha ganado la carrera! 🏆
            </span>
          </div>
        )}

        <div ref={trackRef} className="race-track">
          {/* Finish line */}
          <div className="finish-line">
            <div className="finish-text">META</div>
          </div>

          {participants.length === 0 && (
            <div className="empty-state">
              <p className="empty-text">Agrega participantes para comenzar</p>
            </div>
          )}

          {/* Race tracks */}
          {participants.map((name, index) => {
            const trackHeight = 400 / participants.length;
            return (
              <div
                key={index}
                className={`duck-lane ${index % 2 === 0 ? "even" : "odd"}`}
                style={{
                  top: `${index * trackHeight}px`,
                  height: `${trackHeight}px`,
                }}
              >
                <Duck
                  name={name}
                  position={positions[index]}
                  laneHeight={trackHeight}
                />
              </div>
            );
          })}
        </div>

        <div className="reset-container">
          <Button
            onClick={resetRace}
            variant="outline"
            disabled={isRacing || !winner}
          >
            Reiniciar
          </Button>
        </div>
      </div>
    </div>
  );
}
