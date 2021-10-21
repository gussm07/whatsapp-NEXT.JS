import styled from "styled-components"
import {Avatar, IconButton, Button} from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {auth, db} from '../firebase'
import * as EmailValidator from 'email-validator'
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore"
import Chat from "./Chat";

function Sidebar() {
 const [user] = useAuthState(auth);
 /* SENTENCIA PARA DARNOS TODOS LOS EMAILS REGISTRADOS */
 const userChatRef = db.collection('chats').where('users','array-contains', user.email)
 const [chatsSnapshot] = useCollection(userChatRef);

 const createChat = () => {
    const input = prompt(
        "Please enter an email address for the user you wish to chat with"
    );

    if (!input) return null;
    /* CHAT 1-1 */
    /* añadimos un chat en BD si el chat no existe y es valido el correo */
    if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email){
        db.collection('chats').add({
            /* en la busqueda de un chat, inserta a un usuario loggeado */
            /* crea un chat con el usuario que ya ha entrado */
           users: [user.email, input]
           
        })
        console.log(user);
    }

}

const chatAlreadyExists = (recipientEmail) => 
    /* si inserta un correo ya creado, no lo agrega  */
    /* los doble ! es para convertir la funcion a boolean  */
    /* si es true, devuelve valor. Sino, no devuelve nada */
    !!chatsSnapshot?.docs.find(/* si existe un chat */
    (chat) => 
        chat.data()./* busca en la colleccion chat, con los datos dentro */
        users.find
        ((user)=> user === recipientEmail)/* buscar por todos los usuarios */
        /* si el usuario es igual al input */
        ?.length > 0
    );


    return (
        
    <Container>
        <Header>
            {/* user.photourl pone la foto del usuario en perfil */}
            <UserAvatar src={user.photoURL} onClick={() => auth.signOut()}/>
            <IconsContainer>
                
                <IconButton>
                    <ChatIcon/>
                </IconButton>
                
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>

            </IconsContainer>
        </Header>

        <Search>
            <SearchIcon/>
            <SearchInput placeholder="Search in chats"/>
        </Search>

        <SidebarButton onClick={createChat}>
            Start a new chat
        </SidebarButton>

        {chatsSnapshot?.docs.map((chat)=>(
            <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
        ))}
    </Container>
    );
}

export default Sidebar

const Container = styled.div`

    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;

    ::-webkit-scrollbar{
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;


`;
 

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`;

const SidebarButton = styled(Button)`
    width:100%;

    &&&{
     
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;   
    }
`;

const SearchInput = styled.input`
    outline-width: 0;
    border: none;
    flex: 1;
`;

const Header = styled.div`
    display:flex;
    /* sticky es para mantener el header pegado */
    position:sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px
    border-bottom 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div`
   
`; 