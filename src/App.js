import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Container, Modal, Row } from 'react-bootstrap';
import './App.css';
import Header from './components/Header';
import SelectItemsPopup from './components/SelectItemsPopup';
import Login from './components/Login';
import menu1 from './images/menu1.jpg';
import menu2 from './images/menu2.jpg';
import menu3 from './images/menu3.jpg';
import menu4 from './images/menu4.jpg';
import pizza1 from './images/pizza1.jpg';
import pizza2 from './images/pizza2.jpg';
import pizza3 from './images/pizza3.jpg';

function App() {
  const [cart, setCart] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showLogin, setShowLogin] = useState(true); 
  const [products, setProducts] = useState([]); 
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    fetch("https://api-demo-4gqb.onrender.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.data)) 
      .catch((error) => {
        console.error('Error fetching products:', error);
        alert("Failed to load products. Please try again later.");
      });
    

    const storedCart = JSON.parse(localStorage.getItem("cart")) || {};
    setCart(storedCart);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setShowLogin(false); 
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setTotalItems(
      Object.values(cart).reduce((sum, item) => sum + item.count, 0)
    );
  }, [cart]);

  const addToCart = (item) => {
    const newCart = { ...cart };
    if (newCart[item.id]) {
      newCart[item.id].count += 1;
    } else {
      newCart[item.id] = { ...item, count: 1 };
    }
    setCart(newCart);
  };


  const handleQuantityChange = (id, delta) => {
    const newCart = { ...cart };
    if (newCart[id]) {
      newCart[id].count += delta;
      if (newCart[id].count <= 0) {
        delete newCart[id];
      }
      setCart(newCart);
    }
  };


  const togglePopup = () => {
    setShowPopup(!showPopup);
  };


  const handleLogin = (user) => {
    console.log('Logged in user:', user); 
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user)); 
    setShowLogin(false); 
  };

  return (
    <Container>
   
    {!user && <Button variant="primary" onClick={() => setShowLogin(true)} >
        Login
      </Button>}
      <div>Hello {user?.age || ''}</div>
      <Login  show={showLogin}
        onClose={() => setShowLogin(false)} 
        onLogin={handleLogin}
      />


      <Header handleShow={togglePopup} totalItems={totalItems} />


      <Row>
        <Carousel>
          <Carousel.Item>
            <img src={pizza1} alt="Pizza 1" />
            <Carousel.Caption>
              <h3>First Pizza</h3>
              <p>Fruit Pizza</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={pizza2} alt="Pizza 2" />
            <Carousel.Caption>
              <h3>Second Pizza</h3>
              <p>Vegan Pizza</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={pizza3} alt="Pizza 3" />
            <Carousel.Caption>
              <h3>Third Pizza</h3>
              <p>Cheese Pizza</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Row>

      <Row className='mt-3'>
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product.id}>
              <Card>
                <Card.Img variant="top" src={product.image || menu1} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${product.price.toFixed(2)}</Card.Text>
                  <Button variant="primary" onClick={() => addToCart(product)}>
                    Buy
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </Row>

      <Modal show={showPopup} onHide={togglePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SelectItemsPopup cart={cart} onClose={togglePopup} onQuantityChange={handleQuantityChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={togglePopup}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;
