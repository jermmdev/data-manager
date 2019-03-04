import React from "react"

import "./layout.css"
import 'bootstrap/dist/css/bootstrap.css';
import IndexFilter from "./indexFilter"

import { 
    MdSearch 
    , MdArrowForward
    , MdArrowBack
    , MdEdit
  } from "react-icons/md"
  import { 
      Button
      , Form
      , FormGroup
      , Label
      , Jumbotron
      , Row
      , Input
      , InputGroup
      , InputGroupAddon
  } from "reactstrap"

class ListFilters extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tooltipOpen: false
            , searchStart: 0
            , searchCount: 10
            , searchIndecis: []
            , searchIndecisNo: []
            , editModalOpen: false
        }
        this.checkBoxToggle=this.checkBoxToggle.bind(this)
        this.toggleTooltip=this.toggleTooltip.bind(this)
        this._isMounted = false;
        this.addToSearchIndecis = this.addToSearchIndecis.bind(this)
        this.removeFromSearchIndecis = this.removeFromSearchIndecis.bind(this)
        this.addToSearchIndecisNo = this.addToSearchIndecisNo.bind(this)
        this.removeFromSearchIndecisNo = this.removeFromSearchIndecisNo.bind(this)
        this.takePageStep = this.takePageStep.bind(this)
        this.takePageBackStep = this.takePageBackStep.bind(this)
        this.setCount = this.setCount.bind(this)
        this.setStart = this.setStart.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
    }
    toggleModal(){
      this.setState({editModalOpen: !this.state.editModalOpen})
    }
    componentDidMount(){
      let searchIndecis = []
      try {
        searchIndecis = JSON.parse(localStorage.getItem('jermmSearchIndecis')) || []
      }catch(err){
        searchIndecis = this.state.searchIndecis
        console.log('Skipping search cache.')
      }
      let searchIndecisNo = []
      try {
        searchIndecisNo = JSON.parse(localStorage.getItem('jermmSearchIndecisNo')) || []
      }catch(err){
        searchIndecisNo = this.state.searchIndecis
        console.log('Skipping search cache.')
      }
      let countCache = 10
      try{
        countCache = JSON.parse(localStorage.getItem('jermmListCount'))
      }catch(err){
        console.log('Skipping count cache.')
      }
      let startCache = 0
      try{
        startCache = JSON.parse(localStorage.getItem('jermmListStart'))
      }catch(err){
        console.log('Skipping start cache.')
      }
      let newSearchIndecis = []
      for(let ind in searchIndecis){
        let indexId = searchIndecis[ind]
        if(this.props.indecisDb && this.props.indecisDb[indexId]){
          newSearchIndecis.push(indexId)
        }
      }
      let newSearchIndecisNo = []
      for(let ind in searchIndecisNo){
        let indexId = searchIndecisNo[ind]
        if(this.props.indecisDb && this.props.indecisDb[indexId]){
          newSearchIndecisNo.push(indexId)
        }
      }
      this.setState({searchIndecis: newSearchIndecis, searchIndecisNo: newSearchIndecisNo, searchStart: startCache, searchCount: countCache})
      this._isMounted = true;
    }
    removeFromSearchIndecis(indexName){
      let filteredIndecis = this.state.searchIndecis.filter(searchIndex => {
        return searchIndex !== indexName
      })
      localStorage.setItem('jermmSearchIndecis', JSON.stringify(filteredIndecis))
      this.setState({searchIndecis: filteredIndecis})
    }
    addToSearchIndecis(indexName){
      let filteredIndecis = this.state.searchIndecis.filter(searchIndex => {
        return searchIndex !== indexName
      })
      let filteredIndecisNo = this.state.searchIndecisNo.filter(searchIndex => {
        return searchIndex !== indexName
      })
      filteredIndecis.push(indexName)
      localStorage.setItem('jermmSearchIndecis', JSON.stringify(filteredIndecis))
      localStorage.setItem('jermmSearchIndecisNo', JSON.stringify(filteredIndecisNo))
      this.setState({searchIndecis: filteredIndecis, searchIndecisNo: filteredIndecisNo})
    }
    removeFromSearchIndecisNo(indexName){
      let filteredIndecisNo = this.state.searchIndecisNo.filter(searchIndex => {
        return searchIndex !== indexName
      })
      localStorage.setItem('jermmSearchIndecisNo', JSON.stringify(filteredIndecisNo))
      this.setState({searchIndecisNo: filteredIndecisNo})
    }
    addToSearchIndecisNo(indexName){
      let filteredIndecis = this.state.searchIndecis.filter(searchIndex => {
        return searchIndex !== indexName
      })
      let filteredIndecisNo = this.state.searchIndecisNo.filter(searchIndex => {
        return searchIndex !== indexName
      })
      filteredIndecisNo.push(indexName)
      localStorage.setItem('jermmSearchIndecis', JSON.stringify(filteredIndecis))
      localStorage.setItem('jermmSearchIndecisNo', JSON.stringify(filteredIndecisNo))
      this.setState({searchIndecisNo: filteredIndecisNo, searchIndecis: filteredIndecis})
    }
    setCount(e){
      let newValue = parseInt(e.target.value)
      if(isNaN(newValue)) newValue = 1
      localStorage.setItem('jermmListCount', JSON.stringify(newValue))
      this.setState({searchCount: newValue})
    }
    setStart(e){
      let newValue = parseInt(e.target.value)
      if(isNaN(newValue)) newValue = 0
      localStorage.setItem('jermmListStart', JSON.stringify(newValue))
      this.setState({searchStart: newValue})
    }
    takePageStep(){
      let newStartVal = parseInt(this.state.searchStart) + parseInt(this.state.searchCount)
      this.setState({searchStart: newStartVal})
    }
    takePageBackStep(){
      let newStartVal = parseInt(this.state.searchStart) - parseInt(this.state.searchCount)
      if(newStartVal<0)newStartVal=0
      this.setState({searchStart: newStartVal})
    }
    checkBoxToggle(e){
        if(e.target.checked){
          this.props.addToSearchIndecis(this.props.indexId)
        }else{
          this.props.removeFromSearchIndecis(this.props.indexId)
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
        let indexFilters = []
        if(this.props.indecisDb){
          for(let indexId in this.props.indecisDb){
              let newKey = indexId.replace('.','')+Math.floor(Math.random()*100000)
              indexFilters.push(
                  <IndexFilter 
                      key={newKey}
                      keyId={newKey}
                      indexId={indexId}
                      indexData={this.props.indecisDb[indexId]}
                      isInSearch={this.state.searchIndecis.includes(indexId)}
                      isInSearchNo={this.state.searchIndecisNo.includes(indexId)}
                      addToSearchIndecis={this.addToSearchIndecis}
                      addToSearchIndecisNo={this.addToSearchIndecisNo}
                      removeFromSearchIndecis={this.removeFromSearchIndecis}
                      removeFromSearchIndecisNo={this.removeFromSearchIndecisNo}
                      />
                  )
          }
        }
        return(
            <Jumbotron>
                <Button href="/indecis" className="mb-3" type="button" block color="warning">
                  <MdEdit /> Edit Indecis
                </Button>
                <Form>
                    <Row>
                      {indexFilters}
                    </Row>
                    <FormGroup className="mt-2 mb-2">
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <Button type="button" onClick={this.takePageBackStep} outline block color="danger"><MdArrowBack /></Button>
                        </InputGroupAddon>
                        <InputGroupAddon addonType="prepend">
                          <Label className="input-group-text">Start</Label>
                        </InputGroupAddon>
                        <Input value={this.state.searchStart} onChange={this.setStart} type="text"/>
                        <InputGroupAddon addonType="prepend">
                          <Label className="input-group-text">Max</Label>
                        </InputGroupAddon>
                        <Input value={this.state.searchCount} onChange={this.setCount} type="text"/>
                        <InputGroupAddon addonType="append">
                          <Button type="button" onClick={this.takePageStep} outline block color="success"><MdArrowForward /></Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                </Form>
                <Button type="button" block color="primary" onClick={()=>{
                  this.props.searchJobList(this.state.searchIndecis, this.state.searchIndecisNo, this.state.searchStart, this.state.searchCount)
                  }}>
                  <MdSearch /> Search
                </Button>
            </Jumbotron>
        )
    }
}
export default ListFilters