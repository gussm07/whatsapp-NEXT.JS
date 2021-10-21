import styled from "styled-components";
import {Avatar} from "@material-ui/core";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db} from "../firebase"
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/dist/client/router";

/* FUNCION PARA COLOCAR EL NOMBRE DEL USUARIO CREADO, EN CHATS */
function Chat({id,users}) {
    const router = useRouter();

    const [user] = useAuthState(auth); 
    /* FILTRAR  */
    const [recipietSnapshot] = useCollection(
        db.collection('users').where('email','==', getRecipientEmail(users,user))); 
    /* entrar al chat cuando le de click */
    const enterChat = () =>{
        router.push(`/chat/${id}`)
    }
    const recipient = recipietSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users, user);

    /* regresa la foto del usuario  */
    return <Container onClick={enterChat}>
        {recipient?(
            <UserAvatar src={recipient?.photoURL}/>
            /* EL : ES UN ELSE */
        ):(
             <UserAvatar>{recipientEmail[0]}</UserAvatar>
        )}
        
        <p>{recipientEmail}</p>
    </Container>
}
/* TERMINA FUNCION */

export default Chat

const Container = styled.div`

    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;
    word-break: break-word;//si tiene un correo largo, rompe la linea y escribe debajo

    :hover { 
        background-color: #e9eaeb	
    }
`;


const UserAvatar = styled(Avatar)`

    margin: 5px;
    margin-right: 15px;

`;