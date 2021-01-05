import React from "react";

const Footer = ({ T }) => {
  return (
    <footer className="footer">
      <p>
        {T.contactUs}{" "}
        <a href="tel:03300218251" className="footer-link">
          0330 021 8251
        </a>{" "}
        {T.or}{" "}
        <a href="mailto:info@kingsoftranslation.co.uk" className="footer-link">
          info@kingsoftranslation.co.uk
        </a>{" "}
        {T.questions}
      </p>
    </footer>
  );
};

export default Footer;
