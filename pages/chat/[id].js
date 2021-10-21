import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components"
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { auth,db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";


/* FUNCION PARA LLEVAR AL USUARIO SELECCIONADO EN CHATS */
/* INDEPENDIENTEMENTE DE EL KEY QUE SE LE ASIGNA */
function Chat({chat, messages}) {
    /* VARIABLE PARA OBTENER EL USUARIO AUTENTICADO */
    /* Y SE PASA LA VARIABLE EN EL TITLE */
    const [user] = useAuthState(auth);  

    return (
        <Container>
            <Head>
                {/* ACTUALIZA EL TITULO DE PAGINA AL SELECCIONAR EL CHAT */}
                {/* Y PONE CHATEA CON "USUARIO SELECCIONADO" */}
                <title>Chat with {getRecipientEmail(chat.users, user )}</title>
            </Head>       
            <Sidebar/>
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages}/>
            </ChatContainer>
        </Container>
    )
}

export default Chat

/* AL MOMENTO DE LOGEARNOS, LA INFORMACION YA DEBE DE ESTAR PREPARADA */
/* CON ESTO SE COMIENZA EL SERVER SIDE RENDERING */
export async function getServerSideProps(context) {
    const ref = db.collection("chats").doc(context.query.id);
    
    //PREP MESSASGES ON THE SERVER
    const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp","asc")
    .get();
    const messages = messagesRes.docs.map((doc) =>({

        id: doc.id,
        ...doc.data(),
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }));

    //PREP THE CHATS
    const chatRes = await ref.get(); 
    const chat = {
        id: chatRes.id,
        ...chatRes.data()

    }

    console.log(chat,messages)

    return{
        props: {
            messages: JSON.stringify(messages),
            chat: chat 
        }
    }

}

/* TERMINA SERVER SIDE RENDERING */

const Container = styled.div`

    display: flex;
     

`;

const ChatContainer = styled.div`

    flex:1;
    overflow: scroll;
    height: 100vh;

    ::-webkit-scrollbar{
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

`;