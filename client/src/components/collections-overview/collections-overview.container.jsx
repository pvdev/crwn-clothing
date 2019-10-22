import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import {
  selectIsCollectionsFetching,
  selectIsCollectionsLoaded,
} from '../../redux/shop/shop.selector'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

// uses isLoading as name needs to be same and prop passed to spinner
// uses a function in order to use ! operator on function results
const mapStateToProps = createStructuredSelector({
  isLoading: state =>
    selectIsCollectionsFetching(state) || !selectIsCollectionsLoaded(state),
})

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer
