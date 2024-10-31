import Button from "../Button";
import { useAppContext, useSnackBarContext } from "../../shared/contexts";
import { useLazyGetMeQuery } from "api/endpoints/user";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useAppContext();
  const snackBar = useSnackBarContext();
  const [trigger] = useLazyGetMeQuery();

  const onClick = () => {
    toggleTheme();
    snackBar.addSnackBar('Switched Theme')
  }

  return (
    <>
    <div className="button__wrapper">
    <Button onClick={onClick}>
      Switch to {theme === "light" ? "Dark" : "Light"} Theme
    </Button>
    </div>
    </>

  );
};

export default ThemeToggleButton;
