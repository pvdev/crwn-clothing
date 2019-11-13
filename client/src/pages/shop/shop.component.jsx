import React, { useEffect, lazy, Suspense } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions'
import Spinner from '../../components/spinner/spinner.component'

const CollectionsOverviewContainer = lazy(() =>
  import('../../components/collections-overview/collections-overview.container')
)
const CollectionPageContainer = lazy(() =>
  import('../../pages/collection/collection.container')
)

const ShopPage = ({ fetchCollectionsStartAsync, match }) => {
  useEffect(() => {
    // console.log('ShopPage mounting...')
    fetchCollectionsStartAsync()
  }, [fetchCollectionsStartAsync])

  return (
    <div className='shop-page'>
      <Suspense fallback={<Spinner />}>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:categoryId`}
          component={CollectionPageContainer}
        />
      </Suspense>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
})

export default connect(
  null,
  mapDispatchToProps
)(ShopPage)
