import { Container,Row,Col } from 'react-bootstrap'
import React from 'react'

function Footer() {
    return (
        <div>
            <footer>
                <Container>
                    <Row>
                        <Col className="text-center py-3">Copyright &copy; KShopop</Col>
                    </Row>
                </Container>
                </footer>
        </div>
    )
}

export default Footer
