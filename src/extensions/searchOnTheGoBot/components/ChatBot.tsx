import * as React from "react";
import styles from "./ChatBot.module.scss";
import { IChatbotProps, IChatbotStates } from "./IChatBotProps";

class ChatBot extends React.Component<IChatbotProps, IChatbotStates> {
  constructor(props) {
    super(props);
    this.state = {
      isChatOpen: false,
    };
  }

  toggleChat = () => {
    this.setState((prevState) => ({
      isChatOpen: !prevState.isChatOpen,
    }));
  };

  render() {
    return (
      <div className={styles.chatbot}>
        <div className={styles.chatIcon} onClick={this.toggleChat}>
          {/* Icon code or image here */}
        </div>
        {this.state.isChatOpen && (
          <div className={styles.chatPopup}>{/* Chat window code here */}</div>
        )}
      </div>
    );
  }
}

export default ChatBot;
