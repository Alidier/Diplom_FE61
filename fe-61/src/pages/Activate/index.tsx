import { useParams } from "react-router-dom";
import { useActivate } from "./hooks";
import Button from "components/Button";

const Activate = () => {
  const { uid, token } = useParams();
  const activate = useActivate();
  
  const onActivate = () => {
    activate();
  }

  return (
    <div>
      <h2>
        Activate
      </h2>
      <p>
        uid: {uid}
      </p>
      token: {token}

      <Button onClick={onActivate}>Activate</Button>
    </div>
  )
}

export default Activate;