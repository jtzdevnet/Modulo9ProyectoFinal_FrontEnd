import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png"
import { useAuthContext } from '../../Hook/useAuthContext'
import "./index.scss";

const Header = () => {

    const { userPayload, logout } = useAuthContext()
    let navigate = useNavigate();

    const logoutFunc = () => {
        logout();
        navigate('/');
    }

    return (
        <header>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/"><div className="header-logo"><img src={logo} alt="" /></div></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title={ userPayload?.name } id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={logoutFunc} >Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header