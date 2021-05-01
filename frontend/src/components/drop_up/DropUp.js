// import Button from "../button/Button";
import style from "./DropUp.module.scss";
import { useState } from "react";

const DropUp = ({ icon, children, title, isOpen, setOpenIndex }) => {
  return (
    <div
      className={`${style.dropUpBtn} ${isOpen && style.openDropUpBtn} `}
      onClick={setOpenIndex}
    >
      <img src={icon} />
      <div className={`${style.dropUp} ${isOpen && style.showDropUp} `}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default DropUp;
