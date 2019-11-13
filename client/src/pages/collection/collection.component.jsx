import React from 'react'
import { connect } from 'react-redux'

import { selectCollectionById } from '../../redux/shop/shop.selector'

import CollectionItem from '../../components/collection-item/collection-item.component'

import './collection.styles.scss'

const CollectionPage = ({ collection }) => {
  //console.log('Collection: ', collection)
  // TODO: try with redirect to homepage or error page
  // commented out now activates spinner with selectIsCollectionLoaded logic check
  // if (!collection) {
  //   console.log('CollectionPage is missing collection...')
  //   return (
  //     <div className='collection-page'>
  //       <h2 className='title'>Section does not exist</h2>
  //     </div>
  //   )
  // }
  const { title, items } = collection

  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollectionById(ownProps.match.params.categoryId)(state),
})

export default connect(mapStateToProps)(CollectionPage)
