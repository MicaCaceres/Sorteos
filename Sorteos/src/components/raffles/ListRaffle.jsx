import { useState, useRef, useEffect } from "react";
import "../../css/Roulette.css";

export default function ListRaffle() {
  const [participantsList, setParticipantsList] = useState("");
  const [pendingWinner, setPendingWinner] = useState(null);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("list");

  useEffect(() => {
    if (pendingWinner) {
      setTimer(0);
      const id = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [pendingWinner]);

  const runRaffle = () => {
    const participants = participantsList
      .split(/\n+/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (participants.length === 0) {
      alert("Por favor, ingresa participantes antes de hacer el sorteo.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * participants.length);
    const selectedWinner = participants[randomIndex];
    setPendingWinner(selectedWinner);
  };

  const confirmRemoveWinner = () => {
    const updatedList = participantsList
      .split(/\n+/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && line !== pendingWinner);
    setParticipantsList(updatedList.join("\n"));
    setPendingWinner(null);
    setShowModal(false);
  };

  const cancelModal = () => {
    setPendingWinner(null);
    setShowModal(false);
  };

  const handleAcceptWinner = () => {
    setShowModal(true); // Abrimos la modal
  };
  const clearAllParticipants = () => {
    setParticipantsList([]);
  };

  const handleRemoveWinner = () => {
    const updatedList = participantsList
      .split(/\n+/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && line !== pendingWinner);
    setParticipantsList(updatedList.join("\n"));
    setPendingWinner(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line !== "")
        .join("\n");
      setParticipantsList(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="prize-wheel-container">
      <div className="prize-wheel-card">
        <div className="card-header">
          <h2 className="card-title">Lista de Participantes</h2>
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

            {activeTab === "list" && (
              <div className="tab-content">
                <div className="input-group">
                  <textarea
                    value={participantsList}
                    onChange={(e) => setParticipantsList(e.target.value)}
                    placeholder="Ingresa los nombres de los participantes, uno por línea"
                    className="textarea"
                  ></textarea>
                  <button
                    className="button small outline"
                    onClick={clearAllParticipants}
                  >
                    Limpiar Todo
                  </button>
                  <button onClick={runRaffle} className="button primary">
                    Iniciar Sorteo
                  </button>
                </div>
              </div>
            )}

            {activeTab === "csv" && (
              <div className="tab-content">
                <div className="file-upload-container">
                  <div className="file-upload-area">
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
            )}
          </div>

          {pendingWinner && (
            <div className="winner-announcement">
              🎉 <strong>Ganador/a:</strong> {pendingWinner}
              <div
                style={{ marginTop: "10px", fontSize: "14px", color: "#888" }}
              >
                Tiempo transcurrido: {timer} segundo{timer !== 1 && "s"}
              </div>
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={handleAcceptWinner}
                  className="button primary"
                  style={{ marginRight: "10px" }}
                >
                  Aceptar
                </button>
                <button onClick={handleRemoveWinner} className="button danger">
                  Eliminar de la Lista
                </button>
              </div>
            </div>
          )}

          {showModal && (
            <div className="custom-modal-backdrop">
              <div className="custom-modal">
                <p>¿Deseas eliminar al ganador de la lista?</p>
                <div className="modal-buttons">
                  <button
                    onClick={confirmRemoveWinner}
                    className="button danger"
                  >
                    Sí, eliminar
                  </button>
                  <button onClick={cancelModal} className="button outline">
                    No, mantener
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .custom-modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }
        .custom-modal {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
        .modal-buttons {
          margin-top: 15px;
          display: flex;
          gap: 10px;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
