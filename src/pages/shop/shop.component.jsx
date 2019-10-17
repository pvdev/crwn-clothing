import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { updateCollections } from '../../redux/shop/shop.actions'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
  state = {
    loading: true,
  }

  unsubscribeFromSnapshot = null

  componentDidMount() {
    const { updateCollections } = this.props

    const collectionRef = firestore.collection('collections')

    // doing with promise style
    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      updateCollections(collectionsMap)
      this.setState({ loading: false })
    })

    // doing with fetch style using api
    // https://firestore.googleapis.com/v1/projects/crwn-db-d43db/databases/(default)/documents/
    // fetch(
    //   'https://firestore.googleapis.com/v1/projects/crwn-db-d43db/databases/(default)/documents/collections'
    // )
    //   .then(response => response.json())
    //   .then(collections => console.log(collections))

    // doing with observable style providing live updates
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //   updateCollections(collectionsMap)
    //   this.setState({ loading: false })
    // })
  }

  componentWillUnmount() {
    // console.log('Calling componentWillUnmount')
    // only when using observable pattern
    //this.unsubscribeFromSnapshot()
  }

  render() {
    const { match } = this.props
    const { loading } = this.state
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:categoryId`}
          render={props => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap)),
})

export default connect(
  null,
  mapDispatchToProps
)(ShopPage)
