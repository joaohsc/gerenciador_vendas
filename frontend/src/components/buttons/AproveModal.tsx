import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import api from '../../api';

interface Props {
  id_pedido: string;
}
function AproveModal({ id_pedido} : Props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAprovar = async () => {
    const res = await api.put("/pedidos/"+id_pedido+"/aprovar");
    setShow(false);
    
    window.location.reload();
  }
  const handleReprovar = async () => {
    const res = await api.put("/pedidos/"+id_pedido+"/reprovar");
    setShow(false);
    
    window.location.reload();
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <VisibilityIcon />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Validar Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>Marque a opção correta para aprovar ou reprovar a solicitação: {id_pedido}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAprovar}>
            Aprovar
          </Button>
          <Button variant="danger" onClick={handleReprovar}>
            Reprovar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AproveModal;