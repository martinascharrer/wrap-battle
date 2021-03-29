import { Component, useState } from 'react'


type memoryCardProps = {
    content: string
}


function FlipCard () {
}

export const MemoryCard = ({content} : memoryCardProps) => {
    const [flipState, setFlipState] = useState('');

    return (
        <div className="memory-card">
            <button className="memory-card-button" onClick={() => FlipCard()}>{content}</button>
        </div>
    );
}
