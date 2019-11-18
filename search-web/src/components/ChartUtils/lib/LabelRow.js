import React from 'react'

const LabelRow = ({lable, children, labelWidth, labelAlign}) => {
    return (
        <div style={{display: 'flex'}} >
            <div style={{width: labelWidth || 150, textAlign: labelAlign || 'right', padding: '4px 4px',  margin: 'auto'}} >{lable} </div>
            <div style={{flex: 1, padding: '4px 12px'}} >{children} </div>
        </div>
    )
}

export default LabelRow