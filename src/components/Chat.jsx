import SignOut from "./SignOut";
import { deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { colRef, db, auth } from "../firebase";
import { useEffect, useState } from "react";
import SendMessage from "./SendMessage";
import { Avatar, Button, Container, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import DeleteIcon from "@mui/icons-material/Delete";
const Chat = () => {
   const { uid, photoURL } = auth.currentUser;
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
         <Container maxWidth="sm" sx={{ border: "2px solid black" }}>
            <SignOut />
            <Box mt={3} >
               {messages.map((msg, idx) => (
                  <Box mt={2} key={idx}>
                     <Avatar alt={msg.photoURL} src={msg.photoURL} />
                     <Typography variant="h6">{msg.text}</Typography>
                     <DeleteIcon
                        sx={{ cursor: "pointer" }}
                        color="action"
                        onClick={() => {
                           deleteDocHandler(idx);
                        }}
                     />
                  </Box>
               ))}
               <SendMessage />
            </Box>
         </Container>
      </Box>
   );
};

export default Chat;
