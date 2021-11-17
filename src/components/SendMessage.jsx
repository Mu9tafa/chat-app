import { addDoc, serverTimestamp } from "@firebase/firestore";
import { Button, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { colRef, auth } from "../firebase";
import { Box } from "@mui/system";

const SendMessage = () => {
   const { uid, photoURL } = auth.currentUser;
   const [message, setMessage] = useState("");
   const changeHandler = (e) => {
      setMessage(e.target.value);
   };

   const submitHandler = (e) => {
      e.preventDefault();
      addDoc(colRef, {
         text: message,
         uid,
         photoURL,
         createdAt: serverTimestamp(),
      });
      e.target.reset();
   };
   return (
      <Box mt={5}>
         <form onSubmit={submitHandler}>
            <FormControl>
               <TextField
                  type="text"
                  label="Enter msg"
                  size="small"
                  onChange={changeHandler}
               ></TextField>
               <Button variant="contained" type="submit">
                  Send
               </Button>
            </FormControl>
         </form>
      </Box>
   );
};

export default SendMessage;
