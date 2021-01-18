import React from "react";

const Footer = ({ T }) => {
  return (
    <footer className="footer">
      <p>
        {T.contactUs}{" "}
        <a href={`tel:${T.phone}`} className="footer-link">
          {T.phone}
        </a>{" "}
        {T.or}{" "}
        <a href={`mailto:${T.email}`} className="footer-link">
          {T.email}
        </a>{" "}
        {T.questions}
      </p>
    </footer>
  );
};

export default Footer;
