import React from "react"
import {
  FormGroup
  , Label
  , Input
  , Tooltip
} from 'reactstrap'

import "./layout.css"
import 'bootstrap/dist/css/bootstrap.css';

class IndexMatch extends React.Component {
    constructor(props){
        super(props)
        this.state={
            tooltipOpen: false
        }
        this.checkBoxToggle=this.checkBoxToggle.bind(this)
        this.toggleTooltip=this.toggleTooltip.bind(this)
        this._isMounted = false;
    }
    componentDidMount(){
        this._isMounted = true;
    }
    checkBoxToggle(e){
        if(e.target.checked){
          this.props.addJobToIndex(this.props.jobId, this.props.indexId)
        }else{
          this.props.removeJobFromIndex(this.props.jobId, this.props.indexId)
        }
    }
    toggleTooltip(){
        //match
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
        let newId='id'+this.props.jobId.replace('.','')+this.props.indexId.replace('.','')
        return(
            <FormGroup check inline>
                <Label id={newId} className="indexCheckbox text-primary" check>
                    <Input 
                        defaultChecked={this.props.isChecked} 
                        onChange={this.checkBoxToggle} 
                        type="checkbox"/>
                    {this.props.indecisDb[this.props.indexId].title}
                </Label>
                <Tooltip isOpen={this.state.tooltipOpen} target={newId} toggle={this.toggleTooltip}>
                    {this.props.indecisDb[this.props.indexId].desc}
                </Tooltip>
            </FormGroup>
        )
    }
}

export default IndexMatch
