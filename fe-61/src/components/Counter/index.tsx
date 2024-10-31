import { useDispatch } from "react-redux";
import Button from "../Button";
import { useSelector } from "react-redux";
import { RootState } from "api/store";
import { increment, incrementByAmount, decrement } from "api/reducers/counter";

function Counter() {
  const counter = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  const incriment = () => {
    dispatch(increment())
  }

  const onIncrimentByAmount = () => {
    dispatch(incrementByAmount(counter.value))
  }

  return (
    <div>
      <Button onClick={() => dispatch(decrement())}>-</Button>
        count: {String(counter.value)}
      <Button onClick={incriment}>+</Button>

      <Button onClick={onIncrimentByAmount}>incriment by {counter.value}</Button>
    </div>
  );
}

export default Counter;
