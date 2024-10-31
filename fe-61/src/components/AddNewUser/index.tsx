import { useState } from "react";
import Button from "../Button";

interface AddNewUserProps {
  addNewUser: (userName: string) => void;
}

export default function AddNewUser({ addNewUser }: AddNewUserProps) {
  const [newUserName, setNewUserName] = useState<string>("");

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setNewUserName(event.target.value);
  };

  const handleAddNewUser = () => {
    addNewUser(newUserName);
    setNewUserName("");
  };

  return (
    <>
      <input
        placeholder="new user"
        value={newUserName}
        onChange={handleChangeInput}
      />
      <Button
        onClick={handleAddNewUser}
        disabled={newUserName.trim().length === 0}
      >
        Add
      </Button>
    </>
  );
}
