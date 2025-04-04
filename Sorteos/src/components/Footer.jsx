import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import "./../css/globals.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="icon-container">
        <a
          href="https://www.linkedin.com/in/micaela-caceres-b8b01628b/"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-button linkedin"
        >
          <FaLinkedin />
        </a>

        <a
          href="https://github.com/MicaCaceres"
          target="_blank"
          rel="noopener noreferrer"
          className="icon-button github"
        >
          <FaGithub />
        </a>

        <a href="mailto:mica.caceres@live.com" className="icon-button email">
          <FaEnvelope />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
