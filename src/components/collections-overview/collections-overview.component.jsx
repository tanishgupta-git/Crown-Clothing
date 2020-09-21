import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'; 
import './collections-overview.styles.scss';
import {selectCollectionsPreview} from '../../redux/shop/shop.selectors';
import CollectionPreview from '../../components/collection-preview/collection-preview.component'; 

const CollectionsOverview = ({ collections }) => (
  <div className='collections-overview'>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections:selectCollectionsPreview
})
  
export default connect(mapStateToProps)(CollectionsOverview);
