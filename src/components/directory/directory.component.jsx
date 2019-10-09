import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { directorySectionsSelector } from '../../redux/directory/directory.selectors'

import MenuItem from '../menu-item/menu-item.component'
import './directory.styles.scss'

const Directory = ({ sections }) => (
  <div className='directory-menu'>
    {sections.map(({ id, ...restOfSection }) => (
      <MenuItem key={id} {...restOfSection} />
    ))}
  </div>
)

// ** Done w/o selectors and reselect
// const mapStateToProps = ({ directory: { sections } }) => ({
//   sections: sections,
// })

const mapStateToProps = createStructuredSelector({
  sections: directorySectionsSelector,
})

export default connect(mapStateToProps)(Directory)
