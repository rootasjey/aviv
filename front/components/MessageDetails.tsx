import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import MailIcon from "@mui/icons-material/MailOutlineOutlined";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ListItemIcon from "@mui/material/ListItemIcon";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';

import { getIcon } from "../utils/icons";

import styles from "./MessageDetails.module.css"
import { getBodyMessageDate } from "../utils/date";
import IconButton from "@mui/material/IconButton";

type ComponentProps = {
  hidden: boolean
  isMobileSize: boolean
  markUnread: Function
  onBack: Function
  selectedMessage: Message | undefined
}

export default function MessageDetails({ hidden, isMobileSize, markUnread, onBack, selectedMessage,  } : ComponentProps) {
  const emptyComponent = (
    <>
      <div className={styles.center__icon}><MailIcon sx={{ fontSize: 60 }}/></div>
      <Typography variant="h2" className={styles.center__text} paragraph>
        Click on a message to show its content.
      </Typography>
    </>
  )

  let messageView = <div>message?</div>

  if (selectedMessage) {
    messageView = (
      <>
        <Card sx={{ minWidth: 275 }} elevation={0}>
          <CardContent>
            <div className={styles.card__content}>
              <ListItemIcon>
                {getIcon(selectedMessage.type, true)}
              </ListItemIcon>

              <div>
                <Typography sx={{ fontSize: 20, mb: 1.5 }} className={styles.header__contact__name}>
                  {`${selectedMessage.contact.firstname} ${selectedMessage.contact.lastname}`}
                </Typography>

                <div className={styles.contact__block}>
                  <div className={styles.contact__block__content}>
                    <Typography component="div" color="text.secondary">
                      Email
                    </Typography>
                    <Typography component="div" color="text.secondary">
                      Phone
                    </Typography>
                  </div>

                  <div>
                    <Typography component="div" className={styles.contact_value}>
                      {selectedMessage.contact.email}
                    </Typography>

                    <Typography component="div" className={styles.contact_value}>
                      {selectedMessage.contact.phone}
                    </Typography>
                  </div>
                </div>

              </div>
            </div>
          </CardContent>
        </Card>

        <Card sx={{ mt: 4, p: 2 }} elevation={0}>
          <CardContent>
            <Typography className={styles.body__contact__name}>
              {`${selectedMessage.contact.firstname} ${selectedMessage.contact.lastname}`}
            </Typography>
            
            <Typography color="text.secondary" className={styles.body__date}>
              {getBodyMessageDate(selectedMessage.date)}
            </Typography>

            <Typography color="text.primary" className={styles.body_message_content}>
              {selectedMessage.body}
            </Typography>
          </CardContent>
        </Card>
      </>
    )
  }
  
  const child = typeof selectedMessage === "undefined" 
    ? emptyComponent 
    : messageView

  if (hidden) {
    return (<div></div>)
  }

  const buttonBar = typeof selectedMessage === "undefined" 
    ? (<div></div>) 
    : (
      <>
      <IconButton sx={{ mb: 1.5 }} aria-label="back" onClick={() => onBack()}>
        <ArrowBackIcon />
      </IconButton>

      <IconButton sx={{ mb: 1.5 }} aria-label="mark-unread" onClick={() => markUnread()}>
        <MarkEmailUnreadIcon />
      </IconButton>
      </>
    )

  return (
    <Box component="main" sx={{ 
        flexGrow: 1, 
        p: isMobileSize ? 0 : 3, 
        pt: 2 
      }}>
        <Toolbar />
        {buttonBar}
        {child}
      </Box>
  );
}
