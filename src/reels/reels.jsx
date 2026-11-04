import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient' // adjust path

export default function Reels() {
    const [reels, setReels] = useState([])
    const [selectedReel, setSelectedReel] = useState(null)
    useEffect(() => {
        const fetchReels = async () => {
            const { data, error } = await supabase
                .from('restaurants') // your table name
                .select('*')
                .in('name', ['Konban', 'Yeems', 'Sorate']) // only fetch these 3

            if (error) {
                console.error(error)
            } else {
                setReels(data)
            }
        }

        fetchReels()
    }, [])

    const handleClose = () => setSelectedReel(null)

    return (
        <>
            <div className="container-reels">
                {reels.map((reel) => (
                    <div
                        key={reel.id}
                        className="reel-img"
                        onClick={() => setSelectedReel(reel)}
                    >
                        <img
                            className="img"
                            src={
                                'https://hloflmfcvktnfyumrivx.supabase.co/storage/v1/object/public/images/' +
                                reel.images +
                                '.jpg'
                            }
                            alt={reel.name}
                        />
                        <div className="div-reel-caption">
                            <div className="h4-white">{reel.name}</div>
                            <div className="p3-white">{reel.city}</div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedReel && (
                <div className="modal-overlay" onClick={handleClose}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <iframe
                            className="modal-reel-frame"
                            title={selectedReel.name + ' reel'}
                            src={selectedReel.reel_url.split('?')[0] + 'embed'}
                            allow="autoplay; fullscreen; clipboard-write"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    )
}
