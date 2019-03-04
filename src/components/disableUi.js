import React from "react"
import { Button } from "reactstrap"

export default ()=>(
    <>
    <div 
      style={{
        position: 'fixed'
        , top: 0
        , left: 0
        , height: '100%'
        , width: '100%'
        , backgroundColor: '#333'
        , zIndex: 9998
        , opacity: .8
      }}
    >
    </div>
    <div style={{
        position: 'fixed'
        , top: '40%'
        , width: '100%'
        , textAlign: 'center'
        , zIndex: 9999
      }}>
      <Button inline="true" color="info">
        Talking to Server...
      </Button>
    </div>
    </>
)