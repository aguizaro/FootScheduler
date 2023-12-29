import React, { useState } from "react";
import "./Dropdown.css";

interface Option {
  name: string;
  imgURL: string;
}
interface DropdownProps {
  label: string;
  options: Option[];
  onSelection: (selectedOption: string) => void;
}

export const Dropdown = ({ label, options, onSelection }: DropdownProps) => {
  const [open, setOpen] = React.useState(false);
  const [currentOptions, setCurrentOptions] = useState(options);

  // handle opening and closing of the dropdown
  const handleOpen = () => {
    setOpen(!open);
  };

  // handle selection of an option
  const handleSelection = (selectedOption: string) => {
    setOpen(false); //close the dropdown
    onSelection(selectedOption); //call the callback
  };

  // filter options based on the search text
  const searchOptions = (searchText: string) => {
    const filteredOptions = options.filter((option) =>
      option.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setCurrentOptions(filteredOptions);
  };

  return (
    <div className="dropdown-container">
      <button onClick={handleOpen}>{label}</button>
      {open ? (
        <>
          <input
            type="text"
            placeholder="Search.."
            id="myInput"
            onKeyUp={(event) => searchOptions(event.currentTarget.value)}
          />
          <div className={"options-container"}>
            {currentOptions.map((option) => (
              <div
                key={option.name}
                id={option.name}
                className="option"
                onClick={(event) => handleSelection(event.currentTarget.id)}
              >
                <img
                  src={option.imgURL}
                  alt={option.name}
                  width={50}
                  height={50}
                />
                <span>{option.name}</span>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};
