import { createContext, useContext, useState } from "react";

const Context = createContext()

function MailsProvider ({children}) {

    const [mails, setMails] = useState([
        {mail: "imsamet@outlook.com", isChecked: true}
    ])

    return <Context.Provider value={{mails, setMails}}>{children}</Context.Provider>
}

const useMails = () => useContext(Context)

export { MailsProvider, useMails }