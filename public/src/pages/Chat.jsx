import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled, { ThemeProvider } from "styled-components";
import { BsSun, BsMoon } from "react-icons/bs";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import DashboardChatBox from "../components/DashboardChatBox";
import Logout from "../components/Logout";

const themes = {
  light: {
    background: "#f5f7fb",
    panelBg: "#ffffff",
    textPrimary: "#0e0e11",
  },
  dark: {
    background: "#131324",
    panelBg: "#00000076",
    textPrimary: "#ffffff",
  },
};

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [themeMode, setThemeMode] = useState(
    () => localStorage.getItem("themeMode") || "dark"
  );
  useEffect(() => {
    const fetchData = async () => {
      const user = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      if (!user || user === "null") {
        navigate("/login");
      } else {
        try {
          const parsed = JSON.parse(user);
          if (parsed && parsed._id) {
            setCurrentUser(parsed);
          } else {
            navigate("/login");
          }
        } catch {
          navigate("/login");
        }
      }
    };
    fetchData();
  }, [navigate]);
  useEffect(() => {
    if (currentUser && currentUser._id) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    fetchData();
  }, [currentUser, navigate]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("user-status-update", (updatedUser) => {
        setContacts(prevContacts =>
          prevContacts.map(contact =>
            contact._id === updatedUser.userId
              ? { ...contact, status: updatedUser.status }
              : contact
          )
        );
      });
    }

    return () => {
      if (socket.current) {
        socket.current.off("user-status-update");
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <ThemeProvider theme={themes[themeMode] || themes.dark}>
        <Container>
          <header className="dashboard-header">
            <div className="left">
              <ThemeToggle
                onClick={() => {
                  const next = themeMode === "dark" ? "light" : "dark";
                  setThemeMode(next);
                  localStorage.setItem("themeMode", next);
                }}
              >
                {themeMode === "dark" ? <BsSun /> : <BsMoon />}
              </ThemeToggle>
            </div>
            <div className="right">
              {currentUser && (
            <UserInfo>
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">{currentUser?.username || "User"}</div>
            </UserInfo>
              )}
            </div>
          </header>
          <div className="container">
            <Contacts contacts={contacts} changeChat={handleChatChange} />
            {currentChat === undefined ? (
              <DashboardChatBox onSend={() => {}} />
            ) : (
              <ChatContainer currentChat={currentChat} socket={socket} />
            )}
          </div>
          <FloatingLogout>
            <Logout />
          </FloatingLogout>
        </Container>
      </ThemeProvider>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: ${(props) => props.theme.background};
  .dashboard-header {
    width: 85vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    .left {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .right {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
  }
  .container {
    height: 85vh;
    width: 85vw;
    background-color: ${(props) => props.theme.panelBg};
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

const ThemeToggle = styled.button`
  padding: 0.4rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: ${(props) => props.theme.textPrimary};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 1.1rem;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.textPrimary};
  .avatar img {
    height: 2.25rem;
    width: 2.25rem;
    border-radius: 50%;
  }
`;

const FloatingLogout = styled.div`
  position: fixed;
  left: 1rem;
  bottom: 1rem;
`;
