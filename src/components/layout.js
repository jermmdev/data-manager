import React from "react"
import PropTypes from "prop-types"

import "./layout.css"
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col } from 'reactstrap'

class Layout extends React.Component {
  render(){
    return(
          <Container>
            <Row>
              <Col className="pt-2">
                {this.props.children}
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="p-2">
                  © {new Date().getFullYear()}, JermmDev
                </p>
              </Col>
            </Row>
          </Container>
    )
  }
}
  

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
