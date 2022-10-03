import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import MailIcon from "@mui/icons-material/MailOutlineOutlined";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ListItemIcon from "@mui/material/ListItemIcon";

import { getIcon } from "../utils/icons";

import styles from "./MessageDetails.module.css"
import { getBodyMessageDate } from "../utils/date";

type ComponentProps = {
  selectedMessage: Message | undefined;
}

export default function MessageDetails({ selectedMessage } : ComponentProps) {
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

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {child}
      </Box>
  );
}
