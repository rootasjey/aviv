import React from 'react';

import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import DraftsIcon from '@mui/icons-material/Drafts';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import SmsIcon from '@mui/icons-material/Sms';

export const getIcon = (type: string, read: boolean) => {
  switch (type) {
    case "email":
      return read 
        ? <DraftsIcon color={read ? "inherit" : "primary"} />
        : <MailIcon color={read ? "inherit" : "primary"} />;
        
      case "phone":
        return <PhoneIcon color={read ? "inherit" : "primary"} />;
        
      case "sms":
        return read 
          ? <SmsIcon color={read ? "inherit" : "primary"} />
          : <SmsFailedIcon color={read ? "inherit" : "primary"} />;
      
    default:
      return <MailIcon color={read ? "inherit" : "primary"} />;
  }
}
