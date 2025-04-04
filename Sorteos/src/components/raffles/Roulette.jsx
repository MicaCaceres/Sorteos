"use client";

import { useState, useRef } from "react";
import "../../css/Roulette.css";

export default function Roulette() {
  const [participants, setParticipants] = useState([]);
  const [participantsList, setParticipantsList] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);
  const [activeTab, setActiveTab] = useState("list");
  const fileInputRef = useRef(null);

  const MAX_PARTICIPANTS = 25;

  const loadParticipantsList = () => {
    if (!participantsList.trim()) return;

    const newParticipants = participantsList
      .split(/\n+/)
      .map((name) => name.trim())
      .filter((name) => name); // permitimos repetidos

    const availableSlots = MAX_PARTICIPANTS - participants.length;
    const limitedParticipants = newParticipants.slice(0, availableSlots);

    if (limitedParticipants.length > 0) {
      setParticipants([...participants, ...limitedParticipants]);
      setParticipantsList("");
    }

    if (newParticipants.length > availableSlots) {
      alert(
        `Solo se añadieron ${availableSlots} participantes para no exceder el límite de ${MAX_PARTICIPANTS}.`
      );
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
        .filter((line) => line !== ""); // permitimos repetidos

      const availableSlots = MAX_PARTICIPANTS - participants.length;
      const limitedLista = lista.slice(0, availableSlots);

      if (limitedLista.length > 0) {
        setParticipants([...participants, ...limitedLista]);
      }

      if (lista.length > availableSlots) {
        alert(
          `Solo se añadieron ${availableSlots} participantes para no exceder el límite de ${MAX_PARTICIPANTS}.`
        );
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    reader.readAsText(file);
  };

  const removeParticipant = (index) => {
    const newParticipants = [...participants];
    newParticipants.splice(index, 1);
    setParticipants(newParticipants);
  };

  const clearAllParticipants = () => {
    setParticipants([]);
    setHasSpun(false);
  };

  const spinWheel = () => {
    if (participants.length < 2 || spinning) return;

    setSpinning(true);
    setHasSpun(true);

    const spinAngle = 3600 + Math.floor(Math.random() * 3600);
    const finalAngle = rotationAngle + spinAngle;
    setRotationAngle(finalAngle);

    setTimeout(() => {
      setSpinning(false);
    }, 5000);
  };

  const getCurrentWinner = () => {
    if (participants.length === 0) return null;

    const segmentAngle = 360 / participants.length;
    const normalizedAngle = ((rotationAngle % 360) + 360) % 360;

    const indicatorAngle = 270;

    const adjustedAngle = (indicatorAngle - normalizedAngle + 360) % 360;

    const segmentIndex =
      Math.floor(adjustedAngle / segmentAngle) % participants.length;

    return participants[segmentIndex];
  };

  const wheelSegments = participants.map((participant, index) => {
    const segmentAngle = 360 / participants.length;
    const startAngle = index * segmentAngle;
    const endAngle = startAngle + segmentAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const centerX = 150;
    const centerY = 150;
    const radius = 150;

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    const largeArcFlag = segmentAngle > 180 ? 1 : 0;

    const path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

    const colors = [
      "#FF5252",
      "#4CAF50",
      "#2196F3",
      "#FFC107",
      "#9C27B0",
      "#FF4081",
      "#3F51B5",
      "#FF9800",
    ];
    const backgroundColor = colors[index % colors.length];

    // Calculate position for the text
    const textAngle = startAngle + segmentAngle / 2;
    const textRad = (textAngle * Math.PI) / 180;
    const textDistance = radius * 0.65; // Position text at 65% from center
    const textX = centerX + textDistance * Math.cos(textRad);
    const textY = centerY + textDistance * Math.sin(textRad);

    // Calculate text rotation to make it readable
    const textRotation =
      textAngle > 90 && textAngle < 270 ? textAngle + 180 : textAngle;

    return (
      <g key={index}>
        <path d={path} fill={backgroundColor} stroke="#333" strokeWidth="1" />
        <text
          x={textX}
          y={textY}
          fill="white"
          fontWeight="bold"
          fontSize="12"
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(${textRotation}, ${textX}, ${textY})`}
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}
        >
          {participant}
        </text>
      </g>
    );
  });

  const currentWinner =
    !spinning && hasSpun && participants.length > 0 ? getCurrentWinner() : null;

  return (
    <div className="prize-wheel-container">
      <div className="prize-wheel-card">
        <div className="card-header">
          <h2 className="card-title">Ruleta de Sorteos</h2>
        </div>
        <div className="card-content">
          <div className="tabs">
            <div className="tabs-list">
              <button
                className={`tab-button ${activeTab === "list" ? "active" : ""}`}
                onClick={() => setActiveTab("list")}
              >
                <svg
                  className="icon"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                >
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
                Cargar Listado
              </button>
              <button
                className={`tab-button ${activeTab === "csv" ? "active" : ""}`}
                onClick={() => setActiveTab("csv")}
              >
                <svg
                  className="icon"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                >
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
                Cargar CSV
              </button>
            </div>
            <div
              className="tab-content"
              style={{ display: activeTab === "list" ? "block" : "none" }}
            >
              <div className="input-group">
                <textarea
                  value={participantsList}
                  onChange={(e) => setParticipantsList(e.target.value)}
                  placeholder="Ingresa los nombres de los participantes, uno por línea"
                  className="textarea"
                ></textarea>
                <button
                  onClick={loadParticipantsList}
                  className="button primary"
                >
                  Cargar Participantes
                </button>
              </div>
            </div>
            <div
              className="tab-content"
              style={{ display: activeTab === "csv" ? "block" : "none" }}
            >
              <div className="file-upload-container">
                <div className="file-upload-area">
                  <svg
                    className="file-icon"
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                  >
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                  </svg>
                  <label htmlFor="csvFile" className="file-label">
                    Selecciona un archivo CSV
                  </label>
                  <input
                    id="csvFile"
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.txt"
                    onChange={handleFileUpload}
                    className="file-input"
                  />
                  <button
                    className="button outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Seleccionar Archivo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {participants.length > 0 && (
            <>
              <div className="participants-header">
                <h3 className="participants-title">
                  Participantes ({participants.length}/{MAX_PARTICIPANTS})
                </h3>
                <button
                  className="button small outline"
                  onClick={clearAllParticipants}
                >
                  Limpiar Todo
                </button>
              </div>
              <div className="participants-grid">
                {participants.map((participant, index) => (
                  <div key={index} className="participant-item">
                    <span className="participant-name">{participant}</span>
                    <button
                      className="button icon"
                      onClick={() => removeParticipant(index)}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="card-footer">
          <button
            onClick={spinWheel}
            disabled={participants.length < 2 || spinning}
            className="button primary large"
          >
            {spinning ? "Girando..." : "Girar la Ruleta"}
          </button>
        </div>
      </div>

      <div className="wheel-container">
        <div className="wheel-wrapper">
          <div className="wheel-indicator">
            <div className="indicator-triangle"></div>
          </div>

          <svg
            width="300"
            height="300"
            viewBox="0 0 300 300"
            className="wheel"
            style={{
              transform: `rotate(${rotationAngle}deg)`,
              transition: spinning
                ? "transform 5s cubic-bezier(0.17, 0.67, 0.21, 0.95)"
                : "none",
            }}
          >
            {wheelSegments}

            <circle cx="150" cy="150" r="15" fill="#333" />
          </svg>

          {currentWinner && !spinning && (
            <div className="winner-display">
              <p className="winner-text">
                Ganador: <span className="winner-name">{currentWinner}</span>
              </p>
            </div>
          )}

          {participants.length === 0 && (
            <div className="empty-state">
              <p className="empty-text">Agrega participantes para comenzar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
