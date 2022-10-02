import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";


import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import DraftsIcon from '@mui/icons-material/Drafts';

import styles from './MessageItem.module.css';
import { style } from "@mui/system";

import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime')

const getItem = (type: string, read: boolean) => {
  switch (type) {
    case "email":
      return read 
        ? <DraftsIcon color={read ? "inherit" : "primary"} />
        : <MailIcon color={read ? "inherit" : "primary"} />;
  
    case "phone":
      return <PhoneIcon color={read ? "inherit" : "primary"} />;
      
    default:
      return <MailIcon color={read ? "inherit" : "primary"} />;
  }
}

type Props = {
  message: Message;
}

const getRelativeDate = (date: string) => {
  const diffDays = dayjs().diff(dayjs(date), "day")
  
  if (diffDays > 1) {
    return dayjs(date).format("dddd")
  }
  
  if (diffDays > 3) {
    return dayjs(date).format("D/M/YY")
  }
  
  const diffHours = dayjs().diff(dayjs(date), "hour")

  if (diffHours > 1) {
    return dayjs(date).format("hh:mm")
  }
  
  // @ts-ignore
  return dayjs().to(dayjs(date));
}

const getMessageBody = (body: string) => {
  return body.length > 50 ? `${body.substring(0, 50)}...` : body;
}

export default function MessageItem({message} : Props) {
  let dateClassName = `${styles.date} `;
  
  if (!message.read) {
    dateClassName += `${styles.selected}`;
  }

  return (
    <ListItem key={message.id} button disablePadding className={styles.container}>
        <ListItemIcon>
          {getItem(message.type, message.read)}
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
