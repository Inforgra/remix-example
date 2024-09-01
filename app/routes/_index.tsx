import type { MetaFunction } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="container mx-auto mt-24">
      <div className="flex">
        <Dropdown />
      </div>
    </div>
  );
}

function Dropdown() {
  const [ isOpen, setIsOpen ] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="p-2 rounded bg-blue-200 hover:bg-blue-100"
        onClick={ () => setIsOpen(!isOpen) }
      >
        menu
      </button>
      { isOpen &&
        <div className="absolute left-0 mt-2 rounded shadow-md min-w-64 bg-gray-200">
          <a href="https://naver.com" target="_blank" className="flex p-2 hover:bg-gray-100" onClick={ () => setIsOpen(false) }>naver</a>
          <a href="https://daum.net" target="_blank" className="flex p-2 hover:bg-gray-100" onClick={ () => setIsOpen(false) }>daum</a>
          <a href="https://google.com" target="_blank" className="flex p-2 hover:bg-gray-100" onClick={ () => setIsOpen(false) }>google</a>
        </div>
      }
    </div>
  );
}
