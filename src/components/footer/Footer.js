import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-center text-lg-start">
      <div
        className="text-center p-3 text-light"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        © 2020 Copyright:
        <a className="text-light m-2" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </footer>
  );
}
