import { Form, Button } from 'react-bootstrap'
import { useMails } from '../../store/mailsStore';

export default function Mails () {

    const {mails, setMails} = useMails()

    const handleSubmit = (e) => {

        e.preventDefault();

        let newMails = [...mails];

        if(newMails.some((mail) => {
            return mail.mail === e.target[0].value
        })) return false

        newMails.push({mail: e.target[0].value, isChecked: false})

        setMails(newMails)
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Ekle</Form.Label>
                <Form.Control type="email" placeholder="ornek@example.com"/>
            </Form.Group>
            
            <Button variant="success" type="submit">
                Ekle
            </Button>
        </Form>
    )
}