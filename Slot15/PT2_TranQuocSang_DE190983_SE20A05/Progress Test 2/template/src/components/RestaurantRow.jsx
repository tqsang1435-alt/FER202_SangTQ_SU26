import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatPriceRange } from '../utils/format'
import ModalConfirm from './ModalConfirm'


function RestaurantRow({ restaurant, index, onDelete }) {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{restaurant.name}</td>
        <td>{restaurant.category}</td>
        <td>{restaurant.owner}</td>
        <td>{restaurant.address}</td>
        <td>{restaurant.openDate ?? '—'}</td>
        <td>{formatPriceRange(restaurant.priceMin, restaurant.priceMax)}</td>
        <td>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('/restaurants/' + restaurant.id) }}>
            View
          </a>{' '}
          <a href="#" onClick={(e) => {
            e.preventDefault()
            setShowModal(true)
          }}>
            Delete
          </a>
        </td>
      </tr>

      <ModalConfirm 
        show={showModal}
        title="Confirm Delete"
        message={`Are you sure you want to delete ${restaurant.name}?`}
        confirmText="Delete"
        onConfirm={() => {
          onDelete(restaurant.id)
          setShowModal(false)
        }}
        onCancel={() => setShowModal(false)}
      />
    </>
  )
}

export default RestaurantRow
