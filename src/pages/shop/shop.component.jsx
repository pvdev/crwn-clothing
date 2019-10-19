import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'
import CollectionPageContainer from '../../pages/collection/collection.container'

class ShopPage extends React.Component {
  componentDidMount() {
    // console.log('Mounting ShopPage')
    const { fetchCollectionsStartAsync } = this.props
    fetchCollectionsStartAsync()
    // this.props.dispatch(fetchCollectionsStartAsync())
  }

  componentWillUnmount() {
    // console.log('Calling componentWillUnmount')
    // only when using observable pattern
    //this.unsubscribeFromSnapshot()
  }

  render() {
    const { match } = this.props

    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:categoryId`}
          component={CollectionPageContainer}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
})

export default connect(
  null,
  mapDispatchToProps
)(ShopPage)
