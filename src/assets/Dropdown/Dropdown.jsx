import { useState } from 'react'
import './Dropdown.css'
import la from '../../assets/Images/la.jpg'

export default function Dropdown({ title, columns, onItemClick }) {
    const [isOpen, setIsOpen] = useState(title === 'Day 1') // open by default only for Day 1

    return (
        <div className="dropdown-itinerary">
            <button className="title-header" onClick={() => setIsOpen(!isOpen)}>
                <span>
                    {isOpen ? '▼' : '▶'} {title}
                </span>
            </button>

            {isOpen && (
                <div className="columns-grid">
                    {columns.map((col, i) => (
                        <div className="column-block" key={i}>
                            <div className="h4-black-center">{col.heading}</div>
                            <div className="item-grid">
                                {col.items.map((item, j) => (
                                    <div
                                        className="pink-shadow-card"
                                        key={j}
                                        onClick={() => onItemClick?.(item)} // 👈 here
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {item.image && (
                                            <img
                                                className="card-item-image"
                                                src={`https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/${item.image}.jpg`}
                                                alt={item.name}
                                            />
                                        )}
                                        <div className="card-text-content">
                                            <h5 className="card-item-title">
                                                {item.name}
                                            </h5>
                                            <div className="card-item-caption">
                                                {item.caption}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
