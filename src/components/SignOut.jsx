import { Button } from "@mui/material";
import { Box } from "@mui/system";

import { signOut } from "@firebase/auth";
import { auth } from "../firebase";

const SignOut = () => {
   return (
      <Box>
         <Button
            variant="contained"
            onClick={() => {
               signOut(auth);
            }}
         >
            SignOut
         </Button>
      </Box>
   );
};

export default SignOut;
