import { Form, Button } from 'react-bootstrap'
import { useMails } from '../../store/mailsStore'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Mail from './mail/mail';
import CONSTANTS from '../constants/constants'

export default function MailForm () {

    const [mailContent, setMailContent] = useState('<h2>Yeni Mail</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu quam bibendum erat consectetur volutpat eu vel urna. Sed congue lacus eu neque vehicula aliquam. Morbi iaculis, velit nec pellentesque volutpat, justo orci pretium magna, non semper justo elit quis odio. Donec quis volutpat magna.</p><h3>Alt Başlık</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus pellentesque efficitur. Vivamus pretium semper felis at semper. Sed in nulla aliquam, mollis nunc sed, congue ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada velit velit, non vestibulum dolor cursus eu. Nam ac augue nibh. Cras a dui et nunc dictum pulvinar ut aliquam nulla. Aenean sed suscipit dolor. Mauris id condimentum eros.</p><blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><p><strong>Marcel Proust</strong></p></blockquote><h3>Alt Başlık</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempor sed eros pulvinar pharetra. Suspendisse faucibus feugiat justo. Nam fermentum fermentum sem vel eleifend. Ut nec diam ante. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam pretium ornare urna quis rhoncus. Nullam eu mattis nisi, a varius tortor. Ut ullamcorper elit eget massa vestibulum, id tempus nibh laoreet. Vivamus lectus turpis, gravida at justo quis, congue tincidunt urna. Nullam sed tortor at risus mollis convallis nec sit amet nunc. Suspendisse potenti.</p>')
    const {mails} = useMails()
    const editorRef = useRef()
    const [editorLoaded, setEditorLoaded] = useState(false)
    const { CKEditor, ClassicEditor } = editorRef.current || {}

    useEffect(() => {
        editorRef.current = {
          CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
          ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
        }
        setEditorLoaded(true)

      }, [])

    const handleSubmit = (e) => {

        e.preventDefault()

        let stringMails = []
        
        mails.filter((mail) => {
            return mail.isChecked === true
        }).forEach(mail => {
            stringMails.push({
                "email": mail.mail
            })
        })

        const raw = JSON.stringify({
            "from": {
                "name": e.target[0].value,
                "email": e.target[1].value
            },
            "to": stringMails,
            "subject": e.target[2].value,
            "htmlContent": `<html><body>${mailContent}</body></html>`
        })

        axios({
            url: "https://useapi.useinbox.com/notify/v1/send",
            method: "POST",
            "headers": {
                "Authorization": `Bearer ${CONSTANTS.TOKEN}`,
                "Content-Type": "application/json"
            },
            "body": raw
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    return(
        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Göderen Adı</Form.Label>
                <Form.Control type="text" placeholder="Recep Tayyip ERDOĞAN"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Göderen Email</Form.Label>
                <Form.Control type="email" placeholder="ornek@example.com"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Başlığı</Form.Label>
                <Form.Control type="text" placeholder="ornek@example.com"/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Mail yaz</Form.Label>
                
                {
                    editorLoaded ? 
                        <CKEditor
                        editor={ClassicEditor}
                        data={mailContent}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            setMailContent(data)
                            console.log(mailContent)
                        }}
                        />
                    : 
                        <div>Editor loading</div>
                    
                    
                }

            </Form.Group>

            {
                mails &&
                    mails.map((mail, index) => {
                        return(
                            <Mail 
                                mail={mail.mail}
                                isChecked={mail.isChecked}
                                key={`${mail.mail}-${index}`}/>
                        )
                    })
            }
            
            <Button variant="primary" type="submit">
                Gönder
            </Button>
        </Form>
    )
}