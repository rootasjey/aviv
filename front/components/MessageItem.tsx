import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";

import styles from './MessageItem.module.css';

import { getIcon } from "../utils/icons";
import { getRelativeDate } from "../utils/date";
import { getMessageBody } from "../utils/texts";

type Props = {
  message: Message
  onClick: Function
}

export default function MessageItem({message, onClick} : Props) {
  let dateClassName = `${styles.date} `;
  
  if (!message.read) {
    dateClassName += `${styles.selected}`;
  }

  return (
    <ListItem key={message.id} button disablePadding className={styles.container} onClick={() => onClick()}>
        <ListItemIcon>
          {getIcon(message.type, message.read)}
        </ListItemIcon>
        <div>
          <Typography className={styles.contact}>
            {`${message.contact.firstname} ${message.contact.lastname}`}
          </Typography>
          <Typography className={styles.subject}>{message.subject}</Typography>
          <Typography className={styles.body}>{getMessageBody(message.body)}</Typography>
        </div>

        <Typography className={dateClassName}>{getRelativeDate(message.date)}</Typography>
    </ListItem>
  );
}
