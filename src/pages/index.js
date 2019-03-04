import React from "react"
import axios from 'axios'

import Layout from "../components/layout"
import DisableUi from "../components/disableUi"
import SEO from "../components/seo"
import JobResults from "../components/jobResults"
import ListFilters from "../components/ListFilters"
import appConfig from '../config.json'

class IndexPage extends React.Component {
  constructor(props) {
    console.log('appconfig', appConfig)
    super(props)
    this.state={
      jobs: {}
      , indecisDb: {}
      , totalJobs: 0
      , disableUi: false
      , gotInitialDb: false
      , isReady: false
    }
    this.getIndecisDb = this.getIndecisDb.bind(this)
    this.searchJobList = this.searchJobList.bind(this)
    this.createData = this.createData.bind(this)
  }
  getIndecisDb(){
    console.log('getting db', appConfig.domain+"getIndecisDb")
    this.setState({disableUi: true})
    axios.post(appConfig.domain+"getIndecisDb").then(res => {
      console.log('got', res.data.indecisDb)
      this.setState({indecisDb: res.data.indecisDb, disableUi: false, gotInitialDb: true, isReady: true})
    }).catch(err => {
      console.error('Error Getting Indecis Db', err)
      this.setState({disableUi: false, isReady: true})
    })
  }
  componentDidMount(){
    let jobCache = JSON.parse(localStorage.getItem('jermmJobResults')) || {}
    let totalCache = JSON.parse(localStorage.getItem('jermmJobTotal')) || 0
    this.setState({jobs: jobCache, totalJobs: totalCache})
    this.getIndecisDb()
  }
  searchJobList(searchIndecis, searchIndecisNo, searchStart = 0, searchCount = 10){
    this.setState({disableUi: true})
    axios.post(appConfig.domain+"searchJobList", {start: searchStart, count: searchCount, indecis: searchIndecis, indecisNo: searchIndecisNo}).then(res => {
      this.setState({jobs: res.data.jobs, totalJobs: res.data.totalJobs, disableUi: false})
      localStorage.setItem('jermmJobResults', JSON.stringify(res.data.jobs))
      localStorage.setItem('jermmJobTotal', JSON.stringify(res.data.totalJobs))
    }).catch(err => {
      this.setState({disableUi: false})
      console.error('Error Getting Jobs', err)
    })
  }
  createData(dataId){
    if(window.confirm('Sure to create: ' + dataId + '.json?')){
      this.setState({disableUi: true})
      axios.post(appConfig.domain+"createData", {dataId: dataId+'.json'}).then(res => {
        this.setState({disableUi: false})
      }).catch(err => {
        alert('Not Created')
        console.error('create index error ', err)
        this.setState({disableUi: false})
      })
    }
  }
  render(){
    return (
      <>
        {this.state.isReady ? (
          <>
            {this.state.disableUi ? (
              <DisableUi />
              ) : null}
          <Layout >
            {this.state.gotInitialDb ? (
              <ListFilters
                indecisDb={this.state.indecisDb}
                searchJobList={this.searchJobList}
              />
            ) : null }
            <JobResults 
              createData={this.createData}
              jobs={this.state.jobs}
              totalJobs={this.state.totalJobs}
              indecisDb={this.state.indecisDb}
              modifyJobData={this.modifyJobData}
              addJobToIndex={this.addJobToIndex}
              removeJobFromIndex={this.removeJobFromIndex}
            />
            <SEO title="Search" keywords={[`job`, `career`, `jermmdev`]} />
          </Layout >
          </>
        ) : null}
      </>
    )
  }
}

export default IndexPage
