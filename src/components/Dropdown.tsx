import React, { useEffect, useState } from "react";
import "./Dropdown.css";

interface OptionEntry {
  name: string;
  id: number;
  imgURL: string;
}
interface DropdownProps {
  label: string;
  options: OptionEntry[];
  onSelection: (selectedOption: OptionEntry) => void;
  allowSearch?: boolean;
}

export const Dropdown = ({
  label,
  options,
  onSelection,
  allowSearch = false,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [currentOptions, setCurrentOptions] = useState(options);

  useEffect(() => {
    if (open) {
      setCurrentOptions(options);
    }
  }, [open, options]);

  // handle opening and closing of the dropdown
  const handleOpen = () => {
    setOpen(!open);
  };

  // handle selection of an option
  const handleSelection = (selectedOption: OptionEntry) => {
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
          {allowSearch && (
            <input
              type="text"
              placeholder="Search.."
              id="myInput"
              onKeyUp={(event) => searchOptions(event.currentTarget.value)}
            />
          )}
          <div className={"options-container"}>
            {currentOptions.map((option) => (
              <div
                key={option.name}
                id={option.name}
                className="option"
                onClick={() =>
                  handleSelection({
                    name: option.name,
                    id: option.id,
                    imgURL: option.imgURL,
                  })
                }
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
