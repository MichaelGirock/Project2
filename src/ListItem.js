import React from 'react';

export function ListItem(props) {
    const {key, name} = props
    
    return <ul key={key}>{name}</ul>
}