import { Spinner } from "react-bootstrap"

const Loader = () => {
  return (
    <div className="position-relative">
        <div className="position-absolute top-50 start-50 translate-middle" style={{ marginTop: '50vh' }}>
            <div>
            <Spinner animation="grow" />
            <Spinner animation="grow" />
            <Spinner animation="grow" />

            </div>
        </div>
    </div>
  )
}

export default Loader