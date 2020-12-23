import { connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// use of compose is it is harder to read when we have multiple wrapper component but compose help us pass them in sequence as function
import {compose } from 'redux';
import { selectIsCollectionFetching} from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
})

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner,    
)(CollectionsOverview);

export default CollectionsOverviewContainer;

