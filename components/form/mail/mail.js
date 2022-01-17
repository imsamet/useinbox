import { Form } from 'react-bootstrap'
import { useMails } from '../../../store/mailsStore'

export default function Mail ({mail, isChecked}) {

    const {mails, setMails} = useMails()

    const handleChange = (e) => {
        let newMails = mails

        newMails.find((value) => {
            return value.mail === mail
        }).isChecked = e.target.checked

        setMails(newMails)
    }

    return(
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label={mail} defaultChecked={isChecked} onChange={handleChange}/>
        </Form.Group>
    )
}