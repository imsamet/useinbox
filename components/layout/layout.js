import { Col, Container, Row } from "react-bootstrap";
import MailForm from "../form/form";
import Mails from "../mails/mails";

export default function Layout () {
    return(
        <Container className="mt-5">
            <Row>

                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <Mails/>
                </Col>

                <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <MailForm/>
                </Col>

            </Row>
        </Container>
    )
}