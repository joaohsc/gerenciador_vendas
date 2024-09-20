import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DoneIcon from '@mui/icons-material/Done';
import api from '../../api';

interface Props {

  id_pedido: string;
}
function AproveModal({ id_pedido} : Props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAprovar = async() => {
    const res = await api.post("/pedidos/"+id_pedido+"/vendas");
    setShow(false);
    
    window.location.reload();
  }
  return (
    <>
      <Button variant="success" onClick={handleShow}>
        <DoneIcon />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Mover Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você deseja mover o pedido para venda? {id_pedido}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAprovar}>
            Mover
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AproveModal;