import { useState } from "react";
import styles from "./DropdownButton.module.css";
import dropdownIcon from "../../images/dropdownIcon.svg";
import { ButtonProps } from "../../types/typesAndConstants";

// ============ DESCRIPTION ==================
// A button which contains a dropdown menu that is displayed upon being clicked.
// The button also takes in a function (valueSelected) that is used to store which of the dropdownmenu divs
// are clicked by the user.

const Button = (props: ButtonProps) => {
  const [open, setOpen] = useState(false); // toggles wheter dropdownMenu is visible or not
  const [btnText, setBtnText] = useState<string>(props.buttonText);

  // function that stores in an array which category is selected, and how that category should be filtered.
  // f.ex. ["Genres", "Drama"]
  const valueSelected = (data: string[]) => {
    props.valueSelected(data);
  };

  return (
    <div aria-label={`Button for the ${props.buttonText} filter dropdown menu`} className={styles.dropdown}>
      <button
        data-cy={btnText}
        onClick={() => {
          setOpen(!open);
        }}
        className={styles.button}
      >
        {btnText}
        <img src={dropdownIcon}></img>
      </button>
      <div className={open ? styles.dropdownMenu : styles.dropdownMenuClosed}>
        {props.dropdownContent.map((el: string) => {
          return (
            <div
              className={styles.dropdownItem}
              key={el}
              data-cy={el}
              onClick={() => {
                valueSelected([props.buttonText, el]);
                setBtnText(props.buttonText + ": " + el);
                setOpen(false);
              }}
            >
              {el}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Button;
