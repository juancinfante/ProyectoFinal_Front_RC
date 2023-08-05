/* eslint-disable react/prop-types */
import Offcanvas from 'react-bootstrap/Offcanvas';

export const OffcanvasCart = ({ name, show, handleShow, handleClose}) => {
  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
export default OffcanvasCart;