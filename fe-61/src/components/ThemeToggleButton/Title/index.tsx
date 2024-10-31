import { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

function Title(props: TitleProps) {
  return <h1>{props.children}</h1>;
}

export default Title;
