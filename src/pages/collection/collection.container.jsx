import { connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
// use of compose is it is harder to read when we have multiple wrapper component but compose help us pass them in sequence as function
import {compose } from 'redux';
import {  selectIsCollectionLoaded} from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';

const mapStateToProps = createStructuredSelector({
    isLoading : (state) => !selectIsCollectionLoaded(state)
})

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);

export default CollectionPageContainer;