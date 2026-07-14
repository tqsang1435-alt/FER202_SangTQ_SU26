import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Spinner, Alert, Table, Badge } from 'react-bootstrap'
import { fetchCarTypes, fetchCars } from '../api/carApi'
import { formatPriceRange } from '../utils/format'

export default function CarTypeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [carType, setCarType] = useState(null)
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      // TODO-10A: Dùng Promise.all fetch carTypes + cars
      // Tìm carType theo id; nếu không tìm thấy → navigate('/not-found', { replace: true })
      // Lọc cars theo carTypeId, cập nhật state
      try {
        const [carTypes, allCars] = await Promise.all([fetchCarTypes(), fetchCars()])
        const found = carTypes.find((rt) => String(rt.id) === String(id))
        if (!found) {
          navigate('/not-found', { replace: true })
          return
        }
        setCarType(found)
        setCars(allCars.filter((r) => String(r.carTypeId) === String(id)))
        setLoading(false)
      } catch (err) {
        setError(err.message || 'Failed to load details.')
        setLoading(false)
      }
    }
    load()
  }, [id])

  // TODO-10A: Nếu loading → Spinner; nếu error → Alert danger
  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  if (error) return <Alert variant="danger">{error}</Alert>
  if (!carType) return null

  return (
    <div>
      {/* TODO-10A: Nút Back navigate('/car-types') */}
      <Button variant="outline-primary" className="mb-3" onClick={() => navigate('/car-types')}>← Back to Car Types</Button>
      
      {/* TODO-10A: Card với carType name, Badge id */}
      <Card className="shadow-sm mb-4">
        <Card.Body className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">{carType.name}</h4>
          <Badge bg="secondary">ID: {carType.id}</Badge>
        </Card.Body>
      </Card>
      
      {/* TODO-10A: Table cars (name, seats, transmission, formatPriceRange, lastServiced) */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Seats</th>
            <th>Transmission</th>
            <th>Price Range</th>
            <th>Last Serviced</th>
          </tr>
        </thead>
        <tbody>
          {cars.length === 0 ? (
            <tr><td colSpan={5} className="text-center">No cars found for this type.</td></tr>
          ) : (
            cars.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.seats}</td>
                <td>{c.transmission}</td>
                <td>{formatPriceRange(c.priceWeekday, c.priceWeekend)}</td>
                <td>{c.lastServiced}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  )
}
