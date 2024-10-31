import Button, { ButtonPros } from "../Button";
import { FC } from "react";

import styles from "./styles.module.scss";


const IconButton: FC<ButtonPros> = (props) => {
    const { children, className, ...rest } = props;
    const classNames = [styles.iconButton, className].join(' ');

    return (
        <Button {...rest} className={classNames}>
            {children}
        </Button>
    )
}

export default IconButton;