import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Table, Spinner, Alert, Badge } from 'react-bootstrap'
import axios from 'axios'
import { formatPriceRange } from '../utils/format'

const BASE_URL = 'http://localhost:3001'

export default function CategoryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // TODO-09: Khai báo state: category (null), restaurants ([]), loading (true), error (null)
  const [category, setCategory] = useState(null)
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const [categoriesRes, restaurantsRes] = await Promise.all([
          axios.get(`${BASE_URL}/categories`),
          axios.get(`${BASE_URL}/restaurants`)
        ])
        
        const foundCategory = categoriesRes.data.find(c => String(c.id) === String(id))
        if (!foundCategory) {
          setError('Category not found.')
          return
        }
        
        const categoryRestaurants = restaurantsRes.data.filter(r => String(r.categoryId) === String(id))
        setCategory(foundCategory)
        setRestaurants(categoryRestaurants)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  // TODO-09: Hiển thị <Spinner> khi loading, <Alert variant="danger"> khi có lỗi
  if (loading) return <Spinner animation="border" />
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <div>
      <Button className="mb-3" variant="secondary" onClick={() => navigate('/categories')}>
        Back to Categories
      </Button>

      {category && (
        <Card className="mb-4">
          <Card.Body>
            <h5>Category: <Badge>{category.name}</Badge></h5>
            <p className="mb-0">Total restaurants: {restaurants.length}</p>
          </Card.Body>
        </Card>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Owner</th>
            <th>Address</th>
            <th>Price Range</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-muted">No restaurants found.</td>
            </tr>
          ) : (
            restaurants.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td>{r.name}</td>
                <td>{r.owner}</td>
                <td>{r.address}</td>
                <td>{formatPriceRange(r.priceMin, r.priceMax)}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  )
}
