/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import '../css/carrito.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';



export const OffcanvasCart = ({ name, show, handleShow, handleClose }) => {


  const [carrito, setCarrito] = useState([]);
  const [costoTotal, setCostoTotal] = useState(0);

  const handleCostoTotal = () => {
    let total = 0;
    carrito.map((prod) => {
      total += (prod.cantidad * prod.precio);
    })
    setCostoTotal(total);
    localStorage.setItem('total',total);
  }
  const obtenerCarrito = () => {
    const carritoLS = JSON.parse(localStorage.getItem('carrito'));
    if (carritoLS.length !== 0) {
      setCarrito(carritoLS);
      handleCostoTotal();
    }
  }

  const handleSumar = (id) => {
    let carrit0 = carrito;
    carrit0.map((prod) => {
      if (prod.id_prod == id) {
        prod.cantidad += 1;
      }
    })
    setCarrito(carrit0);
    localStorage.setItem('carrito', JSON.stringify(carrit0));
    obtenerCarrito();
    handleCostoTotal();
  }
  const handleRestar = (id) => {
    let carrit0 = carrito;
    carrit0.map((prod) => {
      if (prod.id_prod == id) {
        if (prod.cantidad !== 1) {
          prod.cantidad -= 1;
        }
      }
    })
    setCarrito(carrit0);
    localStorage.setItem('carrito', JSON.stringify(carrit0));
    obtenerCarrito();
    handleCostoTotal();
  }

  const handleHacerPedido = () => {
    
    if(JSON.parse(localStorage.getItem('user')) == null){
      swal("!","Debe iniciar sesion primero.","error");
      setTimeout(() => {
        location.href = '/login';
      }, "3000");
    }
  }
  const handleEliminar = (id) => {
    const carritoLS = JSON.parse(localStorage.getItem('carrito'));
    const cart = carritoLS.filter(ele => ele.id_prod !== id);
    localStorage.setItem('carrito',JSON.stringify(cart));
    setCarrito(cart);
    handleCostoTotal();
  }
  
  useEffect(() => {
    obtenerCarrito();
    handleCostoTotal();
  }, [show]);



  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {
            carrito.length !== 0 ?

              carrito.map((prod) => {
                return (
                  <>
                    <div className="product-carrito-container" key={prod.id_prod}>
                      <img src={prod.imagen} alt="" />
                      <div className="info">
                        <span>
                          {prod.nombre}
                        </span>
                        <span>
                          <span
                            onClick={() => handleRestar(prod.id_prod)}
                            className='boton-sr'>-</span>
                          <span>{prod.cantidad}</span>
                          <span
                            onClick={() => handleSumar(prod.id_prod)}
                            className='boton-sr'>+</span>
                        </span>
                      </div>
                      <span>${prod.precio * prod.cantidad}</span>
                      <span onClick={() => handleEliminar(prod.id_prod)}>❌</span>
                    </div>
                  </>
                )
              }) : <h1>Carrito vacio</h1>

          }{
            carrito.length !== 0 ?
              <>
                <div className="total">
                  <span>TOTAL: {costoTotal}</span>
                  <button onClick={() => handleHacerPedido()}>HACER PEDIDO</button>
                </div>
              </> : ''
          }
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
export default OffcanvasCart;