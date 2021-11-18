import { useEffect, useState } from "react";
import { Avatar, Button, Container, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/system/Box";
import { deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { colRef, db, auth } from "../firebase";
import SignOut from "./SignOut";
import SendMessage from "./SendMessage";
const Chat = () => {
   const [messages, setMessages] = useState([]);
   useEffect(() => {
      onSnapshot(colRef, (snapshot) => {
         setMessages(
            snapshot.docs.map((doc) => {
               return { ...doc.data(), id: doc.id };
            })
         );
      });
   }, []);

   const deleteDocHandler = (idx) => {
      const docRef = doc(db, "messages", messages[idx].id);
      deleteDoc(docRef);
   };
   return (
      <Box mt={5}>
         <Container
            maxWidth="sm"
            sx={{ border: "2px dashed #2ffece", padding: "10px" }}
         >
            <SignOut />
            <Box
               mt={3}
               sx={{
                  wordBreak: "break-all",
               }}
            >
               {messages.map((msg, idx) => (
                  <div
                     className={`${
                        msg.uid == auth.currentUser.uid ? "send" : "recieve"
                     }`}
                  >
                     <Box mt={2} key={idx}>
                        <Button
                           endIcon={
                              <Avatar alt={msg.photoURL} src={msg.photoURL} />
                           }
                           startIcon={
                              <DeleteIcon
                                 color="secondary"
                                 sx={{ cursor: "pointer" }}
                                 color="action"
                                 onClick={() => {
                                    deleteDocHandler(idx);
                                 }}
                              />
                           }
                           disableRipple
                        >
                           <Typography variant="p">{msg.text}</Typography>
                        </Button>
                     </Box>
                  </div>
               ))}
               <SendMessage />
            </Box>
         </Container>
      </Box>
   );
};

export default Chat;
