import React from "react"
import {
  Label
  , Input
  , Col
} from 'reactstrap'
import {
    MdThumbUp
    , MdThumbDown
} from 'react-icons/md' 

import "./layout.css"
import 'bootstrap/dist/css/bootstrap.css';

class IndexFilter extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tooltipOpen: false
        }
        this.checkBoxToggle=this.checkBoxToggle.bind(this)
        this.checkBoxToggleNo=this.checkBoxToggleNo.bind(this)
        this.toggleTooltip=this.toggleTooltip.bind(this)
        this._isMounted = false;
    }
    componentDidMount(){
        this._isMounted = true;
    }
    checkBoxToggle(e){
        if(e.target.checked){
          this.props.addToSearchIndecis(this.props.indexId)
        }else{
          this.props.removeFromSearchIndecis(this.props.indexId)
        }
    }
    checkBoxToggleNo(e){
        if(e.target.checked){
          this.props.addToSearchIndecisNo(this.props.indexId)
        }else{
          this.props.removeFromSearchIndecisNo(this.props.indexId)
        }
    }
    toggleTooltip(){
        if(this._isMounted){
            this.setState({
                tooltipOpen: !this.state.tooltipOpen
            })
        }
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    render(){
        return(
            <>
            <Col xs="3" md="1" lg="1" className="pl-4">
                <Label className="text-success">
                    <Input 
                        onChange={this.checkBoxToggle} 
                        value={this.props.isInSearch}
                        checked={this.props.isInSearch}
                        type="checkbox"/>
                    <MdThumbUp />
                </Label>
            </Col>
            <Col xs="6" md="4" lg="2" id={this.props.keyId} style={{overflow: 'none'}}>
                {this.props.indexData.title}
            </Col>
            <Col xs="3" md="1" lg="1" className="text-right">
            <Label className="text-danger">
                <Input 
                    onChange={this.checkBoxToggleNo} 
                    value={this.props.isInSearchNo}
                    checked={this.props.isInSearchNo}
                    type="checkbox"/>
                <MdThumbDown />
            </Label>
            </Col>
            </>
        )
    }
}

export default IndexFilter
